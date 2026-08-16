'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import SiteNav from '../../components/SiteNav';
import CitySearch, { CityResult } from '../../components/CitySearch';
import { VahanInputData, Phase3ComputeResponse } from '../../lib/types';
import { computeVahanRequest, ApiError } from '../../lib/api';

/* ─── constants ──────────────────────────────────────────────── */
const STEPS = ['Birth Details', 'Vehicle Details', 'Delivery Window', 'Review'];
const V_TYPES: Array<'SUV' | 'Sedan' | 'Hatchback' | 'EV' | 'Luxury' | 'Two-Wheeler' | 'Commercial'> = [
  'SUV', 'Sedan', 'EV', 'Luxury', 'Two-Wheeler', 'Hatchback', 'Commercial'
];
const LOADING_STAGES = [
  'Locating your birth place...',
  'Resolving location timezone...',
  'Calculating Lagna & Planetary longitudes...',
  'Generating deterministic Vahan recommendations...',
];

/* ─── tokens ─────────────────────────────────────────────────── */
const NAVY = '#07152F';
const IVORY = '#F7F4ED';
const GOLD = '#C69A3A';
const BORDER = '#E4E0D6';
const MUTED = '#6B7280';
const BODY = '#374151';
const WHITE = '#FFFFFF';

const inp: React.CSSProperties = {
  width: '100%', border: `1px solid ${BORDER}`,
  backgroundColor: IVORY, color: NAVY,
  fontSize: 14, padding: '11px 14px', borderRadius: 6,
  outline: 'none', fontFamily: 'Inter, sans-serif',
};

function F({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.09em', color: NAVY, marginBottom: 6 }}>{label}</label>
      {children}
      {error && <p style={{ fontSize: 11, color: '#DC2626', marginTop: 4 }}>{error}</p>}
    </div>
  );
}

