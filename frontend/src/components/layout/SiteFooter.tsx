import React from 'react';
import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer style={{ backgroundColor: '#07152F', color: '#9CA3AF' }} className="no-print">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-12"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>

          {/* Brand col */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <p style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#F7F4ED', fontSize: '20px', fontWeight: 600, letterSpacing: '0.06em', lineHeight: 1.2 }}>
                ASTROLIVE<br/>VAHAN
              </p>
            </div>
            <p style={{ fontSize: '13px', lineHeight: 1.7, maxWidth: '240px', color: '#9CA3AF' }}>
              Your vehicle&apos;s auspicious moment, personalised.
            </p>
            <div className="flex gap-3 pt-2">
              {['f', 'in', 'ig', 'li'].map((s) => (
                <div key={s} style={{ width: 30, height: 30, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <span style={{ fontSize: '10px', color: '#9CA3AF', fontWeight: 600 }}>{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: '#F7F4ED' }}>PRODUCT</p>
            {['How It Works', 'The Five Insights', 'Vahan Patra'].map((l) => (
              <Link key={l} href="#" style={{ display: 'block', fontSize: '13px', color: '#9CA3AF' }} className="hover:text-white transition-colors">{l}</Link>
            ))}
          </div>

          {/* Company */}
          <div className="space-y-4">
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: '#F7F4ED' }}>COMPANY</p>
            {['About Us', 'Privacy Policy', 'Terms of Service'].map((l) => (
              <Link key={l} href="#" style={{ display: 'block', fontSize: '13px', color: '#9CA3AF' }} className="hover:text-white transition-colors">{l}</Link>
            ))}
          </div>

          {/* Support */}
          <div className="space-y-4">
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: '#F7F4ED' }}>SUPPORT</p>
            {['Help Center', 'Contact Us', 'FAQ'].map((l) => (
              <Link key={l} href="#" style={{ display: 'block', fontSize: '13px', color: '#9CA3AF' }} className="hover:text-white transition-colors">{l}</Link>
            ))}
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p style={{ fontSize: '12px', color: '#6B7280' }}>© 2026 AstroLive Vahan. All rights reserved.</p>
          <p style={{ fontSize: '11px', color: '#4B5563' }}>Deterministic Panchang & Chaldean Numerology Platform</p>
        </div>
      </div>
    </footer>
  );
}
