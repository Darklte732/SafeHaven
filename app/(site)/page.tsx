import { Suspense } from 'react'

// Loading component
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )
}

// Import sections
import HeroSection from '@/components/sections/HeroSection'
import FeaturesSection from '@/components/sections/FeaturesSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import CTASection from '@/components/sections/CTASection'

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen">
      <Suspense fallback={<LoadingSpinner />}>
        <HeroSection />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <FeaturesSection />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <TestimonialsSection />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <CTASection />
      </Suspense>
    </main>
  )
} 