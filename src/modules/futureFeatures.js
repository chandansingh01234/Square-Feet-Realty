/**
 * Future Architecture Extension Hooks
 *
 * Square Feet Realty - Phase 1 focuses on brand establishment, trustworthy
 * presentation, and enquiry acquisition for buyers and sellers.
 *
 * In Phase 2:
 * 1. Property Listings Module:
 *    - Connect to a database (Supabase, Firebase, Postgres, or Headless CMS)
 *    - Filter by Sector, Price, BHK, Carpet Area
 *    - Image galleries & virtual walkthroughs
 *
 * 2. Admin Dashboard Module:
 *    - Secure authentication (JWT / Auth0 / Supabase Auth)
 *    - Real-time lead CRM with pipeline stages (New -> Contacted -> Site Visit -> Negotiating -> Closed)
 *    - WhatsApp click-to-chat directly from admin table
 *    - Export leads to CSV / Excel
 */

export const FUTURE_MODULES_CONFIG = {
  propertyListings: {
    enabled: false,
    plannedFeatures: [
      'Verified Property Directory for Chandigarh & Tricity',
      'Advanced filters (Sector, Budget, Floor, Resale vs New)',
      'High-resolution photo galleries & floor plans'
    ]
  },
  adminDashboard: {
    enabled: false,
    plannedFeatures: [
      'Secure Coordinator Portal',
      'Lead pipeline tracking for Buy & Sell submissions',
      'One-click WhatsApp client communication'
    ]
  }
}
