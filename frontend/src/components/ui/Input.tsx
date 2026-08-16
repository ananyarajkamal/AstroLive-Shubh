import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        <label htmlFor={inputId} className="text-xs font-bold uppercase tracking-wider text-[#0B132B]">
          {label}
        </label>
        <input
          id={inputId}
          ref={ref}
          className={twMerge(
            clsx(
              'w-full px-4 py-3 bg-[#FFFFFF] border border-[#CBD5E1] rounded-lg text-[#1E242B] text-sm placeholder-slate-400 focus:outline-none focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B] transition-all',
              error && 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20',
              className
            )
          )}
          {...props}
        />
        {error && <span className="text-xs text-rose-600 mt-0.5">{error}</span>}
        {helperText && !error && <span className="text-xs text-[#526071] mt-0.5">{helperText}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
