'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, Menu, X } from 'lucide-react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="no-print border-b border-[#E8E3DA] bg-[#FDFBF7]/90 backdrop-blur-md sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Left: Brand Logo & Title */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-full bg-[#0B132B] flex items-center justify-center text-[#C5A059] shadow-sm group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5 text-[#C5A059] transition-transform duration-500 group-hover:rotate-45" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif-luxury text-xl font-bold tracking-wider text-[#0B132B] group-hover:text-[#B8860B] transition-colors">
              ASTROLIVE VAHAN
            </span>
            <span className="text-[9px] tracking-widest uppercase text-[#B8860B] font-semibold">
              Personalised Vehicle Astrology
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wider uppercase text-[#526071]">
          <Link href="#how-it-works" className="hover:text-[#0B132B] transition-colors">
            How It Works
          </Link>
          <Link href="#insights" className="hover:text-[#0B132B] transition-colors">
            The Five Insights
          </Link>
          <Link href="/patra/mock-id" className="hover:text-[#0B132B] transition-colors">
            Vahan Patra
          </Link>
        </nav>

        {/* Right CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/calculate"
            className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#0B132B] text-[#FDFBF7] rounded-lg hover:bg-[#1E242B] hover:shadow-md transition-all duration-300"
          >
            Discover My Vahan
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#0B132B] hover:bg-[#F4EFE6] rounded-lg transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E8E3DA] bg-[#FDFBF7] px-4 py-6 space-y-4 shadow-lg animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col gap-3 text-sm font-semibold tracking-wide text-[#0B132B]">
            <Link
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[#E8E3DA]"
            >
              How It Works
            </Link>
            <Link
              href="#insights"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[#E8E3DA]"
            >
              The Five Insights
            </Link>
            <Link
              href="/patra/mock-id"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[#E8E3DA]"
            >
              Sample Vahan Patra
            </Link>
          </nav>

          <Link
            href="/calculate"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full py-3 text-center text-xs font-bold uppercase tracking-wider bg-[#0B132B] text-[#FDFBF7] rounded-lg shadow-md"
          >
            Discover My Vahan →
          </Link>
        </div>
      )}
    </header>
  );
}
