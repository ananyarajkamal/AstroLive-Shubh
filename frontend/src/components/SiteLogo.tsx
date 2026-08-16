/* SiteLogo.tsx - AstroLive Shubh Refined Celestial Brand Mark */
'use client';
import React from 'react';

interface SiteLogoProps {
  variant?: 'light' | 'dark';
  size?: 'compact' | 'normal' | 'large';
}

export default function SiteLogo({ variant = 'light', size = 'normal' }: SiteLogoProps) {
  const isLight = variant === 'light';
  const textColor = isLight ? '#F4EFE3' : '#071A33';
  const goldColor = '#C6A15B';
  const highlightGold = '#E2C982';

  const markSize = size === 'compact' ? 28 : size === 'large' ? 44 : 34;
  const fontSize = size === 'compact' ? 14 : size === 'large' ? 20 : 16;
  const subFontSize = size === 'compact' ? 9 : size === 'large' ? 12 : 10;

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, userSelect: 'none' }}>
      {/* Refined AstroLive Shubh Celestial Mark */}
      <svg width={markSize} height={markSize} viewBox="0 0 40 40" fill="none" style={{ flexShrink: 0 }}>
        {/* Outer Orbit Circle */}
        <circle cx={20} cy={20} r={18} stroke={goldColor} strokeWidth={1.2} opacity={0.9} className="celestial-orbit-slow" style={{ transformOrigin: '20px 20px' }} />

        {/* Inner Celestial Alignment Dotted Ring */}
        <circle cx={20} cy={20} r={13} stroke={highlightGold} strokeWidth={0.8} strokeDasharray="3 2" opacity={0.65} />

        {/* Four Cardinal Celestial Point Rays */}
        <line x1={20} y1={3} x2={20} y2={6} stroke={goldColor} strokeWidth={1} />
        <line x1={20} y1={34} x2={20} y2={37} stroke={goldColor} strokeWidth={1} />
        <line x1={3} y1={20} x2={6} y2={20} stroke={goldColor} strokeWidth={1} />
        <line x1={34} y1={20} x2={37} y2={20} stroke={goldColor} strokeWidth={1} />

        {/* Central Pulsing Sun/Celestial Disc */}
        <circle cx={20} cy={20} r={4.5} fill={goldColor} className="celestial-pulse-gentle" style={{ transformOrigin: '20px 20px' }} />

        {/* Subtle Indian Astronomical Arc */}
        <path d="M 20,8 A 12,12 0 0,0 20,32 A 9,9 0 0,1 20,8 Z" fill={goldColor} opacity={0.25} />

        {/* Orbital Node Stars */}
        <circle cx={20} cy={7} r={1.2} fill={highlightGold} />
        <circle cx={33} cy={20} r={1.2} fill={highlightGold} />
      </svg>

      {/* Brand Typography */}
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          color: textColor,
          fontSize: fontSize,
          fontWeight: 700,
          letterSpacing: '0.09em',
        }}>
          ASTROLIVE
        </span>
        <span style={{
          fontFamily: "'Inter', sans-serif",
          color: goldColor,
          fontSize: subFontSize,
          fontWeight: 700,
          letterSpacing: '0.2em',
          marginTop: 2,
        }}>
          SHUBH
        </span>
      </div>
    </div>
  );
}
