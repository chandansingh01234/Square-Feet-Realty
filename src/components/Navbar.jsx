import React, { useState, useEffect } from 'react'
import { KeyRound, Menu, X, Phone, ChevronRight } from 'lucide-react'
import { COMPANY_INFO } from '../data/companyInfo'

export default function Navbar({ activeSection, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Our Services' },
    { id: 'buy', label: 'Buy' },
    { id: 'sell', label: 'Sell' },
    { id: 'contact', label: 'Contact' },
  ]

  const handleNavClick = (id) => {
    setMobileMenuOpen(false)
    if (onNavigate) {
      onNavigate(id)
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5 border-b border-slate-200/80'
          : 'bg-white/90 backdrop-blur-sm py-4 border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Tagline */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none focus:ring-2 focus:ring-[#D4AF37] rounded-lg p-1"
            aria-label="Square Feet Realty - Home"
          >
            {/* Custom Logo Emblem */}
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-[#0A192F] to-[#112240] p-0.5 shadow-md flex items-center justify-center border border-[#D4AF37]/40 group-hover:border-[#D4AF37] transition-colors">
              <div className="w-full h-full rounded-[10px] bg-[#0A192F] flex items-center justify-center relative overflow-hidden">
                {/* Architectural square foot grid hint */}
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:6px_6px]"></div>
                <KeyRound className="w-5 h-5 text-[#D4AF37] transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#0A192F] font-serif-luxury">
                  Square Feet <span className="text-[#C59B27] font-sans font-semibold">Realty</span>
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] sm:text-xs font-semibold text-[#8B6E16] bg-[#FDF8E8] px-2 py-0.5 rounded-full border border-[#D4AF37]/30 tracking-wide">
                  {COMPANY_INFO.taglinePill}
                </span>
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3.5 py-2 text-sm font-medium rounded-md transition-colors relative ${
                    isActive
                      ? 'text-[#0A192F] font-semibold'
                      : 'text-slate-600 hover:text-[#0A192F] hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-[#C59B27] rounded-full"></span>
                  )}
                </button>
              )
            })}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('buy')}
              className="px-4 py-2 text-sm font-semibold text-[#0A192F] bg-slate-100/90 hover:bg-slate-200/90 rounded-lg transition-all border border-slate-300/80 shadow-xs hover:border-[#D4AF37]"
            >
              Buy Property
            </button>
            <button
              onClick={() => handleNavClick('sell')}
              className="btn-gold px-4 py-2 text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2"
            >
              <KeyRound className="w-4 h-4" />
              <span>Sell Property</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden gap-2">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="p-2 text-slate-700 hover:text-[#0A192F] hover:bg-slate-100 rounded-lg"
              title="Call Us"
              aria-label="Call Square Feet Realty"
            >
              <Phone className="w-5 h-5 text-[#C59B27]" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-[#0A192F] hover:bg-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Collapsible Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl px-4 pt-3 pb-6 animate-fadeIn">
          <div className="p-3 bg-amber-50/70 border border-amber-200/70 rounded-xl mb-4 text-center">
            <p className="text-xs font-semibold text-[#8B6E16] uppercase tracking-wider">Tricity Property Partner</p>
            <p className="text-sm font-bold text-[#0A192F] mt-0.5">{COMPANY_INFO.taglinePill}</p>
            <p className="text-xs text-slate-500 mt-0.5">{COMPANY_INFO.taglineEnglish}</p>
          </div>

          <div className="space-y-1 mb-4">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium text-left transition-colors ${
                    isActive
                      ? 'bg-slate-100 text-[#0A192F] font-bold border-l-4 border-[#C59B27]'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              )
            })}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
            <button
              onClick={() => handleNavClick('buy')}
              className="w-full py-2.5 px-3 text-center text-sm font-bold text-[#0A192F] bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-300"
            >
              Buy Property
            </button>
            <button
              onClick={() => handleNavClick('sell')}
              className="w-full py-2.5 px-3 text-center text-sm font-bold text-[#0A192F] btn-gold rounded-lg shadow-sm"
            >
              Sell Property
            </button>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="text-[#0A192F] hover:underline"
            >
              {COMPANY_INFO.email}
            </a>
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="font-bold text-[#C59B27] hover:underline"
            >
              {COMPANY_INFO.phoneDisplay}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
