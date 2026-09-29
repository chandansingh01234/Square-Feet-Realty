import React from 'react'
import { Home, Building2, Handshake, ArrowRight, CheckCircle2 } from 'lucide-react'
import { COMPANY_INFO } from '../data/companyInfo'

export default function ServicesSection({ onSelectService }) {
  const serviceIcons = {
    residential: Home,
    commercial: Building2,
    advisory: Handshake
  }

  return (
    <section id="services" className="py-20 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="h-0.5 w-6 bg-[#C59B27]"></div>
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#C59B27] uppercase">
              Our Services
            </span>
            <div className="h-0.5 w-6 bg-[#C59B27]"></div>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A192F] tracking-tight">
            Comprehensive Real Estate Solutions
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Tailored property assistance for buyers, sellers, landlords and tenants across Chandigarh, Mohali, Zirakpur and the Tricity region.
          </p>
        </div>

        {/* 3 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {COMPANY_INFO.services.map((service) => {
            const IconComponent = serviceIcons[service.id] || Home

            return (
              <div
                key={service.id}
                className="bg-[#FAF8F5] rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs card-hover flex flex-col group"
              >
                {/* Image Header with Badge */}
                <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-900">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/80 via-transparent to-transparent"></div>
                  
                  {/* Category Pill */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#0A192F]/90 text-[#F3DF8A] border border-[#D4AF37]/40 shadow-sm backdrop-blur-md">
                      {service.badge}
                    </span>
                  </div>

                  {/* Service Icon Badge */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                    <div className="w-10 h-10 rounded-xl bg-[#D4AF37] flex items-center justify-center text-[#0A192F] shadow-md">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold text-white tracking-wide drop-shadow-md">
                      {service.title}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-[#0A192F] mb-2.5">
                      {service.title}
                    </h3>
                    
                    {/* Exact description from prompt */}
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features list */}
                    <div className="mt-5 space-y-2 pt-4 border-t border-slate-200/60">
                      {service.features.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card CTA Button */}
                  <button
                    onClick={() => onSelectService(service.targetType)}
                    className="w-full py-3 px-4 rounded-xl text-sm font-bold text-[#0A192F] bg-white hover:bg-[#0A192F] hover:text-white border border-slate-300 hover:border-[#0A192F] transition-all flex items-center justify-center gap-2 group/btn shadow-xs"
                  >
                    <span>{service.ctaLabel}</span>
                    <ArrowRight className="w-4 h-4 text-[#C59B27] group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#0A192F] text-white flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#D4AF37]/30 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-bold text-[#D4AF37] tracking-wider uppercase">
              Looking for something specific?
            </span>
            <h4 className="text-xl sm:text-2xl font-bold">
              Custom Requirements & Private Property Consultations
            </h4>
            <p className="text-sm text-slate-300">
              Tell our property coordinator your exact budget and location criteria for tailored recommendations.
            </p>
          </div>
          <button
            onClick={() => onSelectService('Residential')}
            className="btn-gold px-6 py-3 rounded-xl text-sm font-bold shrink-0 shadow-md flex items-center gap-2"
          >
            <span>Submit Your Requirement</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  )
}