/* ─── LEFT PANEL ─────────────────────────────────────────────── */
function LeftPanel({ step }: { step: number }) {
  return (
    <div style={{ backgroundColor: NAVY, borderRadius: 10, padding: '36px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 520 }}>
      <div>
        <p style={{ color: GOLD, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', marginBottom: 12 }}>STEP {step} OF 4</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: IVORY, fontSize: 28, fontWeight: 400, lineHeight: 1.2, marginBottom: 14 }}>
          Your Vahan<br/>Journey
        </h2>
        <p style={{ color: '#9CA3AF', fontSize: 13, lineHeight: 1.7 }}>
          Answer a few questions to receive your complete personalized vehicle recommendations.
        </p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '28px 0' }}>
        <svg width={160} height={160} viewBox="0 0 160 160" fill="none" opacity={0.4}>
          <circle cx={80} cy={80} r={72} stroke={GOLD} strokeWidth={1}/>
          <circle cx={80} cy={80} r={52} stroke={GOLD} strokeWidth={0.6}/>
          <circle cx={80} cy={80} r={32} stroke={GOLD} strokeWidth={0.6}/>
          <line x1={80} y1={8} x2={80} y2={152} stroke={GOLD} strokeWidth={0.6}/>
          <line x1={8} y1={80} x2={152} y2={80} stroke={GOLD} strokeWidth={0.6}/>
          <line x1={29} y1={29} x2={131} y2={131} stroke={GOLD} strokeWidth={0.6}/>
          <line x1={131} y1={29} x2={29} y2={131} stroke={GOLD} strokeWidth={0.6}/>
          <rect x={58} y={72} width={44} height={22} rx={4} stroke={GOLD} strokeWidth={1.5} fill="none"/>
          <path d="M64 72 L70 62 L90 62 L96 72" stroke={GOLD} strokeWidth={1.5} fill="none"/>
          <circle cx={68} cy={94} r={5} stroke={GOLD} strokeWidth={1.5}/>
          <circle cx={92} cy={94} r={5} stroke={GOLD} strokeWidth={1.5}/>
          <circle cx={80} cy={80} r={3} fill={GOLD}/>
        </svg>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {STEPS.map((s, i) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
              backgroundColor: i + 1 < step ? GOLD : i + 1 === step ? WHITE : 'rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 10, fontWeight: 700,
              color: i + 1 <= step ? NAVY : '#6B7280',
            }}>
              {i + 1 < step ? '✓' : i + 1}
            </div>
            <span style={{ fontSize: 12, color: i + 1 === step ? IVORY : '#6B7280', fontWeight: i + 1 === step ? 600 : 400 }}>{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── STEP 1 ─────────────────────────────────────────────────── */
function Step1({ vals, fieldErrors, onNext }: { vals: VahanInputData; fieldErrors: Record<string, string>; onNext: (v: Partial<VahanInputData>) => void }) {
  const [d, setD] = useState({
    fullName: vals.fullName,
    dateOfBirth: vals.dateOfBirth,
    birthTime: vals.birthTime,
    birthCity: vals.birthCity,
  });
  const [errs, setErrs] = useState<Record<string, string>>({});

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const e2: Record<string, string> = {};
    if (!d.fullName.trim()) e2.fullName = 'Full name is required';
    if (!d.dateOfBirth) e2.dateOfBirth = 'Date of birth is required';
    if (!d.birthTime) e2.birthTime = 'Birth time is required';
    if (!d.birthCity.trim()) e2.birthCity = 'Birth city is required';
    setErrs(e2);
    if (!Object.keys(e2).length) onNext(d);
  }

  const getErr = (field: string) => fieldErrors[field] || errs[field];

  return (
    <form onSubmit={submit}>
      <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: NAVY, fontSize: 28, fontWeight: 400, marginBottom: 6 }}>Birth Details</h3>
      <p style={{ color: MUTED, fontSize: 13, marginBottom: 28 }}>Please enter your accurate birth information.</p>

      <F label="FULL NAME" error={getErr('full_name') || getErr('fullName')}>
        <input style={inp} placeholder="Enter your full name" value={d.fullName}
          onChange={e => setD(p => ({ ...p, fullName: e.target.value }))}/>
      </F>

      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1 }}>
          <F label="DATE OF BIRTH" error={getErr('date_of_birth') || getErr('dateOfBirth')}>
            <input type="date" style={inp} value={d.dateOfBirth}
              onChange={e => setD(p => ({ ...p, dateOfBirth: e.target.value }))}/>
          </F>
        </div>
        <div style={{ flex: 1 }}>
          <F label="EXACT BIRTH TIME" error={getErr('birth_time') || getErr('birthTime')}>
            <input type="time" style={inp} value={d.birthTime}
              onChange={e => setD(p => ({ ...p, birthTime: e.target.value }))}/>
          </F>
        </div>
      </div>

      <F label="BIRTH CITY" error={getErr('birth_city') || getErr('birthCity')}>
        <CitySearch
          value={d.birthCity}
          onChange={(r: CityResult) => setD(p => ({ ...p, birthCity: r.displayName }))}
          placeholder="Type any city in the world..."
          inputStyle={inp}
          error={getErr('birth_city') || getErr('birthCity')}
        />
        <p style={{ fontSize: 11, color: MUTED, marginTop: 6 }}>
          Search any city worldwide for exact latitude and longitude resolution.
        </p>
      </F>

      <NavRow onBack={null} label="Continue →"/>
    </form>
  );
}

