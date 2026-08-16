/* CelestialHeroAnimation.tsx - Animated Celestial Orbital Background */
'use client';

import React, { useState, useEffect } from 'react';

export default function CelestialHeroAnimation() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(mediaQuery.matches);
      const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const offsetX = (clientX / innerWidth - 0.5) * 12;
    const offsetY = (clientY / innerHeight - 0.5) * 12;
    setMousePos({ x: offsetX, y: offsetY });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    >
      {/* Subtle Radial Celestial Glow */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          right: '10%',
          width: 550,
          height: 550,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(198, 161, 91, 0.08) 0%, rgba(7, 26, 51, 0) 70%)',
          transform: reducedMotion ? 'none' : `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
          transition: 'transform 200ms ease-out',
        }}
      />

      {/* Rotating Orbital SVG Rings & Constellation Line Artwork */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1000 700"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%',
          height: '100%',
          opacity: 0.6,
          transform: reducedMotion ? 'none' : `translate(${mousePos.x}px, ${mousePos.y}px)`,
          transition: 'transform 300ms ease-out',
        }}
      >
        {/* Soft Outer Astronomical Ring */}
        <g className={reducedMotion ? '' : 'celestial-orbit-slow'} style={{ transformOrigin: '820px 350px' }}>
          <circle cx={820} cy={350} r={320} stroke="#C6A15B" strokeWidth={0.6} strokeDasharray="4 8" opacity={0.2} />
          <circle cx={820} cy={350} r={240} stroke="#E2C982" strokeWidth={0.5} opacity={0.15} />
          <circle cx={820} cy={30} r={2.5} fill="#C6A15B" className="celestial-twinkle-1" />
          <circle cx={1060} cy={350} r={2.5} fill="#E2C982" className="celestial-twinkle-2" />
        </g>

        {/* Fine Constellation Lines */}
        <path
          d="M 500,160 L 580,220 L 680,190 L 780,260 L 860,210"
          stroke="#C6A15B"
          strokeWidth={0.6}
          opacity={0.2}
          strokeDasharray="4 4"
        />

        {/* Delicate Star Nodes */}
        <circle cx={500} cy={160} r={2} fill="#C6A15B" className="celestial-twinkle-1" />
        <circle cx={580} cy={220} r={2} fill="#F4EFE3" className="celestial-twinkle-2" />
        <circle cx={680} cy={190} r={2.5} fill="#C6A15B" className="celestial-twinkle-1" />
        <circle cx={780} cy={260} r={2} fill="#E2C982" className="celestial-twinkle-2" />
        <circle cx={860} cy={210} r={2} fill="#F4EFE3" className="celestial-twinkle-1" />
      </svg>
    </div>
  );
}
