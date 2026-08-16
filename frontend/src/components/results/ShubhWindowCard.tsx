import React from 'react';
import { ShubhWindow } from '../../lib/types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { formatDate } from '../../lib/formatters';
import { Calendar, Clock, Star, CheckCircle2 } from 'lucide-react';

interface ShubhWindowCardProps {
  windows: ShubhWindow[];
}

export function ShubhWindowCard({ windows }: ShubhWindowCardProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-serif-luxury text-2xl text-[#0B132B] font-bold">1. Personalised Shubh Delivery Window</h3>
          <p className="text-xs text-[#526071] mt-0.5">
            Ranked daytime Muhurat windows scored via Panchang purity, planetary transits, and Lagna compatibility.
          </p>
        </div>
        <Badge variant="gold">Top Pick Muhurat</Badge>
      </div>

      <div className="space-y-4">
        {windows.map((win) => {
          return (
            <Card
              key={win.id}
              variant={win.isTopPick ? 'gold' : 'default'}
              className={`relative overflow-hidden ${
                win.isTopPick ? 'border-[#C5A059] shadow-md' : 'border-[#EAE5DC]'
              }`}
            >
              {win.isTopPick && (
                <div className="absolute top-0 right-0 bg-[#0B132B] text-[#FDFBF7] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-lg flex items-center gap-1 shadow-sm">
                  <Star className="w-3 h-3 text-[#C5A059] fill-[#C5A059]" /> Most Auspicious
                </div>
              )}

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#EAE5DC] pb-4 mb-4">
                <div>
                  <h4 className="text-lg font-bold text-[#0B132B] flex items-center gap-2 font-serif-luxury">
                    {win.title}
                  </h4>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#526071] mt-1">
                    <span className="flex items-center gap-1 text-[#0B132B] font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-[#B8860B]" /> {formatDate(win.startDate)}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[#0B132B]">
                      <Clock className="w-3.5 h-3.5 text-[#B8860B]" /> {win.startTime} – {win.endTime}
                    </span>
                    <span>({win.vara})</span>
                  </div>
                </div>

                <div className="self-start md:self-auto px-4 py-2 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-900 flex flex-col items-center">
                  <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider">Muhurat Score</span>
                  <span className="text-2xl font-bold font-mono text-emerald-800">{win.score} / 100</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs mb-4">
                <div className="p-2.5 rounded-lg bg-[#F4EFE6] border border-[#EAE5DC]">
                  <span className="text-[10px] text-[#526071] uppercase tracking-wider block">Tithi</span>
                  <span className="font-semibold text-[#0B132B]">{win.tithi}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#F4EFE6] border border-[#EAE5DC]">
                  <span className="text-[10px] text-[#526071] uppercase tracking-wider block">Nakshatra</span>
                  <span className="font-semibold text-[#B8860B]">{win.nakshatra}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#F4EFE6] border border-[#EAE5DC]">
                  <span className="text-[10px] text-[#526071] uppercase tracking-wider block">Weekday</span>
                  <span className="font-semibold text-[#0B132B]">{win.vara}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#F4EFE6] border border-[#EAE5DC]">
                  <span className="text-[10px] text-[#526071] uppercase tracking-wider block">Lagna Aspect</span>
                  <span className="font-semibold text-[#0B132B]">{win.lagna}</span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-[#526071]">
                <span className="text-[11px] uppercase font-bold text-[#0B132B] tracking-wider block">Astrological Rationale:</span>
                {win.reasoning.map((reason, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B8860B] shrink-0 mt-0.5" />
                    <span className="text-[#1E242B]">{reason}</span>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
