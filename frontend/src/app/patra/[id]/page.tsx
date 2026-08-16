'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import SiteNav from '../../../components/SiteNav';
import SiteFooter from '../../../components/SiteFooter';
import { MOCK_VAHAN_REPORT } from '../../../lib/mockData';
import { loadReport } from '../../../lib/reportStore';
import { VahanReport } from '../../../lib/types';

const NAVY = '#07152F';
const IVORY = '#F7F4ED';
const GOLD = '#C69A3A';
const BORDER = '#E4E0D6';
const MUTED = '#6B7280';
const WHITE = '#FFFFFF';

export default function PatraPage() {
  const params = useParams();
  const id = typeof params?.id === 'string' ? params.id : 'mock-id';

  /* Load user's actual report from localStorage, fall back to mock */
  const [R, setR] = useState<VahanReport>(MOCK_VAHAN_REPORT);

  useEffect(() => {
    const stored = loadReport(id);
    if (stored) setR(stored);
  }, [id]);

  const p = R.vahanPatra;
  const w = R.shubhWindows[0];
  const n = R.luckyNumbers;
  const cols = R.auspiciousColours;
  const dir = R.firstDriveDirection;

  /* Use user's actual input data for birth details */
  const birthDate = R.input?.dateOfBirth || p.issueDate;
  const birthTime = R.input?.birthTime || '—';
  const birthCity = R.input?.birthCity || p.deliveryCity;
  const ownerName = R.vahanPatra.ownerName || R.input?.fullName || 'Guest';
  const vehicleModel = R.vahanPatra.vehicleModel || R.input?.vehicleModel || '—';
  const vehicleType = R.vahanPatra.vehicleType || R.input?.vehicleType || '—';

  return (
    <div style={{ backgroundColor: IVORY, minHeight: '100vh' }}>
      <SiteNav/>

      {/* toolbar */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 40px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: NAVY, fontSize: 15, fontWeight: 600, letterSpacing: '0.06em', lineHeight: 1.3, marginBottom: 8 }}>
            ASTROLIVE<br/>VAHAN
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: NAVY, fontSize: 28, fontWeight: 400 }}>Your Vahan Patra</h1>
          <p style={{ color: MUTED, fontSize: 13, marginTop: 3 }}>A personalised guide for your new journey.</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => window.print()}
            style={{ display: 'flex', alignItems: 'center', gap: 6, border: `1px solid ${BORDER}`, color: NAVY, backgroundColor: WHITE, fontSize: 12, fontWeight: 600, padding: '9px 16px', borderRadius: 4, cursor: 'pointer' }}>
            ↓ &nbsp;Download
          </button>
          <button onClick={() => window.print()}
            style={{ display: 'flex', alignItems: 'center', gap: 6, border: `1px solid ${BORDER}`, color: NAVY, backgroundColor: WHITE, fontSize: 12, fontWeight: 600, padding: '9px 16px', borderRadius: 4, cursor: 'pointer' }}>
            ⊟ &nbsp;Print
          </button>
        </div>
      </div>

      {/* ═══ CERTIFICATE ════════════════════════════════════════════ */}
      <div style={{ maxWidth: 1100, margin: '0 auto 64px', padding: '0 40px' }}>
        <div style={{ backgroundColor: WHITE, border: `2px solid ${BORDER}`, borderRadius: 10, overflow: 'hidden', boxShadow: '0 8px 40px -8px rgba(7,21,47,0.08)' }}>

          <div style={{ display: 'flex' }}>

            {/* ── LEFT: Personal details ── */}
            <div style={{ flex: '0 0 300px', padding: '44px 36px', borderRight: `1px solid ${BORDER}` }}>
              <p style={{ color: GOLD, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', marginBottom: 24 }}>DETAILS</p>

              <Detail label="Name"       value={ownerName}/>
              <Detail label="Birth Date" value={birthDate}/>
              <Detail label="Birth Time" value={birthTime}/>
              <Detail label="Birth City" value={birthCity}/>

              <div style={{ borderTop: `1px solid ${BORDER}`, marginTop: 24, paddingTop: 24 }}>
                <p style={{ color: GOLD, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', marginBottom: 16 }}>VEHICLE DETAILS</p>
                <Detail label="Vehicle" value={`${vehicleType} · ${vehicleModel}`}/>
                <Detail label="Delivery Window" value={
                  R.input?.deliveryStartDate && R.input?.deliveryEndDate
                    ? `${R.input.deliveryStartDate} – ${R.input.deliveryEndDate}`
                    : p.shubhWindowSummary
                }/>
              </div>

              <div style={{ borderTop: `1px solid ${BORDER}`, marginTop: 24, paddingTop: 24 }}>
                <p style={{ color: GOLD, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', marginBottom: 16 }}>RECOMMENDATIONS</p>
                <Detail label="Lucky Number"          value={String(n.chaldeanDriverNumber)}/>
                <Detail label="Auspicious Colour"     value={cols.recommendedColours[0].name.split('/')[0].trim()}/>
                <Detail label="First Drive Direction" value={dir.primaryDirection}/>
                <Detail label="Shubh Window"          value={`${w.startDate}, ${w.startTime}`}/>
              </div>
            </div>

            {/* ── RIGHT: Certificate ── */}
            <div style={{ flex: '1 1 auto', padding: '44px 40px' }}>
              <div style={{ border: `1px solid ${GOLD}`, borderRadius: 8, padding: 36, position: 'relative' }}>
                {/* Corner dots */}
                {(['topLeft','topRight','bottomLeft','bottomRight'] as const).map(pos => (
                  <div key={pos} style={{
                    position: 'absolute',
                    top: pos.startsWith('top') ? 6 : undefined,
                    bottom: pos.startsWith('bottom') ? 6 : undefined,
                    left: pos.endsWith('Left') ? 6 : undefined,
                    right: pos.endsWith('Right') ? 6 : undefined,
                    width: 6, height: 6, borderRadius: '50%', backgroundColor: GOLD,
                  }}/>
                ))}

                <p style={{ textAlign: 'center', color: MUTED, fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', marginBottom: 4 }}>VAHAN PATRA</p>
                <p style={{ textAlign: 'center', fontFamily: "'Cormorant Garamond', Georgia, serif", color: NAVY, fontSize: 17, fontStyle: 'italic', marginBottom: 2 }}>
                  YOUR VEHICLE&apos;S AUSPICIOUS GUIDE
                </p>
                <p style={{ textAlign: 'center', color: MUTED, fontSize: 11, marginBottom: 28 }}>CERTIFICATE ID: {p.certificateId}</p>

                {/* Mandala */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
                  <svg width={100} height={100} viewBox="0 0 100 100" fill="none" opacity={0.65}>
                    <circle cx={50} cy={50} r={46} stroke={GOLD} strokeWidth={1}/>
                    <circle cx={50} cy={50} r={33} stroke={GOLD} strokeWidth={0.8}/>
                    <circle cx={50} cy={50} r={19} stroke={GOLD} strokeWidth={0.8}/>
                    <line x1={50} y1={4} x2={50} y2={96} stroke={GOLD} strokeWidth={0.8}/>
                    <line x1={4} y1={50} x2={96} y2={50} stroke={GOLD} strokeWidth={0.8}/>
                    <line x1={17} y1={17} x2={83} y2={83} stroke={GOLD} strokeWidth={0.6}/>
                    <line x1={83} y1={17} x2={17} y2={83} stroke={GOLD} strokeWidth={0.6}/>
                    <circle cx={50} cy={50} r={4} fill={GOLD}/>
                    {[0,45,90,135,180,225,270,315].map(a => {
                      const rad = (a * Math.PI) / 180;
                      return <circle key={a} cx={50 + 33 * Math.cos(rad)} cy={50 + 33 * Math.sin(rad)} r={3} fill={GOLD} opacity={0.5}/>;
                    })}
                  </svg>
                </div>

                {/* 5 recommendation rows */}
                <div>
                  {[
                    { l: '01  Shubh Delivery Window',      v: `${w.startDate} · ${w.startTime} – ${w.endTime}` },
                    { l: '02  Lucky Registration Number',  v: `${n.chaldeanDriverNumber} (${n.recommendedCombinations.slice(0,3).join(', ')})` },
                    { l: '03  Auspicious Vehicle Colour',  v: cols.recommendedColours[0].name.split('/')[0].trim() },
                    { l: '04  First Drive Direction',      v: `${dir.primaryDirection} · ${dir.vastuSymbol.split('(')[0].trim()}` },
                    { l: '05  Vehicle Mantra',             v: p.vahanMantra.split('॥')[0].trim() },
                  ].map(({ l, v }) => (
                    <div key={l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '10px 0', borderBottom: `1px solid ${BORDER}` }}>
                      <span style={{ fontSize: 12, color: MUTED, fontWeight: 500, flexShrink: 0 }}>{l}</span>
                      <span style={{ fontSize: 12, color: NAVY, fontWeight: 600, textAlign: 'right', maxWidth: '55%', lineHeight: 1.4 }}>{v}</span>
                    </div>
                  ))}
                </div>

                {/* Signature row */}
                <div style={{ marginTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div>
                    <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: NAVY, fontSize: 18, fontStyle: 'italic' }}>AstroLive Vahan</p>
                    <p style={{ color: MUTED, fontSize: 11, marginTop: 2 }}>Guiding Auspicious Journeys</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ color: MUTED, fontSize: 10, marginBottom: 2 }}>ISSUED</p>
                    <p style={{ color: NAVY, fontSize: 12, fontWeight: 600 }}>{p.issueDate}</p>
                  </div>
                </div>
              </div>

              <p style={{ fontSize: 11, color: '#9CA3AF', textAlign: 'center', marginTop: 14, lineHeight: 1.65 }}>
                This Vahan Patra is generated through deterministic astrological calculations<br/>
                based on your birth details and vehicle preferences.
              </p>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          <a href="/calculate" style={{ color: MUTED, fontSize: 13, textDecoration: 'none', fontWeight: 500 }}>← Back to Results</a>
        </div>
      </div>

      <SiteFooter/>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: MUTED, marginBottom: 3 }}>{label.toUpperCase()}</p>
      <p style={{ fontSize: 14, color: NAVY, fontWeight: 500, lineHeight: 1.4 }}>{value}</p>
    </div>
  );
}
