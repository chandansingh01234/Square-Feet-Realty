import { COMPANY_INFO } from '../data/companyInfo'

/**
 * Service to handle real enquiry email delivery.
 * Uses FormSubmit AJAX API with automated formatting for zero-setup email forwarding
 * directly to squarefeetrealty@gmail.com.
 * Configured in HTML table form (_template: 'table') with website theme branding and fields.
 * Also supports any custom endpoint configured in VITE_FORM_ENDPOINT.
 */
export async function submitEnquiry(type, formData) {
  // Configured endpoint or default to direct FormSubmit forwarding
  const defaultEndpoint = `https://formsubmit.co/ajax/${COMPANY_INFO.adminEmail}`
  const endpoint = (import.meta.env.VITE_FORM_ENDPOINT && !import.meta.env.VITE_FORM_ENDPOINT.includes('YOUR_FORM_ID'))
    ? import.meta.env.VITE_FORM_ENDPOINT
    : defaultEndpoint

  const timestamp = new Date().toLocaleString('en-IN', { 
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium'
  })

  // Prepare clean human-readable payload in table form matching website theme & branding
  let emailPayload = {}

  if (type === 'BUY_ENQUIRY') {
    const locationsFormatted = Array.isArray(formData.locations) && formData.locations.length > 0 
      ? formData.locations.join(', ') 
      : (formData.locations || 'Chandigarh & Tricity')

    const budgetFormatted = (formData.budgetMin || formData.budgetMax)
      ? `${formData.budgetMin || 'Min'} to ${formData.budgetMax || 'Max'}`
      : 'Flexible / To be discussed'

    emailPayload = {
      _subject: `[Square Feet Realty] New Buyer Requirement: ${formData.fullName} (${formData.propertyType})`,
      _template: 'table',
      _captcha: 'false',
      'Brand / Agency': COMPANY_INFO.name,
      'Theme & Tagline': COMPANY_INFO.taglineEnglish,
      'Core Pillars': COMPANY_INFO.taglinePill,
      'Service Coverage': 'Chandigarh • Mohali • Zirakpur • Panchkula • Tricity',
      'Enquiry Type': `Buyer Requirement (${formData.propertyType})`,
      'Client Full Name': formData.fullName,
      'Primary Contact Phone': `+91 ${formData.primaryPhone}`,
      'Alternate Contact Phone': formData.alternatePhone ? `+91 ${formData.alternatePhone}` : 'Not provided',
      'Property Category': formData.propertyType,
      'Preferred Locations': locationsFormatted
    }

    if (formData.propertyType === 'Residential') {
      emailPayload['BHK Requirement'] = Array.isArray(formData.bhk) && formData.bhk.length > 0 
        ? formData.bhk.join(', ') 
        : (formData.bhk || 'Not specified')
      emailPayload['Property Status'] = formData.propertyStatus || 'Ready to Move - New'
      emailPayload['Budget Range'] = budgetFormatted
      emailPayload['Amenities / Special Requests'] = formData.amenities || 'None specified'
    } else {
      emailPayload['Intended Commercial Purpose'] = formData.commercialPurpose || 'Not specified'
      emailPayload['Budget Range'] = budgetFormatted
    }

    emailPayload['Website Source'] = `${COMPANY_INFO.name} Portal (${COMPANY_INFO.websiteDisplay})`
    emailPayload['Coordinator Contact'] = `${COMPANY_INFO.phoneDisplay} (Call / WhatsApp)`
    emailPayload['Submission Timestamp'] = timestamp

  } else {
    // SELL PROPERTY
    emailPayload = {
      _subject: `[Square Feet Realty] New Property Listing: ${formData.fullName} (${formData.propertyType})`,
      _template: 'table',
      _captcha: 'false',
      'Brand / Agency': COMPANY_INFO.name,
      'Theme & Tagline': COMPANY_INFO.taglineEnglish,
      'Core Pillars': COMPANY_INFO.taglinePill,
      'Service Coverage': 'Chandigarh • Mohali • Zirakpur • Panchkula • Tricity',
      'Submission Type': `Property Owner Listing (${formData.propertyType})`,
      'Owner Full Name': formData.fullName,
      'Primary Contact Phone': `+91 ${formData.primaryPhone}`,
      'Alternate Contact Phone': formData.alternatePhone ? `+91 ${formData.alternatePhone}` : 'Not provided',
      'Property Category': formData.propertyType
    }

    if (formData.propertyType === 'Residential') {
      emailPayload['BHK Configuration'] = formData.bhk || 'Not specified'
      emailPayload['Property Status'] = formData.propertyStatus || 'Ready to Move - New'
    }

    emailPayload['Complete Property Address'] = formData.propertyAddress
    emailPayload['Area in Sq. Ft.'] = `${formData.areaSqFt} sq. ft. (${formData.areaType || 'Carpet'})`
    emailPayload['Asking Price'] = formData.askingPrice
    emailPayload['Final / Negotiable Price'] = formData.finalPrice || 'Not specified'
    emailPayload['Keys Available With'] = formData.keysAvailableWith || 'Owner'
    emailPayload['Key Holder Address'] = formData.keyHolderAddress || 'Not specified'
    emailPayload['Key Holder Mobile'] = formData.keyHolderMobile ? `+91 ${formData.keyHolderMobile}` : 'Not specified'
    emailPayload['Website Source'] = `${COMPANY_INFO.name} Portal (${COMPANY_INFO.websiteDisplay})`
    emailPayload['Coordinator Contact'] = `${COMPANY_INFO.phoneDisplay} (Call / WhatsApp)`
    emailPayload['Submission Timestamp'] = timestamp
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(emailPayload)
    })

    const data = await response.json().catch(() => ({}))

    if (response.ok && (data.success === 'true' || data.success === true)) {
      return {
        success: true,
        mode: 'SENT',
        message: `Enquiry successfully delivered to ${COMPANY_INFO.adminEmail}.`
      }
    }

    // Check if FormSubmit requires initial one-time activation
    if (data.message && data.message.toLowerCase().includes('activation')) {
      return {
        success: true,
        isActivationNeeded: true,
        mode: 'ACTIVATION_PENDING',
        message: `An activation email has been sent to ${COMPANY_INFO.adminEmail}. Please check your inbox and click "Activate Form" once to complete setup.`
      }
    }

    // Other API response
    if (response.ok) {
      return {
        success: true,
        mode: 'SENT',
        message: `Enquiry processed for ${COMPANY_INFO.adminEmail}.`
      }
    }

    return {
      success: false,
      mode: 'ERROR',
      message: data.message || 'Could not send email automatically. Please use the WhatsApp button below.'
    }
  } catch (err) {
    console.error('Error submitting form:', err)
    return {
      success: false,
      mode: 'NETWORK_ERROR',
      message: 'Network issue contacting email server. Please use WhatsApp for instant communication.'
    }
  }
}
