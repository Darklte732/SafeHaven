'use client'

import dynamic from 'next/dynamic'
import { TestimonialsLoader } from '@/components/loaders/TestimonialsLoader'
import { Suspense } from 'react'

const Testimonials = dynamic(() => import('@/components/sections/testimonials'), {
  loading: () => <TestimonialsLoader />,
  ssr: false
})

const FAQItem = dynamic(() => import('@/components/ui/faq-item'))
const CarrierLogos = dynamic(() => import('@/components/carriers/CarrierLogos'), {
  loading: () => <div className="h-20 animate-pulse bg-gray-100 rounded-lg" />
})
const SocialLinks = dynamic(() => import('@/components/ui/social-links'))

interface FAQItemProps {
  question: string
  answer: string
}

export function DynamicCarrierLogos() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container-custom">
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-8">Trusted By Leading Insurance Carriers</h2>
        <CarrierLogos />
      </div>
    </section>
  )
}

export function DynamicTestimonials() {
  return (
    <Suspense fallback={<TestimonialsLoader />}>
      <Testimonials />
    </Suspense>
  )
}

export function DynamicFAQ() {
  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="container-custom">
        <h2 className="text-center mb-16">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <FAQItem 
            question="What is final expense insurance?"
            answer="Final expense insurance is a type of whole life insurance designed to cover end-of-life expenses, including funeral costs, medical bills, and other outstanding debts. It provides peace of mind knowing your loved ones won't face financial burden."
          />
          <FAQItem 
            question="How much coverage do I need?"
            answer="Coverage needs vary by individual, but most people choose between $5,000 and $25,000. Consider factors like funeral costs (average $15,000-$16,000), outstanding medical bills, and other end-of-life expenses."
          />
          <FAQItem 
            question="How quickly can I get coverage?"
            answer="With our streamlined application process, you can get approved in as little as 24 hours. There's no medical exam required, and coverage can begin immediately upon approval and first premium payment."
          />
        </div>
      </div>
    </section>
  )
}

export function DynamicSocialLinks() {
  return (
    <Suspense fallback={<div className="h-20" />}>
      <SocialLinks />
    </Suspense>
  )
} 