/* ─── STEP 2 ─────────────────────────────────────────────────── */
function Step2({ vals, fieldErrors, onNext, onBack }: { vals: VahanInputData; fieldErrors: Record<string, string>; onNext: (v: Partial<VahanInputData>) => void; onBack: () => void }) {
  const [d, setD] = useState({ vehicleType: vals.vehicleType, vehicleModel: vals.vehicleModel });
  const [err, setErr] = useState('');

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!d.vehicleModel.trim()) { setErr('Vehicle model is required'); return; }
    setErr(''); onNext(d);
  }

  const modelErr = fieldErrors['vehicle_model'] || err;

  return (
    <form onSubmit={submit}>
      <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: NAVY, fontSize: 28, fontWeight: 400, marginBottom: 6 }}>Vehicle Details</h3>
      <p style={{ color: MUTED, fontSize: 13, marginBottom: 28 }}>Select your vehicle type and model.</p>

      <F label="VEHICLE CATEGORY">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginTop: 4 }}>
          {V_TYPES.map(vt => (
            <button key={vt} type="button" onClick={() => setD(p => ({ ...p, vehicleType: vt }))}
              style={{ padding: '12px 8px', borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: 'pointer', textAlign: 'center', border: `1px solid ${d.vehicleType === vt ? NAVY : BORDER}`, backgroundColor: d.vehicleType === vt ? NAVY : IVORY, color: d.vehicleType === vt ? IVORY : BODY }}>
              {vt}
            </button>
          ))}
        </div>
      </F>

      <F label="VEHICLE MAKE & MODEL" error={modelErr}>
        <input style={inp} placeholder="e.g. Toyota Fortuner, BMW X5, Tata Nexon EV"
          value={d.vehicleModel} onChange={e => setD(p => ({ ...p, vehicleModel: e.target.value }))}/>
      </F>

      <NavRow onBack={onBack} label="Continue →"/>
    </form>
  );
}

/* ─── STEP 3 ─────────────────────────────────────────────────── */
function Step3({ vals, fieldErrors, onNext, onBack }: { vals: VahanInputData; fieldErrors: Record<string, string>; onNext: (v: Partial<VahanInputData>) => void; onBack: () => void }) {
  const [d, setD] = useState({ deliveryStartDate: vals.deliveryStartDate, deliveryEndDate: vals.deliveryEndDate });
  const [errs, setErrs] = useState<Record<string, string>>({});

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const e2: Record<string, string> = {};
    if (!d.deliveryStartDate) e2.start = 'Start date required';
    if (!d.deliveryEndDate) e2.end = 'End date required';
    if (d.deliveryStartDate && d.deliveryEndDate && new Date(d.deliveryEndDate) < new Date(d.deliveryStartDate)) e2.end = 'End date must be after start date';
    setErrs(e2);
    if (!Object.keys(e2).length) onNext(d);
  }

  const startErr = fieldErrors['delivery_start'] || errs.start;
  const endErr = fieldErrors['delivery_end'] || errs.end;

  return (
    <form onSubmit={submit}>
      <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: NAVY, fontSize: 28, fontWeight: 400, marginBottom: 6 }}>Delivery Window</h3>
      <p style={{ color: MUTED, fontSize: 13, marginBottom: 28 }}>Specify your expected delivery date range.</p>

      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1 }}>
          <F label="EARLIEST DELIVERY DATE" error={startErr}>
            <input type="date" style={inp} value={d.deliveryStartDate} onChange={e => setD(p => ({ ...p, deliveryStartDate: e.target.value }))}/>
          </F>
        </div>
        <div style={{ flex: 1 }}>
          <F label="LATEST DELIVERY DATE" error={endErr}>
            <input type="date" style={inp} value={d.deliveryEndDate} onChange={e => setD(p => ({ ...p, deliveryEndDate: e.target.value }))}/>
          </F>
        </div>
      </div>

      <div style={{ backgroundColor: IVORY, border: `1px solid ${BORDER}`, borderRadius: 6, padding: '14px 16px', marginBottom: 24 }}>
        <p style={{ fontSize: 12, color: MUTED, lineHeight: 1.65 }}>
          <strong style={{ color: NAVY }}>Deterministic Vahan Recommendation Engine:</strong> Submitting will compute exact sidereal Lagna, Moon Rashi, Nakshatra, Shubh Delivery Windows, Chaldean Lucky Numbers, Vehicle Colours, and First Drive Direction.
        </p>
      </div>

      <NavRow onBack={onBack} label="Review & Generate Report →"/>
    </form>
  );
}

