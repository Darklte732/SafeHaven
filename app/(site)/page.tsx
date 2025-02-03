import { Suspense } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import sections with loading states
const HeroSection = dynamic(() => import('@/components/sections/HeroSection'), {
  loading: () => <div className="h-screen animate-pulse bg-gray-100" />
})

const FeaturesSection = dynamic(() => import('@/components/sections/FeaturesSection'), {
  loading: () => <div className="h-96 animate-pulse bg-gray-50" />
})

const TestimonialsSection = dynamic(() => import('@/components/sections/TestimonialsSection'), {
  loading: () => <div className="h-96 animate-pulse bg-gray-100" />
})

const CTASection = dynamic(() => import('@/components/sections/CTASection'), {
  loading: () => <div className="h-64 animate-pulse bg-gray-50" />
})

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen">
      <Suspense fallback={<div className="h-screen animate-pulse bg-gray-100" />}>
        <HeroSection />
      </Suspense>
      <Suspense fallback={<div className="h-96 animate-pulse bg-gray-50" />}>
        <FeaturesSection />
      </Suspense>
      <Suspense fallback={<div className="h-96 animate-pulse bg-gray-100" />}>
        <TestimonialsSection />
      </Suspense>
      <Suspense fallback={<div className="h-64 animate-pulse bg-gray-50" />}>
        <CTASection />
      </Suspense>
    </main>
  )
} 