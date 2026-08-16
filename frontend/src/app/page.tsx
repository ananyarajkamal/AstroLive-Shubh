import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';

/* ─── inline SVG icons ─────────────────────────────────────────── */
const CalSVG = () => (
  <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="#C69A3A" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <rect x={3} y={4} width={18} height={18} rx={2}/><line x1={3} y1={9} x2={21} y2={9}/><line x1={8} y1={2} x2={8} y2={6}/><line x1={16} y1={2} x2={16} y2={6}/>
  </svg>
);
const HashSVG = () => (
  <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="#C69A3A" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <line x1={4} y1={9} x2={20} y2={9}/><line x1={4} y1={15} x2={20} y2={15}/><line x1={10} y1={3} x2={8} y2={21}/><line x1={16} y1={3} x2={14} y2={21}/>
  </svg>
);
const PalSVG = () => (
  <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="#C69A3A" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <circle cx={12} cy={12} r={10}/><circle cx={8} cy={10} r={1.5} fill="#C69A3A"/><circle cx={14} cy={8} r={1.5} fill="#C69A3A"/><circle cx={16} cy={14} r={1.5} fill="#C69A3A"/>
  </svg>
);
const ComSVG = () => (
  <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="#C69A3A" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <circle cx={12} cy={12} r={10}/><polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88" fill="#C69A3A" opacity={0.8}/>
  </svg>
);
const CertSVG = () => (
  <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="#C69A3A" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1={16} y1={13} x2={8} y2={13}/><line x1={16} y1={17} x2={8} y2={17}/>
  </svg>
);

const INSIGHTS = [
  { num:'01', icon:<CalSVG/>,  title:'SHUBH\nDELIVERY\nWINDOW',     desc:'Find the most auspicious window within your delivery period.' },
  { num:'02', icon:<HashSVG/>, title:'LUCKY\nREGISTRATION\nNUMBER', desc:'Discover numbers that align with your birth energies.' },
  { num:'03', icon:<PalSVG/>,  title:'AUSPICIOUS\nVEHICLE\nCOLOUR', desc:'Choose colours that attract positivity and harmony.' },
  { num:'04', icon:<ComSVG/>,  title:'FIRST DRIVE\nDIRECTION',       desc:'Know the ideal direction to drive your vehicle for the first time.' },
  { num:'05', icon:<CertSVG/>, title:'VAHAN PATRA\nCERTIFICATE',     desc:'Get your personalised certificate with all recommendations.' },
];

const TRUST = [
  { val:'100%',          lbl:'Deterministic Engine',   sub:'No AI. No Guesswork.' },
  { val:'Swiss Ephemeris', lbl:'Precision Astronomy', sub:'Calculations' },
  { val:'Privacy First', lbl:'Your Data is Safe',      sub:'and Secure' },
  { val:'Ancient Wisdom', lbl:'Backed by Vedic',       sub:'Principles' },
];

