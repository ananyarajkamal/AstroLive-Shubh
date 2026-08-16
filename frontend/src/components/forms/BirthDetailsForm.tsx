import React from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { BirthDetailsInput } from '../../lib/types';
import { CITIES_FALLBACK } from '../../lib/mockData';

interface BirthDetailsFormProps {
  initialValues: BirthDetailsInput;
  onSubmit: (data: BirthDetailsInput) => void;
}

export function BirthDetailsForm({ initialValues, onSubmit }: BirthDetailsFormProps) {
  const [formData, setFormData] = React.useState<BirthDetailsInput>(initialValues);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.birthTime) newErrors.birthTime = 'Exact birth time is required';
    if (!formData.birthCity.trim()) newErrors.birthCity = 'Birth city is required';
    
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="font-serif-luxury text-2xl text-[#0B132B] font-bold">Birth Details</h2>
        <p className="text-xs text-[#526071] mt-1">
          Your birth date, time, and location determine your lagna position and transit muhurat alignment.
        </p>
      </div>

      <div className="space-y-4">
        <Input
          label="Full Name"
          placeholder="e.g. Aarav Sharma"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          error={errors.fullName}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Date of Birth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
            error={errors.dateOfBirth}
          />
          <Input
            label="Exact Birth Time"
            type="time"
            value={formData.birthTime}
            onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
            error={errors.birthTime}
          />
        </div>

        <div className="space-y-2">
          <Input
            label="Birth City"
            placeholder="e.g. Bengaluru, Mumbai, Delhi"
            value={formData.birthCity}
            onChange={(e) => setFormData({ ...formData, birthCity: e.target.value })}
            error={errors.birthCity}
            helperText="Select or type your birth city to determine precise coordinates."
          />
          
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="text-[11px] text-[#526071] self-center mr-1">Popular:</span>
            {CITIES_FALLBACK.slice(0, 7).map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => setFormData({ ...formData, birthCity: city })}
                className={`px-2.5 py-1 rounded-md text-xs transition-all ${
                  formData.birthCity === city
                    ? 'bg-[#0B132B] text-[#FDFBF7] font-semibold'
                    : 'bg-[#F4EFE6] text-[#526071] border border-[#EAE5DC] hover:border-[#B8860B] hover:text-[#0B132B]'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-[#EAE5DC]">
        <Button type="submit" variant="primary" size="md">
          Continue to Vehicle Details →
        </Button>
      </div>
    </form>
  );
}
