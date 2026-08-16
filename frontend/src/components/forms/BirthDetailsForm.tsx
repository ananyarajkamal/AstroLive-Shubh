import React from 'react';
import { BirthDetailsInput } from '../../lib/types';
import { CITIES_FALLBACK } from '../../lib/mockData';
import CitySearch, { CityResult } from '../CitySearch';
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

interface BirthDetailsFormProps {
  initialValues: BirthDetailsInput;
  onSubmit: (data: BirthDetailsInput) => void;
}

export function BirthDetailsForm({ initialValues, onSubmit }: BirthDetailsFormProps) {
  const [formData, setFormData] = React.useState<BirthDetailsInput>(initialValues);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const { t, lang } = useLanguage();

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = lang === 'hi' ? 'पूरा नाम आवश्यक है' : 'Full name is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = lang === 'hi' ? 'जन्म तिथि आवश्यक है' : 'Date of birth is required';
    if (!formData.birthTime) newErrors.birthTime = lang === 'hi' ? 'जन्म समय आवश्यक है' : 'Exact birth time is required';
    if (!formData.birthCity.trim()) newErrors.birthCity = lang === 'hi' ? 'जन्म स्थान आवश्यक है' : 'Birth city is required';
    
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
          {t.forms.step1Title}
        </h2>
        <p style={{ color: MUTED, fontSize: 13 }}>
          {t.forms.step1Subtitle}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: NAVY, marginBottom: 6 }}>
            {t.forms.fullNameLabel.toUpperCase()}
          </label>
          <input
            type="text"
            placeholder={t.forms.fullNamePlaceholder}
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            style={{
              ...inputStyle,
              borderColor: errors.fullName ? '#DC2626' : BORDER,
            }}
          />
          {errors.fullName && <p style={{ fontSize: 11, color: '#DC2626', marginTop: 4 }}>{errors.fullName}</p>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: NAVY, marginBottom: 6 }}>
              {t.forms.dobLabel.toUpperCase()}
            </label>
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
              style={{
                ...inputStyle,
                borderColor: errors.dateOfBirth ? '#DC2626' : BORDER,
              }}
            />
            {errors.dateOfBirth && <p style={{ fontSize: 11, color: '#DC2626', marginTop: 4 }}>{errors.dateOfBirth}</p>}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: NAVY, marginBottom: 6 }}>
              {t.forms.timeLabel.toUpperCase()}
            </label>
            <input
              type="time"
              value={formData.birthTime}
              onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
              style={{
                ...inputStyle,
                borderColor: errors.birthTime ? '#DC2626' : BORDER,
              }}
            />
            {errors.birthTime && <p style={{ fontSize: 11, color: '#DC2626', marginTop: 4 }}>{errors.birthTime}</p>}
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: NAVY, marginBottom: 6 }}>
            {t.forms.cityLabel.toUpperCase()}
          </label>
          <CitySearch
            value={formData.birthCity}
            onChange={(c: CityResult) => setFormData({ ...formData, birthCity: c.shortName || c.displayName, latitude: c.lat, longitude: c.lon })}
            placeholder={t.forms.cityPlaceholder}
            inputStyle={{
              ...inputStyle,
              borderColor: errors.birthCity ? '#DC2626' : BORDER,
            }}
          />
          {errors.birthCity && <p style={{ fontSize: 11, color: '#DC2626', marginTop: 4 }}>{errors.birthCity}</p>}
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center', marginTop: 10 }}>
            <span style={{ fontSize: 11, color: MUTED, fontWeight: 500, marginRight: 4 }}>{lang === 'hi' ? 'लोकप्रिय:' : 'Popular:'}</span>
            {CITIES_FALLBACK.slice(0, 7).map((city) => {
              const isSelected = formData.birthCity === city;
              return (
                <button
                  key={city}
                  type="button"
                  onClick={() => setFormData({ ...formData, birthCity: city })}
                  style={{
                    backgroundColor: isSelected ? NAVY : IVORY,
                    color: isSelected ? WHITE : NAVY,
                    border: `1px solid ${isSelected ? NAVY : BORDER}`,
                    padding: '4px 10px',
                    borderRadius: 4,
                    fontSize: 12,
                    fontWeight: isSelected ? 600 : 400,
                    cursor: 'pointer',
                    transition: 'all 150ms ease',
                  }}
                >
                  {city}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 16, borderTop: `1px solid ${BORDER}` }}>
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
