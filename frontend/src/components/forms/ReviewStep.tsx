import React from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { VahanInputData } from '../../lib/types';
import { formatDate } from '../../lib/formatters';
import { User, Car, Edit3, Sparkles } from 'lucide-react';

interface ReviewStepProps {
  data: VahanInputData;
  onEditStep: (step: number) => void;
  onCalculate: () => void;
}

export function ReviewStep({ data, onEditStep, onCalculate }: ReviewStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif-luxury text-2xl text-[#0B132B] font-bold">Review Details</h2>
        <p className="text-xs text-[#526071] mt-1">
          Verify your personal birth details, vehicle marque, and delivery date range before running the deterministic Muhurat computation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Birth Details Card */}
        <Card variant="default" className="relative">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#B8860B] flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" /> Birth Profile
            </h3>
            <button
              onClick={() => onEditStep(1)}
              className="text-xs text-[#526071] hover:text-[#0B132B] flex items-center gap-1 transition-colors font-medium"
            >
              <Edit3 className="w-3 h-3" /> Edit
            </button>
          </div>
          <div className="space-y-2 text-xs text-[#1E242B]">
            <div className="flex justify-between border-b border-[#EAE5DC] pb-1.5">
              <span className="text-[#526071]">Full Name:</span>
              <span className="font-bold text-[#0B132B]">{data.fullName}</span>
            </div>
            <div className="flex justify-between border-b border-[#EAE5DC] pb-1.5">
              <span className="text-[#526071]">Date of Birth:</span>
              <span>{formatDate(data.dateOfBirth)}</span>
            </div>
            <div className="flex justify-between border-b border-[#EAE5DC] pb-1.5">
              <span className="text-[#526071]">Birth Time:</span>
              <span>{data.birthTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#526071]">Birth City:</span>
              <span className="text-[#0B132B] font-bold">{data.birthCity}</span>
            </div>
          </div>
        </Card>

        {/* Vehicle & Delivery Window Card */}
        <Card variant="default" className="relative">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#B8860B] flex items-center gap-1.5">
              <Car className="w-3.5 h-3.5" /> Vehicle & Window
            </h3>
            <button
              onClick={() => onEditStep(2)}
              className="text-xs text-[#526071] hover:text-[#0B132B] flex items-center gap-1 transition-colors font-medium"
            >
              <Edit3 className="w-3 h-3" /> Edit
            </button>
          </div>
          <div className="space-y-2 text-xs text-[#1E242B]">
            <div className="flex justify-between border-b border-[#EAE5DC] pb-1.5">
              <span className="text-[#526071]">Vehicle Category:</span>
              <span className="font-bold text-[#0B132B]">{data.vehicleType}</span>
            </div>
            <div className="flex justify-between border-b border-[#EAE5DC] pb-1.5">
              <span className="text-[#526071]">Model Name:</span>
              <span className="font-medium">{data.vehicleModel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#526071]">Delivery Window:</span>
              <span className="text-xs font-mono font-medium text-[#0B132B]">
                {formatDate(data.deliveryStartDate)} → {formatDate(data.deliveryEndDate)}
              </span>
            </div>
          </div>
        </Card>
      </div>

      <div className="p-4 rounded-xl bg-[#F4EFE6] border border-[#EAE5DC] text-xs text-[#526071] flex items-center gap-3">
        <Sparkles className="w-5 h-5 text-[#B8860B] shrink-0" />
        <p>
          Ready to compute. Clicking below triggers the 5-output calculation sequence (Shubh Window, Lucky Numbers, Auspicious Colour, First Drive Direction, Vahan Patra).
        </p>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-[#EAE5DC]">
        <Button type="button" variant="outline" onClick={() => onEditStep(3)}>
          ← Edit Delivery Window
        </Button>
        <Button type="button" variant="primary" size="lg" onClick={onCalculate}>
          Calculate My Vahan →
        </Button>
      </div>
    </div>
  );
}
