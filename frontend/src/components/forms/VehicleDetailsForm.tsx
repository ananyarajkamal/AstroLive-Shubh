import React from 'react';
import { VehicleDetailsInput, VehicleType } from '../../lib/types';
import { Car, Zap, Shield, Crown, Bike } from 'lucide-react';
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

interface VehicleDetailsFormProps {
  initialValues: VehicleDetailsInput;
  onSubmit: (data: VehicleDetailsInput) => void;
  onBack: () => void;
}

export function VehicleDetailsForm({ initialValues, onSubmit, onBack }: VehicleDetailsFormProps) {
  const [formData, setFormData] = React.useState<VehicleDetailsInput>(initialValues);
  const [error, setError] = React.useState<string>('');
  const { t, lang } = useLanguage();

  const VEHICLE_TYPES: { type: VehicleType; label: string; icon: React.ReactNode; desc: string }[] = [
    { type: 'SUV', label: lang === 'hi' ? 'एसयूवी / क्रॉसओवर' : 'SUV / Crossover', icon: <Shield width={18} height={18} />, desc: lang === 'hi' ? 'शानदार रोड प्रेजेंस और लग्जरी' : 'Commanding road presence & luxury' },
    { type: 'Sedan', label: lang === 'hi' ? 'सेडान' : 'Sedan', icon: <Car width={18} height={18} />, desc: lang === 'hi' ? 'एग्जीक्यूटिव लालित्य और आरामदायक ड्राइव' : 'Executive elegance & smooth transit' },
    { type: 'EV', label: lang === 'hi' ? 'इलेक्ट्रिक वाहन (EV)' : 'Electric Vehicle (EV)', icon: <Zap width={18} height={18} />, desc: lang === 'hi' ? 'आधुनिक तकनीक और दक्षता' : 'Modern technology & efficiency' },
    { type: 'Luxury', label: lang === 'hi' ? 'लक्जरी प्रीमियम' : 'Luxury Premium', icon: <Crown width={18} height={18} />, desc: lang === 'hi' ? 'अल्ट्रा-लक्जरी फ्लैगशिप कार' : 'Ultra-luxury flagship marque' },
    { type: 'Two-Wheeler', label: lang === 'hi' ? 'दोपहिया / बाइक' : 'Two-Wheeler / Bike', icon: <Bike width={18} height={18} />, desc: lang === 'hi' ? 'सुगम व्यक्तिगत आवागमन' : 'Agile personal transit' },
    { type: 'Hatchback', label: lang === 'hi' ? 'हैचबैक' : 'Hatchback', icon: <Car width={18} height={18} />, desc: lang === 'hi' ? 'शहरी सुगमता' : 'Compact urban efficiency' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.vehicleModel.trim()) {
      setError(lang === 'hi' ? 'कृपया अपने वाहन का नाम या मॉडल निर्दिष्ट करें।' : 'Please specify your vehicle make or model name.');
      return;
    }
    setError('');
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', 'Noto Serif Devanagari', Georgia, serif", fontSize: 24, color: NAVY, fontWeight: 600, marginBottom: 4 }}>
          {t.forms.step2Title}
        </h2>
        <p style={{ color: MUTED, fontSize: 13 }}>
          {t.forms.step2Subtitle}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: NAVY, marginBottom: 10 }}>
            {t.forms.vehicleTypeLabel.toUpperCase()}
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {VEHICLE_TYPES.map((item) => {
              const isSelected = formData.vehicleType === item.type;
              return (
                <button
                  key={item.type}
                  type="button"
                  onClick={() => setFormData({ ...formData, vehicleType: item.type })}
                  style={{
                    backgroundColor: isSelected ? NAVY : WHITE,
                    color: isSelected ? WHITE : NAVY,
                    border: `1px solid ${isSelected ? NAVY : BORDER}`,
                    borderRadius: 8,
                    padding: 16,
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 150ms ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  }}
                >
                  <div style={{
                    backgroundColor: isSelected ? 'rgba(200, 168, 91, 0.2)' : IVORY,
                    color: isSelected ? GOLD : MUTED,
                    padding: 8,
                    borderRadius: 6,
                    marginBottom: 10,
                    display: 'inline-flex',
                  }}>
                    {item.icon}
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{item.label}</span>
                  <span style={{ fontSize: 11, color: isSelected ? '#D1D5DB' : MUTED, lineHeight: 1.3 }}>{item.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: NAVY, marginBottom: 6 }}>
            {t.forms.vehicleModelLabel.toUpperCase()}
          </label>
          <input
            type="text"
            placeholder={t.forms.vehicleModelPlaceholder}
            value={formData.vehicleModel}
            onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
            style={{
              ...inputStyle,
              borderColor: error ? '#DC2626' : BORDER,
            }}
          />
          {error && <p style={{ fontSize: 11, color: '#DC2626', marginTop: 4 }}>{error}</p>}
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
          {t.forms.nextBtn}
        </button>
      </div>
    </form>
  );
}
