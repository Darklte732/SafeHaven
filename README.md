# Safehaven Insurance Landing Page

A modern landing page with authentication built using Next.js, Tailwind CSS, and Supabase.

## Features

- Email/Password Authentication
- Modern UI with Tailwind CSS
- Responsive Design
- Form Handling
- Server-Side Rendering
- Edge Runtime Support

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env.local` and fill in your environment variables:
   ```bash
   cp .env.example .env.local
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `NEXT_PUBLIC_SITE_URL`: Your site URL (used for auth redirects)

## Deployment

1. Build the application:
   ```bash
   npm run build
   ```
2. Start the production server:
   ```bash
   npm start
   ```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks
