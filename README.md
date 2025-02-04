# SafeHaven Insurance Platform

A modern insurance platform built with Next.js, featuring a dynamic landing page, admin dashboard, and comprehensive insurance management system.

## Features

- Landing page with dynamic sections
- Admin dashboard with KPI tracking
- Customer management system
- Policy and payment tracking
- Interactive calculators and forms
- Real-time chat support
- Voice integration capabilities
- Multi-language support (planned)
- Mobile-responsive design
- SEO optimization

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Supabase, PostgreSQL
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Analytics**: Custom KPI tracking
- **UI Components**: HeadlessUI, Heroicons
- **Animation**: Framer Motion
- **Form Handling**: React Hook Form
- **State Management**: React Context + Hooks

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/your-username/landpage_insurance.git
```

2. Install dependencies:
```bash
cd landpage_insurance
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/app` - Next.js app directory with routes and API endpoints
- `/components` - Reusable React components
- `/public` - Static assets
- `/types` - TypeScript type definitions
- `/utils` - Utility functions and helpers

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
