/* ModuleCardVisuals.tsx - Distinct SVG Line-Art Visual Headers for the 4 Modules */
import React from 'react';

const NAVY = '#07152F';
const GOLD = '#C8A85B';
const LIGHT_GOLD = '#D9C27A';
const MUTED_GOLD = '#A98A48';

export function VahanCardVisual() {
  return (
    <div style={{ height: 180, backgroundColor: NAVY, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="100%" height="100%" viewBox="0 0 300 180" fill="none" className="card-svg-bg">
        {/* Orbital Mobility Wheels & Grid */}
        <circle cx={150} cy={90} r={70} stroke={GOLD} strokeWidth={0.8} strokeDasharray="4 4" opacity={0.4} />
        <circle cx={150} cy={90} r={45} stroke={LIGHT_GOLD} strokeWidth={0.6} opacity={0.3} />
        
        {/* Directional Wheel Rays */}
        <line x1={80} y1={90} x2={220} y2={90} stroke={GOLD} strokeWidth={0.8} opacity={0.35} />
        <line x1={150} y1={20} x2={150} y2={160} stroke={GOLD} strokeWidth={0.8} opacity={0.35} />
        <line x1={100} y1={40} x2={200} y2={140} stroke={GOLD} strokeWidth={0.6} opacity={0.25} />
        <line x1={200} y1={40} x2={100} y2={140} stroke={GOLD} strokeWidth={0.6} opacity={0.25} />

        {/* Central Vehicle Motion Star */}
        <circle cx={150} cy={90} r={6} fill={GOLD} />
        <circle cx={150} cy={90} r={14} stroke={GOLD} strokeWidth={1} />
        <circle cx={105} cy={90} r={2.5} fill={LIGHT_GOLD} />
        <circle cx={195} cy={90} r={2.5} fill={LIGHT_GOLD} />
      </svg>
      <div style={{ position: 'absolute', bottom: 12, left: 16, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: LIGHT_GOLD }}>
        VEHICLES &amp; MOBILITY
      </div>
    </div>
  );
}

export function GrihaCardVisual() {
  return (
    <div style={{ height: 180, backgroundColor: NAVY, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="100%" height="100%" viewBox="0 0 300 180" fill="none" className="card-svg-bg">
        {/* Architectural Arch & Vastu Mandala Grid */}
        <rect x={100} y={40} width={100} height={110} stroke={GOLD} strokeWidth={0.8} opacity={0.4} />
        <path d="M 100,80 A 50,50 0 0,1 200,80" stroke={GOLD} strokeWidth={1} opacity={0.6} fill="none" />
        <line x1={150} y1={30} x2={150} y2={150} stroke={LIGHT_GOLD} strokeWidth={0.8} opacity={0.35} />
        <line x1={100} y1={110} x2={200} y2={110} stroke={MUTED_GOLD} strokeWidth={0.6} opacity={0.3} />

        {/* Directional Cardinal Points */}
        <circle cx={150} cy={30} r={3} fill={GOLD} />
        <circle cx={150} cy={80} r={4} fill={LIGHT_GOLD} />
        <circle cx={125} cy={110} r={2} fill={GOLD} />
        <circle cx={175} cy={110} r={2} fill={GOLD} />
      </svg>
      <div style={{ position: 'absolute', bottom: 12, left: 16, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: LIGHT_GOLD }}>
        HOMES &amp; PLOTS
      </div>
    </div>
  );
}

export function VyaparCardVisual() {
  return (
    <div style={{ height: 180, backgroundColor: NAVY, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="100%" height="100%" viewBox="0 0 300 180" fill="none" className="card-svg-bg">
        {/* Enterprise Spire & Business Growth Geometry */}
        <polygon points="150,25 195,145 105,145" stroke={GOLD} strokeWidth={0.9} opacity={0.5} />
        <polygon points="150,55 175,145 125,145" stroke={LIGHT_GOLD} strokeWidth={0.6} opacity={0.3} />
        <circle cx={150} cy={85} r={35} stroke={GOLD} strokeWidth={0.7} strokeDasharray="3 3" opacity={0.4} />

        {/* Growth Nodes */}
        <circle cx={150} cy={25} r={4} fill={GOLD} />
        <circle cx={150} cy={85} r={3} fill={LIGHT_GOLD} />
        <circle cx={105} cy={145} r={2.5} fill={GOLD} />
        <circle cx={195} cy={145} r={2.5} fill={GOLD} />
      </svg>
      <div style={{ position: 'absolute', bottom: 12, left: 16, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: LIGHT_GOLD }}>
        BUSINESS &amp; ENTERPRISE
      </div>
    </div>
  );
}

export function SwarnaCardVisual() {
  return (
    <div style={{ height: 180, backgroundColor: NAVY, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="100%" height="100%" viewBox="0 0 300 180" fill="none" className="card-svg-bg">
        {/* Gemstone Facet Diamond & Wealth Ornament */}
        <polygon points="150,30 205,75 150,150 95,75" stroke={GOLD} strokeWidth={1} opacity={0.6} />
        <line x1={95} y1={75} x2={205} y2={75} stroke={LIGHT_GOLD} strokeWidth={0.8} opacity={0.4} />
        <line x1={150} y1={30} x2={150} y2={150} stroke={LIGHT_GOLD} strokeWidth={0.8} opacity={0.4} />
        <polygon points="150,30 175,75 150,150 125,75" stroke={GOLD} strokeWidth={0.6} opacity={0.3} />

        {/* Gemstone Core Glow */}
        <circle cx={150} cy={75} r={5} fill={GOLD} />
        <circle cx={150} cy={30} r={2.5} fill={LIGHT_GOLD} />
        <circle cx={205} cy={75} r={2.5} fill={LIGHT_GOLD} />
      </svg>
      <div style={{ position: 'absolute', bottom: 12, left: 16, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: LIGHT_GOLD }}>
        GOLD &amp; GEMSTONES
      </div>
    </div>
  );
}
