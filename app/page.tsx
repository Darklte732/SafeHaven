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
import Image from 'next/image'

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

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative flex place-items-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Protect Your Family's Future with Affordable Final Expense Insurance
        </h1>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
          <h2 className="mb-3 text-2xl font-semibold">
            Coverage from $20/month
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Affordable plans that fit your budget.
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
          <h2 className="mb-3 text-2xl font-semibold">
            No Medical Exam
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Quick and easy approval process.
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
          <h2 className="mb-3 text-2xl font-semibold">
            24/7 Support
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            We're here when you need us.
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
          <h2 className="mb-3 text-2xl font-semibold">
            Fast Claims
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Claims paid within 24-48 hours.
          </p>
        </div>
      </div>
    </main>
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