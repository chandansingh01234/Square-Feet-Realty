import React from 'react'
import { KeyRound, Mail, Phone, Globe, MessageSquare, MapPin, ArrowUp } from 'lucide-react'
import { COMPANY_INFO } from '../data/companyInfo'

export default function Footer({ onNavigate }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#050D1A] text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          
          {/* Brand & Slogans Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0A192F] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] shadow-md">
                <KeyRound className="w-5 h-5 -rotate-45" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white font-serif-luxury">
                  Square Feet <span className="text-[#C59B27] font-sans font-semibold">Realty</span>
                </span>
              </div>
            </div>

            {/* Tagline Prominence */}
            <div className="space-y-1.5">
              <p className="text-sm font-bold text-[#F3DF8A] tracking-wide">
                "{COMPANY_INFO.taglineHindi}"
              </p>
              <div className="inline-block px-2.5 py-0.5 rounded-md bg-white/10 text-xs font-semibold text-slate-200 border border-white/15">
                {COMPANY_INFO.taglinePill}
              </div>
              <p className="text-xs text-slate-300 font-medium">
                {COMPANY_INFO.taglineEnglish}
              </p>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm pt-2">
              Professionally managed real estate advisory delivering honest guidance, verified options, and end-to-end transaction assistance across the Tricity.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#F3DF8A] transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#F3DF8A] transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-[#F3DF8A] transition-colors"
                >
                  Our Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('buy')}
                  className="hover:text-[#F3DF8A] transition-colors font-medium text-slate-200"
                >
                  Buy Property (Buyer Enquiry)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('sell')}
                  className="hover:text-[#F3DF8A] transition-colors font-medium text-slate-200"
                >
                  Sell Property (Owner Submission)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#F3DF8A] transition-colors"
                >
                  Contact & Assistance
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Regions Info */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Contact Information
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="hover:text-[#F3DF8A] transition-colors break-all"
                >
                  {COMPANY_INFO.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="hover:text-[#F3DF8A] transition-colors"
                >
                  {COMPANY_INFO.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 transition-colors"
                >
                  WhatsApp: +91 {COMPANY_INFO.phoneNumeric}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a
                  href={COMPANY_INFO.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F3DF8A] transition-colors"
                >
                  {COMPANY_INFO.websiteDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2.5 pt-1 text-slate-400">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>Chandigarh, Mohali, Zirakpur and the Tricity region</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <p>© {new Date().getFullYear()} Square Feet Realty. All rights reserved.</p>
            <p className="mt-0.5 text-[11px] text-slate-600">
              Sale • Purchase • Rent across Chandigarh, Mohali, Zirakpur and Tricity.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
            aria-label="Back to Top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  )
}
