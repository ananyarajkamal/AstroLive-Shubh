import React from 'react';
import { Check } from 'lucide-react';

interface Step {
  id: number;
  label: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between relative max-w-2xl mx-auto px-4">
        {/* Background track line */}
        <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-0.5 bg-slate-800 -z-0" />
        
        {/* Active track fill line */}
        <div 
          className="absolute left-8 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-[#C5A059] to-[#D4AF37] transition-all duration-500 -z-0"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 88}%` }}
        />

        {steps.map((step) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;

          return (
            <div key={step.id} className="flex flex-col items-center gap-2 relative z-10">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                  isCompleted
                    ? 'bg-[#C5A059] text-[#0B132B] shadow-md shadow-[#C5A059]/20'
                    : isCurrent
                    ? 'bg-[#0E1B38] text-[#D4AF37] border-2 border-[#C5A059] shadow-lg shadow-[#C5A059]/30 scale-110'
                    : 'bg-[#0B132B] text-slate-500 border border-slate-700'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : step.id}
              </div>
              <span
                className={`text-xs font-medium tracking-wide transition-colors ${
                  isCurrent ? 'text-[#C5A059]' : isCompleted ? 'text-slate-300' : 'text-slate-500'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
