import React, { useState } from 'react'
import { Phone, MessageSquare, MapPin } from 'lucide-react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutSection from './components/AboutSection'
import ServicesSection from './components/ServicesSection'
import WhyChooseUs from './components/WhyChooseUs'
import BuyPropertyForm from './components/BuyPropertyForm'
import SellPropertyForm from './components/SellPropertyForm'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import WhatsAppFloatingCTA from './components/WhatsAppFloatingCTA'
import { COMPANY_INFO } from './data/companyInfo'

export default function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [buyerPropertyType, setBuyerPropertyType] = useState('Residential')

  const handleNavigate = (sectionId, propertyType = null) => {
    setActiveSection(sectionId)

    if (propertyType) {
      setBuyerPropertyType(propertyType)
    }

    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const targetElement = document.getElementById(sectionId)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleServiceSelect = (serviceType) => {
    if (serviceType === 'Residential' || serviceType === 'Commercial') {
      setBuyerPropertyType(serviceType)
      handleNavigate('buy', serviceType)
    } else {
      // Advisory
      handleNavigate('contact')
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-slate-800 selection:bg-[#D4AF37]/30 selection:text-[#0A192F]">
      
      {/* Top Notification / Trust Bar */}
      <div className="bg-[#0A192F] text-slate-300 text-xs py-2 px-4 border-b border-white/10 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-[#F3DF8A]">
              Square Feet Realty
            </span>
            <span className="text-white/30">•</span>
            <span className="text-slate-200">
              "{COMPANY_INFO.taglineHindi}"
            </span>
            <span className="text-white/30">•</span>
            <span className="text-slate-400">
              {COMPANY_INFO.taglineEnglish}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="flex items-center gap-1.5 hover:text-[#F3DF8A] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>{COMPANY_INFO.phoneDisplay}</span>
            </a>
            <span className="text-white/30">|</span>
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Sticky Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <Hero onNavigate={handleNavigate} />

        {/* About Us & Our Approach */}
        <AboutSection />

        {/* Our Services (Residential, Commercial, Advisory) */}
        <ServicesSection onSelectService={handleServiceSelect} />

        {/* Why Choose Square Feet Realty (6 Icon Grid) */}
        <WhyChooseUs />

        {/* Buy Property Dedicated Enquiry Form */}
        <BuyPropertyForm initialPropertyType={buyerPropertyType} />

        {/* Sell Property Dedicated Owner Submission Form */}
        <SellPropertyForm />

        {/* Contact & Service Areas */}
        <ContactSection onNavigate={handleNavigate} />

      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Unobtrusive Floating WhatsApp CTA */}
      <WhatsAppFloatingCTA />

    </div>
  )
}
