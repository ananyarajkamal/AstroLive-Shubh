import React from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { DeliveryWindowInput } from '../../lib/types';
import { CalendarRange } from 'lucide-react';

interface DeliveryWindowFormProps {
  initialValues: DeliveryWindowInput;
  onSubmit: (data: DeliveryWindowInput) => void;
  onBack: () => void;
}

export function DeliveryWindowForm({ initialValues, onSubmit, onBack }: DeliveryWindowFormProps) {
  const [formData, setFormData] = React.useState<DeliveryWindowInput>(initialValues);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.deliveryStartDate) newErrors.deliveryStartDate = 'Start date is required';
    if (!formData.deliveryEndDate) newErrors.deliveryEndDate = 'End date is required';

    if (formData.deliveryStartDate && formData.deliveryEndDate) {
      if (new Date(formData.deliveryEndDate) < new Date(formData.deliveryStartDate)) {
        newErrors.deliveryEndDate = 'Delivery end date cannot be earlier than start date.';
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="font-serif-luxury text-2xl text-[#0B132B] font-bold">Delivery Window</h2>
        <p className="text-xs text-[#526071] mt-1">
          Specify your expected dealership vehicle delivery range. Our engine will evaluate every hour in this window to score top Panchang Muhurats.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-6 rounded-xl bg-[#F4EFE6] border border-[#EAE5DC]">
        <Input
          label="Earliest Delivery Date"
          type="date"
          value={formData.deliveryStartDate}
          onChange={(e) => setFormData({ ...formData, deliveryStartDate: e.target.value })}
          error={errors.deliveryStartDate}
          helperText="Date from which dealership can hand over key."
        />

        <Input
          label="Latest Delivery Date"
          type="date"
          value={formData.deliveryEndDate}
          onChange={(e) => setFormData({ ...formData, deliveryEndDate: e.target.value })}
          error={errors.deliveryEndDate}
          helperText="Maximum date window for taking delivery."
        />
      </div>

      <div className="p-4 rounded-lg bg-[#FFFFFF] border border-[#EAE5DC] text-xs text-[#526071] flex items-start gap-3 shadow-sm">
        <CalendarRange className="w-5 h-5 text-[#B8860B] shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-[#0B132B]">Deterministic Window Scoring:</span>
          <p className="text-[#526071] mt-0.5">
            The Muhurat engine computes exact planet longitudes, Tithi, Nakshatra, Hora, and Lagna for daytime slots across these dates to rank top auspicious delivery windows.
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-[#EAE5DC]">
        <Button type="button" variant="outline" onClick={onBack}>
          ← Back
        </Button>
        <Button type="submit" variant="primary">
          Review & Compute →
        </Button>
      </div>
    </form>
  );
}
