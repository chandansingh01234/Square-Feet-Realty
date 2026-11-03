# Square Feet Realty — Official Website

> **"Kar Lo Chaabi Mutthi Mein.."**  
> *Right Property. Right Guidance. Right Connection.*  
> Serving Chandigarh, Mohali, Zirakpur and the Tricity region in India.

---

## 🏢 Brand Identity

- **Company:** Square Feet Realty
- **Hindi Tagline:** *Kar Lo Chaabi Mutthi Mein..*
- **English Tagline:** *Right Property. Right Guidance. Right Connection.*
- **Core Pillars:** *Sale | Purchase | Rent*
- **Official Website:** [www.squarefeetrealty.co.in](https://www.squarefeetrealty.co.in)
- **Primary Contact Email:** `squarefeetrealty@gmail.com`
- **Admin Email:** `squarefeetrealty@gmail.com`
- **Phone / WhatsApp:** `+91 70044 99031` (+91 7004499031)
- **Key Focus Areas:** Chandigarh, Mohali (SAS Nagar), Zirakpur (VIP Road & PR-7), Panchkula, New Chandigarh (Mullanpur), and the greater Tricity region.

---

## 🚀 Key Features

1. **Sticky Responsive Navigation:**
   - Custom architectural gold & navy logo emblem with key motif.
   - Tagline badge: *Kar Lo Chaabi Mutthi Mein..*
   - Direct section links: Home, About Us, Our Services, Buy, Sell, Contact.
   - Prominent header CTAs: **Buy Property** and **Sell Property**.
   - Mobile-optimized slide-over menu with direct call & WhatsApp shortcuts.

2. **Visually Appealing Hero Section:**
   - Real, authentic high-resolution Tricity luxury residential imagery.
   - Distinctive typography with Google Fonts (*Playfair Display* & *Plus Jakarta Sans*).
   - Direct navigation to dedicated enquiry flows.

3. **About Us & Approach:**
   - Exact company description detailing personalized guidance and honest property options.
   - **Our Approach:** *"Built on Trust, Transparency and Relationships"*.
   - **Our Vision:** *"To build a trusted and respected real estate brand in Chandigarh and the Tricity, known for professional service, transparent dealings and long-term client relationships."*

4. **Our Services (3 Elegant Cards):**
   - **Residential Properties:** Homes, apartments, independent houses and residential properties for sale, purchase and rent.
   - **Commercial Properties:** Shops, offices, showrooms and commercial spaces for sale, purchase and lease.
   - **Property Advisory & Assistance:** Search, shortlisting, site visits, negotiations, and transaction coordination.

5. **Why Choose Square Feet Realty (6 Icon Grid):**
   - Professional & personalised service
   - Local market understanding
   - Residential & commercial property solutions
   - Assistance for buyers, sellers, landlords & tenants
   - Transparent communication
   - End-to-end coordination

6. **Buy Property Enquiry Form:**
   - Multi-section layout with clear validation.
   - Personal details: Full Name, Primary Contact Number (10-digit Indian phone validation), Alternate Contact.
   - Conditional Property Requirements:
     - **Residential:** Preferred Locations (multi-select + custom entry), BHK selection (1 BHK, 2 BHK, 3 BHK, 4 BHK, SOHO), Property Status (Ready to Move - New, Resale, Under Construction), Amenities textarea, Budget Range.
     - **Commercial:** Preferred Locations, Purpose / Intended Use (Showrooms, Offices, SCOs, High Yield), Budget Range.
   - Privacy assurance note.
   - Thank-you confirmation screen upon submission.
   - Safe WhatsApp prefilled URL generator encoding all fields into a structured WhatsApp message.

7. **Sell Property Owner Submission Form:**
   - Owner Details: Full Name, Primary Contact, Alternate Contact.
   - Property Details: Type (Residential/Commercial), BHK, Status, Complete Property Address, Area in sq. ft. (numeric validation), Area Type (Carpet vs. Built-up), Asking Price, Final/Negotiable Price.
   - Key Availability Details: Keys Available With (Owner, Security Guard, Caretaker, Tenant, Neighbor), Key Holder Address, Key Holder Mobile.
   - Thank-you confirmation screen upon submission.
   - Safe WhatsApp prefilled URL generator for owners.

8. **Contact & Service Areas:**
   - Clickable `tel:` and `mailto:` links.
   - Direct WhatsApp connect button to `+91 7004499031`.
   - Tricity regional coverage overview.

9. **Footer:**
   - Brand name, both taglines, quick links, contact details, copyright notices.

10. **Floating WhatsApp CTA:**
    - Non-intrusive floating button for quick assistance across all devices.

---

## 🛠️ Technology Stack

- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Icons:** Lucide React (`lucide-react`)
- **Fonts:** Google Fonts (*Plus Jakarta Sans* and *Playfair Display*)
- **SEO & Schema:** Semantic HTML5, Schema.org `RealEstateAgent` JSON-LD, Open Graph, Twitter Cards

---

## 📦 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+)

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd Web

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### Building for Production

```bash
npm run build
```

The production-ready assets will be generated in the `dist/` directory.

---

## ⚙️ Backend Email Configuration

The website includes a configurable form backend submission adapter in [`src/utils/emailService.js`](file:///d:/Web/src/utils/emailService.js).

To connect automated email forwarding to `squarefeetrealty@gmail.com`:

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Configure your form backend service:
   - **Option 1: Formspree (Recommended)**
     - Create a free form at [formspree.io](https://formspree.io)
     - Set the recipient email to `squarefeetrealty@gmail.com`
     - Add to `.env`:
       ```env
       VITE_FORM_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
       ```
   - **Option 2: Web3Forms**
     - Get an access key at [web3forms.com](https://web3forms.com)
     - Add to `.env`:
       ```env
       VITE_FORM_ENDPOINT=https://api.web3forms.com/submit
       ```
   - **Option 3: Custom REST API**
     - Set `VITE_FORM_ENDPOINT=https://your-domain.com/api/enquiries`

3. **Built-in WhatsApp Zero-Loss Guarantee:**  
   Even if an email endpoint is not yet configured, the website automatically provides users with a direct, formatted **"Send via WhatsApp (+91 70044 99031)"** button that pre-fills all form fields into WhatsApp so no lead is ever lost.

---

## 🔮 Phase 2 Roadmap (Future Expansion)

The project code is modularly structured to enable future additions without refactoring:
- [`src/modules/futureFeatures.js`](file:///d:/Web/src/modules/futureFeatures.js): Documented extension points for:
  - **Property Listing Catalog:** Search & filtering by Sector, Budget, Floor, Amenities, and High-Res Galleries.
  - **Admin Dashboard & Lead CRM:** Secure coordinator login, status pipelines (*New -> Contacted -> Site Visit -> Closed*), and lead exports.
