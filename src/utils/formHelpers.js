import { COMPANY_INFO } from '../data/companyInfo'

/**
 * Validates a standard Indian 10-digit mobile number
 * Accepts formats: 9876543210, +919876543210, 09876543210
 */
export function isValidIndianPhone(phone) {
  if (!phone) return false
  const cleaned = phone.replace(/[\s\-()]/g, '')
  // Match either 10 digits starting with 6-9, or prefixed with +91 or 91 or 0
  const indianPhoneRegex = /^(?:\+?91|0)?[6-9]\d{9}$/
  return indianPhoneRegex.test(cleaned)
}

/**
 * Generates a prefilled WhatsApp link with encoded message for Buy Property Requirement
 */
export function generateBuyWhatsAppUrl(formData) {
  const lines = [
    `*SQUARE FEET REALTY - PROPERTY BUY ENQUIRY*`,
    `_${COMPANY_INFO.taglineEnglish}_`,
    ``,
    `👤 *Client Name:* ${formData.fullName || 'Not specified'}`,
    `📞 *Primary Contact:* ${formData.primaryPhone || 'Not specified'}`,
    formData.alternatePhone ? `📱 *Alternate Contact:* ${formData.alternatePhone}` : null,
    `🏷️ *Property Type:* ${formData.propertyType || 'Residential'}`,
    ``,
  ]

  if (formData.propertyType === 'Residential') {
    lines.push(
      `📍 *Preferred Locations:* ${Array.isArray(formData.locations) && formData.locations.length > 0 ? formData.locations.join(', ') : (formData.locations || 'Chandigarh & Tricity')}`,
      `🛏️ *BHK Configuration:* ${Array.isArray(formData.bhk) && formData.bhk.length > 0 ? formData.bhk.join(', ') : (formData.bhk || 'Not specified')}`,
      `🏗️ *Property Status:* ${formData.propertyStatus || 'Any'}`,
      `💰 *Budget Range:* ${formData.budgetMin || 'Min'} to ${formData.budgetMax || 'Max'}`,
      formData.amenities ? `✨ *Amenities / Special Requests:* ${formData.amenities}` : null
    )
  } else {
    lines.push(
      `📍 *Preferred Locations:* ${Array.isArray(formData.locations) && formData.locations.length > 0 ? formData.locations.join(', ') : (formData.locations || 'Chandigarh & Tricity')}`,
      `🏢 *Intended Purpose:* ${formData.commercialPurpose || 'Not specified'}`,
      `💰 *Budget Range:* ${formData.budgetMin || 'Min'} to ${formData.budgetMax || 'Max'}`
    )
  }

  lines.push(
    ``,
    `_Sent via Square Feet Realty Website (www.squarefeetrealty.co.in)_`
  )

  const message = lines.filter(Boolean).join('\n')
  return `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`
}

/**
 * Generates a prefilled WhatsApp link with encoded message for Sell Property Submission
 */
export function generateSellWhatsAppUrl(formData) {
  const lines = [
    `*SQUARE FEET REALTY - PROPERTY LISTING / SELL SUBMISSION*`,
    `_${COMPANY_INFO.taglineEnglish}_`,
    ``,
    `👤 *Owner Name:* ${formData.fullName || 'Not specified'}`,
    `📞 *Primary Contact:* ${formData.primaryPhone || 'Not specified'}`,
    formData.alternatePhone ? `📱 *Alternate Contact:* ${formData.alternatePhone}` : null,
    `🏷️ *Property Type:* ${formData.propertyType || 'Residential'}`,
    ``,
    `📍 *Property Address:* ${formData.propertyAddress || 'Not specified'}`,
    formData.propertyType === 'Residential' && formData.bhk ? `🛏️ *BHK:* ${formData.bhk}` : null,
    `🏗️ *Property Status:* ${formData.propertyStatus || 'Ready to Move'}`,
    `📐 *Area:* ${formData.areaSqFt ? `${formData.areaSqFt} sq. ft. (${formData.areaType || 'Built-up'})` : 'Not specified'}`,
    `💵 *Asking Price:* ${formData.askingPrice || 'Not specified'}`,
    formData.finalPrice ? `🤝 *Final / Negotiable Price:* ${formData.finalPrice}` : null,
    ``,
    `🔑 *Key Details:*`,
    `• Keys Available With: ${formData.keysAvailableWith || 'Owner'}`,
    formData.keyHolderAddress ? `• Key Holder Address: ${formData.keyHolderAddress}` : null,
    formData.keyHolderMobile ? `• Key Holder Mobile: ${formData.keyHolderMobile}` : null,
    ``,
    `_Sent via Square Feet Realty Website (www.squarefeetrealty.co.in)_`
  ]

  const message = lines.filter(Boolean).join('\n')
  return `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export const COMMON_LOCATIONS = [
  'Chandigarh (All Sectors)',
  'Mohali (Sector 66-82 / Airport Road)',
  'Mohali (Sector 88-115)',
  'Zirakpur (VIP Road)',
  'Zirakpur (PR-7 Airport Ring Road)',
  'Zirakpur (Patiala Road)',
  'Panchkula (MDC / Sectors)',
  'New Chandigarh (Mullanpur)',
  'Kharar (Kurali Road / Landran)',
  'Dera Bassi'
]

export const BHK_OPTIONS = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', 'SOHO']

export const PROPERTY_STATUS_OPTIONS = [
  'Ready to Move - New',
  'Resale',
  'Under Construction'
]

export const COMMERCIAL_PURPOSES = [
  'Retail Shop / Showroom',
  'Corporate Office Space',
  'SCO (Shop-cum-Office)',
  'Pre-leased / High Yield Investment',
  'Co-working / IT Space',
  'Warehouse / Industrial'
]

export const BUDGET_PRESETS = [
  'Under ₹40 Lakhs',
  '₹40 Lakhs - ₹75 Lakhs',
  '₹75 Lakhs - ₹1.25 Crore',
  '₹1.25 Crore - ₹2.5 Crore',
  '₹2.5 Crore - ₹5 Crore',
  'Above ₹5 Crore'
]
