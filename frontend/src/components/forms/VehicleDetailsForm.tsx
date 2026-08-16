import React from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { VehicleDetailsInput, VehicleType } from '../../lib/types';
import { Car, Zap, Shield, Crown, Bike } from 'lucide-react';

interface VehicleDetailsFormProps {
  initialValues: VehicleDetailsInput;
  onSubmit: (data: VehicleDetailsInput) => void;
  onBack: () => void;
}

const VEHICLE_TYPES: { type: VehicleType; label: string; icon: React.ReactNode; desc: string }[] = [
  { type: 'SUV', label: 'SUV / Crossover', icon: <Shield className="w-5 h-5" />, desc: 'Commanding road presence & luxury' },
  { type: 'Sedan', label: 'Sedan', icon: <Car className="w-5 h-5" />, desc: 'Executive elegance & smooth transit' },
  { type: 'EV', label: 'Electric Vehicle (EV)', icon: <Zap className="w-5 h-5" />, desc: 'Modern technology & efficiency' },
  { type: 'Luxury', label: 'Luxury Premium', icon: <Crown className="w-5 h-5" />, desc: 'Ultra-luxury flagship marque' },
  { type: 'Two-Wheeler', label: 'Two-Wheeler / Bike', icon: <Bike className="w-5 h-5" />, desc: 'Agile personal transit' },
  { type: 'Hatchback', label: 'Hatchback', icon: <Car className="w-5 h-5" />, desc: 'Compact urban efficiency' }
];

export function VehicleDetailsForm({ initialValues, onSubmit, onBack }: VehicleDetailsFormProps) {
  const [formData, setFormData] = React.useState<VehicleDetailsInput>(initialValues);
  const [error, setError] = React.useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.vehicleModel.trim()) {
      setError('Please specify your vehicle make or model name.');
      return;
    }
    setError('');
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="font-serif-luxury text-2xl text-[#0B132B] font-bold">Vehicle Details</h2>
        <p className="text-xs text-[#526071] mt-1">
          Select your vehicle category and model to tailor numerology compatibility & color affinity rules.
        </p>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-[#0B132B]">
            Vehicle Category
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {VEHICLE_TYPES.map((item) => {
              const isSelected = formData.vehicleType === item.type;
              return (
                <button
                  key={item.type}
                  type="button"
                  onClick={() => setFormData({ ...formData, vehicleType: item.type })}
                  className={`flex flex-col items-start p-4 rounded-xl text-left border transition-all ${
                    isSelected
                      ? 'bg-[#0B132B] border-[#0B132B] text-[#FDFBF7] shadow-md'
                      : 'bg-[#FFFFFF] border-[#EAE5DC] text-[#1E242B] hover:border-[#B8860B]'
                  }`}
                >
                  <div className={`p-2 rounded-lg mb-2 ${isSelected ? 'bg-[#F4EFE6]/20 text-[#C5A059]' : 'bg-[#F4EFE6] text-[#526071]'}`}>
                    {item.icon}
                  </div>
                  <span className="text-sm font-bold tracking-wide">{item.label}</span>
                  <span className={`text-[11px] mt-0.5 leading-tight ${isSelected ? 'text-slate-300' : 'text-[#526071]'}`}>{item.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        <Input
          label="Vehicle Make & Model Name"
          placeholder="e.g. Tata Nexon EV Max, BMW X5, Mahindra XUV700"
          value={formData.vehicleModel}
          onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
          error={error}
          helperText="Enter the full trim or commercial model name."
        />
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-[#EAE5DC]">
        <Button type="button" variant="outline" onClick={onBack}>
          ← Back
        </Button>
        <Button type="submit" variant="primary">
          Continue to Delivery Window →
        </Button>
      </div>
    </form>
  );
}
