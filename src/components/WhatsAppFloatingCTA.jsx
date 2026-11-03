import React, { useState } from 'react'
import { X } from 'lucide-react'
import WhatsAppIcon from './WhatsAppIcon'
import { COMPANY_INFO } from '../data/companyInfo'

export default function WhatsAppFloatingCTA() {
  const [showTooltip, setShowTooltip] = useState(false)

  const whatsAppDirectUrl = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
    `Hello Square Feet Realty! I would like to enquire about property services in Chandigarh / Mohali / Zirakpur.`
  )}`

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Mini Tooltip */}
      {showTooltip && (
        <div className="mb-2 bg-white text-slate-800 text-xs px-3.5 py-2 rounded-xl shadow-xl border border-slate-200 flex items-center gap-2 animate-fadeIn max-w-[220px]">
          <div>
            <p className="font-bold text-[#0A192F]">Chat with Us</p>
            <p className="text-[11px] text-slate-500">Fast assistance on WhatsApp</p>
          </div>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
            aria-label="Close tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main WhatsApp Button */}
      <a
        href={whatsAppDirectUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 group relative focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 cursor-pointer"
        aria-label="Chat with Us on WhatsApp"
        title="Chat with Us on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 pointer-events-none">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
        </span>
        <WhatsAppIcon className="w-7 h-7 text-white" />
      </a>
    </div>
  )
}
