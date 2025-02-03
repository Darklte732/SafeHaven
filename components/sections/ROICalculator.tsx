'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useRouter } from 'next/navigation'

export default function ROICalculator() {
  const [age, setAge] = useState(50)
  const [coverage, setCoverage] = useState(10000)
  const [monthlyPayment, setMonthlyPayment] = useState(calculateMonthlyPayment(50, 10000))
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  // Handle client-side mounting
  useEffect(() => {
    setIsMounted(true)
  }, [])

  function calculateMonthlyPayment(age: number, coverage: number): number {
    // Base rate starts at $18 for $5,000 at age 50
    const baseMonthlyRate = 18
    
    // Calculate coverage multiplier (proportional increase from base $5,000)
    const coverageMultiplier = coverage / 5000
    
    // Age factor calculation
    // At 50: factor = 1
    // Increases by 3% per year up to age 60
    // Increases by 5% per year from 61-70
    // Increases by 7% per year from 71-85
    let ageFactor = 1
    if (age > 50) {
      // First handle ages 51-60
      const yearsOver50 = Math.min(age - 50, 10)
      ageFactor *= Math.pow(1.03, yearsOver50)
      
      // Then handle ages 61-70
      if (age > 60) {
        const yearsOver60 = Math.min(age - 60, 10)
        ageFactor *= Math.pow(1.05, yearsOver60)
      }
      
      // Finally handle ages 71-85
      if (age > 70) {
        const yearsOver70 = Math.min(age - 70, 15)
        ageFactor *= Math.pow(1.07, yearsOver70)
      }
    }
    
    // Coverage discount for larger policies
    let coverageDiscount = 1
    if (coverage >= 20000) coverageDiscount = 0.95
    else if (coverage >= 10000) coverageDiscount = 0.97
    
    // Calculate final monthly premium
    const monthlyRate = baseMonthlyRate * coverageMultiplier * ageFactor * coverageDiscount
    
    // Round to nearest dollar and ensure minimum premium
    return Math.max(Math.round(monthlyRate), 18)
  }

  // Add analytics tracking
  const trackCalculatorInteraction = (type: 'age' | 'coverage' | 'quote_request', value: number) => {
    // Track calculator interactions
    try {
      // Only track if in production
      if (process.env.NODE_ENV === 'production') {
        const analyticsData = {
          type,
          value,
          resultingPremium: monthlyPayment,
          timestamp: new Date().toISOString()
        }
        console.log('Track:', analyticsData)
        // Add your analytics implementation here
      }
    } catch (error) {
      console.error('Analytics error:', error)
    }
  }

  const handleAgeChange = (newAge: number) => {
    setAge(newAge)
    const newPayment = calculateMonthlyPayment(newAge, coverage)
    setMonthlyPayment(newPayment)
    trackCalculatorInteraction('age', newAge)
  }

  const handleCoverageChange = (newCoverage: number) => {
    setCoverage(newCoverage)
    const newPayment = calculateMonthlyPayment(age, newCoverage)
    setMonthlyPayment(newPayment)
    trackCalculatorInteraction('coverage', newCoverage)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)
  }

  const handleGetQuote = async () => {
    try {
      setIsSubmitting(true)
      trackCalculatorInteraction('quote_request', coverage)

      // Prepare quote data
      const quoteData = {
        age,
        coverage,
        monthlyPayment,
        timestamp: new Date().toISOString()
      }

      // Only store in sessionStorage on client side
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('quoteData', JSON.stringify(quoteData))
      }

      // Redirect to quote form with parameters
      router.push(`/quote/form?age=${age}&coverage=${coverage}&premium=${monthlyPayment}`)
    } catch (error) {
      console.error('Error processing quote:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Don't render until mounted on client
  if (!isMounted) {
    return null // or a loading placeholder
  }

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Calculate Your Coverage
            </h2>
            <p className="text-lg text-gray-600">
              Use our calculator to estimate your monthly premium and find the right coverage for your needs.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column - Inputs */}
              <div className="space-y-6">
                <div>
                  <label 
                    id="age-label"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Your Age: {age}
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="85"
                    value={age}
                    onChange={(e) => handleAgeChange(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    aria-labelledby="age-label"
                    aria-valuemin={50}
                    aria-valuemax={85}
                    aria-valuenow={age}
                    aria-valuetext={`${age} years old`}
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>50</span>
                    <span>85</span>
                  </div>
                </div>

                <div>
                  <label 
                    id="coverage-label"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Coverage Amount: {formatCurrency(coverage)}
                  </label>
                  <input
                    type="range"
                    min="5000"
                    max="50000"
                    step="1000"
                    value={coverage}
                    onChange={(e) => handleCoverageChange(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    aria-labelledby="coverage-label"
                    aria-valuemin={5000}
                    aria-valuemax={50000}
                    aria-valuenow={coverage}
                    aria-valuetext={`${formatCurrency(coverage)} coverage`}
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>{formatCurrency(5000)}</span>
                    <span>{formatCurrency(50000)}</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Results */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Your Estimated Premium
                </h3>
                <div 
                  className="text-4xl font-bold text-blue-600 mb-4"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {formatCurrency(monthlyPayment)}
                  <span className="text-lg font-normal text-gray-600">/month</span>
                </div>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Guaranteed acceptance
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    No medical exam required
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Rate locked in for life
                  </li>
                </ul>
                <button 
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleGetQuote}
                  disabled={isSubmitting}
                  aria-label="Get your free quote based on the calculated premium"
                >
                  {isSubmitting ? 'Processing...' : 'Get Your Free Quote'}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            * Rates are for illustration purposes only. Final rate will be determined during the application process.
          </div>
        </motion.div>
      </div>
    </section>
  )
} 