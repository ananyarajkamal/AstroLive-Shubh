'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import SiteNav from '../../../components/SiteNav';
import { VahanInputData, Phase3ComputeResponse, BirthDetailsInput, VehicleDetailsInput, DeliveryWindowInput } from '../../../lib/types';
import { computeVahanRequest, ApiError } from '../../../lib/api';
import { useLanguage } from '../../../context/LanguageContext';
import { BirthDetailsForm } from '../../../components/forms/BirthDetailsForm';
import { VehicleDetailsForm } from '../../../components/forms/VehicleDetailsForm';
import { DeliveryWindowForm } from '../../../components/forms/DeliveryWindowForm';

/* ─── tokens ─────────────────────────────────────────────────── */
const NAVY = '#07152F';
const IVORY = '#F5F1E8';
const GOLD = '#C8A85B';
const BORDER = '#D8D0C4';
const MUTED = '#6B7280';
const BODY = '#101828';
const WHITE = '#FAF8F3';

/* ─── LEFT PANEL ─────────────────────────────────────────────── */
function LeftPanel({ step }: { step: number }) {
  const { lang } = useLanguage();
  return (
    <div style={{ backgroundColor: NAVY, borderRadius: 10, padding: '36px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 520 }}>
      <div>
        <p style={{ color: GOLD, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', marginBottom: 12 }}>
          {lang === 'hi' ? `चरण ${step} / 4` : `STEP ${step} OF 4`}
        </p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', 'Noto Serif Devanagari', Georgia, serif", color: IVORY, fontSize: 28, fontWeight: 400, lineHeight: 1.2, marginBottom: 14 }}>
          {lang === 'hi' ? 'आपकी वाहन\nयात्रा' : 'Your Vahan\nJourney'}
        </h2>
        <p style={{ color: '#9CA3AF', fontSize: 13, lineHeight: 1.7 }}>
          {lang === 'hi' ? 'व्यक्तिगत वाहन सुझाव प्राप्त करने के लिए विवरण दर्ज करें।' : 'Answer a few questions to receive your complete personalized vehicle recommendations.'}
        </p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '28px 0' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', border: `1px solid ${GOLD}`, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.8 }}>
          <span style={{ fontSize: 28 }}>✦</span>
        </div>
      </div>
      <div>
        <p style={{ color: GOLD, fontSize: 11, fontWeight: 600 }}>AstroLive Shubh</p>
        <p style={{ color: '#6B7280', fontSize: 11 }}>Deterministic Vahan Engine</p>
      </div>
    </div>
  );
}

/* ─── STEPPER BAR ────────────────────────────────────────────── */
function StepperBar({ currentStep }: { currentStep: number }) {
  const { lang } = useLanguage();
  const STEPS = lang === 'hi'
    ? ['जन्म विवरण', 'वाहन विवरण', 'डिलीवरी समय सीमा', 'समीक्षा']
    : ['Birth Details', 'Vehicle Details', 'Delivery Window', 'Review'];

  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
      {STEPS.map((label, idx) => {
        const num = idx + 1;
        const isDone = currentStep > num;
        const isCurrent = currentStep === num;

        let bg = IVORY;
        let color = MUTED;
        let borderColor = BORDER;

        if (isDone) {
          bg = '#FEF3C7';
          color = NAVY;
          borderColor = '#FDE68A';
        } else if (isCurrent) {
          bg = NAVY;
          color = IVORY;
          borderColor = NAVY;
        }

        return (
          <div key={label} style={{ flex: 1, backgroundColor: bg, border: `1px solid ${borderColor}`, borderRadius: 6, padding: '10px 12px', textAlign: 'center', transition: 'all 200ms ease' }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: isCurrent ? GOLD : color, marginBottom: 2 }}>{num}. {label}</p>
          </div>
        );
      })}
    </div>
  );
}

/* ─── STEP 4 REVIEW FORM ─────────────────────────────────────── */
function Step4Review({ data, onBack, onSubmit }: { data: VahanInputData; onBack: () => void; onSubmit: () => void }) {
  const { lang, translateValue } = useLanguage();

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleFinalSubmit} className="space-y-6">
      <div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', 'Noto Serif Devanagari', Georgia, serif", color: NAVY, fontSize: 24, fontWeight: 600 }}>
          {lang === 'hi' ? 'विवरण समीक्षा एवं पुष्टि' : 'Review & Confirm Input Details'}
        </h2>
        <p className="text-xs text-[#526071] mt-1">
          {lang === 'hi' ? 'अपने दर्ज किए गए विवरणों की पुष्टि करें।' : 'Verify your entered parameters before generating guidance.'}
        </p>
      </div>

      <div style={{ backgroundColor: WHITE, border: `1px solid ${BORDER}`, borderRadius: 8, padding: 20, marginBottom: 20 }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: GOLD, marginBottom: 12 }}>
          {lang === 'hi' ? 'संक्षिप्त विवरण' : 'SUMMARY'}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, fontSize: 13, color: BODY }}>
          <div><strong>{lang === 'hi' ? 'नाम:' : 'Name:'}</strong> {data.fullName}</div>
          <div><strong>{lang === 'hi' ? 'जन्म तिथि:' : 'DOB:'}</strong> {data.dateOfBirth} ({data.birthTime})</div>
          <div><strong>{lang === 'hi' ? 'जन्म स्थान:' : 'City:'}</strong> {translateValue(data.birthCity)}</div>
          <div><strong>{lang === 'hi' ? 'वाहन:' : 'Vehicle:'}</strong> {data.vehicleModel} ({translateValue(data.vehicleType || '')})</div>
          <div style={{ gridColumn: 'span 2' }}>
            <strong>{lang === 'hi' ? 'डिलीवरी अवधि:' : 'Delivery Window:'}</strong> {data.deliveryStartDate} to {data.deliveryEndDate}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-[#EAE5DC]">
        <button type="button" onClick={onBack} style={{ border: `1px solid ${BORDER}`, color: NAVY, backgroundColor: 'transparent', fontSize: 12, fontWeight: 600, padding: '10px 20px', borderRadius: 4, cursor: 'pointer' }}>
          {lang === 'hi' ? '← पीछे जाएँ' : '← Back'}
        </button>
        <button type="submit" style={{ backgroundColor: NAVY, color: IVORY, border: 'none', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', padding: '12px 28px', borderRadius: 4, cursor: 'pointer' }}>
          {lang === 'hi' ? 'शुभ मार्गदर्शन प्राप्त करें →' : 'Generate Guidance →'}
        </button>
      </div>
    </form>
  );
}

/* ─── LOADING VIEW ────────────────────────────────────────────── */
function LoadingView({ stageIndex, name, city }: { stageIndex: number; name: string; city: string }) {
  const { t } = useLanguage();

  return (
    <div style={{ backgroundColor: IVORY, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
      <div style={{ backgroundColor: WHITE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 48, maxWidth: 520, width: '100%', textAlign: 'center' }}>
        <div style={{ width: 64, height: 64, border: `3px solid ${BORDER}`, borderTopColor: GOLD, borderRadius: '50%', animation: 'spinSlow 1.5s linear infinite', margin: '0 auto 24px' }} />
        <h3 style={{ fontFamily: "'Cormorant Garamond', 'Noto Serif Devanagari', Georgia, serif", color: NAVY, fontSize: 28, fontWeight: 400, marginBottom: 8 }}>
          {t.forms.computing}
        </h3>
        <p style={{ color: MUTED, fontSize: 14, marginBottom: 24 }}>
          {t.forms.computingSubtitle}
        </p>
        <p style={{ fontSize: 12, color: NAVY, fontFamily: 'monospace' }}>
          {name} · {city}
        </p>
      </div>
    </div>
  );
}

/* ─── PHASE 4 FULL VAHAN REPORT UI ───────────────────────────── */
function Phase4ReportView({ response, input, onReset }: { response: Phase3ComputeResponse; input: VahanInputData; onReset: () => void }) {
  const { t, lang, translateValue } = useLanguage();
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
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: NAVY }}>{t.report.readyBadge}</span>
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', 'Noto Serif Devanagari', Georgia, serif", color: NAVY, fontSize: 36, fontWeight: 400, marginBottom: 6 }}>
              {t.report.reportTitle}
            </h2>
            <p style={{ color: MUTED, fontSize: 14 }}>
              {t.report.preparedFor} <strong style={{ color: NAVY }}>{input.fullName || 'User'}</strong> · {input.vehicleModel} ({translateValue(input.vehicleType || '')})
            </p>
          </div>
          <button onClick={onReset} style={{ border: `1px solid ${NAVY}`, color: NAVY, backgroundColor: 'transparent', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', padding: '11px 22px', borderRadius: 4, cursor: 'pointer' }}>
            {t.report.calcAnother}
          </button>
        </div>

        {/* Section 1: Astrological Summary */}
        <div style={{ backgroundColor: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: '28px 24px', marginBottom: 28 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: GOLD, marginBottom: 12 }}>{t.report.sec1Title}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 16 }}>
            <div>
              <p style={{ fontSize: 11, color: MUTED, marginBottom: 2 }}>{t.report.lagnaLabel}</p>
              <p style={{ fontSize: 16, color: NAVY, fontWeight: 600 }}>{translateValue(astro.lagna.rashi)}</p>
              <p style={{ fontSize: 11, color: MUTED }}>{astro.lagna.degree.toFixed(2)} deg</p>
            </div>
            <div>
              <p style={{ fontSize: 11, color: MUTED, marginBottom: 2 }}>{t.report.rashiLabel}</p>
              <p style={{ fontSize: 16, color: NAVY, fontWeight: 600 }}>{translateValue(astro.rashi)}</p>
              <p style={{ fontSize: 11, color: MUTED }}>{lang === 'hi' ? 'जन्म राशि' : 'Janma Rashi'}</p>
            </div>
            <div>
              <p style={{ fontSize: 11, color: MUTED, marginBottom: 2 }}>{t.report.nakshatraLabel}</p>
              <p style={{ fontSize: 16, color: NAVY, fontWeight: 600 }}>{translateValue(astro.nakshatra.name)}</p>
              <p style={{ fontSize: 11, color: MUTED }}>{t.report.padaLabel} {astro.nakshatra.pada}</p>
            </div>
            <div>
              <p style={{ fontSize: 11, color: MUTED, marginBottom: 2 }}>{t.report.ayanamsaLabel}</p>
              <p style={{ fontSize: 16, color: NAVY, fontWeight: 600 }}>{astro.ayanamsa?.toFixed(2)} deg</p>
              <p style={{ fontSize: 11, color: MUTED }}>{lang === 'hi' ? 'निरयण प्रणाली' : 'Sidereal Mode'}</p>
            </div>
          </div>
        </div>

        {/* Section 2: Shubh Delivery Windows */}
        <div style={{ backgroundColor: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: '28px 28px', marginBottom: 28 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: GOLD, marginBottom: 12 }}>{t.report.sec2Title}</p>
          <p style={{ fontSize: 13, color: MUTED, marginBottom: 20 }}>
            {t.report.evalRange} <strong style={{ color: NAVY }}>{input.deliveryStartDate}</strong> {lang === 'hi' ? 'से' : 'to'} <strong style={{ color: NAVY }}>{input.deliveryEndDate}</strong>
          </p>

          {recs && recs.delivery_windows && recs.delivery_windows.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {recs.delivery_windows.map((w: any) => (
                <div key={w.id} style={{ border: `1px solid ${BORDER}`, borderRadius: 8, padding: 20, backgroundColor: w.isTopPick ? '#FDFBF7' : WHITE }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <div>
                      {w.isTopPick && (
                        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', backgroundColor: GOLD, color: WHITE, padding: '3px 8px', borderRadius: 4, marginRight: 8 }}>
                          {t.report.topPick}
                        </span>
                      )}
                      <span style={{ fontSize: 15, fontWeight: 600, color: NAVY }}>{translateValue(w.title)}</span>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: GOLD }}>{w.score}/100</span>
                  </div>
                  <p style={{ fontSize: 13, color: BODY, marginBottom: 10 }}>
                    <strong>{t.report.dateLabel}</strong> {w.startDate} · <strong>{t.report.timeWindowLabel}</strong> {w.startTime} - {w.endTime} ({translateValue(w.vara)})
                  </p>
                  <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, color: MUTED }}>
                    {w.reasoning.map((r: string, idx: number) => (
                      <li key={idx} style={{ marginBottom: 4 }}>{translateValue(r)}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: 13, color: MUTED }}>{lang === 'hi' ? 'अनुरोधित समय सीमा में कोई मुहूर्त नहीं मिला।' : 'No recommended delivery windows contained in requested range.'}</p>
          )}
        </div>

        {/* Section 3: Chaldean Lucky Numbers */}
        {recs && recs.lucky_numbers && (
          <div style={{ backgroundColor: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: '28px 28px', marginBottom: 28 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: GOLD, marginBottom: 12 }}>{t.report.sec3Title}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
              <div style={{ backgroundColor: IVORY, border: `1px solid ${BORDER}`, borderRadius: 8, padding: 16 }}>
                <p style={{ fontSize: 11, color: MUTED, marginBottom: 2 }}>{t.report.driverNum}</p>
                <p style={{ fontSize: 24, fontWeight: 700, color: NAVY }}>{recs.lucky_numbers.chaldeanDriverNumber}</p>
                <p style={{ fontSize: 11, color: MUTED }}>{lang === 'hi' ? 'शुक्र लग्जरी ऊर्जा' : 'Venus Luxury Energy'}</p>
              </div>
              <div style={{ backgroundColor: IVORY, border: `1px solid ${BORDER}`, borderRadius: 8, padding: 16 }}>
                <p style={{ fontSize: 11, color: MUTED, marginBottom: 2 }}>{t.report.conductorNum}</p>
                <p style={{ fontSize: 24, fontWeight: 700, color: NAVY }}>{recs.lucky_numbers.chaldeanConductorNumber}</p>
                <p style={{ fontSize: 11, color: MUTED }}>{lang === 'hi' ? 'बुध बौद्धिक ऊर्जा' : 'Mercury Intelligence Energy'}</p>
              </div>
            </div>

            <p style={{ fontSize: 12, color: MUTED, marginBottom: 12 }}>
              <strong style={{ color: NAVY }}>{t.report.recommendedCombos}</strong> {recs.lucky_numbers.recommendedCombinations.join(', ')}
            </p>
            <p style={{ fontSize: 12, color: '#DC2626' }}>
              <strong>{t.report.avoidNumbers}</strong> {lang === 'hi' ? `अंतिम अंक जिसमें ${recs.lucky_numbers.unfavorableDigits.join(' या ')} न हों` : `Sums ending in ${recs.lucky_numbers.unfavorableDigits.join(' or ')}`}
            </p>
          </div>
        )}

        {/* Section 4: Vehicle Colour Recommendations */}
        {recs && recs.colours && (
          <div style={{ backgroundColor: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: '28px 28px', marginBottom: 28 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: GOLD, marginBottom: 12 }}>{t.report.sec4Title}</p>
            <p style={{ fontSize: 13, color: MUTED, marginBottom: 16 }}>{translateValue(recs.colours.astroRationale)}</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              {recs.colours.recommendedColours.map((c: any, idx: number) => (
                <div key={idx} style={{ border: `1px solid ${BORDER}`, borderRadius: 8, padding: 16, display: 'flex', gap: 14, alignItems: 'center' }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: c.hex, border: `1px solid ${BORDER}` }}/>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: NAVY }}>{translateValue(c.name)}</p>
                    <p style={{ fontSize: 12, color: MUTED }}>{translateValue(c.description)}</p>
                  </div>
                </div>
              ))}
            </div>

            {recs.colours.avoidColours && recs.colours.avoidColours.length > 0 && (
              <p style={{ fontSize: 12, color: '#DC2626' }}>
                <strong>{t.report.avoidColours}</strong> {recs.colours.avoidColours.map((c: any) => translateValue(c.name)).join(', ')}
              </p>
            )}
          </div>
        )}

        {/* Section 5: First Drive Direction */}
        {recs && recs.directions && (
          <div style={{ backgroundColor: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: '28px 28px', marginBottom: 32 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: GOLD, marginBottom: 12 }}>{t.report.sec5Title}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 16 }}>
              <div>
                <p style={{ fontSize: 11, color: MUTED, marginBottom: 2 }}>{t.report.primaryDirection}</p>
                <p style={{ fontSize: 20, fontWeight: 700, color: NAVY }}>{translateValue(recs.directions.primaryDirection)}</p>
                <p style={{ fontSize: 12, color: MUTED }}>{translateValue(recs.directions.vastuSymbol)}</p>
              </div>
              <div>
                <p style={{ fontSize: 11, color: MUTED, marginBottom: 2 }}>{t.report.auspiciousHora}</p>
                <p style={{ fontSize: 15, fontWeight: 600, color: NAVY }}>{translateValue(recs.directions.auspiciousHora)}</p>
                <p style={{ fontSize: 12, color: MUTED }}>{translateValue(recs.directions.firstDestination)}</p>
              </div>
            </div>
            <p style={{ fontSize: 13, color: BODY, borderTop: `1px solid ${BORDER}`, paddingTop: 12 }}>
              <strong>{t.report.guidance}</strong> {translateValue(recs.directions.driveGuidance)}
            </p>
          </div>
        )}

        {/* Calculation Info Footer */}
        <div style={{ backgroundColor: IVORY, border: `1px solid ${BORDER}`, borderRadius: 8, padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: NAVY, marginBottom: 2 }}>{t.report.reqId} {response.request_id}</p>
            <p style={{ fontSize: 11, color: MUTED }}>{t.report.timezone} {loc.timezone} ({loc.timezone_offset}) · Datetime ISO: {loc.local_birth_datetime_iso}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 11, color: MUTED, fontFamily: 'monospace' }}>PySwisseph v2.10.03 · Chaldean Numerology · Vahan Rules</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN PAGE ──────────────────────────────────────────────── */
