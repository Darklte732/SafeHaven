# SafeHaven Insurance Platform - Complete Project Package

## Table of Contents
1. [Project Overview](#project-overview)
2. [Project Setup](#project-setup)
3. [File Structure](#file-structure)
4. [Environment Configuration](#environment-configuration)
5. [Database Setup](#database-setup)
6. [Component Code](#component-code)
7. [API Routes](#api-routes)
8. [Scripts](#scripts)
9. [Types and Utilities](#types-and-utilities)

## Project Overview

SafeHaven Insurance is a modern insurance platform built with Next.js, featuring:
- Landing page with dynamic sections and user segmentation
- Admin dashboard with KPI tracking and real-time analytics
- Customer management system with advanced filtering
- Policy and payment tracking with automated workflows
- Interactive calculators and forms with real-time validation
- Real-time chat support with AI integration
- Voice integration capabilities for accessibility
- Multi-language support (planned)
- Mobile-responsive design
- SEO optimization
- Performance monitoring
- Security features and audit logging

### Tech Stack
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Supabase, PostgreSQL
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Analytics**: Custom KPI tracking
- **UI Components**: HeadlessUI, Heroicons
- **Animation**: Framer Motion
- **Form Handling**: React Hook Form
- **State Management**: React Context + Hooks
- **Testing**: Jest, React Testing Library
- **CI/CD**: GitHub Actions
- **Hosting**: Vercel

### Browser Support
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile browsers (iOS Safari, Android Chrome)

## Project Setup

### 1. Create New Next.js Project
```bash
npx create-next-app@latest landpage_insurance --typescript --tailwind --eslint
cd landpage_insurance
```

### 2. Install Dependencies
```bash
npm install @supabase/supabase-js @headlessui/react @heroicons/react date-fns framer-motion react-intersection-observer react-hot-toast js-cookie
```

### 3. Environment Setup
Create a `.env.local` file in the root directory with the following configurations:

#### Supabase Configuration
```env
# Main Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
```

#### Next.js Configuration
```env
# Base URL Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3003
NODE_ENV=development
```

#### Email Configuration
```env
# Email Server Settings
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password
EMAIL_FROM=noreply@safehaveninsurance.com
ADMIN_EMAIL=admin@safehaveninsurance.com
```

#### System Configuration
```env
# Chrome Path (for PDF generation and testing)
CHROME_PATH=C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe
```

#### External Services
```env
# ElevenLabs Voice API
NEXT_PUBLIC_ELEVENLABS_API_KEY=your_elevenlabs_api_key
```

#### Environment Variables Usage Guide:

1. **Supabase Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Public API key for anonymous access
   - `SUPABASE_SERVICE_ROLE_KEY`: Private key for admin operations

2. **Next.js Variables**:
   - `NEXT_PUBLIC_BASE_URL`: Application base URL
   - `NODE_ENV`: Environment mode (development/production)

3. **Email Variables**:
   - `EMAIL_HOST`: SMTP server host
   - `EMAIL_PORT`: SMTP server port
   - `EMAIL_USER`: SMTP account username
   - `EMAIL_PASS`: SMTP account password or app-specific password
   - `EMAIL_FROM`: Default sender email address
   - `ADMIN_EMAIL`: Administrator email address

4. **System Variables**:
   - `CHROME_PATH`: Local Chrome installation path for PDF operations

5. **External Services**:
   - `NEXT_PUBLIC_ELEVENLABS_API_KEY`: API key for voice synthesis

#### Security Notes:
- Never commit `.env.local` to version control
- Use different values for development and production
- Regularly rotate API keys and passwords
- Use app-specific passwords for email services
- Keep service role key secure and private

## File Structure
```
landpage_insurance/
├── app/
│   ├── admin/
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── settings/
│   │   │   └── page.tsx
│   │   ├── customers/
│   │   │   └── page.tsx
│   │   ├── policies/
│   │   │   └── page.tsx
│   │   ├── payments/
│   │   │   └── page.tsx
│   │   ├── kpi/
│   │   │   └── page.tsx
│   │   └── login/
│   │       └── page.tsx
│   ├── api/
│   │   └── admin/
│   │       ├── settings/
│   │       │   └── route.ts
│   │       ├── kpi/
│   │       │   └── route.ts
│   │       ├── customers/
│   │       │   └── route.ts
│   │       ├── policies/
│   │       │   └── route.ts
│   │       └── payments/
│   │           └── route.ts
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── admin/
│   │   ├── DashboardLayout.tsx
│   │   └── DashboardIcons.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── ProblemSolutionSection.tsx
│   │   ├── SocialProofSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── ROICalculator.tsx
│   │   ├── CTASection.tsx
│   │   └── FAQSection.tsx
│   ├── ui/
│   │   └── image.tsx
│   ├── BeneficiaryWorkbookSection.tsx
│   ├── GuideDownloadSection.tsx
│   ├── Navbar.tsx
│   └── Providers.tsx
├── types/
│   ├── settings.ts
│   └── kpi.ts
├── supabase/
│   ├── migrations/
│   │   ├── 20240320000000_create_kpi_tables.sql
│   │   ├── 20240320000001_create_kpi_functions.sql
│   │   └── 20240320000002_create_settings_tables.sql
│   └── seed.sql
└── public/
    └── images/
        ├── logo.svg
        └── settings-header.svg
```

## Component Code

### Landing Page Sections
1. **HeroSection**: 
   - Dynamic content based on user segment
   - Animated transitions
   - Trust badges and CTAs
   - Responsive design
   - Image optimization

2. **ProblemSolutionSection**:
   - Split-view layout
   - Animated bullet points
   - Segment-specific content
   - Interactive elements

3. **SocialProofSection**:
   - Trust indicators
   - Partner logos
   - Customer statistics
   - Animated counters
   - Media mentions

4. **FeaturesSection**:
   - Responsive grid layout
   - Icon animations
   - Feature categorization
   - Hover effects
   - Segment-specific features

5. **TestimonialsSection**:
   - Auto-advancing carousel
   - Touch/swipe support
   - Rating display
   - Customer photos
   - Testimonial filtering

6. **ROICalculator**:
   - Real-time calculations
   - Interactive sliders
   - Premium estimates
   - Coverage recommendations
   - Save/share results

7. **CTASection**:
   - High-visibility design
   - Trust indicators
   - Multiple contact options
   - Animated backgrounds
   - Mobile optimization

8. **FAQSection**:
   - Categorized questions
   - Expandable answers
   - Search functionality
   - Category filtering
   - Dynamic loading

9. **BeneficiaryWorkbookSection**:
   - Download tracking
   - Preview functionality
   - Form integration
   - Progress tracking
   - Email delivery

### Shared Components
1. **Navbar**:
   - Dynamic navigation
   - Mobile responsive menu
   - User authentication status
   - Admin panel link
   - Language switcher (planned)

2. **Footer**:
   - Dynamic links
   - Newsletter signup
   - Social media integration
   - Contact information
   - Legal links

3. **UI Components**:
   - SafeImage: Optimized image component
   - Button: Styled button variants
   - Input: Form input components
   - Modal: Reusable modal dialog
   - Toast: Notification system
   - Loader: Loading states
   - ErrorBoundary: Error handling

### Admin Dashboard Components
1. **DashboardLayout**:
   - Responsive sidebar
   - Navigation management
   - User session handling
   - Theme customization
   - Mobile optimization

2. **KPI Dashboard**:
   - Real-time metrics
   - Interactive charts
   - Data filtering
   - Export capabilities
   - Custom date ranges

3. **Settings Panel**:
   - Comprehensive controls
   - Real-time validation
   - Category organization
   - Change history
   - Backup/restore

4. **Customer Management**:
   - Advanced search
   - Filtering options
   - Bulk operations
   - Export/import
   - Activity history

5. **Policy Management**:
   - Status tracking
   - Document handling
   - Premium calculations
   - Renewal management
   - Claims integration

6. **Payment Tracking**:
   - Transaction history
   - Payment processing
   - Refund handling
   - Report generation
   - Invoice management

## Database Schema

### Core Tables
1. **admin_settings**:
   - Configuration and preferences
   - JSON fields for notifications, dashboard, AI agents, voice, security
   - Timestamps for creation and updates
   - RLS policies for admin access

2. **admin_logs**:
   - Audit trail for all admin actions
   - Records action type, details, admin ID
   - Timestamp for each action
   - Used for security monitoring

3. **kpi_metrics**:
   - Key performance indicators tracking
   - Metrics for revenue, policies, claims
   - Target values and actual performance
   - Trend analysis data

4. **kpi_history**:
   - Historical data for all KPI metrics
   - Timestamp-based tracking
   - Used for trend analysis and reporting
   - Automated data retention policies

5. **agent_performance**:
   - Sales and service agent tracking
   - Policy sales metrics
   - Revenue generation data
   - Performance period tracking

6. **product_performance**:
   - Insurance product metrics
   - Sales volume and revenue
   - Performance by time period
   - Product comparison data

### Additional Tables (Planned)
1. **user_profiles**:
   - User personal information
   - Contact details
   - Preferences
   - Account settings

2. **notifications**:
   - User notifications
   - System alerts
   - Email preferences
   - Push notifications

3. **documents**:
   - Policy documents
   - User uploads
   - System generated files
   - Version control

4. **audit_trail**:
   - Detailed system logs
   - User actions
   - System events
   - Security incidents

### Database Functions
1. **calculate_kpi_summary()**: Aggregates KPI data for dashboard
2. **update_kpi_metrics()**: Maintains metric history
3. **record_kpi_activity()**: Logs KPI-related activities
4. **update_updated_at_column()**: Timestamp management

### Security Features
1. Row Level Security (RLS) policies
2. Role-based access control
3. Audit logging
4. Session management

## API Routes

### Admin API Endpoints
1. `/api/admin/settings`: Admin settings management
2. `/api/admin/kpi`: KPI data and metrics
3. `/api/admin/customers`: Customer management
4. `/api/admin/policies`: Policy operations
5. `/api/admin/payments`: Payment processing

### Public API Endpoints
1. `/api/quotes`: Quote generation
2. `/api/contact`: Contact form submissions
3. `/api/newsletter`: Newsletter subscriptions
4. `/api/downloads`: Resource downloads
5. `/api/chat`: Chat system endpoints

### Webhook Endpoints
1. `/api/webhooks/payment`: Payment processing webhooks
2. `/api/webhooks/email`: Email service webhooks
3. `/api/webhooks/notifications`: Notification webhooks

## Development Workflow
1. Set up local environment
2. Run database migrations
3. Create admin user
4. Start development server
5. Access admin dashboard at /admin

## Setup Instructions

1. Clone or create a new Next.js project:
```bash
git clone https://github.com/your-repo/landpage_insurance.git
# or create new:
npx create-next-app@latest landpage_insurance --typescript --tailwind --eslint
```

2. Navigate to project directory:
```bash
cd landpage_insurance
```

3. Install dependencies:
```bash
npm install
```

4. Set up environment variables:
- Copy `.env.example` to `.env.local`
- Update the values with your credentials

5. Initialize Supabase:
```bash
npx supabase init
```

6. Run database migrations:
```bash
npx supabase db push
```

7. Start the development server:
```bash
npm run dev
```

8. Access the application:
- Frontend: http://localhost:3000
- Admin Dashboard: http://localhost:3000/admin

## Default Credentials
```
Email: admin@safehaven.com
Password: SafeHaven2024!
Access Code: Pro2025
```

## Additional Notes

### Security Considerations
1. All API routes are protected
2. Environment variables are properly handled
3. Supabase RLS policies are in place
4. Admin authentication is required

### Performance Optimizations
1. Dynamic imports for large components
2. Image optimization with next/image
3. Client-side caching
4. Lazy loading of sections
5. Optimized animations

### SEO Features
1. Metadata optimization
2. OpenGraph tags
3. Twitter cards
4. Canonical URLs
5. Robots directives

### Monitoring
1. **Error Tracking**:
   - Sentry integration
   - Error reporting
   - Performance monitoring
   - User feedback collection

2. **Analytics**:
   - Custom KPI tracking
   - User behavior analysis
   - Conversion tracking
   - A/B testing capability

### Documentation
1. **API Documentation**:
   - OpenAPI/Swagger specs
   - Endpoint documentation
   - Authentication flows
   - Rate limiting

2. **Component Documentation**:
   - Storybook integration (planned)
   - Component props
   - Usage examples
   - Accessibility guidelines

### Maintenance
1. **Regular Tasks**:
   - Database backups
   - Log rotation
   - Cache clearing
   - Security updates
   - Dependency updates

2. **Performance Monitoring**:
   - Lighthouse scores
   - Core Web Vitals
   - Load testing
   - Memory usage

### Landing Page Content

#### Hero Section
1. **Main Message**:
   - Title: "Protect Your Family's Future with Affordable Final Expense Insurance"
   - Subtitle: "Get peace of mind knowing your loved ones won't face financial burden. Coverage starts at just $20/month."
   - Trust Badges: "A+ BBB Rating", "Licensed & Insured"
   - CTA Buttons: "Get Your Free Quote", "Learn More"

2. **Problem Section - "The Hidden Cost of Being Unprepared"**:
   - Description: "Many families face unexpected financial burdens during their most difficult moments."
   - Key Points:
     - Average funeral costs exceed $9,000
     - Unexpected medical bills can reach tens of thousands
     - 78% of Americans live paycheck to paycheck
     - Grieving families often struggle with debt

3. **Solution Section - "Peace of Mind with SafeHaven"**:
   - Description: "We provide comprehensive coverage that ensures your family's financial security."
   - Key Benefits:
     - Guaranteed acceptance for ages 50-85
     - Coverage from $5,000 to $50,000
     - Claims paid within 24-48 hours
     - No medical exam required

4. **Social Proof Metrics**:
   - Trust Indicators:
     - A+ BBB Rating
     - SSL Secured
     - Licensed & Insured
   - Key Statistics:
     - 50K+ Families Protected
     - 98% Claims Satisfaction
     - 24/7 Support Available

5. **Features Section - "Why Choose SafeHaven?"**:
   - Tagline: "We make it easy to protect your family's future with affordable coverage and exceptional service."
   - Key Features:
     - Guaranteed Coverage: "No medical exam required. Coverage guaranteed for ages 50-85."
     - Fast Claims Process: "Claims typically paid within 24-48 hours of submission."
     - Affordable Coverage: "Plans starting at $20/month with locked-in rates."
     - 24/7 Support: "Access to our dedicated support team anytime you need help."
     - Easy Application: "Simple online application process with instant approval."
     - Flexible Options: "Choose coverage amounts from $5,000 to $50,000."

6. **Customer Testimonials**:
   - Sarah M.: "SafeHaven made the entire process so simple. I got coverage within 24 hours!"
   - James R.: "The peace of mind knowing my family is protected is priceless."
   - Linda K.: "Their customer service is exceptional. Always there when you need them."

7. **Navigation Elements**:
   - Main Menu: Features, Get Quote, FAQ, Chat
   - Top Actions: Admin Dashboard, 24/7 Support
   - Logo: SafeHaven with shield icon

### Component Styling Details

1. **Color Scheme**:
   - Primary Blue: #3B82F6 (for CTAs and primary actions)
   - Success Green: For claims satisfaction badge
   - White: #FFFFFF (for backgrounds)
   - Gray Scale: For text and subtle backgrounds

2. **Typography**:
   - Headings: Bold, large sizes for impact
   - Body Text: Regular weight for readability
   - CTAs: Medium weight for emphasis

3. **UI Elements**:
   - Buttons: Rounded corners with hover effects
   - Cards: Subtle shadows and hover animations
   - Icons: Custom designed for each feature
   - Trust Badges: Prominent placement in hero section

4. **Responsive Design**:
   - Mobile-first approach
   - Flexible grid layouts
   - Collapsible navigation
   - Optimized images for different screen sizes

5. **Animations**:
   - Fade-in effects on scroll
   - Smooth transitions
   - Hover effects on interactive elements
   - Loading states for dynamic content

[Full code for each component and API route available in the repository] 