import React from 'react';
import { VehicleColourOutput } from '../../lib/types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Palette, AlertTriangle } from 'lucide-react';

interface ColourCardProps {
  data: VehicleColourOutput;
}

export function ColourCard({ data }: ColourCardProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-serif-luxury text-2xl text-[#0B132B] font-bold">3. Auspicious Vehicle Colour</h3>
        <p className="text-xs text-[#526071] mt-0.5">
          Astrological color matrix mapped to your Moon sign (Rashi), Lagna lord, and ruling planet affinity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Recommended Auspicious Colours */}
        <Card variant="gold" className="space-y-3">
          <div className="flex items-center justify-between border-b border-[#EAE5DC] pb-2">
            <h4 className="text-sm font-bold text-[#0B132B] flex items-center gap-2">
              <Palette className="w-4 h-4 text-[#B8860B]" /> Recommended Auspicious Shades
            </h4>
            <Badge variant="emerald">Harmonious</Badge>
          </div>

          <div className="space-y-3">
            {data.recommendedColours.map((colour) => (
              <div key={colour.name} className="p-3 rounded-lg bg-[#F4EFE6] border border-[#EAE5DC] flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-full border-2 border-[#CBD5E1] shrink-0 shadow-sm mt-0.5"
                  style={{ backgroundColor: colour.hex }}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#0B132B]">{colour.name}</span>
                    {colour.isPrimaryChoice && (
                      <span className="text-[10px] font-bold bg-[#0B132B] text-[#FDFBF7] px-2 py-0.5 rounded">Primary Choice</span>
                    )}
                  </div>
                  <span className="text-[11px] text-[#B8860B] block font-semibold">{colour.rashiAffinity}</span>
                  <p className="text-xs text-[#526071] mt-1 leading-snug">{colour.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Avoided Colours */}
        <Card variant="default" className="space-y-3">
          <div className="flex items-center justify-between border-b border-[#EAE5DC] pb-2">
            <h4 className="text-sm font-bold text-[#0B132B] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600" /> Colours to Avoid
            </h4>
            <Badge variant="amber">Incompatible</Badge>
          </div>

          <div className="space-y-3">
            {data.avoidColours.map((colour) => (
              <div key={colour.name} className="p-3 rounded-lg bg-[#F4EFE6]/60 border border-[#EAE5DC] flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-full border border-slate-300 shrink-0 opacity-80 mt-0.5"
                  style={{ backgroundColor: colour.hex }}
                />
                <div>
                  <span className="text-sm font-bold text-[#0B132B] block">{colour.name}</span>
                  <span className="text-[11px] text-rose-700 block font-semibold">{colour.rashiAffinity}</span>
                  <p className="text-xs text-[#526071] mt-1 leading-snug">{colour.description}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-[#526071] border-t border-[#EAE5DC] pt-3 leading-normal">
            <span className="font-bold text-[#0B132B]">Astrological Note:</span> {data.astroRationale}
          </p>
        </Card>
      </div>
    </div>
  );
}
