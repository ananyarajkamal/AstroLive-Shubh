import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'emerald' | 'amber' | 'navy';
  className?: string;
}

export function Badge({ children, variant = 'gold', className }: BadgeProps) {
  const variants = {
    gold: 'bg-[#C5A059]/15 text-[#D4AF37] border-1 border-[#C5A059]/40',
    emerald: 'bg-emerald-950/80 text-emerald-300 border-1 border-emerald-500/40',
    amber: 'bg-amber-950/80 text-amber-300 border-1 border-amber-500/40',
    navy: 'bg-[#0E1B38] text-slate-300 border-1 border-slate-700/60'
  };

  return (
    <span
      className={twMerge(
        clsx('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide uppercase', variants[variant], className)
      )}
    >
      {children}
    </span>
  );
}
