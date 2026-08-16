import React from 'react';
import { DirectionOutput } from '../../lib/types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Compass, Navigation, MapPin, Clock } from 'lucide-react';

interface DirectionMapProps {
  data: DirectionOutput;
}

export function DirectionMap({ data }: DirectionMapProps) {
  const directions = [
    { label: 'NW', angle: 315, active: data.primaryDirection === 'North-West' },
    { label: 'N', angle: 0, active: data.primaryDirection === 'North' },
    { label: 'NE', angle: 45, active: data.primaryDirection === 'North-East' },
    { label: 'W', angle: 270, active: data.primaryDirection === 'West' },
    { label: 'E', angle: 90, active: data.primaryDirection === 'East' },
    { label: 'SW', angle: 225, active: false },
    { label: 'S', angle: 180, active: false },
    { label: 'SE', angle: 135, active: data.primaryDirection === 'South-East' }
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-serif-luxury text-2xl text-[#0B132B] font-bold">4. First Drive Direction</h3>
        <p className="text-xs text-[#526071] mt-0.5">
          Vastu Ashtadisha alignment for your first drive from the dealership to invoke auspicious prosperity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Vastu Compass Visualizer */}
        <Card variant="gold" className="md:col-span-1 flex flex-col items-center justify-center p-6 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-[#B8860B] mb-4 block">
            Vastu Ashtadisha Compass
          </span>

          <div className="relative w-44 h-44 rounded-full border-2 border-[#C5A059] bg-[#F4EFE6] flex items-center justify-center shadow-md">
            <div className="w-12 h-12 rounded-full bg-[#0B132B] text-[#FDFBF7] flex items-center justify-center z-10 shadow-md">
              <Compass className="w-6 h-6 text-[#C5A059]" />
            </div>

            {directions.map((d) => {
              const rad = (d.angle - 90) * (Math.PI / 180);
              const radius = 68;
              const x = Math.cos(rad) * radius;
              const y = Math.sin(rad) * radius;

              return (
                <div
                  key={d.label}
                  className={`absolute w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                    d.active
                      ? 'bg-[#0B132B] text-[#FDFBF7] scale-125 shadow-lg border-2 border-[#C5A059]'
                      : 'bg-[#FFFFFF] text-[#526071] border border-[#EAE5DC]'
                  }`}
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                >
                  {d.label}
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-[#EAE5DC] w-full text-center">
            <span className="text-xs text-[#526071] block">Primary Auspicious Heading</span>
            <span className="text-lg font-bold font-serif-luxury text-[#0B132B]">{data.primaryDirection}</span>
          </div>
        </Card>

        {/* Detailed Direction Details */}
        <Card variant="default" className="md:col-span-2 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[#EAE5DC] pb-2">
              <h4 className="text-sm font-bold text-[#0B132B] flex items-center gap-2">
                <Navigation className="w-4 h-4 text-[#B8860B]" /> {data.vastuSymbol}
              </h4>
              <Badge variant="gold">Vastu Aligned</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-[#F4EFE6] border border-[#EAE5DC]">
                <span className="text-[#526071] uppercase tracking-wider text-[10px] block font-bold">Auspicious Hora Timing</span>
                <span className="font-bold text-[#0B132B] flex items-center gap-1 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-[#B8860B]" /> {data.auspiciousHora}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-[#F4EFE6] border border-[#EAE5DC]">
                <span className="text-[#526071] uppercase tracking-wider text-[10px] block font-bold">Recommended First Stop</span>
                <span className="font-bold text-[#0B132B] flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#B8860B]" /> {data.firstDestination}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-[#F4EFE6]/60 border border-[#EAE5DC] text-xs text-[#526071] space-y-1">
              <span className="text-[11px] font-bold text-[#0B132B] uppercase tracking-wider block">First Drive Protocol:</span>
              <p className="leading-relaxed text-[#1E242B]">{data.driveGuidance}</p>
            </div>
          </div>

          <div className="text-[11px] text-[#526071] border-t border-[#EAE5DC] pt-3">
            <span className="font-bold text-[#0B132B]">Vastu Wisdom:</span> Driving in the direction of Ishan Kona (North-East) or East attracts solar vitality, smooth transit, and accident-free journeys.
          </div>
        </Card>
      </div>
    </div>
  );
}
