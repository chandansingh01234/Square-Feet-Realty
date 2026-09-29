import React, { useState } from 'react'
import { 
  Building2, 
  Home, 
  Check, 
  AlertCircle, 
  Send, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  MapPin,
  IndianRupee,
  Layers,
  Mail
} from 'lucide-react'
import { COMPANY_INFO } from '../data/companyInfo'
import { 
  isValidIndianPhone, 
  generateBuyWhatsAppUrl, 
  COMMON_LOCATIONS, 
  BHK_OPTIONS, 
  PROPERTY_STATUS_OPTIONS, 
  COMMERCIAL_PURPOSES 
} from '../utils/formHelpers'
import { submitEnquiry } from '../utils/emailService'

export default function BuyPropertyForm({ initialPropertyType = 'Residential' }) {
  const [formData, setFormData] = useState({
    fullName: '',
    primaryPhone: '',
    alternatePhone: '',
    propertyType: initialPropertyType,
    // Residential specific
    locations: [],
    customLocation: '',
    bhk: [],
    propertyStatus: 'Ready to Move - New',
    amenities: '',
    budgetMin: '',
    budgetMax: '',
    // Commercial specific
    commercialPurpose: 'Retail Shop / Showroom'
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionState, setSubmissionState] = useState({
    submitted: false,
    success: false,
    message: '',
    requiresWhatsAppNotice: false
  })

  // Update property type if changed from outside
  React.useEffect(() => {
    if (initialPropertyType) {
      setFormData(prev => ({ ...prev, propertyType: initialPropertyType }))
    }
  }, [initialPropertyType])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const toggleLocation = (loc) => {
    setFormData(prev => {
      const exists = prev.locations.includes(loc)
      const updated = exists 
        ? prev.locations.filter(item => item !== loc)
        : [...prev.locations, loc]
      return { ...prev, locations: updated }
    })
    if (errors.locations) {
      setErrors(prev => ({ ...prev, locations: '' }))
    }
  }

  const toggleBHK = (item) => {
    setFormData(prev => {
      const exists = prev.bhk.includes(item)
      const updated = exists 
        ? prev.bhk.filter(b => b !== item)
        : [...prev.bhk, item]
      return { ...prev, bhk: updated }
    })
    if (errors.bhk) {
      setErrors(prev => ({ ...prev, bhk: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.'
    }

    if (!formData.primaryPhone.trim()) {
      newErrors.primaryPhone = 'Primary Contact Number is required.'
    } else if (!isValidIndianPhone(formData.primaryPhone)) {
      newErrors.primaryPhone = 'Please enter a valid 10-digit mobile number (e.g. 9876543210).'
    }

    if (formData.alternatePhone.trim() && !isValidIndianPhone(formData.alternatePhone)) {
      newErrors.alternatePhone = 'Alternate phone must be a valid 10-digit mobile number.'
    }

    if (!formData.propertyType) {
      newErrors.propertyType = 'Property Type is required.'
    }

    if (formData.propertyType === 'Residential') {
      if (formData.locations.length === 0 && !formData.customLocation.trim()) {
        newErrors.locations = 'Please select or enter at least one preferred location.'
      }
      if (formData.bhk.length === 0) {
        newErrors.bhk = 'Please select at least one BHK preference.'
      }
    } else if (formData.propertyType === 'Commercial') {
      if (formData.locations.length === 0 && !formData.customLocation.trim()) {
        newErrors.locations = 'Please select or enter at least one preferred location.'
      }
      if (!formData.commercialPurpose) {
        newErrors.commercialPurpose = 'Please specify the intended commercial use.'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) {
      // Smooth scroll to top of form
      const el = document.getElementById('buy-form-top')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }

    setIsSubmitting(true)

    // Prepare complete locations payload
    const allLocations = [...formData.locations]
    if (formData.customLocation.trim()) {
      allLocations.push(formData.customLocation.trim())
    }

    const submissionPayload = {
      ...formData,
      locations: allLocations
    }

    try {
      const result = await submitEnquiry('BUY_ENQUIRY', submissionPayload)
      
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
        message: 'Could not submit form. Please use WhatsApp for instant assistance.',
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
      locations: [],
      customLocation: '',
      bhk: [],
      propertyStatus: 'Ready to Move - New',
      amenities: '',
      budgetMin: '',
      budgetMax: '',
      commercialPurpose: 'Retail Shop / Showroom'
    })
    setSubmissionState({
      submitted: false,
      success: false,
      message: '',
      requiresWhatsAppNotice: false
    })
    setErrors({})
  }

  const whatsAppUrl = generateBuyWhatsAppUrl({
    ...formData,
    locations: [...formData.locations, formData.customLocation.trim()].filter(Boolean)
  })

  return (
    <section id="buy" className="py-20 sm:py-24 bg-[#FAF8F5] relative">
      <div id="buy-form-top" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="h-0.5 w-6 bg-[#C59B27]"></div>
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#C59B27] uppercase">
              Property Acquisition
            </span>
            <div className="h-0.5 w-6 bg-[#C59B27]"></div>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A192F] tracking-tight">
            Buy Property Enquiry
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Share your specific residential or commercial requirements across Chandigarh, Mohali, Zirakpur and Tricity.
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
          
          {/* Top Brand Banner */}
          <div className="bg-gradient-to-r from-[#0A192F] via-[#112240] to-[#0A192F] px-6 sm:px-10 py-5 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#D4AF37]/30">
            <div>
              <p className="text-xs font-semibold text-[#F3DF8A] tracking-wider uppercase">
                {COMPANY_INFO.taglineHindi}
              </p>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                Tell Us What You Are Looking For
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>Direct Coordinator Assistance</span>
            </div>
          </div>

          {/* Submission Success State */}
          {submissionState.submitted ? (
            <div className="p-8 sm:p-12 text-center space-y-6 animate-fadeIn">
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
                    FormSubmit has sent an activation email to <strong className="text-amber-950 font-bold">{COMPANY_INFO.adminEmail}</strong>. Please check your inbox (or Spam/Promotions folder) and click <strong className="underline">"Activate Form"</strong> once. After this one-time click, all future customer submissions will be emailed directly to your inbox.
                  </p>
                </div>
              ) : (
                <div className="p-3.5 bg-blue-50/80 border border-blue-200/80 rounded-xl text-xs text-blue-900 max-w-lg mx-auto flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Enquiry dispatched to coordinator email: <strong>{COMPANY_INFO.adminEmail}</strong></span>
                </div>
              )}

              {/* WhatsApp direct launch option */}
              <div className="pt-6 border-t border-slate-100 max-w-lg mx-auto space-y-4">
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-left">
                  <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    Instant WhatsApp Connection
                  </p>
                  <p className="text-xs text-emerald-900 leading-relaxed">
                    Want an instant response? Send your pre-formatted enquiry directly to our WhatsApp coordinator at <span className="font-bold">{COMPANY_INFO.phoneDisplay}</span>.
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
                    <span>Open in WhatsApp</span>
                  </a>

                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition-colors border border-slate-300"
                  >
                    Submit Another Requirement
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Main Form */
            <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8" noValidate>
              
              {/* SECTION 1: Personal Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                  <span className="w-6 h-6 rounded-full bg-[#0A192F] text-white text-xs font-bold flex items-center justify-center">1</span>
                  <h4 className="text-base sm:text-lg font-bold text-[#0A192F]">Personal Details</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div className="sm:col-span-2">
                    <label htmlFor="buy-fullName" className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="buy-fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Gurpreet Singh"
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
                    <label htmlFor="buy-primaryPhone" className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                      Primary Contact Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-xs font-bold text-slate-500 pointer-events-none">
                        +91
                      </span>
                      <input
                        id="buy-primaryPhone"
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
                    {errors.primaryPhone ? (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {errors.primaryPhone}
                      </p>
                    ) : (
                      <p className="mt-1 text-[11px] text-slate-500">10-digit mobile number for calls & WhatsApp.</p>
                    )}
                  </div>

                  {/* Alternate Contact Number */}
                  <div>
                    <label htmlFor="buy-alternatePhone" className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                      Alternate Contact Number <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      id="buy-alternatePhone"
                      name="alternatePhone"
                      type="tel"
                      value={formData.alternatePhone}
                      onChange={handleInputChange}
                      placeholder="e.g. 98123 45678"
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                        errors.alternatePhone
                          ? 'border-red-400 bg-red-50/30 focus:ring-red-300'
                          : 'border-slate-300 focus:border-[#C59B27] focus:ring-[#D4AF37]/30'
                      }`}
                    />
                    {errors.alternatePhone && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {errors.alternatePhone}
                      </p>
                    )}
                  </div>

                  {/* Property Type Radio Selector */}
                  <div className="sm:col-span-2 pt-2">
                    <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
                      Property Type <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, propertyType: 'Residential' }))}
                        className={`p-3.5 rounded-xl border-2 flex items-center justify-center gap-2.5 font-bold text-sm transition-all ${
                          formData.propertyType === 'Residential'
                            ? 'border-[#0A192F] bg-[#0A192F] text-white shadow-md'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <Home className="w-4 h-4" />
                        <span>Residential</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, propertyType: 'Commercial' }))}
                        className={`p-3.5 rounded-xl border-2 flex items-center justify-center gap-2.5 font-bold text-sm transition-all ${
                          formData.propertyType === 'Commercial'
                            ? 'border-[#0A192F] bg-[#0A192F] text-white shadow-md'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <Building2 className="w-4 h-4" />
                        <span>Commercial</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 2: Conditional Requirements based on Property Type */}
              {formData.propertyType === 'Residential' ? (
                /* RESIDENTIAL SPECIFIC FIELDS */
                <div className="space-y-6 pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                    <span className="w-6 h-6 rounded-full bg-[#C59B27] text-white text-xs font-bold flex items-center justify-center">2</span>
                    <h4 className="text-base sm:text-lg font-bold text-[#0A192F]">Residential Requirements</h4>
                  </div>

                  {/* Preferred Locations */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs sm:text-sm font-semibold text-slate-700">
                        Preferred Locations <span className="text-red-500">*</span>
                      </label>
                      <span className="text-[11px] text-slate-500">Select multiple or type custom below</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {COMMON_LOCATIONS.map((loc) => {
                        const isSelected = formData.locations.includes(loc)
                        return (
                          <button
                            type="button"
                            key={loc}
                            onClick={() => toggleLocation(loc)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                              isSelected
                                ? 'bg-[#0A192F] text-[#F3DF8A] border-[#0A192F] shadow-xs'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            {isSelected && <span className="mr-1">✓</span>}
                            {loc}
                          </button>
                        )
                      })}
                    </div>

                    <input
                      type="text"
                      name="customLocation"
                      value={formData.customLocation}
                      onChange={handleInputChange}
                      placeholder="Other location / Specific Sector (e.g. Sector 79 Mohali, VIP Road Zirakpur)"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#C59B27]"
                    />
                    {errors.locations && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {errors.locations}
                      </p>
                    )}
                  </div>

                  {/* Select BHK */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
                      Select BHK <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3">
                      {BHK_OPTIONS.map((item) => {
                        const isSelected = formData.bhk.includes(item)
                        return (
                          <button
                            type="button"
                            key={item}
                            onClick={() => toggleBHK(item)}
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
                    {errors.bhk && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {errors.bhk}
                      </p>
                    )}
                  </div>

                  {/* Property Status */}
                  <div>
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

                  {/* Budget Range: Minimum and Maximum */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
                      Budget Range
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-xs font-bold text-slate-500 pointer-events-none">
                            ₹ Min:
                          </span>
                          <input
                            type="text"
                            name="budgetMin"
                            value={formData.budgetMin}
                            onChange={handleInputChange}
                            placeholder="e.g. ₹50 Lakhs"
                            className="w-full pl-16 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#C59B27]"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-xs font-bold text-slate-500 pointer-events-none">
                            ₹ Max:
                          </span>
                          <input
                            type="text"
                            name="budgetMax"
                            value={formData.budgetMax}
                            onChange={handleInputChange}
                            placeholder="e.g. ₹1.25 Crore"
                            className="w-full pl-16 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#C59B27]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Amenities Requirement */}
                  <div>
                    <label htmlFor="buy-amenities" className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                      Amenities Requirement <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <textarea
                      id="buy-amenities"
                      name="amenities"
                      rows="3"
                      value={formData.amenities}
                      onChange={handleInputChange}
                      placeholder="e.g. Park facing, higher floor with open balcony, gated security, 2 car parking, lift, gym, power backup..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#C59B27]"
                    ></textarea>
                  </div>
                </div>
              ) : (
                /* COMMERCIAL SPECIFIC FIELDS */
                <div className="space-y-6 pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                    <span className="w-6 h-6 rounded-full bg-[#C59B27] text-white text-xs font-bold flex items-center justify-center">2</span>
                    <h4 className="text-base sm:text-lg font-bold text-[#0A192F]">Commercial Requirements</h4>
                  </div>

                  {/* Preferred Locations */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs sm:text-sm font-semibold text-slate-700">
                        Preferred Locations <span className="text-red-500">*</span>
                      </label>
                      <span className="text-[11px] text-slate-500">Select multiple or type custom below</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {COMMON_LOCATIONS.map((loc) => {
                        const isSelected = formData.locations.includes(loc)
                        return (
                          <button
                            type="button"
                            key={loc}
                            onClick={() => toggleLocation(loc)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                              isSelected
                                ? 'bg-[#0A192F] text-[#F3DF8A] border-[#0A192F] shadow-xs'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            {isSelected && <span className="mr-1">✓</span>}
                            {loc}
                          </button>
                        )
                      })}
                    </div>

                    <input
                      type="text"
                      name="customLocation"
                      value={formData.customLocation}
                      onChange={handleInputChange}
                      placeholder="Specific Commercial Sector / Market (e.g. Sector 82 Mohali IT City, PR-7 Zirakpur)"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#C59B27]"
                    />
                    {errors.locations && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {errors.locations}
                      </p>
                    )}
                  </div>

                  {/* Purpose / Intended Use */}
                  <div>
                    <label htmlFor="buy-commercialPurpose" className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                      Purpose / Intended Use <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="buy-commercialPurpose"
                      name="commercialPurpose"
                      value={formData.commercialPurpose}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#C59B27]"
                    >
                      {COMMERCIAL_PURPOSES.map((purpose) => (
                        <option key={purpose} value={purpose}>
                          {purpose}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Budget Range: Minimum and Maximum */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
                      Budget Range
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-xs font-bold text-slate-500 pointer-events-none">
                            ₹ Min:
                          </span>
                          <input
                            type="text"
                            name="budgetMin"
                            value={formData.budgetMin}
                            onChange={handleInputChange}
                            placeholder="e.g. ₹75 Lakhs"
                            className="w-full pl-16 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#C59B27]"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-xs font-bold text-slate-500 pointer-events-none">
                            ₹ Max:
                          </span>
                          <input
                            type="text"
                            name="budgetMax"
                            value={formData.budgetMax}
                            onChange={handleInputChange}
                            placeholder="e.g. ₹3 Crore"
                            className="w-full pl-16 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#C59B27]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 3: Submit and Privacy Note */}
              <div className="pt-6 border-t border-slate-200 space-y-4">
                
                {/* Privacy Note */}
                <div className="flex items-start gap-2.5 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
                  <ShieldCheck className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                  <p>
                    <span className="font-bold text-slate-700">Privacy Assurance:</span> The information provided above will be used solely by Square Feet Realty to evaluate your property requirement and assist you with suitable options. We respect your privacy and never share your details with unauthorized third parties.
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
                        <span>Processing Enquiry...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Enquiry</span>
                      </>
                    )}
                  </button>

                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-xs flex items-center justify-center gap-2 transition-colors"
                    title="Send directly via WhatsApp"
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
