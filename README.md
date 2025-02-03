# SafeHaven Insurance Landing Page

A modern, responsive landing page for SafeHaven Insurance built with Next.js 13+, React, TypeScript, and Tailwind CSS.

## Features

- 🎨 Modern, responsive design with Tailwind CSS
- 📊 Analytics tracking with Google Analytics
- 🔄 Exit intent popup for lead capture
- 📱 Mobile-first approach
- 🎯 Form validation with custom hooks
- ⚡ Performance optimized
- 🔒 SSL secure
- 📈 SEO optimized

## Development Setup

1. Clone the repository:
```bash
git clone https://github.com/your-username/safehaven.git
cd safehaven
```

2. Install dependencies:
```bash
npm install
```

3. Copy the environment variables:
```bash
cp .env.example .env.local
```

4. Update the environment variables in `.env.local` with your values

5. Run the development server:
```bash
npm run dev
```

## Deployment Checklist

Before deploying to production, ensure:

1. Environment Variables:
   - [ ] All required environment variables are set in Vercel
   - [ ] Google Analytics ID is configured
   - [ ] Google Tag Manager ID is configured
   - [ ] Supabase credentials are set
   - [ ] Email configuration is complete

2. Analytics & Tracking:
   - [ ] Google Analytics is properly configured
   - [ ] Event tracking is working
   - [ ] Exit intent popup is functioning

3. Performance:
   - [ ] Images are optimized
   - [ ] Fonts are properly loaded
   - [ ] Bundle size is optimized

4. SEO:
   - [ ] Meta tags are set
   - [ ] Open Graph tags are configured
   - [ ] Robots.txt is present
   - [ ] Sitemap is generated

5. Security:
   - [ ] Environment variables are secure
   - [ ] API routes are protected
   - [ ] Forms have CSRF protection

6. Testing:
   - [ ] All components render correctly
   - [ ] Forms work as expected
   - [ ] Navigation is smooth
   - [ ] Mobile responsiveness is verified

## Deployment Steps

1. Push changes to GitHub:
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

2. Vercel will automatically deploy changes from the main branch

3. After deployment, verify:
   - [ ] Site loads correctly
   - [ ] Forms are working
   - [ ] Analytics is tracking
   - [ ] No console errors
   - [ ] Performance metrics are good

## Troubleshooting

Common issues and solutions:

1. Client Component Errors:
   - Ensure components using React hooks have 'use client' directive
   - Check parent components for proper client/server separation

2. Environment Variables:
   - Verify all required variables are set in Vercel
   - Check for proper naming (NEXT_PUBLIC_ prefix for client-side vars)

3. Build Errors:
   - Clear `.next` cache: `rm -rf .next`
   - Rebuild node modules: `rm -rf node_modules && npm install`

## Contributing

1. Create a feature branch:
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes and commit:
```bash
git add .
git commit -m "Description of changes"
```

3. Push to GitHub:
```bash
git push origin feature/your-feature-name
```

4. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
