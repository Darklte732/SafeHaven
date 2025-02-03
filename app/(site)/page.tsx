import { Suspense } from 'react'
import dynamic from 'next/dynamic'

// Import sections dynamically
const HeroSection = dynamic(() => import('@/components/sections/HeroSection'))
const FeaturesSection = dynamic(() => import('@/components/sections/FeaturesSection'))
const TestimonialsSection = dynamic(() => import('@/components/sections/TestimonialsSection'))
const CTASection = dynamic(() => import('@/components/sections/CTASection'))

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      }>
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CTASection />
      </Suspense>
    </main>
  )
} 