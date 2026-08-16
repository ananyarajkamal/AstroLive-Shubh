/* MoonPhaseDivider.tsx - Horizontal Moon Phase SVG Graphic Divider */
import React from 'react';

const GOLD = '#C7A85B';
const SOFT_GOLD = '#D8C58A';

export default function MoonPhaseDivider({ width = 240, color = GOLD }: { width?: number; color?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '24px auto' }}>
      <svg width={width} height={24} viewBox="0 0 240 24" fill="none">
        {/* Horizontal subtle guide line */}
        <line x1={10} y1={12} x2={230} y2={12} stroke={SOFT_GOLD} strokeWidth={0.6} opacity={0.4} />

        {/* 1. New Moon */}
        <circle cx={40} cy={12} r={6} stroke={color} strokeWidth={1} fill="none" />

        {/* 2. Waxing Crescent */}
        <path d="M 80,6 A 6,6 0 0,0 80,18 A 4,4 0 0,1 80,6 Z" fill={color} />
        <circle cx={80} cy={12} r={6} stroke={color} strokeWidth={0.8} fill="none" />

        {/* 3. Full Moon (Center) */}
        <circle cx={120} cy={12} r={7} fill={color} />
        <circle cx={120} cy={12} r={10} stroke={SOFT_GOLD} strokeWidth={0.8} opacity={0.6} />

        {/* 4. Waning Crescent */}
        <path d="M 160,6 A 6,6 0 0,1 160,18 A 4,4 0 0,0 160,6 Z" fill={color} />
        <circle cx={160} cy={12} r={6} stroke={color} strokeWidth={0.8} fill="none" />

        {/* 5. Dark Moon */}
        <circle cx={200} cy={12} r={6} stroke={color} strokeWidth={1} fill="none" />
      </svg>
    </div>
  );
}