export default function HomePage() {
  return (
    <div style={{ backgroundColor:'#F7F4ED', minHeight:'100vh' }}>
      <SiteNav />

      {/* ═══ HERO ═══════════════════════════════════════════════ */}
      <section style={{ backgroundColor:'#F7F4ED', maxWidth:1200, margin:'0 auto', padding:'60px 40px 0' }}>
        <div style={{ display:'flex', alignItems:'center', gap:48, minHeight:320 }}>
          {/* Left text */}
          <div style={{ flex:'0 0 420px', maxWidth:420 }}>
            <p style={{ color:'#C69A3A', fontSize:11, fontWeight:700, letterSpacing:'0.14em', marginBottom:14 }}>
              PERSONALISED VEHICLE ASTROLOGY
            </p>
            <h1 style={{
              fontFamily:"'Cormorant Garamond', Georgia, serif",
              color:'#07152F', fontSize:56, fontWeight:400,
              lineHeight:1.1, marginBottom:20,
            }}>
              Your vehicle&apos;s<br/>
              <em style={{ color:'#C69A3A', fontStyle:'italic' }}>auspicious</em><br/>
              moment,<br/>personalised.
            </h1>
            <p style={{ fontSize:14, color:'#374151', lineHeight:1.75, marginBottom:28, maxWidth:340 }}>
              AstroLive Vahan analyses your birth details and vehicle preferences to reveal the most auspicious delivery time, lucky registration numbers, ideal colour and more.
            </p>
            <Link href="/calculate" style={{
              display:'inline-flex', alignItems:'center', gap:8,
              backgroundColor:'#07152F', color:'#F7F4ED',
              fontSize:12, fontWeight:700, letterSpacing:'0.09em',
              padding:'13px 24px', borderRadius:4, textDecoration:'none',
            }}>
              DISCOVER MY VAHAN &nbsp;→
            </Link>
          </div>

          {/* Right image */}
          <div style={{ flex:'1 1 auto', position:'relative', height:400, borderRadius:12, overflow:'hidden', minWidth:0 }}>
            <Image
              src="/images/hero.jpg"
              alt="Luxury SUV at Indian temple"
              fill
              style={{ objectFit:'cover', objectPosition:'center' }}
              priority
            />
          </div>
        </div>
      </section>

      {/* ═══ FIVE INSIGHTS ══════════════════════════════════════ */}
      <section id="the-five-insights" style={{ borderTop:'1px solid #E4E0D6', marginTop:60, backgroundColor:'#F7F4ED', padding:'64px 0' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 40px' }}>
          <div style={{ textAlign:'center', marginBottom:48 }}>
            <h2 style={{ fontFamily:"'Cormorant Garamond', Georgia, serif", color:'#07152F', fontSize:36, fontWeight:400, marginBottom:10 }}>
              Five personalised insights
            </h2>
            <p style={{ color:'#6B7280', fontSize:14 }}>Five clear recommendations for the moment your new journey begins.</p>
          </div>

          {/* 5-column card row */}
          <div style={{ display:'flex', gap:16 }}>
            {INSIGHTS.map(ins => (
              <div key={ins.num} style={{
                flex:'1 1 0', minWidth:0,
                backgroundColor:'#FFFFFF',
                border:'1px solid #E4E0D6',
                borderRadius:8,
                padding:'28px 20px',
                cursor:'default',
              }}>
                <div style={{ marginBottom:16 }}>{ins.icon}</div>
                <p style={{ color:'#C69A3A', fontSize:11, fontWeight:700, letterSpacing:'0.1em', marginBottom:10 }}>{ins.num}</p>
                <p style={{
                  fontFamily:"'Cormorant Garamond', Georgia, serif",
                  color:'#07152F', fontSize:14, fontWeight:600,
                  lineHeight:1.35, marginBottom:12,
                  whiteSpace:'pre-line',
                }}>{ins.title}</p>
                <p style={{ color:'#6B7280', fontSize:12, lineHeight:1.65 }}>{ins.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DARK TRUST STRIP ═══════════════════════════════════ */}
      <section id="how-it-works" style={{ backgroundColor:'#07152F', padding:'48px 0' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 40px', display:'flex', gap:48, flexWrap:'wrap' }}>
          {TRUST.map(t => (
            <div key={t.val} style={{ flex:'1 1 180px', minWidth:150 }}>
              <p style={{ fontFamily:"'Cormorant Garamond', Georgia, serif", color:'#F7F4ED', fontSize:18, fontWeight:500, marginBottom:4 }}>{t.val}</p>
              <p style={{ color:'#C69A3A', fontSize:12, fontWeight:600, marginBottom:2 }}>{t.lbl}</p>
              <p style={{ color:'#9CA3AF', fontSize:12 }}>{t.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ BOTTOM CTA (dark with split image) ════════════════ */}
      <section style={{ backgroundColor:'#07152F', overflow:'hidden' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 40px', display:'flex', alignItems:'center', gap:0 }}>
          {/* Image half */}
          <div style={{ flex:'0 0 48%', position:'relative', height:340 }}>
            <Image src="/images/hero.jpg" alt="Luxury vehicle" fill style={{ objectFit:'cover', objectPosition:'center', opacity:0.7 }} />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, transparent 40%, #07152F 100%)' }}/>
          </div>
          {/* Text half */}
          <div style={{ flex:'1 1 auto', padding:'56px 0 56px 64px' }}>
            <h2 style={{ fontFamily:"'Cormorant Garamond', Georgia, serif", color:'#F7F4ED', fontSize:36, fontWeight:400, lineHeight:1.2, marginBottom:16 }}>
              Your new journey deserves<br/>the right beginning.
            </h2>
            <p style={{ color:'#9CA3AF', fontSize:14, lineHeight:1.7, marginBottom:28 }}>
              Discover your personalised Vahan Insights now.
            </p>
            <Link href="/calculate" style={{
              display:'inline-flex', alignItems:'center', gap:8,
              backgroundColor:'#C69A3A', color:'#07152F',
              fontSize:12, fontWeight:700, letterSpacing:'0.09em',
              padding:'13px 26px', borderRadius:4, textDecoration:'none',
            }}>
              DISCOVER MY VAHAN &nbsp;→
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
