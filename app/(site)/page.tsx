import dynamic from 'next/dynamic'

// Dynamically import client components with SSR disabled
const HeroSection = dynamic(() => import('@/components/sections/HeroSection'), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-200 dark:bg-gray-800 animate-pulse" />
})

const FeaturesSection = dynamic(() => import('@/components/sections/FeaturesSection'), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-200 dark:bg-gray-800 animate-pulse" />
})

const TestimonialsSection = dynamic(() => import('@/components/sections/TestimonialsSection'), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-200 dark:bg-gray-800 animate-pulse" />
})

const CTASection = dynamic(() => import('@/components/sections/CTASection'), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-200 dark:bg-gray-800 animate-pulse" />
})

const FAQSection = dynamic(() => import('@/components/sections/FAQSection'), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-200 dark:bg-gray-800 animate-pulse" />
})

export default function HomePage() {
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