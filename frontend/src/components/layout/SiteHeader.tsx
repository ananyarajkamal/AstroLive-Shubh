'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header style={{ backgroundColor: '#F7F4ED', borderBottom: '1px solid #E8E4D9' }}
      className="sticky top-0 z-50 no-print">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-[72px]">

        {/* Brand */}
        <Link href="/" className="flex flex-col leading-none group">
          <span style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#07152F', fontSize: '18px', fontWeight: 600, letterSpacing: '0.06em' }}>
            ASTROLIVE
          </span>
          <span style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#07152F', fontSize: '18px', fontWeight: 600, letterSpacing: '0.06em' }}>
            VAHAN
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {['How It Works', 'The Five Insights', 'Vahan Patra', 'About Us'].map((item) => (
            <Link
              key={item}
              href={item === 'Vahan Patra' ? '/patra/mock-id' : `/#${item.toLowerCase().replace(/\s+/g, '-')}`}
              style={{ color: '#374151', fontSize: '13px', fontWeight: 500, letterSpacing: '0.01em' }}
              className="hover:opacity-70 transition-opacity whitespace-nowrap"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <Link href="/calculate"
            style={{
              backgroundColor: '#07152F', color: '#F7F4ED',
              fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em',
              padding: '10px 22px', borderRadius: '4px', display: 'inline-flex',
              alignItems: 'center', gap: '6px', whiteSpace: 'nowrap'
            }}
            className="hover:opacity-90 transition-opacity"
          >
            DISCOVER MY VAHAN <span style={{ color: '#C69A3A' }}>→</span>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2" aria-label="Menu">
          <div style={{ width: 22, height: 2, backgroundColor: '#07152F', marginBottom: 5 }} />
          <div style={{ width: 22, height: 2, backgroundColor: '#07152F', marginBottom: 5 }} />
          <div style={{ width: 22, height: 2, backgroundColor: '#07152F' }} />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div style={{ backgroundColor: '#F7F4ED', borderTop: '1px solid #E8E4D9' }}
          className="md:hidden px-6 py-6 space-y-4">
          {['How It Works', 'The Five Insights', 'Vahan Patra', 'About Us'].map((item) => (
            <Link key={item} href="#" onClick={() => setOpen(false)}
              style={{ display: 'block', color: '#07152F', fontSize: '15px', fontWeight: 500, paddingBottom: '12px', borderBottom: '1px solid #E8E4D9' }}>
              {item}
            </Link>
          ))}
          <Link href="/calculate" onClick={() => setOpen(false)}
            style={{ display: 'block', textAlign: 'center', backgroundColor: '#07152F', color: '#F7F4ED', fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', padding: '12px', borderRadius: '4px', marginTop: '8px' }}>
            DISCOVER MY VAHAN →
          </Link>
        </div>
      )}
    </header>
  );
}
