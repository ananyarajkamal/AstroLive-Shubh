import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#B8860B]/40 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-[#0B132B] text-[#FDFBF7] hover:bg-[#1E242B] hover:shadow-lg hover:shadow-[#0B132B]/10 active:scale-[0.98]',
    secondary: 'bg-[#F4EFE6] text-[#0B132B] border border-[#C5A059]/40 hover:bg-[#EAE5DC] hover:border-[#B8860B]',
    outline: 'border border-[#B8860B] text-[#B8860B] hover:bg-[#F4EFE6]',
    ghost: 'text-[#526071] hover:text-[#0B132B] hover:bg-[#F4EFE6]/60'
  };

  const sizes = {
    sm: 'px-3.5 py-2 text-xs tracking-wider uppercase',
    md: 'px-6 py-3 text-xs tracking-wider uppercase',
    lg: 'px-8 py-4 text-sm tracking-wider uppercase'
  };

  return (
    <button
      className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Processing...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