/* ─── STEP 4 REVIEW ──────────────────────────────────────────── */
function Step4({ data, onBack, onCalculate, errorBanner }: { data: VahanInputData; onBack: () => void; onCalculate: () => void; errorBanner?: string | null }) {
  const Row = ({ l, v }: { l: string; v: string }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '10px 0', borderBottom: `1px solid ${BORDER}` }}>
      <span style={{ fontSize: 12, color: MUTED, flexShrink: 0 }}>{l}</span>
      <span style={{ fontSize: 13, fontWeight: 500, color: NAVY, textAlign: 'right', maxWidth: '60%' }}>{v}</span>
    </div>
  );

  return (
    <div>
      <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: NAVY, fontSize: 28, fontWeight: 400, marginBottom: 6 }}>Review &amp; Generate Report</h3>
      <p style={{ color: MUTED, fontSize: 13, marginBottom: 24 }}>Confirm your details before generating your Vahan report.</p>

      {errorBanner && (
        <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: 8, padding: '14px 16px', marginBottom: 20 }}>
          <p style={{ color: '#991B1B', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Calculation Error</p>
          <p style={{ color: '#7F1D1D', fontSize: 12, lineHeight: 1.5 }}>{errorBanner}</p>
        </div>
      )}

      <div style={{ border: `1px solid ${BORDER}`, borderRadius: 8, padding: 20, marginBottom: 16 }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: GOLD, marginBottom: 10 }}>BIRTH DETAILS</p>
        <Row l="Full Name" v={data.fullName}/>
        <Row l="Date of Birth" v={data.dateOfBirth}/>
        <Row l="Birth Time" v={data.birthTime}/>
        <Row l="Birth City" v={data.birthCity}/>
      </div>
      <div style={{ border: `1px solid ${BORDER}`, borderRadius: 8, padding: 20, marginBottom: 24 }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: GOLD, marginBottom: 10 }}>VEHICLE & DELIVERY</p>
        <Row l="Vehicle Type" v={data.vehicleType}/>
        <Row l="Model" v={data.vehicleModel}/>
        <Row l="Delivery Window" v={`${data.deliveryStartDate} → ${data.deliveryEndDate}`}/>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${BORDER}`, paddingTop: 20 }}>
        <button onClick={onBack} style={{ fontSize: 13, color: MUTED, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>← Back</button>
        <button onClick={onCalculate} style={{ backgroundColor: NAVY, color: IVORY, fontSize: 12, fontWeight: 700, letterSpacing: '0.09em', padding: '13px 26px', borderRadius: 4, border: 'none', cursor: 'pointer' }}>
          GENERATE VAHAN REPORT &nbsp;→
        </button>
      </div>
    </div>
  );
}

/* ─── NavRow ─────────────────────────────────────────────────── */
function NavRow({ onBack, label }: { onBack: (() => void) | null; label: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${BORDER}`, paddingTop: 20, marginTop: 8 }}>
      {onBack ? (
        <button type="button" onClick={onBack} style={{ fontSize: 13, color: MUTED, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>← Back</button>
      ) : <div/>}
      <button type="submit" style={{ backgroundColor: NAVY, color: IVORY, fontSize: 12, fontWeight: 700, letterSpacing: '0.09em', padding: '13px 26px', borderRadius: 4, border: 'none', cursor: 'pointer' }}>
        {label}
      </button>
    </div>
  );
}

