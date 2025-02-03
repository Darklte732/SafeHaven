import { Suspense } from 'react'
import dynamic from 'next/dynamic'

// Loading component
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )
}

// Sections
const HeroSection = dynamic(() => import('@/components/sections/HeroSection'), {
  loading: () => <LoadingSpinner />,
  ssr: true
})

const FeaturesSection = dynamic(() => import('@/components/sections/FeaturesSection'), {
  loading: () => <LoadingSpinner />,
  ssr: true
})

const TestimonialsSection = dynamic(() => import('@/components/sections/TestimonialsSection'), {
  loading: () => <LoadingSpinner />,
  ssr: true
})

const CTASection = dynamic(() => import('@/components/sections/CTASection'), {
  loading: () => <LoadingSpinner />,
  ssr: true
})

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