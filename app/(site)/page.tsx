'use client'

import dynamic from 'next/dynamic'
import ClientOnly from '@/components/ClientOnly'

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
  ssr: false,
  loading: () => <LoadingSection />
})

const FeaturesSection = dynamic(() => import('@/components/sections/FeaturesSection'), {
  ssr: false,
  loading: () => <LoadingSection />
})

const TestimonialsSection = dynamic(() => import('@/components/sections/TestimonialsSection'), {
  ssr: false,
  loading: () => <LoadingSection />
})

const CTASection = dynamic(() => import('@/components/sections/CTASection'), {
  ssr: false,
  loading: () => <LoadingSection />
})

const FAQSection = dynamic(() => import('@/components/sections/FAQSection'), {
  ssr: false,
  loading: () => <LoadingSection />
})

const LoadingPage = () => (
  <main>
    <LoadingSection />
    <LoadingSection />
    <LoadingSection />
    <LoadingSection />
    <LoadingSection />
  </main>
)

export default function HomePage() {
  return (
    <ClientOnly fallback={<LoadingPage />}>
      <main>
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CTASection />
        <FAQSection />
      </main>
    </ClientOnly>
  )
} 