/* ─── LOADING STATE ──────────────────────────────────────────── */
function Loading({ stage, name, city }: { stage: number; name: string; city: string }) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: IVORY, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', maxWidth: 400, padding: 40 }}>
        <div style={{ position: 'relative', width: 64, height: 64, margin: '0 auto 24px' }}>
          <svg style={{ animation: 'spin 1.8s linear infinite' }} width={64} height={64} viewBox="0 0 64 64" fill="none">
            <circle cx={32} cy={32} r={28} stroke={BORDER} strokeWidth={4}/>
            <circle cx={32} cy={32} r={28} stroke={GOLD} strokeWidth={4} strokeDasharray="44 132" strokeLinecap="round"/>
          </svg>
        </div>
        <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: NAVY, fontSize: 22, fontWeight: 400, marginBottom: 8 }}>
          {LOADING_STAGES[Math.min(stage, LOADING_STAGES.length - 1)]}
        </p>
        <p style={{ color: '#9CA3AF', fontSize: 13, marginBottom: 20 }}>
          Computing profile for <strong style={{ color: NAVY }}>{name || 'user'}</strong> in <strong style={{ color: NAVY }}>{city || 'city'}</strong>.
        </p>
        <div style={{ backgroundColor: WHITE, border: `1px solid ${BORDER}`, borderRadius: 6, padding: '10px 16px' }}>
          <p style={{ fontSize: 11, color: '#9CA3AF', fontFamily: 'monospace' }}>PySwisseph Engine · Chaldean Numerology · Vahan Rules</p>
        </div>
      </div>
    </div>
  );
}