export default function VahanCalculatePage() {
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingStage, setLoadingStage] = useState<number>(0);
  const [apiError, setApiError] = useState<string | null>(null);
  const [computeResult, setComputeResult] = useState<Phase3ComputeResponse | null>(null);

  const [inputData, setInputData] = useState<VahanInputData>({
    fullName: '',
    dateOfBirth: '',
    birthTime: '',
    birthCity: '',
    latitude: 12.9716,
    longitude: 77.5946,
    vehicleModel: '',
    vehicleType: 'SUV',
    deliveryStartDate: '',
    deliveryEndDate: '',
    preferredColours: '',
  });

  const handleBirthSubmit = (data: BirthDetailsInput) => {
    setInputData(prev => ({ ...prev, ...data }));
    setStep(2);
  };

  const handleVehicleSubmit = (data: VehicleDetailsInput) => {
    setInputData(prev => ({ ...prev, ...data }));
    setStep(3);
  };

  const handleDeliverySubmit = (data: DeliveryWindowInput) => {
    setInputData(prev => ({ ...prev, ...data }));
    setStep(4);
  };

  const handleComputeSubmit = async () => {
    setLoading(true);
    setLoadingStage(0);
    setApiError(null);

    try {
      const res = await computeVahanRequest(inputData);
      setComputeResult(res);
      setStep(4);
    } catch (err: any) {
      const msg = err instanceof ApiError ? err.message : 'Calculation error. Please verify input details.';
      setApiError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingView stageIndex={loadingStage} name={inputData.fullName} city={inputData.birthCity} />;
  }

  if (step === 4 && computeResult) {
    return <Phase4ReportView response={computeResult} input={inputData} onReset={() => setStep(1)} />;
  }

  return (
    <div style={{ backgroundColor: IVORY, minHeight: '100vh' }}>
      <SiteNav />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 32px 96px' }}>
        <StepperBar currentStep={step} />

        {apiError && (
          <div style={{ backgroundColor: '#FEE2E2', border: '1px solid #FCA5A5', color: '#991B1B', padding: '14px 18px', borderRadius: 8, marginBottom: 24, fontSize: 13 }}>
            <strong>Calculation Error:</strong> {apiError}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
          <LeftPanel step={step} />

          <div style={{ backgroundColor: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 36 }}>
            {step === 1 && (
              <BirthDetailsForm
                initialValues={{
                  fullName: inputData.fullName,
                  dateOfBirth: inputData.dateOfBirth,
                  birthTime: inputData.birthTime,
                  birthCity: inputData.birthCity,
                }}
                onSubmit={handleBirthSubmit}
              />
            )}
            {step === 2 && (
              <VehicleDetailsForm
                initialValues={{
                  vehicleType: inputData.vehicleType,
                  vehicleModel: inputData.vehicleModel,
                }}
                onSubmit={handleVehicleSubmit}
                onBack={() => setStep(1)}
              />
            )}
            {step === 3 && (
              <DeliveryWindowForm
                initialValues={{
                  deliveryStartDate: inputData.deliveryStartDate,
                  deliveryEndDate: inputData.deliveryEndDate,
                }}
                onSubmit={handleDeliverySubmit}
                onBack={() => setStep(2)}
              />
            )}
            {step === 4 && (
              <Step4Review data={inputData} onBack={() => setStep(3)} onSubmit={handleComputeSubmit} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
