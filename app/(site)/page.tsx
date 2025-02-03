import { Suspense } from 'react'
import dynamic from 'next/dynamic'

// Import sections
import HeroSection from '@/components/sections/HeroSection'
import FeaturesSection from '@/components/sections/FeaturesSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import CTASection from '@/components/sections/CTASection'

// Loading component as a client component
const LoadingSpinner = dynamic(() => import('@/components/ui/LoadingSpinner'), {
  ssr: false,
})

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  )
} 