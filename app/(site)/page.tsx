import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Dynamically import client components
const HeroSection = dynamic(() => import('@/components/sections/HeroSection'), {
  loading: () => <div className="h-96 bg-gray-200 dark:bg-gray-800 animate-pulse" />
})

const FeaturesSection = dynamic(() => import('@/components/sections/FeaturesSection'), {
  loading: () => <div className="h-96 bg-gray-200 dark:bg-gray-800 animate-pulse" />
})

const TestimonialsSection = dynamic(() => import('@/components/sections/TestimonialsSection'), {
  loading: () => <div className="h-96 bg-gray-200 dark:bg-gray-800 animate-pulse" />
})

const CTASection = dynamic(() => import('@/components/sections/CTASection'), {
  loading: () => <div className="h-96 bg-gray-200 dark:bg-gray-800 animate-pulse" />
})

const FAQSection = dynamic(() => import('@/components/sections/FAQSection'), {
  loading: () => <div className="h-96 bg-gray-200 dark:bg-gray-800 animate-pulse" />
})

export default function HomePage() {
  return (
    <main>
      <Suspense fallback={<div className="h-96 bg-gray-200 dark:bg-gray-800 animate-pulse" />}>
        <HeroSection />
      </Suspense>
      <Suspense fallback={<div className="h-96 bg-gray-200 dark:bg-gray-800 animate-pulse" />}>
        <FeaturesSection />
      </Suspense>
      <Suspense fallback={<div className="h-96 bg-gray-200 dark:bg-gray-800 animate-pulse" />}>
        <TestimonialsSection />
      </Suspense>
      <Suspense fallback={<div className="h-96 bg-gray-200 dark:bg-gray-800 animate-pulse" />}>
        <CTASection />
      </Suspense>
      <Suspense fallback={<div className="h-96 bg-gray-200 dark:bg-gray-800 animate-pulse" />}>
        <FAQSection />
      </Suspense>
    </main>
  )
} 