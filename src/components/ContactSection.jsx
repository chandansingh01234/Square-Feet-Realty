import React from 'react'
import { 
  Mail, 
  Phone, 
  MessageSquare, 
  Globe, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  Sparkles
} from 'lucide-react'
import { COMPANY_INFO } from '../data/companyInfo'

export default function ContactSection({ onNavigate }) {
  const whatsAppDirectUrl = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
    `Hello Square Feet Realty! I would like to enquire about properties in Chandigarh / Mohali / Zirakpur / Tricity. Please connect with me.`
  )}`

  return (
    <section id="contact" className="py-20 sm:py-24 bg-[#0A192F] text-white relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="h-0.5 w-6 bg-[#D4AF37]"></div>
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#F3DF8A] uppercase">
              Get in Touch
            </span>
            <div className="h-0.5 w-6 bg-[#D4AF37]"></div>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Let's Find the Right Property for You
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300">
            {COMPANY_INFO.taglineHindi} — Your trusted advisory team across Chandigarh, Mohali, Zirakpur and the Tricity region.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          
          {/* 1. Mobile Phone */}
          <a
            href={`tel:${COMPANY_INFO.phoneRaw}`}
            className="p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#D4AF37]/50 backdrop-blur-sm transition-all duration-300 flex flex-col justify-between group shadow-lg"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#F3DF8A] mb-4 group-hover:scale-110 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Direct Call</p>
              <h3 className="text-lg font-bold text-white mt-1 group-hover:text-[#F3DF8A] transition-colors">
                {COMPANY_INFO.phoneDisplay}
              </h3>
              <p className="text-xs text-slate-400 mt-2">
                Available for property discussions & site visits.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center text-xs font-semibold text-[#D4AF37]">
              <span>Call Now</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

          {/* 2. WhatsApp Direct */}
          <a
            href={whatsAppDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-2xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 hover:border-emerald-400 backdrop-blur-sm transition-all duration-300 flex flex-col justify-between group shadow-lg"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366] mb-4 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-5 h-5 fill-current" />
              </div>
              <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">WhatsApp Connect</p>
              <h3 className="text-lg font-bold text-white mt-1 group-hover:text-emerald-300 transition-colors">
                +91 {COMPANY_INFO.phoneNumeric}
              </h3>
              <p className="text-xs text-slate-400 mt-2">
                Instant requirement sharing & photo updates.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center text-xs font-semibold text-[#25D366]">
              <span>Chat on WhatsApp</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

          {/* 3. Email */}
          <a
            href={`mailto:${COMPANY_INFO.email}`}
            className="p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#D4AF37]/50 backdrop-blur-sm transition-all duration-300 flex flex-col justify-between group shadow-lg"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#F3DF8A] mb-4 group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Inquiry</p>
              <h3 className="text-sm sm:text-base font-bold text-white mt-1 break-all group-hover:text-[#F3DF8A] transition-colors">
                {COMPANY_INFO.email}
              </h3>
              <p className="text-xs text-slate-400 mt-2">
                Send official property requirements or proposals.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center text-xs font-semibold text-[#D4AF37]">
              <span>Send Email</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

          {/* 4. Official Website */}
          <a
            href={COMPANY_INFO.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#D4AF37]/50 backdrop-blur-sm transition-all duration-300 flex flex-col justify-between group shadow-lg"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#F3DF8A] mb-4 group-hover:scale-110 transition-transform">
                <Globe className="w-5 h-5" />
              </div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Official Web</p>
              <h3 className="text-base font-bold text-white mt-1 group-hover:text-[#F3DF8A] transition-colors">
                {COMPANY_INFO.websiteDisplay}
              </h3>
              <p className="text-xs text-slate-400 mt-2">
                Tricity's dedicated real estate platform.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center text-xs font-semibold text-[#D4AF37]">
              <span>Visit Portal</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

        </div>

        {/* Service Area Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                Service Coverage Areas
              </div>
              <h3 className="text-2xl font-bold text-white">
                Chandigarh, Mohali, Zirakpur and the Tricity Region
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                We actively facilitate property transactions across all prominent sectors of Chandigarh, Mohali's airport corridor and IT clusters, Zirakpur's high-growth residential belts, Panchkula, and New Chandigarh.
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  'Chandigarh Sectors',
                  'Mohali (SAS Nagar)',
                  'Zirakpur (PR-7 & VIP Rd)',
                  'Panchkula',
                  'New Chandigarh (Mullanpur)',
                  'Kharar',
                  'Airport Road Corridor'
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-slate-200 border border-white/15"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                onClick={() => onNavigate('buy')}
                className="w-full btn-gold py-3 px-5 rounded-xl text-sm font-bold shadow-md flex items-center justify-center gap-2"
              >
                <span>Submit Buyer Requirement</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('sell')}
                className="w-full py-3 px-5 rounded-xl text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 hover:border-[#D4AF37] transition-all flex items-center justify-center gap-2"
              >
                <span>List Property with Us</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
