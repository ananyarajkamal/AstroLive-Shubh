import React from 'react';
import { DeliveryWindowInput } from '../../lib/types';
import { CalendarRange } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const NAVY = '#07152F';
const IVORY = '#F5F1E8';
const GOLD = '#C8A85B';
const BORDER = '#D8D0C4';
const MUTED = '#6B7280';
const WHITE = '#FAF8F3';

const inputStyle: React.CSSProperties = {
  width: '100%',
  border: `1px solid ${BORDER}`,
  backgroundColor: IVORY,
  color: NAVY,
  fontSize: 14,
  padding: '11px 14px',
  borderRadius: 6,
  outline: 'none',
  fontFamily: 'Inter, sans-serif',
};

interface DeliveryWindowFormProps {
  initialValues: DeliveryWindowInput;
  onSubmit: (data: DeliveryWindowInput) => void;
  onBack: () => void;
}

export function DeliveryWindowForm({ initialValues, onSubmit, onBack }: DeliveryWindowFormProps) {
  const [formData, setFormData] = React.useState<DeliveryWindowInput>(initialValues);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const { t, lang } = useLanguage();

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.deliveryStartDate) newErrors.deliveryStartDate = lang === 'hi' ? 'प्रारंभिक तिथि आवश्यक है' : 'Start date is required';
    if (!formData.deliveryEndDate) newErrors.deliveryEndDate = lang === 'hi' ? 'अंतिम तिथि आवश्यक है' : 'End date is required';

    if (formData.deliveryStartDate && formData.deliveryEndDate) {
      if (new Date(formData.deliveryEndDate) < new Date(formData.deliveryStartDate)) {
        newErrors.deliveryEndDate = lang === 'hi' ? 'अंतिम तिथि प्रारंभिक तिथि से पहले नहीं हो सकती।' : 'Delivery end date cannot be earlier than start date.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', 'Noto Serif Devanagari', Georgia, serif", fontSize: 24, color: NAVY, fontWeight: 600, marginBottom: 4 }}>
          {t.forms.step3Title}
        </h2>
        <p style={{ color: MUTED, fontSize: 13 }}>
          {t.forms.step3Subtitle}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, backgroundColor: IVORY, border: `1px solid ${BORDER}`, borderRadius: 8, padding: 20 }}>
          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: NAVY, marginBottom: 6 }}>
              {t.forms.deliveryStartLabel.toUpperCase()}
            </label>
            <input
              type="date"
              value={formData.deliveryStartDate}
              onChange={(e) => setFormData({ ...formData, deliveryStartDate: e.target.value })}
              style={{
                ...inputStyle,
                backgroundColor: WHITE,
                borderColor: errors.deliveryStartDate ? '#DC2626' : BORDER,
              }}
            />
            {errors.deliveryStartDate && <p style={{ fontSize: 11, color: '#DC2626', marginTop: 4 }}>{errors.deliveryStartDate}</p>}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: NAVY, marginBottom: 6 }}>
              {t.forms.deliveryEndLabel.toUpperCase()}
            </label>
            <input
              type="date"
              value={formData.deliveryEndDate}
              onChange={(e) => setFormData({ ...formData, deliveryEndDate: e.target.value })}
              style={{
                ...inputStyle,
                backgroundColor: WHITE,
                borderColor: errors.deliveryEndDate ? '#DC2626' : BORDER,
              }}
            />
            {errors.deliveryEndDate && <p style={{ fontSize: 11, color: '#DC2626', marginTop: 4 }}>{errors.deliveryEndDate}</p>}
          </div>
        </div>

        <div style={{ backgroundColor: WHITE, border: `1px solid ${BORDER}`, borderRadius: 8, padding: 16, display: 'flex', alignItems: 'flex-start', gap: 14 }}>
          <CalendarRange width={20} height={20} color={GOLD} style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <span style={{ fontSize: 12, fontWeight: 700, color: NAVY, display: 'block', marginBottom: 2 }}>
              {lang === 'hi' ? 'निश्चित मुहूर्त गणना:' : 'Deterministic Window Scoring:'}
            </span>
            <p style={{ fontSize: 12, color: MUTED, lineHeight: 1.5, margin: 0 }}>
              {lang === 'hi'
                ? 'मुहूर्त गणना सटीक ग्रह देशांतर, तिथि, नक्षत्र, होरा और लग्न का विश्लेषण करके सर्वश्रेष्ठ शुभ मुहूर्त अंक निर्धारित करती है।'
                : 'The Muhurat calculation computes exact planet longitudes, Tithi, Nakshatra, Hora, and Lagna for daytime slots across these dates to rank top auspicious delivery windows.'}
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: `1px solid ${BORDER}` }}>
        <button
          type="button"
          onClick={onBack}
          style={{
            border: `1px solid ${BORDER}`,
            color: NAVY,
            backgroundColor: 'transparent',
            fontSize: 12,
            fontWeight: 600,
            padding: '10px 20px',
            borderRadius: 4,
            cursor: 'pointer',
          }}
        >
          {t.forms.backBtn}
        </button>

        <button
          type="submit"
          style={{
            backgroundColor: NAVY,
            color: IVORY,
            border: 'none',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.08em',
            padding: '12px 28px',
            borderRadius: 4,
            cursor: 'pointer',
          }}
        >
          {lang === 'hi' ? 'समीक्षा एवं गणना →' : 'Review & Compute →'}
        </button>
      </div>
    </form>
  );
}
