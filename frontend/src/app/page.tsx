/* src/app/page.tsx - AstroLive Shubh Deep Cosmic Editorial Homepage with Modern Devanagari Typography */
'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import CelestialHeroAnimation from '../components/CelestialHeroAnimation';
import MoonPhaseDivider from '../components/MoonPhaseDivider';
import { VahanIcon, GrihaIcon, VyaparIcon, SwarnaIcon } from '../components/ModuleIcons';
import { useLanguage } from '../context/LanguageContext';

const NAVY_COSMIC = '#071A33';
const SURFACE_CARD = '#FAF8F3';
const GOLD_ANTIQUE = '#C6A15B';
const GOLD_MUTED = '#A98245';
const IVORY_WARM = '#F4EFE3';
const TEXT_DARK = '#241F1B';
const TEXT_MUTED = '#4E4338';
const BORDER_STONE = '#D8D0C4';
const BORDER_GOLD = 'rgba(198, 161, 91, 0.25)';

export default function HomePage() {
  const { t, lang } = useLanguage();

  const titleFont = lang === 'hi' ? "'Poppins', 'Hind', sans-serif" : "'Cormorant Garamond', Georgia, serif";
  const subHeadingFont = lang === 'hi' ? "'Poppins', 'Hind', sans-serif" : "'Cormorant Garamond', Georgia, serif";
  const bodyFont = lang === 'hi' ? "'Poppins', 'Mukta', sans-serif" : "Inter, sans-serif";
  const buttonFont = lang === 'hi' ? "'Hind', 'Poppins', sans-serif" : "Inter, sans-serif";

  const handleScrollToCollection = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById('collection');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ backgroundColor: NAVY_COSMIC, minHeight: '100vh', fontFamily: bodyFont, color: IVORY_WARM }}>
      <SiteNav />

      {/* ═══ 1. HERO SECTION ═════════════════════════════════════════════ */}
      <section style={{ position: 'relative', minHeight: 640, display: 'flex', alignItems: 'center', overflow: 'hidden', backgroundColor: NAVY_COSMIC, borderBottom: `1px solid ${BORDER_GOLD}` }}>
        {/* Slow Interactive Celestial SVG Animation */}
        <CelestialHeroAnimation />

        {/* Background Universal Celestial Image (Full-Width Seamless Container) */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.55, zIndex: 1 }}>
          <Image
            src="/images/astro-shubh-hero.jpg"
            alt="AstroLive Shubh Celestial Ephemeris"
            fill
            style={{ objectFit: 'cover', objectPosition: 'right center' }}
            priority
          />
          {/* Smooth Horizontal Gradient Mask for Text Readability */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: `linear-gradient(to right, ${NAVY_COSMIC} 0%, ${NAVY_COSMIC} 25%, rgba(7, 26, 51, 0.85) 55%, rgba(7, 26, 51, 0.15) 100%)`,
          }} />
          {/* Smooth Vertical Bottom Blend */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 160,
            background: `linear-gradient(to top, ${NAVY_COSMIC} 0%, transparent 100%)`,
          }} />
        </div>

        {/* Hero Content Container */}
        <div style={{ position: 'relative', zIndex: 10, maxWidth: 1540, margin: '0 auto', padding: 'clamp(48px, 8vw, 96px) clamp(16px, 4vw, 48px) clamp(40px, 6vw, 84px)', width: '100%', boxSizing: 'border-box' }}>
          <div style={{ maxWidth: 840 }}>
            <h1 style={{
              fontFamily: titleFont,
              fontSize: lang === 'hi' ? 'clamp(28px, 6vw, 52px)' : 'clamp(32px, 7.5vw, 68px)',
              color: IVORY_WARM,
              fontWeight: lang === 'hi' ? 600 : 400,
              lineHeight: lang === 'hi' ? 1.25 : 1.08,
              marginBottom: 24,
              letterSpacing: lang === 'hi' ? '0em' : '-0.02em',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
            }}>
              {t.hero.title}
            </h1>

            <p style={{
              fontFamily: bodyFont,
              color: '#D5CEA3',
              fontSize: lang === 'hi' ? 17 : 17,
              lineHeight: lang === 'hi' ? 1.8 : 1.75,
              marginBottom: 44,
              maxWidth: 680,
              fontWeight: 400,
            }}>
              {t.hero.subtitle}
            </p>

            <div style={{ display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap' }}>
              <a
                href="#collection"
                onClick={handleScrollToCollection}
                style={{
                  backgroundColor: GOLD_ANTIQUE,
                  color: NAVY_COSMIC,
                  fontFamily: buttonFont,
                  fontSize: lang === 'hi' ? 13 : 11,
                  fontWeight: 700,
                  letterSpacing: lang === 'hi' ? '0.04em' : '0.12em',
                  padding: lang === 'hi' ? '16px 36px' : '18px 40px',
                  borderRadius: 4,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                {t.hero.exploreBtn}
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ═══ 2. BRAND POSITIONING STATEMENT ═════════════════════════════ */}
      <section style={{ backgroundColor: IVORY_WARM, padding: 'clamp(48px, 8vw, 84px) clamp(16px, 4vw, 48px)', borderBottom: `1px solid ${BORDER_STONE}`, textAlign: 'center', color: TEXT_DARK }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: GOLD_MUTED, marginBottom: 14 }}>{t.positioning.tagline}</p>
          <h2 style={{ fontFamily: titleFont, fontSize: lang === 'hi' ? 'clamp(24px, 5vw, 36px)' : 'clamp(28px, 5vw, 44px)', color: TEXT_DARK, fontWeight: lang === 'hi' ? 600 : 400, lineHeight: 1.25, marginBottom: 16, wordBreak: 'break-word' }}>
            {t.positioning.title}
          </h2>
          <p style={{ color: TEXT_MUTED, fontSize: 16, lineHeight: 1.75, maxWidth: 760, margin: '0 auto' }}>
            {t.positioning.subtitle}
          </p>
        </div>
      </section>

      {/* ═══ 3. THE ASTROLIVE SHUBH COLLECTION ═══════════════════════════ */}
      <section id="collection" style={{ backgroundColor: SURFACE_CARD, borderBottom: `1px solid ${BORDER_STONE}`, padding: 'clamp(48px, 8vw, 96px) clamp(16px, 4vw, 48px)', color: TEXT_DARK }}>
        <div style={{ maxWidth: 1540, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', color: GOLD_MUTED, marginBottom: 8 }}>{t.collection.tagline}</p>
            <h2 style={{ fontFamily: titleFont, fontSize: lang === 'hi' ? 'clamp(24px, 5vw, 36px)' : 'clamp(28px, 5vw, 44px)', color: TEXT_DARK, fontWeight: lang === 'hi' ? 600 : 400, wordBreak: 'break-word' }}>
              {t.collection.title}
            </h2>
            <p style={{ color: TEXT_MUTED, fontSize: 16, marginTop: 8 }}>
              {t.collection.subtitle}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 28 }}>
            
            {/* VAHAN CARD */}
            <div className="module-card-cosmic" style={{ backgroundColor: SURFACE_CARD, border: `1px solid ${BORDER_STONE}`, display: 'flex', flexDirection: 'column' }}>
              <div className="card-image-wrapper" style={{ height: 190, position: 'relative', backgroundColor: BORDER_STONE }}>
                <Image src="/images/vahan-hero.jpg" alt="Vahan Luxury Vehicle Delivery" fill style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ padding: 28, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: GOLD_MUTED, margin: 0 }}>{t.collection.vahanCategory}</p>
                    <VahanIcon size={24} color={GOLD_MUTED} />
                  </div>
                  <h3 style={{ fontFamily: subHeadingFont, fontSize: 26, color: TEXT_DARK, fontWeight: 600, marginBottom: 4 }}>
                    {t.collection.vahanTitle}
                  </h3>
                  <p style={{ fontSize: 12, fontWeight: 500, color: GOLD_MUTED, marginBottom: 12 }}>{t.collection.vahanSubtitle}</p>
                  <p style={{ fontSize: 13, color: TEXT_MUTED, lineHeight: 1.6, marginBottom: 24 }}>
                    {t.collection.vahanDesc}
                  </p>
                </div>
                <Link href="/vahan/calculate" style={{ backgroundColor: NAVY_COSMIC, color: IVORY_WARM, textAlign: 'center', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', padding: '12px 20px', borderRadius: 4, textDecoration: 'none' }}>
                  {t.collection.vahanBtn}
                </Link>
              </div>
            </div>

            {/* GRIHA CARD */}
            <div className="module-card-cosmic" style={{ backgroundColor: SURFACE_CARD, border: `1px solid ${BORDER_STONE}`, display: 'flex', flexDirection: 'column' }}>
              <div className="card-image-wrapper" style={{ height: 190, position: 'relative', backgroundColor: BORDER_STONE }}>
                <Image src="/images/griha-hero.jpg" alt="Griha Homes & Plot Architecture" fill style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ padding: 28, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: GOLD_MUTED, margin: 0 }}>{t.collection.grihaCategory}</p>
                    <GrihaIcon size={24} color={GOLD_MUTED} />
                  </div>
                  <h3 style={{ fontFamily: subHeadingFont, fontSize: 26, color: TEXT_DARK, fontWeight: 600, marginBottom: 4 }}>
                    {t.collection.grihaTitle}
                  </h3>
                  <p style={{ fontSize: 12, fontWeight: 500, color: GOLD_MUTED, marginBottom: 12 }}>{t.collection.grihaSubtitle}</p>
                  <p style={{ fontSize: 13, color: TEXT_MUTED, lineHeight: 1.6, marginBottom: 24 }}>
                    {t.collection.grihaDesc}
                  </p>
                </div>
                <Link href="/griha" style={{ border: `1px solid ${NAVY_COSMIC}`, color: NAVY_COSMIC, textAlign: 'center', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', padding: '12px 20px', borderRadius: 4, textDecoration: 'none' }}>
                  {t.collection.grihaBtn}
                </Link>
              </div>
            </div>

            {/* VYAPAR CARD */}
            <div className="module-card-cosmic" style={{ backgroundColor: SURFACE_CARD, border: `1px solid ${BORDER_STONE}`, display: 'flex', flexDirection: 'column' }}>
              <div className="card-image-wrapper" style={{ height: 190, position: 'relative', backgroundColor: BORDER_STONE }}>
                <Image src="/images/vyapar-hero.jpg" alt="Vyapar Commercial Business Workspace" fill style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ padding: 28, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: GOLD_MUTED, margin: 0 }}>{t.collection.vyaparCategory}</p>
                    <VyaparIcon size={24} color={GOLD_MUTED} />
                  </div>
                  <h3 style={{ fontFamily: subHeadingFont, fontSize: 26, color: TEXT_DARK, fontWeight: 600, marginBottom: 4 }}>
                    {t.collection.vyaparTitle}
                  </h3>
                  <p style={{ fontSize: 12, fontWeight: 500, color: GOLD_MUTED, marginBottom: 12 }}>{t.collection.vyaparSubtitle}</p>
                  <p style={{ fontSize: 13, color: TEXT_MUTED, lineHeight: 1.6, marginBottom: 24 }}>
                    {t.collection.vyaparDesc}
                  </p>
                </div>
                <Link href="/vyapar" style={{ border: `1px solid ${NAVY_COSMIC}`, color: NAVY_COSMIC, textAlign: 'center', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', padding: '12px 20px', borderRadius: 4, textDecoration: 'none' }}>
                  {t.collection.vyaparBtn}
                </Link>
              </div>
            </div>

            {/* SWARNA & RATNA CARD */}
            <div className="module-card-cosmic" style={{ backgroundColor: SURFACE_CARD, border: `1px solid ${BORDER_STONE}`, display: 'flex', flexDirection: 'column' }}>
              <div className="card-image-wrapper" style={{ height: 190, position: 'relative', backgroundColor: BORDER_STONE }}>
                <Image src="/images/swarna-ratna-hero.jpg" alt="Swarna Gold & Gemstones Macro" fill style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ padding: 28, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: GOLD_MUTED, margin: 0 }}>{t.collection.swarnaCategory}</p>
                    <SwarnaIcon size={24} color={GOLD_MUTED} />
                  </div>
                  <h3 style={{ fontFamily: subHeadingFont, fontSize: 26, color: TEXT_DARK, fontWeight: 600, marginBottom: 4 }}>
                    {t.collection.swarnaTitle}
                  </h3>
                  <p style={{ fontSize: 12, fontWeight: 500, color: GOLD_MUTED, marginBottom: 12 }}>{t.collection.swarnaSubtitle}</p>
                  <p style={{ fontSize: 13, color: TEXT_MUTED, lineHeight: 1.6, marginBottom: 24 }}>
                    {t.collection.swarnaDesc}
                  </p>
                </div>
                <Link href="/swarna" style={{ border: `1px solid ${NAVY_COSMIC}`, color: NAVY_COSMIC, textAlign: 'center', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', padding: '12px 20px', borderRadius: 4, textDecoration: 'none' }}>
                  {t.collection.swarnaBtn}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MOON PHASE DIVIDER ═════════════════════════════════════════ */}
      <MoonPhaseDivider width={260} color={GOLD_ANTIQUE} />

      {/* ═══ 4. THE ASTROLIVE METHOD ════════════════════════════════════ */}
      <section style={{ backgroundColor: IVORY_WARM, padding: '96px 48px', borderTop: `1px solid ${BORDER_STONE}`, borderBottom: `1px solid ${BORDER_STONE}`, color: TEXT_DARK }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', color: GOLD_MUTED, marginBottom: 12 }}>{t.method.tagline}</p>
          <h2 style={{ fontFamily: titleFont, fontSize: lang === 'hi' ? 36 : 44, color: TEXT_DARK, fontWeight: lang === 'hi' ? 600 : 400, lineHeight: 1.25, marginBottom: 16 }}>
            {t.method.title}
          </h2>
          <p style={{ color: TEXT_MUTED, fontSize: 16, lineHeight: 1.7, maxWidth: 760, margin: '0 auto 48px' }}>
            {t.method.subtitle}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            <div style={{ backgroundColor: SURFACE_CARD, border: `1px solid ${BORDER_STONE}`, borderRadius: 8, padding: 24, textAlign: 'left' }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: GOLD_MUTED, marginBottom: 6 }}>SYSTEM 01</p>
              <h4 style={{ fontSize: 16, fontWeight: 600, color: TEXT_DARK, marginBottom: 4 }}>{t.method.sys1Title}</h4>
              <p style={{ fontSize: 12, color: TEXT_MUTED, margin: 0 }}>{t.method.sys1Desc}</p>
            </div>

            <div style={{ backgroundColor: SURFACE_CARD, border: `1px solid ${BORDER_STONE}`, borderRadius: 8, padding: 24, textAlign: 'left' }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: GOLD_MUTED, marginBottom: 6 }}>SYSTEM 02</p>
              <h4 style={{ fontSize: 16, fontWeight: 600, color: TEXT_DARK, marginBottom: 4 }}>{t.method.sys2Title}</h4>
              <p style={{ fontSize: 12, color: TEXT_MUTED, margin: 0 }}>{t.method.sys2Desc}</p>
            </div>

            <div style={{ backgroundColor: SURFACE_CARD, border: `1px solid ${BORDER_STONE}`, borderRadius: 8, padding: 24, textAlign: 'left' }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: GOLD_MUTED, marginBottom: 6 }}>SYSTEM 03</p>
              <h4 style={{ fontSize: 16, fontWeight: 600, color: TEXT_DARK, marginBottom: 4 }}>{t.method.sys3Title}</h4>
              <p style={{ fontSize: 12, color: TEXT_MUTED, margin: 0 }}>{t.method.sys3Desc}</p>
            </div>

            <div style={{ backgroundColor: SURFACE_CARD, border: `1px solid ${BORDER_STONE}`, borderRadius: 8, padding: 24, textAlign: 'left' }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: GOLD_MUTED, marginBottom: 6 }}>SYSTEM 04</p>
              <h4 style={{ fontSize: 16, fontWeight: 600, color: TEXT_DARK, marginBottom: 4 }}>{t.method.sys4Title}</h4>
              <p style={{ fontSize: 12, color: TEXT_MUTED, margin: 0 }}>{t.method.sys4Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 5. PRINCIPLES SECTION ══════════════════════════════════════ */}
      <section style={{ backgroundColor: NAVY_COSMIC, color: IVORY_WARM, padding: '96px 48px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: GOLD_ANTIQUE, marginBottom: 16, textAlign: 'center' }}>{t.principles.tagline}</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, marginTop: 40 }}>
            <div>
              <h3 style={{ fontFamily: subHeadingFont, fontSize: lang === 'hi' ? 28 : 32, fontWeight: lang === 'hi' ? 600 : 400, color: IVORY_WARM, marginBottom: 12 }}>
                {t.principles.p1Title}
              </h3>
              <p style={{ color: '#B8B2A5', fontSize: 14, lineHeight: 1.75, margin: 0 }}>
                {t.principles.p1Desc}
              </p>
            </div>

            <div>
              <h3 style={{ fontFamily: subHeadingFont, fontSize: lang === 'hi' ? 28 : 32, fontWeight: lang === 'hi' ? 600 : 400, color: IVORY_WARM, marginBottom: 12 }}>
                {t.principles.p2Title}
              </h3>
              <p style={{ color: '#B8B2A5', fontSize: 14, lineHeight: 1.75, margin: 0 }}>
                {t.principles.p2Desc}
              </p>
            </div>
          </div>

          <div style={{ width: 60, height: 1, backgroundColor: GOLD_ANTIQUE, margin: '56px auto 0' }} />
        </div>
      </section>

      {/* ═══ 6. OUR PROMISE SECTION ═══════════════════════════════════ */}
      <section style={{ backgroundColor: IVORY_WARM, padding: 'clamp(48px, 8vw, 96px) clamp(16px, 4vw, 48px)', textAlign: 'center', borderTop: `1px solid ${BORDER_STONE}`, color: TEXT_DARK }}>
        <div style={{ maxWidth: 900, margin: '0 auto', backgroundColor: SURFACE_CARD, border: `1px solid ${BORDER_STONE}`, borderRadius: 12, padding: 'clamp(32px, 5vw, 56px) clamp(20px, 4vw, 48px)' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', color: GOLD_MUTED, marginBottom: 8 }}>
            {lang === 'hi' ? 'हमारा संकल्प' : 'OUR PROMISE'}
          </p>
          <h2 style={{ fontFamily: titleFont, fontSize: lang === 'hi' ? 'clamp(24px, 5vw, 36px)' : 'clamp(28px, 5vw, 44px)', color: TEXT_DARK, fontWeight: lang === 'hi' ? 600 : 400, marginBottom: 16, wordBreak: 'break-word' }}>
            {lang === 'hi' ? 'विज्ञान और परंपरा का सुंदर संगम' : 'Where Ancient Wisdom Meets Precision'}
          </h2>
          <p style={{ color: TEXT_MUTED, fontSize: 16, lineHeight: 1.75, maxWidth: 680, margin: '0 auto 36px' }}>
            {lang === 'hi'
              ? 'AstroLive Shubh हर गणना के पीछे वास्तविक खगोलीय डेटा और चालदेयन अंकशास्त्र का उपयोग करता है। हम आपके जीवन के महत्वपूर्ण क्षणों के लिए सबसे शुभ समय की पहचान करते हैं।'
              : 'Every recommendation on AstroLive Shubh is backed by real Swiss Ephemeris planetary data and Chaldean numerology, not guesswork. We identify the most auspicious windows for the moments that matter most in your life.'}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(24px, 4vw, 48px)', flexWrap: 'wrap' }}>
            {[
              { icon: '✦', label: lang === 'hi' ? 'स्विस एफेमेरिस' : 'Swiss Ephemeris', sub: lang === 'hi' ? 'वास्तविक ग्रह स्थिति' : 'Real planetary positions' },
              { icon: '◈', label: lang === 'hi' ? 'चालदेयन अंकशास्त्र' : 'Chaldean Numerology', sub: lang === 'hi' ? 'नाम-आधारित अंक गणना' : 'Name-based number science' },
              { icon: '❋', label: lang === 'hi' ? '4 जीवन मॉड्यूल' : '4 Life Modules', sub: lang === 'hi' ? 'वाहन, गृह, व्यापार, स्वर्ण' : 'Vahan, Griha, Vyapar, Swarna' },
            ].map(({ icon, label, sub }) => (
              <div key={label} style={{ textAlign: 'center', minWidth: 140 }}>
                <div style={{ fontSize: 22, color: GOLD_MUTED, marginBottom: 8 }}>{icon}</div>
                <p style={{ fontSize: 13, fontWeight: 700, color: TEXT_DARK, marginBottom: 4 }}>{label}</p>
                <p style={{ fontSize: 12, color: TEXT_MUTED }}>{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══ 7. FINAL CTA ═════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: NAVY_COSMIC, color: IVORY_WARM, borderTop: `1px solid ${BORDER_GOLD}`, padding: '96px 48px', textAlign: 'center' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <h2 style={{ fontFamily: titleFont, fontSize: lang === 'hi' ? 36 : 44, color: IVORY_WARM, fontWeight: lang === 'hi' ? 600 : 400, marginBottom: 16 }}>
            {t.finalCta.title}
          </h2>
          <p style={{ color: '#B8B2A5', fontSize: 16, lineHeight: 1.75, marginBottom: 40 }}>
            {t.finalCta.subtitle}
          </p>

          <Link href="/vahan/calculate" style={{ backgroundColor: GOLD_ANTIQUE, color: NAVY_COSMIC, fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', padding: '18px 40px', borderRadius: 4, textDecoration: 'none', display: 'inline-block' }}>
            {t.finalCta.btn}
          </Link>
        </div>
      </section>

      {/* ═══ 8. FOOTER ═══════════════════════════════════════════════════ */}
      <SiteFooter />
    </div>
  );
}
