'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Suspense } from 'react'
import Link from 'next/link'
import { SafeImage } from '../components/ui/image'
import { Inter } from 'next/font/google'
import { BeneficiaryWorkbookSection } from '@/components/BeneficiaryWorkbookSection'
import { GuideDownloadSection } from '@/components/GuideDownloadSection'

const inter = Inter({ subsets: ['latin'] })

// Import components normally since they're already client components
import HeroSection from '@/components/sections/HeroSection'
import ProblemSolutionSection from '@/components/sections/ProblemSolutionSection'
import SocialProofSection from '@/components/sections/SocialProofSection'
import FeaturesSection from '@/components/sections/FeaturesSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import ROICalculator from '@/components/sections/ROICalculator'
import CTASection from '@/components/sections/CTASection'
import FAQSection from '@/components/sections/FAQSection'

// Analytics setup
const initAnalytics = () => {
  // Initialize scroll depth tracking
  const scrollDepths = [25, 50, 75, 100]
  let triggeredDepths: number[] = []

  const trackScrollDepth = () => {
    const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100
    scrollDepths.forEach(depth => {
      if (scrollPercent >= depth && !triggeredDepths.includes(depth)) {
        triggeredDepths.push(depth)
        // Track event
        console.log(`Scrolled to ${depth}%`)
      }
    })
  }

  window.addEventListener('scroll', trackScrollDepth)
  return () => window.removeEventListener('scroll', trackScrollDepth)
}

export default function LandingPage() {
  const [userSegment, setUserSegment] = useState('default')
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  useEffect(() => {
    // Initialize analytics
    const cleanup = initAnalytics()

    // Detect user segment based on URL parameters or other signals
    const params = new URLSearchParams(window.location.search)
    const segment = params.get('segment') || 'default'
    setUserSegment(segment)

    return cleanup
  }, [])

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="relative">
      <Suspense fallback={<div className="h-screen bg-gray-100 animate-pulse" />}>
      {/* Hero Section */}
        <HeroSection userSegment={userSegment} />

        {/* Problem/Solution Section */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeIn}
          transition={{ duration: 0.6 }}
        >
          <ProblemSolutionSection userSegment={userSegment} />
        </motion.div>

        {/* Social Proof */}
        <SocialProofSection />

        {/* Features Grid */}
        <FeaturesSection userSegment={userSegment} />

        {/* Testimonials Carousel */}
        <TestimonialsSection />

        {/* ROI Calculator */}
        <ROICalculator />

        {/* Call to Action */}
        <CTASection />

      {/* FAQ Section */}
        <FAQSection />

        {/* Exit Intent Popup */}
        <ExitIntentPopup />

        {/* Progress Indicator */}
        <ScrollProgressIndicator />

        {/* Chat Widget */}
        <ChatWidget />

        <BeneficiaryWorkbookSection />
        <GuideDownloadSection />
      </Suspense>
          </div>
  )
}

// Progress Indicator Component
const ScrollProgressIndicator = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      const currentProgress = (window.scrollY / totalScroll) * 100
      setProgress(currentProgress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
      <div 
        className="h-full bg-blue-600 transition-all duration-200"
        style={{ width: `${progress}%` }}
      />
        </div>
  )
}

// Exit Intent Popup
const ExitIntentPopup = () => {
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !localStorage.getItem('exitPopupShown')) {
        setShowPopup(true)
        localStorage.setItem('exitPopupShown', 'true')
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [])

  if (!showPopup) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md mx-4">
        <h3 className="text-2xl font-bold mb-4">Wait! Don't miss out...</h3>
        <p className="text-gray-600 mb-6">
          Get 20% off your first month when you sign up today.
        </p>
        <div className="flex gap-4">
          <button 
            onClick={() => setShowPopup(false)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Claim Offer
          </button>
          <button 
            onClick={() => setShowPopup(false)}
            className="px-6 py-2 text-gray-600 hover:text-gray-800"
          >
            No thanks
          </button>
        </div>
      </div>
                </div>
  )
}

// Chat Widget
const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-700 transition-colors"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          )}
                </svg>
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 w-96 bg-white rounded-lg shadow-xl">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold">Chat with us</h3>
          </div>
          <div className="h-96 p-4">
            {/* Chat interface would go here */}
            <p className="text-gray-600">Chat functionality to be implemented...</p>
          </div>
        </div>
      )}
    </div>
  )
}