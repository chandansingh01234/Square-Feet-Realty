import React from 'react'
import { KeyRound, ArrowRight, ShieldCheck, MapPin, Building, Sparkles } from 'lucide-react'
import { COMPANY_INFO } from '../data/companyInfo'

export default function Hero({ onNavigate }) {
  return (
    <section className="relative overflow-hidden bg-[#0A192F] text-white">
      {/* Background Image with Ambient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-tricity.jpg"
          alt="Modern luxury residential architecture in Chandigarh Tricity"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          loading="eager"
        />
        {/* Subtle Dark Luxury Gradients for Maximum Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A192F]/95 via-[#0A192F]/85 to-[#0A192F]/65 backdrop-brightness-90"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-transparent opacity-80"></div>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 lg:pt-32 pb-20 sm:pb-28">
        <div className="max-w-3xl">
          
          {/* Tagline Pill & Brand Highlight */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#D4AF37]/50 shadow-inner mb-6 animate-fadeIn">
            <span className="flex h-2 w-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#F3DF8A]">
              {COMPANY_INFO.taglinePill}
            </span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/80 text-xs hidden sm:inline-block">
              Chandigarh • Mohali • Zirakpur
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight sm:leading-[1.15]">
            Find the Right Property with the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3DF8A] via-[#D4AF37] to-[#E5C365]">
              Right Guidance
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="mt-5 text-base sm:text-xl text-slate-200 leading-relaxed font-normal max-w-2xl">
            Your trusted partner for buying, selling and property assistance across Chandigarh, Mohali, Zirakpur and the Tricity region.
          </p>

          {/* Subtagline: Right Property. Right Guidance. Right Connection. */}
          <div className="mt-3 flex items-center gap-2 text-xs sm:text-sm text-[#D4AF37]/90 font-medium tracking-wide">
            <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span>{COMPANY_INFO.taglineEnglish}</span>
          </div>

          {/* CTA Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={() => onNavigate('buy')}
              className="btn-gold px-7 py-3.5 rounded-xl text-base font-bold shadow-lg flex items-center justify-center gap-2.5 transition-all group"
            >
              <span>Find a Property</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('sell')}
              className="px-7 py-3.5 rounded-xl text-base font-semibold text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 hover:border-[#D4AF37] transition-all flex items-center justify-center gap-2.5 shadow-md"
            >
              <KeyRound className="w-4 h-4 text-[#D4AF37]" />
              <span>Sell Your Property</span>
            </button>
          </div>

          {/* Tricity Service Highlights Strip */}
          <div className="mt-12 pt-8 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Chandigarh & Mohali</span>
            </div>
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Zirakpur & Panchkula</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Transparent Process</span>
            </div>
            <div className="flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Sale • Purchase • Rent</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
