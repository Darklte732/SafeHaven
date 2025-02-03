'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { SafeImage } from '../ui/image'

interface HeroSectionProps {
  userSegment?: string
}

interface ContentType {
  title: string
  subtitle: string
  image: string
}

const contentMap: Record<string, ContentType> = {
  default: {
    title: "Protect Your Family's Future with Affordable Final Expense Insurance",
    subtitle: "Get peace of mind knowing your loved ones won't face financial burden. Coverage starts at just $20/month.",
    image: "/images/family-generations.svg"
  },
  business: {
    title: "Comprehensive Business Insurance Solutions",
    subtitle: "Protect your business and employees with our tailored insurance plans. Starting at $50/month.",
    image: "/images/business-team.svg"
  }
}

export default function HeroSection({ userSegment = 'default' }: HeroSectionProps) {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const content = contentMap[userSegment] || contentMap.default

  return (
    <section className="relative bg-white py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white" />
      
      <div className="relative container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4">
              <span className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-sm">
                <SafeImage
                  src="/images/bbb-logo.svg"
                  alt="BBB A+ Rating"
                  width={20}
                  height={20}
                  className="mr-2"
                  priority
                />
                <span className="text-sm font-medium text-gray-900">A+ BBB Rating</span>
              </span>
              <span className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-sm">
                <SafeImage
                  src="/images/shield.svg"
                  alt="Licensed & Insured"
                  width={20}
                  height={20}
                  className="mr-2"
                  priority
                />
                <span className="text-sm font-medium text-gray-900">Licensed & Insured</span>
              </span>
            </div>

            {/* Main Content */}
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {content.title}
              </h1>
              <p className="text-xl text-gray-600">
                {content.subtitle}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/quote"
                className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
              >
                Get Your Free Quote
              </Link>
              <Link
                href="/guide"
                className="inline-flex justify-center items-center px-6 py-3 border-2 border-blue-600 text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-colors duration-200"
              >
                Learn More
                <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent z-10" />
              <SafeImage
                src={content.image}
                alt="Family Protection"
                width={600}
                height={400}
                className="w-full h-full object-cover"
                priority
              />
            </div>

            {/* Floating Elements */}
            <motion.div
              className="absolute -top-6 -right-6 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="font-semibold">24/7 Support</span>
            </motion.div>
            <motion.div
              className="absolute -bottom-6 -left-6 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              <span className="font-semibold">98% Claims Satisfaction</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 
