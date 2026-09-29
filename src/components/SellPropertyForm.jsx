import React, { useState } from 'react'
import { 
  Building2, 
  Home, 
  AlertCircle, 
  Send, 
  KeyRound, 
  CheckCircle2, 
  ShieldCheck, 
  MessageSquare,
  MapPin,
  Maximize2,
  BadgeIndianRupee,
  Mail
} from 'lucide-react'
import { COMPANY_INFO } from '../data/companyInfo'
import { 
  isValidIndianPhone, 
  generateSellWhatsAppUrl, 
  BHK_OPTIONS, 
  PROPERTY_STATUS_OPTIONS 
} from '../utils/formHelpers'
import { submitEnquiry } from '../utils/emailService'

export default function SellPropertyForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    primaryPhone: '',
    alternatePhone: '',
    propertyType: 'Residential',
    bhk: '3 BHK',
    propertyStatus: 'Ready to Move - New',
    propertyAddress: '',
    areaSqFt: '',
    areaType: 'Carpet',
    askingPrice: '',
    finalPrice: '',
    keysAvailableWith: 'Owner',
    keyHolderAddress: '',
    keyHolderMobile: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionState, setSubmissionState] = useState({
    submitted: false,
    success: false,
    message: '',
    requiresWhatsAppNotice: false
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Owner details
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Owner Full Name is required.'
    }

    if (!formData.primaryPhone.trim()) {
      newErrors.primaryPhone = 'Primary Contact Number is required.'
    } else if (!isValidIndianPhone(formData.primaryPhone)) {
      newErrors.primaryPhone = 'Please enter a valid 10-digit mobile number (e.g. 9876543210).'
    }

    if (formData.alternatePhone.trim() && !isValidIndianPhone(formData.alternatePhone)) {
      newErrors.alternatePhone = 'Alternate phone must be a valid 10-digit mobile number.'
    }

    // Property details
    if (!formData.propertyAddress.trim()) {
      newErrors.propertyAddress = 'Complete Property Address is required.'
    }

    if (!formData.areaSqFt.toString().trim()) {
      newErrors.areaSqFt = 'Area in square feet is required.'
    } else if (isNaN(Number(formData.areaSqFt)) || Number(formData.areaSqFt) <= 0) {
      newErrors.areaSqFt = 'Please enter a valid numeric area in sq. ft.'
    }

    if (!formData.askingPrice.trim()) {
      newErrors.askingPrice = 'Asking Price is required (e.g. ₹85 Lakhs).'
    }

    if (formData.keyHolderMobile.trim() && !isValidIndianPhone(formData.keyHolderMobile)) {
      newErrors.keyHolderMobile = 'Key holder mobile must be a valid 10-digit number.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) {
      const el = document.getElementById('sell-form-top')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }

    setIsSubmitting(true)

    try {
      const result = await submitEnquiry('SELL_PROPERTY', formData)

      setSubmissionState({
        submitted: true,
        success: result.success,
        isActivationNeeded: !!result.isActivationNeeded,
        message: result.message || 'Thank You for Sharing Your Requirement!',
        requiresWhatsAppNotice: !result.success
      })
    } catch (err) {
      console.error(err)
      setSubmissionState({
        submitted: true,
        success: false,
        message: 'Could not submit property details. Please use WhatsApp for instant connection.',
        requiresWhatsAppNotice: true
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setFormData({
      fullName: '',
      primaryPhone: '',
      alternatePhone: '',
      propertyType: 'Residential',
      bhk: '3 BHK',
      propertyStatus: 'Ready to Move - New',
      propertyAddress: '',
      areaSqFt: '',
      areaType: 'Carpet',
      askingPrice: '',
      finalPrice: '',
      keysAvailableWith: 'Owner',
      keyHolderAddress: '',
      keyHolderMobile: ''
    })
    setSubmissionState({
      submitted: false,
      success: false,
      message: '',
      requiresWhatsAppNotice: false
    })
    setErrors({})
  }

  const whatsAppUrl = generateSellWhatsAppUrl(formData)

  return (
    <section id="sell" className="py-20 sm:py-24 bg-white relative">
      <div id="sell-form-top" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="h-0.5 w-6 bg-[#C59B27]"></div>
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#C59B27] uppercase">
              Property Owners & Sellers
            </span>
            <div className="h-0.5 w-6 bg-[#C59B27]"></div>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A192F] tracking-tight">
            Sell Property with Confidence
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            List your residential or commercial asset with Square Feet Realty. Connect with verified genuine buyers across Chandigarh, Mohali, Zirakpur and Tricity.
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-[#FAF8F5] rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
          
          {/* Top Brand Banner */}
          <div className="bg-gradient-to-r from-[#0A192F] via-[#112240] to-[#0A192F] px-6 sm:px-10 py-5 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#D4AF37]/30">
            <div>
              <p className="text-xs font-semibold text-[#F3DF8A] tracking-wider uppercase">
                {COMPANY_INFO.taglineHindi}
              </p>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5 flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-[#D4AF37]" />
                Submit Your Property for Sale
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>Verified Buyer Network</span>
            </div>
          </div>

          {/* Submission Success State */}
          {submissionState.submitted ? (
            <div className="p-8 sm:p-12 text-center space-y-6 bg-white animate-fadeIn">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto text-[#8B6E16] shadow-inner">
                <CheckCircle2 className="w-10 h-10 text-[#C59B27]" />
              </div>

              {/* Exact required confirmation copy */}
              <div className="space-y-3 max-w-xl mx-auto">
                <h3 className="text-2xl sm:text-3xl font-bold text-[#0A192F]">
                  Thank You for Sharing Your Requirement!
                </h3>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                  Our Property Coordinator will contact you shortly to understand your requirements and assist you with suitable property options.
                </p>
                <p className="text-base font-semibold text-[#8B6E16]">
                  Thank you for choosing Square Feet Realty.
                </p>
              </div>

              {/* Email Delivery Status Banner */}
              {submissionState.isActivationNeeded ? (
                <div className="p-4 bg-amber-50 border border-amber-300 rounded-2xl text-left max-w-lg mx-auto shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>One-Time Gmail Activation Link Sent</span>
                  </div>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    FormSubmit has sent an activation email to <strong className="text-amber-950 font-bold">{COMPANY_INFO.adminEmail}</strong>. Please check your inbox (or Spam/Promotions folder) and click <strong className="underline">"Activate Form"</strong> once. After this one-time click, all future property seller submissions will be emailed directly to your inbox.
                  </p>
                </div>
              ) : (
                <div className="p-3.5 bg-blue-50/80 border border-blue-200/80 rounded-xl text-xs text-blue-900 max-w-lg mx-auto flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Property listing dispatched to coordinator email: <strong>{COMPANY_INFO.adminEmail}</strong></span>
                </div>
              )}

              {/* WhatsApp direct launch option */}
              <div className="pt-6 border-t border-slate-100 max-w-lg mx-auto space-y-4">
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-left">
                  <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    Share Listing Directly via WhatsApp
                  </p>
                  <p className="text-xs text-emerald-900 leading-relaxed">
                    Forward your property details directly to our Property Coordinator on WhatsApp at <span className="font-bold">{COMPANY_INFO.phoneDisplay}</span> to initiate valuation and buyer shortlisting right away.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all"
                  >
                    <MessageSquare className="w-4 h-4 fill-white" />
                    <span>Send via WhatsApp (+91 6284656983)</span>
                  </a>

                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition-colors border border-slate-300"
                  >
                    Submit Another Property
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Main Form */
            <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8 bg-white" noValidate>
              
              {/* SECTION 1: Owner Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                  <span className="w-6 h-6 rounded-full bg-[#0A192F] text-white text-xs font-bold flex items-center justify-center">1</span>
                  <h4 className="text-base sm:text-lg font-bold text-[#0A192F]">Owner Details</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div className="sm:col-span-2">
                    <label htmlFor="sell-fullName" className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="sell-fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Ramesh Kumar Verma"
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                        errors.fullName
                          ? 'border-red-400 bg-red-50/30 focus:ring-red-300'
                          : 'border-slate-300 focus:border-[#C59B27] focus:ring-[#D4AF37]/30'
                      }`}
                      required
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Primary Contact Number */}
                  <div>
                    <label htmlFor="sell-primaryPhone" className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                      Primary Contact Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-xs font-bold text-slate-500 pointer-events-none">
                        +91
                      </span>
                      <input
                        id="sell-primaryPhone"
                        name="primaryPhone"
                        type="tel"
                        maxLength="14"
                        value={formData.primaryPhone}
                        onChange={handleInputChange}
                        placeholder="98765 43210"
                        className={`w-full pl-12 pr-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                          errors.primaryPhone
                            ? 'border-red-400 bg-red-50/30 focus:ring-red-300'
                            : 'border-slate-300 focus:border-[#C59B27] focus:ring-[#D4AF37]/30'
                        }`}
                        required
                      />
                    </div>
                    {errors.primaryPhone && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {errors.primaryPhone}
                      </p>
                    )}
                  </div>

                  {/* Alternate Contact Number */}
                  <div>
                    <label htmlFor="sell-alternatePhone" className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                      Alternate Contact Number <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      id="sell-alternatePhone"
                      name="alternatePhone"
                      type="tel"
                      value={formData.alternatePhone}
                      onChange={handleInputChange}
                      placeholder="e.g. 98111 22334"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#C59B27]"
                    />
                    {errors.alternatePhone && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {errors.alternatePhone}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* SECTION 2: Property Details */}
              <div className="space-y-5 pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                  <span className="w-6 h-6 rounded-full bg-[#0A192F] text-white text-xs font-bold flex items-center justify-center">2</span>
                  <h4 className="text-base sm:text-lg font-bold text-[#0A192F]">Property Details</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Property Type: Residential or Commercial */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
                      Property Type <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, propertyType: 'Residential' }))}
                        className={`p-3 rounded-xl border-2 flex items-center justify-center gap-2 font-bold text-sm transition-all ${
                          formData.propertyType === 'Residential'
                            ? 'border-[#0A192F] bg-[#0A192F] text-white shadow-xs'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <Home className="w-4 h-4" />
                        <span>Residential</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, propertyType: 'Commercial' }))}
                        className={`p-3 rounded-xl border-2 flex items-center justify-center gap-2 font-bold text-sm transition-all ${
                          formData.propertyType === 'Commercial'
                            ? 'border-[#0A192F] bg-[#0A192F] text-white shadow-xs'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <Building2 className="w-4 h-4" />
                        <span>Commercial</span>
                      </button>
                    </div>
                  </div>

                  {/* For Residential: BHK */}
                  {formData.propertyType === 'Residential' && (
                    <div className="sm:col-span-2">
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
                        BHK Configuration <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3">
                        {BHK_OPTIONS.map((item) => {
                          const isSelected = formData.bhk === item
                          return (
                            <button
                              type="button"
                              key={item}
                              onClick={() => setFormData(prev => ({ ...prev, bhk: item }))}
                              className={`py-2.5 px-3 rounded-xl border-2 text-center text-xs sm:text-sm font-bold transition-all ${
                                isSelected
                                  ? 'border-[#C59B27] bg-[#FDF8E8] text-[#8B6E16] shadow-xs'
                                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                              }`}
                            >
                              {item}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Property Status */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
                      Property Status <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {PROPERTY_STATUS_OPTIONS.map((status) => {
                        const isSelected = formData.propertyStatus === status
                        return (
                          <button
                            type="button"
                            key={status}
                            onClick={() => setFormData(prev => ({ ...prev, propertyStatus: status }))}
                            className={`p-3 rounded-xl border text-xs sm:text-sm font-semibold text-left transition-all ${
                              isSelected
                                ? 'border-[#0A192F] bg-slate-100 text-[#0A192F] font-bold shadow-xs'
                                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                            }`}
                          >
                            <span className="inline-block w-2.5 h-2.5 rounded-full mr-2 border border-current">
                              {isSelected && <span className="block w-full h-full rounded-full bg-[#C59B27]"></span>}
                            </span>
                            {status}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Complete Property Address */}
                  <div className="sm:col-span-2">
                    <label htmlFor="sell-propertyAddress" className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                      Complete Property Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="sell-propertyAddress"
                      name="propertyAddress"
                      rows="2"
                      value={formData.propertyAddress}
                      onChange={handleInputChange}
                      placeholder="e.g. Flat No. 402, Tower B, Maya Garden City, VIP Road, Zirakpur / Sector 70, Mohali"
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                        errors.propertyAddress
                          ? 'border-red-400 bg-red-50/30 focus:ring-red-300'
                          : 'border-slate-300 focus:border-[#C59B27] focus:ring-[#D4AF37]/30'
                      }`}
                      required
                    ></textarea>
                    {errors.propertyAddress && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {errors.propertyAddress}
                      </p>
                    )}
                  </div>

                  {/* Area in square feet */}
                  <div>
                    <label htmlFor="sell-areaSqFt" className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                      Area in Square Feet (Sq. Ft.) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="sell-areaSqFt"
                        name="areaSqFt"
                        type="number"
                        value={formData.areaSqFt}
                        onChange={handleInputChange}
                        placeholder="e.g. 1650"
                        className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                          errors.areaSqFt
                            ? 'border-red-400 bg-red-50/30 focus:ring-red-300'
                            : 'border-slate-300 focus:border-[#C59B27] focus:ring-[#D4AF37]/30'
                        }`}
                        required
                      />
                      <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs font-semibold text-slate-400 pointer-events-none">
                        sq. ft.
                      </span>
                    </div>
                    {errors.areaSqFt && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {errors.areaSqFt}
                      </p>
                    )}
                  </div>

                  {/* Area Type: Carpet or Built-up */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                      Area Type <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3 h-[46px]">
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, areaType: 'Carpet' }))}
                        className={`rounded-xl border font-semibold text-sm transition-all ${
                          formData.areaType === 'Carpet'
                            ? 'border-[#0A192F] bg-slate-100 text-[#0A192F] font-bold'
                            : 'border-slate-200 bg-white text-slate-600'
                        }`}
                      >
                        Carpet Area
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, areaType: 'Built-up' }))}
                        className={`rounded-xl border font-semibold text-sm transition-all ${
                          formData.areaType === 'Built-up'
                            ? 'border-[#0A192F] bg-slate-100 text-[#0A192F] font-bold'
                            : 'border-slate-200 bg-white text-slate-600'
                        }`}
                      >
                        Built-up Area
                      </button>
                    </div>
                  </div>

                  {/* Asking Price */}
                  <div>
                    <label htmlFor="sell-askingPrice" className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                      Asking Price <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="sell-askingPrice"
                      name="askingPrice"
                      type="text"
                      value={formData.askingPrice}
                      onChange={handleInputChange}
                      placeholder="e.g. ₹95 Lakhs"
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                        errors.askingPrice
                          ? 'border-red-400 bg-red-50/30 focus:ring-red-300'
                          : 'border-slate-300 focus:border-[#C59B27] focus:ring-[#D4AF37]/30'
                      }`}
                      required
                    />
                    {errors.askingPrice && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {errors.askingPrice}
                      </p>
                    )}
                  </div>

                  {/* Final / Negotiable Price */}
                  <div>
                    <label htmlFor="sell-finalPrice" className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                      Final / Negotiable Price <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      id="sell-finalPrice"
                      name="finalPrice"
                      type="text"
                      value={formData.finalPrice}
                      onChange={handleInputChange}
                      placeholder="e.g. ₹90 Lakhs / Slightly Negotiable"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#C59B27]"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: Key Availability & Site Visit Coordination */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                  <span className="w-6 h-6 rounded-full bg-[#C59B27] text-white text-xs font-bold flex items-center justify-center">3</span>
                  <div className="flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-[#8B6E16]" />
                    <h4 className="text-base sm:text-lg font-bold text-[#0A192F]">Keys & Site Visit Information</h4>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {/* Keys Available With */}
                  <div>
                    <label htmlFor="sell-keysAvailableWith" className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                      Keys Available With
                    </label>
                    <select
                      id="sell-keysAvailableWith"
                      name="keysAvailableWith"
                      value={formData.keysAvailableWith}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#C59B27]"
                    >
                      <option value="Owner">Owner (Direct)</option>
                      <option value="Security Guard">Security Guard / Society Gate</option>
                      <option value="Caretaker">Caretaker / Property Manager</option>
                      <option value="Tenant">Currently with Tenant</option>
                      <option value="Neighbor">Neighbor</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Key Holder Address */}
                  <div>
                    <label htmlFor="sell-keyHolderAddress" className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                      Key Holder Address <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      id="sell-keyHolderAddress"
                      name="keyHolderAddress"
                      type="text"
                      value={formData.keyHolderAddress}
                      onChange={handleInputChange}
                      placeholder="e.g. Same building or Sector 35"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#C59B27]"
                    />
                  </div>

                  {/* Key Holder Mobile Number */}
                  <div>
                    <label htmlFor="sell-keyHolderMobile" className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                      Key Holder Mobile <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      id="sell-keyHolderMobile"
                      name="keyHolderMobile"
                      type="tel"
                      value={formData.keyHolderMobile}
                      onChange={handleInputChange}
                      placeholder="e.g. 98123 45678"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#C59B27]"
                    />
                    {errors.keyHolderMobile && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {errors.keyHolderMobile}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* SECTION 4: Submit Property Details */}
              <div className="pt-6 border-t border-slate-200 space-y-4">
                
                {/* Privacy Note */}
                <div className="flex items-start gap-2.5 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
                  <ShieldCheck className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                  <p>
                    <span className="font-bold text-slate-700">Owner Confidentiality:</span> Your address and contact information are kept strictly confidential by Square Feet Realty and are only shared with pre-verified potential buyers after prior coordination with you.
                  </p>
                </div>

                {/* Submit Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 btn-gold py-3.5 px-6 rounded-xl text-base font-bold shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-60 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-[#0A192F] border-t-transparent rounded-full animate-spin"></span>
                        <span>Saving Property Details...</span>
                      </>
                    ) : (
                      <>
                        <KeyRound className="w-4 h-4" />
                        <span>Submit Property Details</span>
                      </>
                    )}
                  </button>

                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-xs flex items-center justify-center gap-2 transition-colors"
                    title="Send property details via WhatsApp"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send via WhatsApp (+91 6284656983)</span>
                  </a>
                </div>

              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  )
}
