import React from 'react'
import { 
  UserCheck, 
  MapPin, 
  Building, 
  Users, 
  ShieldCheck, 
  CheckCircle,
  KeyRound
} from 'lucide-react'
import { COMPANY_INFO } from '../data/companyInfo'

export default function WhyChooseUs() {
  const iconsMap = {
    professional: UserCheck,
    'local-market': MapPin,
    solutions: Building,
    assistance: Users,
    transparency: ShieldCheck,
    coordination: KeyRound
  }

  return (
    <section className="py-20 sm:py-24 bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="h-0.5 w-6 bg-[#C59B27]"></div>
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#C59B27] uppercase">
              The Square Feet Advantage
            </span>
            <div className="h-0.5 w-6 bg-[#C59B27]"></div>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A192F] tracking-tight">
            Why Choose Square Feet Realty
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            A trustworthy, client-first approach built on local market expertise and complete transparency.
          </p>
        </div>

        {/* 6 Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {COMPANY_INFO.whyChoosePoints.map((point, index) => {
            const Icon = iconsMap[point.id] || CheckCircle

            return (
              <div
                key={point.id}
                className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-xs card-hover flex flex-col justify-between relative group"
              >
                {/* Number Watermark */}
                <div className="absolute top-5 right-6 text-3xl font-extrabold text-slate-100 group-hover:text-[#D4AF37]/20 transition-colors pointer-events-none">
                  0{index + 1}
                </div>

                <div>
                  {/* Icon Emblem */}
                  <div className="w-12 h-12 rounded-xl bg-[#0A192F] text-[#D4AF37] flex items-center justify-center mb-5 group-hover:bg-[#D4AF37] group-hover:text-[#0A192F] transition-all duration-300 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title (Exact item from prompt) */}
                  <h3 className="text-lg font-bold text-[#0A192F] mb-2 leading-snug">
                    {point.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {point.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-[#8B6E16]">
                  <CheckCircle className="w-3.5 h-3.5 text-[#C59B27]" />
                  <span>Verified Standard</span>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
