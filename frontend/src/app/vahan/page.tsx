/* src/app/vahan/page.tsx - Vahan Module Introduction Page with Bilingual Support */
'use client';
import React from 'react';
import Link from 'next/link';
import SiteNav from '../../components/SiteNav';
import SiteFooter from '../../components/SiteFooter';
import { useLanguage } from '../../context/LanguageContext';

const NAVY = '#07152F';
const IVORY = '#F5F1E8';
const GOLD = '#C8A85B';
const BORDER = '#D8D0C4';
const MUTED = '#6B7280';
const WHITE = '#FAF8F3';

export default function VahanIntroPage() {
  const { lang } = useLanguage();

  return (
    <div style={{ backgroundColor: IVORY, minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <SiteNav />

      {/* Hero Section */}
      <section style={{ padding: '80px 40px 60px', textAlign: 'center', maxWidth: 900, margin: '0 auto' }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', 'Noto Serif Devanagari', Georgia, serif", fontSize: 48, color: NAVY, fontWeight: 400, lineHeight: 1.15, marginBottom: 16 }}>
          {lang === 'hi' ? 'वाहन मॉड्यूल' : 'Vahan Module'}
        </h1>
        <p style={{ fontFamily: "'Cormorant Garamond', 'Noto Serif Devanagari', Georgia, serif", fontSize: 22, fontStyle: 'italic', color: GOLD, marginBottom: 24 }}>
          {lang === 'hi' ? '"आपके वाहन के शुभ अवसर के लिए उत्तम मुहूर्त।"' : '"Auspicious timing for your vehicle milestone."' }
        </p>

        <p style={{ color: MUTED, fontSize: 15, lineHeight: 1.7, maxWidth: 680, margin: '0 auto 32px' }}>
          {lang === 'hi'
            ? 'वाहन क्रय एक महत्वपूर्ण अवसर है। एस्ट्रोलाइव वाहन आपके जन्म विवरण का विश्लेषण करके डिलीवरी समय सीमा, काल्डियन लकी अंक, शुभ वाहन रंग और प्रथम ड्राइव वास्तु दिशा निर्धारित करता है।'
            : 'Acquiring a vehicle is a major milestone. AstroLive Vahan evaluates your birth details to generate exact delivery windows, Chaldean registration numbers, vehicle colour recommendations, and Vastu first-drive guidance.'}
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
          <Link href="/vahan/calculate" style={{ backgroundColor: NAVY, color: IVORY, fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', padding: '16px 36px', borderRadius: 4, textDecoration: 'none' }}>
            {lang === 'hi' ? 'वाहन गणना शुरू करें →' : 'CALCULATE YOUR VAHAN →'}
          </Link>
        </div>
      </section>

      {/* Feature Grid */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 40px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: GOLD, marginBottom: 8 }}>{lang === 'hi' ? 'आपको क्या प्राप्त होता है' : 'WHAT YOU RECEIVE'}</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', 'Noto Serif Devanagari', Georgia, serif", fontSize: 32, color: NAVY, fontWeight: 400 }}>
            {lang === 'hi' ? 'वाहन मार्गदर्शन के 5 स्तंभ' : '5 Pillars of Vahan Guidance'}
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          <div style={{ backgroundColor: WHITE, border: `1px solid ${BORDER}`, borderRadius: 8, padding: 28 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: '0.1em', display: 'block', marginBottom: 8 }}>01. MUHURAT</span>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: NAVY, marginBottom: 8 }}>{lang === 'hi' ? 'शुभ डिलीवरी मुहूर्त' : 'Shubh Delivery Windows'}</h3>
            <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.6 }}>
              {lang === 'hi' ? 'आपकी निर्धारित तिथि सीमा के भीतर विश्लेषित शुभ डिलीवरी तिथियां एवं समय।' : 'Auspicious delivery date and time windows evaluated strictly within your requested delivery date range.'}
            </p>
          </div>

          <div style={{ backgroundColor: WHITE, border: `1px solid ${BORDER}`, borderRadius: 8, padding: 28 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: '0.1em', display: 'block', marginBottom: 8 }}>02. NUMEROLOGY</span>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: NAVY, marginBottom: 8 }}>{lang === 'hi' ? 'काल्डियन लकी अंक' : 'Chaldean Lucky Numbers'}</h3>
            <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.6 }}>
              {lang === 'hi' ? 'ड्राइवर और कंडक्टर अंकों का विश्लेषण तथा शुभ पंजीकरण संख्याओं के संयोजन।' : 'Chaldean driver and conductor number analysis with recommended registration digits and combinations.'}
            </p>
          </div>

          <div style={{ backgroundColor: WHITE, border: `1px solid ${BORDER}`, borderRadius: 8, padding: 28 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: '0.1em', display: 'block', marginBottom: 8 }}>03. COLOUR AFFINITY</span>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: NAVY, marginBottom: 8 }}>{lang === 'hi' ? 'शुभ वाहन रंग' : 'Recommended Vehicle Colours'}</h3>
            <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.6 }}>
              {lang === 'hi' ? 'आपकी चंद्र राशि और स्वामी ग्रह के अनुसार अनुकूलतम वाहन रंगों का चुनाव।' : 'Primary and alternative vehicle paint choices harmonized with your birth Moon sign and ruling planet.'}
            </p>
          </div>

          <div style={{ backgroundColor: WHITE, border: `1px solid ${BORDER}`, borderRadius: 8, padding: 28 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: '0.1em', display: 'block', marginBottom: 8 }}>04. VASTU &amp; HORA</span>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: NAVY, marginBottom: 8 }}>{lang === 'hi' ? 'प्रथम ड्राइव वास्तु दिशा' : 'First Drive Direction'}</h3>
            <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.6 }}>
              {lang === 'hi' ? 'प्रथम यात्रा हेतु उत्तम दिशा, शुभ होरा समय और प्रारंभिक गंतव्य का वास्तु मार्गदर्शन।' : 'Primary direction, auspicious Hora time, initial destination, and Vastu drive guidance for smooth mobility.'}
            </p>
          </div>

          <div style={{ backgroundColor: WHITE, border: `1px solid ${BORDER}`, borderRadius: 8, padding: 28 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: '0.1em', display: 'block', marginBottom: 8 }}>05. CERTIFICATION</span>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: NAVY, marginBottom: 8 }}>{lang === 'hi' ? 'डिजिटल वाहन पात्रा' : 'Digital Vahan Patra'}</h3>
            <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.6 }}>
              {lang === 'hi' ? 'आपके संपूर्ण वाहन मार्गदर्शन का साझा करने योग्य डिजिटल पात्रा प्रमाण-पत्र।' : 'A shareable digital Vahan Patra certificate summarizing your complete astrological vehicle profile.'}
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <Link href="/vahan/calculate" style={{ backgroundColor: NAVY, color: IVORY, fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', padding: '16px 36px', borderRadius: 4, textDecoration: 'none', display: 'inline-block' }}>
            {lang === 'hi' ? 'वाहन गणना शुरू करें →' : 'START VAHAN CALCULATION →'}
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
