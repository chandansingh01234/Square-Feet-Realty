import { COMPANY_INFO } from '../data/companyInfo'

/**
 * Service to handle real enquiry email delivery.
 * Uses FormSubmit AJAX API with automated formatting for zero-setup email forwarding
 * directly to chandan01234singh@gmail.com.
 * Also supports any custom endpoint configured in VITE_FORM_ENDPOINT.
 */
export async function submitEnquiry(type, formData) {
  // Configured endpoint or default to direct FormSubmit forwarding
  const defaultEndpoint = `https://formsubmit.co/ajax/${COMPANY_INFO.adminEmail}`
  const endpoint = (import.meta.env.VITE_FORM_ENDPOINT && !import.meta.env.VITE_FORM_ENDPOINT.includes('YOUR_FORM_ID'))
    ? import.meta.env.VITE_FORM_ENDPOINT
    : defaultEndpoint

  // Prepare clean human-readable payload for email table
  let emailPayload = {}

  if (type === 'BUY_ENQUIRY') {
    emailPayload = {
      _subject: `[Square Feet Realty] New Buy Enquiry from ${formData.fullName} (${formData.propertyType})`,
      _template: 'table',
      _captcha: 'false',
      'Enquiry Type': 'Buyer Requirement',
      'Client Full Name': formData.fullName,
      'Primary Contact Phone': `+91 ${formData.primaryPhone}`,
      'Alternate Contact Phone': formData.alternatePhone ? `+91 ${formData.alternatePhone}` : 'Not provided',
      'Property Type': formData.propertyType,
      'Preferred Locations': Array.isArray(formData.locations) && formData.locations.length > 0 
        ? formData.locations.join(', ') 
        : (formData.locations || 'Chandigarh & Tricity'),
      'Budget Range': `${formData.budgetMin || 'Min'} to ${formData.budgetMax || 'Max'}`,
      'Submission Timestamp': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    }

    if (formData.propertyType === 'Residential') {
      emailPayload['BHK Requirement'] = Array.isArray(formData.bhk) ? formData.bhk.join(', ') : formData.bhk
      emailPayload['Property Status'] = formData.propertyStatus || 'Any'
      emailPayload['Amenities / Special Requirements'] = formData.amenities || 'None specified'
    } else {
      emailPayload['Intended Commercial Purpose'] = formData.commercialPurpose || 'Not specified'
    }
  } else {
    // SELL PROPERTY
    emailPayload = {
      _subject: `[Square Feet Realty] New Property Listing from ${formData.fullName} (${formData.propertyType})`,
      _template: 'table',
      _captcha: 'false',
      'Submission Type': 'Property Owner / Seller Listing',
      'Owner Full Name': formData.fullName,
      'Primary Contact Phone': `+91 ${formData.primaryPhone}`,
      'Alternate Contact Phone': formData.alternatePhone ? `+91 ${formData.alternatePhone}` : 'Not provided',
      'Property Type': formData.propertyType,
      'Complete Property Address': formData.propertyAddress,
      'Area': `${formData.areaSqFt} sq. ft. (${formData.areaType || 'Carpet'})`,
      'Asking Price': formData.askingPrice,
      'Final / Negotiable Price': formData.finalPrice || 'Not specified',
      'Keys Available With': formData.keysAvailableWith || 'Owner',
      'Key Holder Address': formData.keyHolderAddress || 'Not specified',
      'Key Holder Mobile': formData.keyHolderMobile ? `+91 ${formData.keyHolderMobile}` : 'Not specified',
      'Submission Timestamp': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    }

    if (formData.propertyType === 'Residential') {
      emailPayload['BHK Configuration'] = formData.bhk
      emailPayload['Property Status'] = formData.propertyStatus
    }
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
