import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'gold' | 'glass';
}

export function Card({ children, className, variant = 'default', ...props }: CardProps) {
  const baseStyles = 'rounded-xl p-6 transition-all duration-300';

  const variants = {
    default: 'bg-[#FFFFFF] border border-[#EAE5DC] shadow-sm',
    gold: 'bg-[#FFFFFF] border-2 border-[#C5A059]/40 shadow-md',
    glass: 'bg-[#F4EFE6]/80 border border-[#EAE5DC]'
  };

  return (
    <div className={twMerge(clsx(baseStyles, variants[variant], className))} {...props}>
      {children}
    </div>
  );
}
