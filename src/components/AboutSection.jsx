import React from 'react'
import { ShieldCheck, Compass, Users2, Eye, MapPin, CheckCircle2 } from 'lucide-react'
import { COMPANY_INFO } from '../data/companyInfo'

export default function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-24 bg-[#FAF8F5] relative overflow-hidden">
      {/* Decorative architectural pattern background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0A192F]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Pill */}
        <div className="flex items-center gap-2 mb-3">
          <div className="h-0.5 w-8 bg-[#C59B27]"></div>
          <span className="text-xs sm:text-sm font-bold tracking-widest text-[#C59B27] uppercase">
            About Square Feet Realty
          </span>
        </div>

        {/* Heading */}
        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A192F] tracking-tight">
            Your Trusted Partner in Real Estate
          </h2>
          <p className="mt-2 text-sm sm:text-base font-semibold text-[#8B6E16]">
            {COMPANY_INFO.taglineHindi} — {COMPANY_INFO.taglineEnglish}
          </p>
        </div>

        {/* Grid: Story & Visuals */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Description & Approach */}
          <div className="lg:col-span-7 space-y-8">
            {/* Company Description */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                Square Feet Realty is a professionally managed real estate agency providing reliable Sale, Purchase and Rental solutions across Chandigarh, Mohali, Zirakpur and the Tricity region.
              </p>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                We understand that every property decision is important — whether it is buying your first home, selling an existing property, finding the right investment, or renting a residential or commercial space. Our approach is therefore focused on understanding our client’s exact requirements and providing honest guidance, relevant property options and personalised assistance.
              </p>

              {/* Service Regions Tag list */}
              <div className="pt-4 border-t border-slate-100">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C59B27]" />
                  Active Region Coverage:
                </p>
                <div className="flex flex-wrap gap-2">
                  {COMPANY_INFO.serviceRegions.map((region) => (
                    <span
                      key={region}
                      className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200/70"
                    >
                      {region}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Our Approach Card */}
            <div className="bg-gradient-to-br from-[#0A192F] to-[#112240] text-white p-6 sm:p-8 rounded-2xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Compass className="w-32 h-32 text-white" />
              </div>

              <div className="relative z-10 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#F3DF8A] text-xs font-bold uppercase tracking-wider">
                  <Compass className="w-3.5 h-3.5" />
                  Our Approach
                </div>
                
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {COMPANY_INFO.ourApproach.heading}
                </h3>
                
                <div className="space-y-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                  <p>
                    We believe real estate is built on trust, transparency and relationships.
                  </p>
                  <p>
                    Our team works with a client-first approach, keeping communication clear and ensuring that every property requirement receives the right attention. We aim to connect buyers, sellers, landlords and tenants with suitable opportunities while making the overall property experience smooth and professional.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visuals & Our Vision Card */}
          <div className="lg:col-span-5 space-y-6">
            {/* Visual Image Card with Handover */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 group">
              <img
                src="/images/keys-handover.jpg"
                alt="Kar Lo Chaabi Mutthi Mein - Property handover at Square Feet Realty"
                className="w-full h-72 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-white/50 shadow-md">
                  <p className="text-xs font-bold text-[#8B6E16] uppercase tracking-wider">Signature Promise</p>
                  <p className="text-sm font-bold text-[#0A192F] mt-0.5">"{COMPANY_INFO.taglineHindi}"</p>
                  <p className="text-xs text-slate-500 mt-0.5">Handing over the keys to your dream property with complete transparency.</p>
                </div>
              </div>
            </div>

            {/* Our Vision Card */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border-l-4 border-l-[#C59B27] border border-slate-200/80 shadow-md">
              <div className="flex items-center gap-2 text-xs font-bold text-[#C59B27] uppercase tracking-wider mb-2">
                <Eye className="w-4 h-4" />
                Our Vision
              </div>
              <blockquote className="text-slate-800 font-serif-luxury text-lg sm:text-xl italic leading-relaxed">
                "{COMPANY_INFO.ourVision}"
              </blockquote>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-slate-700">Square Feet Realty</span>
                <span>Chandigarh • Mohali • Zirakpur</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
