'use client'

import { Suspense } from 'react'
import HeroSection from '@/components/sections/HeroSection'
import FeaturesSection from '@/components/sections/FeaturesSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import CTASection from '@/components/sections/CTASection'
import FAQSection from '@/components/sections/FAQSection'

export default function HomePage() {
  return (
    <Suspense fallback={
      <div className="animate-pulse space-y-8">
        <div className="h-96 bg-gray-200 dark:bg-gray-800" />
        <div className="h-96 bg-gray-200 dark:bg-gray-800" />
        <div className="h-96 bg-gray-200 dark:bg-gray-800" />
      </div>
    }>
      <main>
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CTASection />
        <FAQSection />
      </main>
    </Suspense>
  )
} 