/* ─── PHASE 4 FULL VAHAN REPORT UI ───────────────────────────── */
function Phase4ReportView({ response, input, onReset }: { response: Phase3ComputeResponse; input: VahanInputData; onReset: () => void }) {
  const loc = response.birth_location;
  const astro = response.astrology;
  const recs = (response as any).recommendations;

  return (
    <div style={{ backgroundColor: IVORY, minHeight: '100vh' }}>
      <SiteNav/>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 40px' }}>
        {/* Header */}
        <div style={{ marginBottom: 36, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: '#FEF3C7', border: '1px solid #FDE68A', padding: '4px 12px', borderRadius: 100, marginBottom: 12 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: GOLD }}/>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: NAVY }}>PHASE 4 VAHAN REPORT READY</span>
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: NAVY, fontSize: 36, fontWeight: 400, marginBottom: 6 }}>
              Personalised Vahan Guidance
            </h2>
            <p style={{ color: MUTED, fontSize: 14 }}>
              Prepared for <strong style={{ color: NAVY }}>{input.fullName || 'User'}</strong> · {input.vehicleModel} ({input.vehicleType})
            </p>
          </div>
          <button onClick={onReset} style={{ border: `1px solid ${NAVY}`, color: NAVY, backgroundColor: 'transparent', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', padding: '11px 22px', borderRadius: 4, cursor: 'pointer' }}>
            Calculate Another →
          </button>
        </div>

        {/* Section 1: Astrological Summary */}
        <div style={{ backgroundColor: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: '28px 28px', marginBottom: 28 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: GOLD, marginBottom: 12 }}>1. BIRTH &amp; ASTROLOGY PROFILE</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 16 }}>
            <div>
              <p style={{ fontSize: 11, color: MUTED, marginBottom: 2 }}>LAGNA (ASCENDANT)</p>
              <p style={{ fontSize: 16, color: NAVY, fontWeight: 600 }}>{astro.lagna.rashi}</p>
              <p style={{ fontSize: 11, color: MUTED }}>{astro.lagna.degree.toFixed(2)}°</p>
            </div>
            <div>
              <p style={{ fontSize: 11, color: MUTED, marginBottom: 2 }}>MOON SIGN (RASHI)</p>
              <p style={{ fontSize: 16, color: NAVY, fontWeight: 600 }}>{astro.rashi}</p>
              <p style={{ fontSize: 11, color: MUTED }}>Janma Rashi</p>
            </div>
            <div>
              <p style={{ fontSize: 11, color: MUTED, marginBottom: 2 }}>BIRTH NAKSHATRA</p>
              <p style={{ fontSize: 16, color: NAVY, fontWeight: 600 }}>{astro.nakshatra.name}</p>
              <p style={{ fontSize: 11, color: MUTED }}>Pada {astro.nakshatra.pada}</p>
            </div>
            <div>
              <p style={{ fontSize: 11, color: MUTED, marginBottom: 2 }}>LAHIRI AYANAMSA</p>
              <p style={{ fontSize: 16, color: NAVY, fontWeight: 600 }}>{astro.ayanamsa?.toFixed(2)}°</p>
              <p style={{ fontSize: 11, color: MUTED }}>Sidereal Mode</p>
            </div>
          </div>
        </div>

        {/* Section 2: Shubh Delivery Windows */}
        <div style={{ backgroundColor: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: '28px 28px', marginBottom: 28 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: GOLD, marginBottom: 12 }}>2. SHUBH DELIVERY WINDOWS</p>
          <p style={{ fontSize: 13, color: MUTED, marginBottom: 20 }}>
            Evaluated date range: <strong style={{ color: NAVY }}>{input.deliveryStartDate}</strong> to <strong style={{ color: NAVY }}>{input.deliveryEndDate}</strong>
          </p>

          {recs && recs.delivery_windows && recs.delivery_windows.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {recs.delivery_windows.map((w: any) => (
                <div key={w.id} style={{ border: `1px solid ${BORDER}`, borderRadius: 8, padding: 20, backgroundColor: w.isTopPick ? '#FDFBF7' : WHITE }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <div>
                      {w.isTopPick && (
                        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', backgroundColor: GOLD, color: WHITE, padding: '3px 8px', borderRadius: 4, marginRight: 8 }}>
                          TOP PICK
                        </span>
                      )}
                      <span style={{ fontSize: 15, fontWeight: 600, color: NAVY }}>{w.title}</span>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: GOLD }}>{w.score}/100</span>
                  </div>
                  <p style={{ fontSize: 13, color: BODY, marginBottom: 10 }}>
                    <strong>Date:</strong> {w.startDate} · <strong>Time Window:</strong> {w.startTime} – {w.endTime} ({w.vara})
                  </p>
                  <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, color: MUTED }}>
                    {w.reasoning.map((r: string, idx: number) => (
                      <li key={idx} style={{ marginBottom: 4 }}>{r}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: 13, color: MUTED }}>No recommended delivery windows contained in requested range.</p>
          )}
        </div>

        {/* Section 3: Chaldean Lucky Numbers */}
        {recs && recs.lucky_numbers && (
          <div style={{ backgroundColor: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: '28px 28px', marginBottom: 28 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: GOLD, marginBottom: 12 }}>3. CHALDEAN LUCKY REGISTRATION NUMBERS</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
              <div style={{ backgroundColor: IVORY, border: `1px solid ${BORDER}`, borderRadius: 8, padding: 16 }}>
                <p style={{ fontSize: 11, color: MUTED, marginBottom: 2 }}>DRIVER NUMBER (BIRTH DAY)</p>
                <p style={{ fontSize: 24, fontWeight: 700, color: NAVY }}>{recs.lucky_numbers.chaldeanDriverNumber}</p>
                <p style={{ fontSize: 11, color: MUTED }}>Venus Luxury Energy</p>
              </div>
              <div style={{ backgroundColor: IVORY, border: `1px solid ${BORDER}`, borderRadius: 8, padding: 16 }}>
                <p style={{ fontSize: 11, color: MUTED, marginBottom: 2 }}>CONDUCTOR NUMBER (DESTINY)</p>
                <p style={{ fontSize: 24, fontWeight: 700, color: NAVY }}>{recs.lucky_numbers.chaldeanConductorNumber}</p>
                <p style={{ fontSize: 11, color: MUTED }}>Mercury Intelligence Energy</p>
              </div>
            </div>

            <p style={{ fontSize: 12, color: MUTED, marginBottom: 12 }}>
              <strong style={{ color: NAVY }}>Recommended Registration Combinations:</strong> {recs.lucky_numbers.recommendedCombinations.join(', ')}
            </p>
            <p style={{ fontSize: 12, color: '#DC2626' }}>
              <strong>Avoid Numbers:</strong> Sums ending in {recs.lucky_numbers.unfavorableDigits.join(' or ')}
            </p>
          </div>
        )}

        {/* Section 4: Vehicle Colour Recommendations */}
        {recs && recs.colours && (
          <div style={{ backgroundColor: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: '28px 28px', marginBottom: 28 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: GOLD, marginBottom: 12 }}>4. RECOMMENDED VEHICLE COLOURS</p>
            <p style={{ fontSize: 13, color: MUTED, marginBottom: 16 }}>{recs.colours.astroRationale}</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              {recs.colours.recommendedColours.map((c: any, idx: number) => (
                <div key={idx} style={{ border: `1px solid ${BORDER}`, borderRadius: 8, padding: 16, display: 'flex', gap: 14, alignItems: 'center' }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: c.hex, border: `1px solid ${BORDER}` }}/>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: NAVY }}>{c.name}</p>
                    <p style={{ fontSize: 12, color: MUTED }}>{c.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {recs.colours.avoidColours && recs.colours.avoidColours.length > 0 && (
              <p style={{ fontSize: 12, color: '#DC2626' }}>
                <strong>Avoid Colours:</strong> {recs.colours.avoidColours.map((c: any) => c.name).join(', ')}
              </p>
            )}
          </div>
        )}

        {/* Section 5: First Drive Direction */}
        {recs && recs.directions && (
          <div style={{ backgroundColor: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: '28px 28px', marginBottom: 32 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: GOLD, marginBottom: 12 }}>5. FIRST DRIVE DIRECTION &amp; VASTU GUIDANCE</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 16 }}>
              <div>
                <p style={{ fontSize: 11, color: MUTED, marginBottom: 2 }}>PRIMARY DIRECTION</p>
                <p style={{ fontSize: 20, fontWeight: 700, color: NAVY }}>{recs.directions.primaryDirection}</p>
                <p style={{ fontSize: 12, color: MUTED }}>{recs.directions.vastuSymbol}</p>
              </div>
              <div>
                <p style={{ fontSize: 11, color: MUTED, marginBottom: 2 }}>AUSPICIOUS HORA</p>
                <p style={{ fontSize: 15, fontWeight: 600, color: NAVY }}>{recs.directions.auspiciousHora}</p>
                <p style={{ fontSize: 12, color: MUTED }}>{recs.directions.firstDestination}</p>
              </div>
            </div>
            <p style={{ fontSize: 13, color: BODY, borderTop: `1px solid ${BORDER}`, paddingTop: 12 }}>
              <strong>Guidance:</strong> {recs.directions.driveGuidance}
            </p>
          </div>
        )}

        {/* Calculation Info Footer */}
        <div style={{ backgroundColor: IVORY, border: `1px solid ${BORDER}`, borderRadius: 8, padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: NAVY, marginBottom: 2 }}>Request ID: {response.request_id}</p>
            <p style={{ fontSize: 11, color: MUTED }}>Timezone: {loc.timezone} ({loc.timezone_offset}) · Datetime ISO: {loc.local_birth_datetime_iso}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 11, color: MUTED, fontFamily: 'monospace' }}>PySwisseph v2.10.03 · Chaldean Numerology · Vahan Rules Engine</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN PAGE ──────────────────────────────────────────────── */
