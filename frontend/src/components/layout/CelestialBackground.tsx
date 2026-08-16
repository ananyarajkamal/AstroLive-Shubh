import React from 'react';

export function CelestialBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden no-print">
      {/* Deep Navy Base */}
      <div className="absolute inset-0 bg-[#0B132B]" />
      
      {/* Subtle Gold Ambient Radial Glow Top Right */}
      <div 
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #C5A059 0%, rgba(14, 27, 56, 0) 70%)' }}
      />
      
      {/* Subtle Deep Blue Ambient Radial Glow Bottom Left */}
      <div 
        className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #15254A 0%, rgba(11, 19, 43, 0) 70%)' }}
      />

      {/* Ultra-subtle luxury geometric grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]" 
        style={{
          backgroundImage: `radial-gradient(#C5A059 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />
    </div>
  );
}
