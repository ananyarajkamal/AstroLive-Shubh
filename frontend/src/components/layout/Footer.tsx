import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="no-print border-t border-[#E8E3DA] bg-[#FDFBF7] text-[#526071] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
          <span className="font-serif-luxury text-xl text-[#0B132B] font-bold tracking-wider">
            ASTROLIVE VAHAN
          </span>
          <p className="text-xs text-[#526071]">
            &ldquo;Your vehicle&apos;s auspicious moment, personalised.&rdquo;
          </p>
        </div>

        <div className="flex items-center gap-6 text-xs font-medium text-[#526071]">
          <Link href="/" className="hover:text-[#0B132B] transition-colors">Home</Link>
          <Link href="/calculate" className="hover:text-[#0B132B] transition-colors">Calculate Vahan</Link>
          <Link href="/patra/mock-id" className="hover:text-[#0B132B] transition-colors">Sample Certificate</Link>
        </div>

        <div className="text-xs text-[#526071] text-center md:text-right">
          <p>© 2026 AstroLive Vahan. All rights reserved.</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Deterministic Panchang & Chaldean Numerology Platform.</p>
        </div>
      </div>
    </footer>
  );
}
