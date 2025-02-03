'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const LoadingSection = () => (
  <div className="h-96 bg-gray-200 dark:bg-gray-800 animate-pulse">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-4">
        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
      </div>
    </div>
  </div>
)

const HeroSection = dynamic(() => import('@/components/sections/HeroSection'), {
  loading: () => <LoadingSection />
})

const FeaturesSection = dynamic(() => import('@/components/sections/FeaturesSection'), {
  loading: () => <LoadingSection />
})

const TestimonialsSection = dynamic(() => import('@/components/sections/TestimonialsSection'), {
  loading: () => <LoadingSection />
})

const CTASection = dynamic(() => import('@/components/sections/CTASection'), {
  loading: () => <LoadingSection />
})

const FAQSection = dynamic(() => import('@/components/sections/FAQSection'), {
  loading: () => <LoadingSection />
})

export default function HomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <main>
        <LoadingSection />
        <LoadingSection />
        <LoadingSection />
        <LoadingSection />
        <LoadingSection />
      </main>
    )
  }

  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
      <FAQSection />
    </main>
  )
} 