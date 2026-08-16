import React from 'react';
import { VahanPatraCertificate } from '../../lib/types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import Link from 'next/link';
import { Printer, Share2, Award, Sparkles, ShieldCheck } from 'lucide-react';

interface VahanPatraViewProps {
  data: VahanPatraCertificate;
  shareToken: string;
}

export function VahanPatraView({ data, shareToken }: VahanPatraViewProps) {
  const [copied, setCopied] = React.useState(false);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}/patra/${shareToken}`;
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-serif-luxury text-2xl text-[#0B132B] font-bold">5. Vahan Patra Digital Certificate</h3>
          <p className="text-xs text-[#526071] mt-0.5">
            Your authenticated digital certificate summarizing auspicious timings, mantras, and Vastu orientation.
          </p>
        </div>

        <div className="flex items-center gap-2 no-print">
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="w-3.5 h-3.5 mr-1.5" />
            {copied ? 'Copied Link!' : 'Share'}
          </Button>
          <Link href={`/patra/${shareToken}`} target="_blank">
            <Button variant="primary" size="sm">
              <Printer className="w-3.5 h-3.5 mr-1.5" />
              Full Certificate / Print
            </Button>
          </Link>
        </div>
      </div>

      <Card variant="gold" className="relative p-8 overflow-hidden bg-[#FDFBF7] border-2 border-[#C5A059] text-[#1E242B] shadow-md">
        <div className="flex flex-col items-center text-center space-y-2 pb-6 border-b-2 border-[#C5A059]/40 relative z-10">
          <div className="w-12 h-12 rounded-full bg-[#0B132B] text-[#FDFBF7] flex items-center justify-center mb-1 shadow-sm">
            <Award className="w-6 h-6 text-[#C5A059]" />
          </div>
          <span className="text-[11px] tracking-widest font-mono uppercase text-[#B8860B] font-bold">
            AstroLive Vahan Authentication
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#0B132B] font-bold tracking-wide">
            VAHAN PATRA
          </h2>
          <p className="text-xs text-[#526071] italic max-w-md">
            &ldquo;Personalised Auspicious Vehicle Delivery Certificate & Blessing Protocol&rdquo;
          </p>
          <span className="text-[10px] font-mono text-[#526071]">ID: {data.certificateId}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 border-b border-[#EAE5DC] text-xs relative z-10">
          <div className="space-y-2">
            <div className="flex justify-between border-b border-[#EAE5DC] pb-1">
              <span className="text-[#526071]">Vehicle Owner:</span>
              <span className="font-bold text-[#0B132B] text-sm">{data.ownerName}</span>
            </div>
            <div className="flex justify-between border-b border-[#EAE5DC] pb-1">
              <span className="text-[#526071]">Vehicle Marque:</span>
              <span className="font-semibold text-[#0B132B]">{data.vehicleModel} ({data.vehicleType})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#526071]">Delivery City:</span>
              <span className="text-[#0B132B] font-medium">{data.deliveryCity}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between border-b border-[#EAE5DC] pb-1">
              <span className="text-[#526071]">Shubh Delivery Window:</span>
              <span className="font-bold text-emerald-800">{data.shubhWindowSummary}</span>
            </div>
            <div className="flex justify-between border-b border-[#EAE5DC] pb-1">
              <span className="text-[#526071]">Lucky Digits:</span>
              <span className="font-mono font-bold text-[#0B132B]">{data.luckyNumberSummary}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#526071]">First Drive Direction:</span>
              <span className="text-[#0B132B] font-semibold">{data.directionSummary}</span>
            </div>
          </div>
        </div>

        <div className="pt-6 space-y-4 text-center relative z-10">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#B8860B] block mb-1">
              Auspicious Vehicle Pooja Mantra
            </span>
            <div className="p-4 rounded-xl bg-[#0B132B] text-[#FDFBF7] border border-[#C5A059] max-w-xl mx-auto shadow-md">
              <p className="font-serif-luxury text-lg text-[#C5A059] font-bold tracking-wider">
                {data.vahanMantra}
              </p>
              <p className="text-xs text-slate-300 mt-1 italic">
                &ldquo;{data.vahanMantraMeaning}&rdquo;
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#526071]">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" /> Recommended Pooja Timing: <strong className="text-[#0B132B]">{data.auspiciousPoojaTime}</strong>
            </span>
            <span className="flex items-center gap-1.5 text-emerald-800 font-semibold">
              <ShieldCheck className="w-4 h-4" /> {data.validityStatus}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
