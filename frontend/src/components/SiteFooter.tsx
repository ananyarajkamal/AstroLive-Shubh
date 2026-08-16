import React from 'react';
import Link from 'next/link';

const COLS = [
  { heading: 'PRODUCT', links: ['How It Works', 'The Five Insights', 'Vahan Patra'] },
  { heading: 'COMPANY', links: ['About Us', 'Privacy Policy', 'Terms of Service'] },
  { heading: 'SUPPORT', links: ['Help Center', 'Contact Us', 'FAQ'] },
];

export default function SiteFooter() {
  return (
    <footer style={{ backgroundColor: '#07152F', color: '#9CA3AF' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 40px 0' }}>
        <div style={{ display: 'flex', gap: 64, flexWrap: 'wrap', paddingBottom: 48, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          {/* Brand */}
          <div style={{ flex: '0 0 220px', minWidth: 180 }}>
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#F7F4ED', fontSize: 18, fontWeight: 600, letterSpacing: '0.06em', lineHeight: 1.3, marginBottom: 12 }}>
              ASTROLIVE<br/>VAHAN
            </div>
            <p style={{ fontSize: 13, color: '#9CA3AF', lineHeight: 1.7, marginBottom: 20 }}>
              Your vehicle&apos;s auspicious moment, personalised.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              {['f','in','ig','li'].map(s => (
                <div key={s} style={{ width: 30, height: 30, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <span style={{ fontSize: 10, color: '#9CA3AF', fontWeight: 700 }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Links */}
          {COLS.map(col => (
            <div key={col.heading} style={{ flex: '0 0 140px', minWidth: 120 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: '#F7F4ED', marginBottom: 16 }}>{col.heading}</p>
              {col.links.map(l => (
                <Link key={l} href="#" style={{ display: 'block', fontSize: 13, color: '#9CA3AF', textDecoration: 'none', marginBottom: 10 }}>{l}</Link>
              ))}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 0', flexWrap: 'wrap', gap: 8 }}>
          <p style={{ fontSize: 12, color: '#6B7280' }}>© 2025 AstroLive Vahan. All rights reserved.</p>
          <p style={{ fontSize: 11, color: '#4B5563' }}>Deterministic Panchang &amp; Chaldean Numerology Platform</p>
        </div>
      </div>
    </footer>
  );
}
