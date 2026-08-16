/* SiteNav.tsx - Deep Observatory Navigation Bar with Bilingual Switcher & Mobile Responsiveness */
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SiteLogo from './SiteLogo';
import { useLanguage } from '../context/LanguageContext';

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/vahan/calculate', label: t.nav.vahan },
    { href: '/griha', label: t.nav.griha },
    { href: '/vyapar', label: t.nav.vyapar },
    { href: '/swarna', label: t.nav.swarna },
  ];

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: scrolled ? 'rgba(3, 12, 25, 0.96)' : '#030C19',
        borderBottom: '1px solid rgba(198, 161, 91, 0.35)',
        backdropFilter: 'blur(12px)',
        transition: 'background-color 300ms ease, border-color 300ms ease',
      }}
    >
      <div
        className="nav-container"
        style={{
          maxWidth: 1540,
          margin: '0 auto',
          padding: '0 24px',
          height: 76,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand Emblem Logo */}
        <Link href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <SiteLogo variant="light" size="normal" />
        </Link>

        {/* Desktop Navigation Directory & Language Switcher */}
        <nav className="hidden md:flex" style={{ alignItems: 'center', gap: 24 }}>
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link-cosmic"
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  textDecoration: 'none',
                  color: isActive ? '#C6A15B' : '#F4EFE3',
                }}
              >
                {item.label}
              </Link>
            );
          })}

          <div style={{ width: 1, height: 18, backgroundColor: 'rgba(198, 161, 91, 0.35)', margin: '0 2px' }} />

          {/* Premium Language Switcher (EN | हिंदी) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(198, 161, 91, 0.3)', borderRadius: 4, padding: '3px 6px' }}>
            <button
              type="button"
              onClick={() => setLang('en')}
              className="lang-toggle-btn"
              style={{ color: lang === 'en' ? '#C6A15B' : '#B8B2A5', fontWeight: lang === 'en' ? 700 : 400 }}
              aria-label="Switch to English"
            >
              EN
            </button>
            <span style={{ color: 'rgba(198, 161, 91, 0.4)', fontSize: 11 }}>|</span>
            <button
              type="button"
              onClick={() => setLang('hi')}
              className="lang-toggle-btn"
              style={{ color: lang === 'hi' ? '#C6A15B' : '#B8B2A5', fontWeight: lang === 'hi' ? 700 : 400 }}
              aria-label="हिंदी में बदलें"
            >
              हिंदी
            </button>
          </div>

          <Link
            href="/vahan/calculate"
            style={{
              backgroundColor: '#C6A15B',
              color: '#030C19',
              fontSize: lang === 'hi' ? 12 : 11,
              fontWeight: 700,
              letterSpacing: lang === 'hi' ? '0.04em' : '0.12em',
              padding: lang === 'hi' ? '10px 20px' : '11px 24px',
              borderRadius: 4,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            {t.nav.startJourney}
          </Link>
        </nav>

        {/* Mobile Header Controls */}
        <div className="flex md:hidden" style={{ alignItems: 'center', gap: 12 }}>
          {/* Language Switcher for Mobile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(198, 161, 91, 0.3)', borderRadius: 4, padding: '2px 5px' }}>
            <button
              type="button"
              onClick={() => setLang('en')}
              className="lang-toggle-btn"
              style={{ color: lang === 'en' ? '#C6A15B' : '#B8B2A5', fontWeight: lang === 'en' ? 700 : 400, fontSize: 11 }}
            >
              EN
            </button>
            <span style={{ color: 'rgba(198, 161, 91, 0.4)', fontSize: 10 }}>|</span>
            <button
              type="button"
              onClick={() => setLang('hi')}
              className="lang-toggle-btn"
              style={{ color: lang === 'hi' ? '#C6A15B' : '#B8B2A5', fontWeight: lang === 'hi' ? 700 : 400, fontSize: 11 }}
            >
              हिंदी
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ backgroundColor: 'transparent', border: '1px solid rgba(198, 161, 91, 0.4)', color: '#F4EFE3', padding: '6px 10px', borderRadius: 4, cursor: 'pointer' }}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden" style={{ backgroundColor: '#030C19', borderBottom: '1px solid rgba(198, 161, 91, 0.35)', padding: '16px 24px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: pathname === item.href ? '#C6A15B' : '#F4EFE3', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/vahan/calculate"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              backgroundColor: '#C6A15B',
              color: '#030C19',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.06em',
              padding: '12px 20px',
              borderRadius: 4,
              textDecoration: 'none',
              textAlign: 'center',
              marginTop: 8,
            }}
          >
            {t.nav.startJourney}
          </Link>
        </div>
      )}
    </header>
  );
}