export default function CalculatePage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadStage, setLoadStage] = useState(0);
  const [phase3Response, setPhase3Response] = useState<Phase3ComputeResponse | null>(null);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [input, setInput] = useState<VahanInputData>({
    fullName: '', dateOfBirth: '', birthTime: '', birthCity: '',
    vehicleType: 'SUV', vehicleModel: '',
    deliveryStartDate: '', deliveryEndDate: '',
  });

  function merge(v: Partial<VahanInputData>) {
    setInput(p => ({ ...p, ...v }));
    setErrorBanner(null);
    setFieldErrors({});
  }

  async function handleCalculate() {
    setLoading(true);
    setLoadStage(0);
    setErrorBanner(null);
    setFieldErrors({});

    const iv = setInterval(() => setLoadStage(s => Math.min(s + 1, LOADING_STAGES.length - 1)), 600);

    try {
      const res = await computeVahanRequest(input);
      clearInterval(iv);
      setLoading(false);
      setPhase3Response(res);
    } catch (err: any) {
      clearInterval(iv);
      setLoading(false);

      if (err instanceof ApiError) {
        if (err.errorType === 'validation_error' && err.details) {
          const map: Record<string, string> = {};
          err.details.forEach(d => { map[d.field] = d.message; });
          setFieldErrors(map);
          setErrorBanner(err.message);
          if (map['full_name'] || map['date_of_birth'] || map['birth_time'] || map['birth_city']) {
            setStep(1);
          } else if (map['vehicle_model'] || map['vehicle_type']) {
            setStep(2);
          } else if (map['delivery_start'] || map['delivery_end']) {
            setStep(3);
          }
        } else {
          setErrorBanner(err.message);
        }
      } else {
        setErrorBanner('An unexpected error occurred. Please check your connection and try again.');
      }
    }
  }

  if (loading) return <Loading stage={loadStage} name={input.fullName} city={input.birthCity}/>;
  if (phase3Response) return <Phase4ReportView response={phase3Response} input={input} onReset={() => { setPhase3Response(null); setStep(1); }}/>;

  return (
    <div style={{ backgroundColor: IVORY, minHeight: '100vh' }}>
      <SiteNav/>

      {/* Progress tabs */}
      <div style={{ backgroundColor: WHITE, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
            {STEPS.map((s, i) => (
              <React.Fragment key={s}>
                <div onClick={() => i + 1 < step && setStep(i + 1)}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '20px 0', cursor: i + 1 < step ? 'pointer' : 'default' }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: '50%',
                    backgroundColor: i + 1 < step ? GOLD : i + 1 === step ? NAVY : '#E4E0D6',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 700,
                    color: i + 1 <= step ? IVORY : MUTED, flexShrink: 0,
                  }}>
                    {i + 1 < step ? '✓' : i + 1}
                  </div>
                  <span style={{ fontSize: 13, fontWeight: i + 1 === step ? 600 : 400, color: i + 1 === step ? NAVY : '#9CA3AF', whiteSpace: 'nowrap' }}>{s}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div style={{ width: 40, height: 1, backgroundColor: i + 1 < step ? GOLD : BORDER, margin: '0 12px', flexShrink: 0 }}/>
                )}
              </React.Fragment>
            ))}
          </div>
          <button style={{ fontSize: 12, color: MUTED, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500, padding: '20px 0' }}>Save &amp; Exit</button>
        </div>
      </div>

      {/* Two-column layout */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 40px', display: 'flex', gap: 28, alignItems: 'flex-start' }}>
        <div style={{ flex: '0 0 300px', width: 300 }}>
          <LeftPanel step={step}/>
        </div>
        <div style={{ flex: '1 1 auto', minWidth: 0 }}>
          <div style={{ backgroundColor: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: '40px 36px', boxShadow: '0 2px 20px -4px rgba(7,21,47,0.06)' }}>
            {step === 1 && <Step1 vals={input} fieldErrors={fieldErrors} onNext={v => { merge(v); setStep(2); }}/>}
            {step === 2 && <Step2 vals={input} fieldErrors={fieldErrors} onNext={v => { merge(v); setStep(3); }} onBack={() => setStep(1)}/>}
            {step === 3 && <Step3 vals={input} fieldErrors={fieldErrors} onNext={v => { merge(v); setStep(4); }} onBack={() => setStep(2)}/>}
            {step === 4 && <Step4 data={input} errorBanner={errorBanner} onBack={() => setStep(3)} onCalculate={handleCalculate}/>}
          </div>
        </div>
      </div>
    </div>
  );
}
