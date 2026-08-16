/* ModuleIcons.tsx - Minimalist SVG Line Icons for AstroLive Shubh Modules */
import React from 'react';

const GOLD = '#C7A85B';
const DARK = '#464657';

export function VahanIcon({ size = 32, color = GOLD }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      {/* Orbital trajectory behind vehicle silhouette */}
      <ellipse cx={16} cy={16} rx={14} ry={6} stroke={color} strokeWidth={1} opacity={0.6} transform="rotate(-15 16 16)" />
      <path d="M4,18 L7,12 L22,12 L26,18 L28,18 L28,22 L4,22 Z" stroke={DARK} strokeWidth={1.5} strokeLinejoin="round" fill="none" />
      <circle cx={9} cy={22} r={2.5} fill={color} />
      <circle cx={23} cy={22} r={2.5} fill={color} />
    </svg>
  );
}

export function GrihaIcon({ size = 32, color = GOLD }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      {/* Vastu outer square */}
      <rect x={4} y={4} width={24} height={24} stroke={color} strokeWidth={1} opacity={0.5} strokeDasharray="3 2" />
      {/* Architectural doorway silhouette */}
      <path d="M7,26 L7,14 L16,7 L25,14 L25,26 Z" stroke={DARK} strokeWidth={1.5} strokeLinejoin="round" fill="none" />
      <path d="M12,26 L12,18 L20,18 L20,26" stroke={color} strokeWidth={1.2} />
      <circle cx={16} cy={12} r={2} fill={color} />
    </svg>
  );
}

export function VyaparIcon({ size = 32, color = GOLD }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      {/* Rising commercial enterprise growth geometry */}
      <path d="M4,26 L12,18 L18,22 L28,10" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <polygon points="28,10 22,10 28,16" fill={color} />
      <rect x={6} y={20} width={4} height={6} fill={DARK} opacity={0.3} />
      <rect x={14} y={15} width={4} height={11} fill={DARK} opacity={0.5} />
      <rect x={22} y={11} width={4} height={15} fill={DARK} />
    </svg>
  );
}

export function SwarnaIcon({ size = 32, color = GOLD }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      {/* Faceted Gemstone & Orbital Ring */}
      <ellipse cx={16} cy={16} rx={14} ry={6} stroke={DARK} strokeWidth={0.8} opacity={0.5} />
      <polygon points="16,4 25,11 21,26 11,26 7,11" stroke={color} strokeWidth={1.5} fill="none" strokeLinejoin="round" />
      <line x1={7} y1={11} x2={25} y2={11} stroke={color} strokeWidth={1} />
      <line x1={16} y1={4} x2={16} y2={26} stroke={color} strokeWidth={0.8} opacity={0.6} />
      <line x1={16} y1={4} x2={11} y2={26} stroke={color} strokeWidth={0.6} opacity={0.4} />
      <line x1={16} y1={4} x2={21} y2={26} stroke={color} strokeWidth={0.6} opacity={0.4} />
    </svg>
  );
}
