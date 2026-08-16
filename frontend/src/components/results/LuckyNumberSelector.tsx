import React from 'react';
import { LuckyNumbersOutput } from '../../lib/types';
import { Card } from '../ui/Card';
import { Sparkles, Hash, AlertCircle, CheckCircle } from 'lucide-react';

interface LuckyNumberSelectorProps {
  data: LuckyNumbersOutput;
}

export function LuckyNumberSelector({ data }: LuckyNumberSelectorProps) {
  const [customPlate, setCustomPlate] = React.useState<string>('KA 01 EQ 5555');
  const [plateScoreResult, setPlateScoreResult] = React.useState<{ score: number; status: string; breakdown: string } | null>(null);

  const CHALDEAN_MAP: Record<string, number> = {
    A: 1, B: 2, C: 3, D: 4, E: 5, F: 8, G: 3, H: 5, I: 1, J: 1, K: 2, L: 3, M: 4, N: 5, O: 7, P: 8, Q: 1, R: 2, S: 3, T: 4, U: 6, V: 6, W: 6, X: 5, Y: 1, Z: 7,
    '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '0': 0
  };

  const evaluatePlateNumber = (plateStr: string) => {
    const sanitized = plateStr.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (!sanitized) return;

    let sum = 0;
    for (const char of sanitized) {
      sum += CHALDEAN_MAP[char] || 0;
    }

    let single = sum;
    while (single > 9) {
      single = String(single).split('').reduce((acc, curr) => acc + parseInt(curr, 10), 0);
    }

    const isFav = data.recommendedDigits.includes(single);
    const isUnfav = data.unfavorableDigits.includes(single);

    let score = isFav ? 94 : isUnfav ? 45 : 78;
    let status = isFav ? 'Highly Auspicious' : isUnfav ? 'Incompatible Digit' : 'Moderate Compatibility';
    let breakdown = `Total Chaldean Sum = ${sum} → Single Digit: ${single}`;

    setPlateScoreResult({ score, status, breakdown });
  };

  React.useEffect(() => {
    evaluatePlateNumber(customPlate);
  }, [customPlate]);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-serif-luxury text-2xl text-[#0B132B] font-bold">2. Lucky Registration Numbers</h3>
        <p className="text-xs text-[#526071] mt-0.5">
          Calculated via Chaldean numerology aligning birth driver & life path numbers with vehicle registration digit sums.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Chaldean Birth Summary Card */}
        <Card variant="gold" className="md:col-span-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B8860B]">Chaldean Profile</span>
              <Hash className="w-4 h-4 text-[#B8860B]" />
            </div>
            <div className="space-y-3 mt-4">
              <div className="flex justify-between items-center p-3 rounded-lg bg-[#F4EFE6] border border-[#EAE5DC]">
                <span className="text-xs text-[#526071]">Birth Number (Driver):</span>
                <span className="text-xl font-bold font-mono text-[#0B132B]">{data.chaldeanDriverNumber}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-[#F4EFE6] border border-[#EAE5DC]">
                <span className="text-xs text-[#526071]">Life Path Number (Conductor):</span>
                <span className="text-xl font-bold font-mono text-[#0B132B]">{data.chaldeanConductorNumber}</span>
              </div>
            </div>
          </div>
          <p className="text-[11px] text-[#526071] mt-4 leading-relaxed border-t border-[#EAE5DC] pt-3">
            {data.analysisNote}
          </p>
        </Card>

        {/* Recommended Digits & Plate Combinations */}
        <Card variant="default" className="md:col-span-2 space-y-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B132B] block mb-2">
              Recommended Single Digits:
            </span>
            <div className="flex flex-wrap gap-3">
              {data.digitDetails.map((item) => (
                <div key={item.digit} className="p-3 rounded-xl bg-[#F4EFE6] border border-[#EAE5DC] flex items-center gap-3 flex-1 min-w-[140px]">
                  <div className="w-10 h-10 rounded-lg bg-[#0B132B] text-[#FDFBF7] font-bold font-mono text-xl flex items-center justify-center shrink-0">
                    {item.digit}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#0B132B] block">{item.planet}</span>
                    <span className="text-[10px] text-emerald-700 font-mono font-bold">{item.compatibilityScore}% Compatible</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B132B] block mb-2">
              Auspicious 4-Digit Number Plate Combinations:
            </span>
            <div className="flex flex-wrap gap-2">
              {data.recommendedCombinations.map((combo) => (
                <span key={combo} className="px-3 py-1.5 rounded-lg bg-[#0B132B] text-[#FDFBF7] text-xs font-mono font-bold">
                  {combo}
                </span>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Interactive Registration Number Plate Checker */}
      <Card variant="default" className="border-t-2 border-t-[#0B132B]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-[#0B132B] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#B8860B]" /> Vehicle Registration Number Plate Checker
            </h4>
            <p className="text-xs text-[#526071] mt-0.5">
              Enter any preferred vehicle registration number to calculate its Chaldean compatibility score.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={customPlate}
              onChange={(e) => setCustomPlate(e.target.value)}
              placeholder="e.g. KA 01 EQ 5555"
              className="px-3 py-2 bg-[#FFFFFF] border border-[#CBD5E1] rounded-lg text-sm font-mono font-bold text-[#0B132B] uppercase tracking-wider focus:outline-none focus:border-[#0B132B]"
            />
          </div>
        </div>

        {plateScoreResult && (
          <div className="mt-4 p-3 rounded-lg bg-[#F4EFE6] border border-[#EAE5DC] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              {plateScoreResult.score >= 80 ? (
                <CheckCircle className="w-4 h-4 text-emerald-600" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-600" />
              )}
              <div>
                <span className="font-bold text-[#0B132B]">{plateScoreResult.status}</span>
                <span className="text-[#526071] block text-[11px] font-mono">{plateScoreResult.breakdown}</span>
              </div>
            </div>
            <div className="font-mono text-sm font-bold text-[#0B132B]">
              {plateScoreResult.score} / 100
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
