/* SiteNav.tsx — shared navigation, 100% inline styles */
'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const NAV = ['How It Works', 'The Five Insights', 'Vahan Patra', 'About Us'];

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100,
      backgroundColor: '#F7F4ED',
      borderBottom: '1px solid #E4E0D6',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: '0 40px',
        height: 72,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Brand */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            color: '#07152F', fontSize: 15, fontWeight: 600,
            letterSpacing: '0.07em', lineHeight: 1.25,
          }}>
            ASTROLIVE<br/>VAHAN
          </div>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          {NAV.map(n => (
            <Link key={n} href={n === 'Vahan Patra' ? '/patra/mock-id' : `/#${n.toLowerCase().replace(/\s+/g,'-')}`}
              style={{ color: '#374151', fontSize: 13, fontWeight: 500, textDecoration: 'none', whiteSpace: 'nowrap' }}
            >{n}</Link>
          ))}
          <Link href="/calculate" style={{
            backgroundColor: '#07152F', color: '#F7F4ED',
            fontSize: 12, fontWeight: 700, letterSpacing: '0.09em',
            padding: '10px 20px', borderRadius: 4, textDecoration: 'none', whiteSpace: 'nowrap',
          }}>DISCOVER MY VAHAN</Link>
        </nav>
      </div>
    </header>
  );
}
