'use client';

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { SafeImage } from './ui/image'
import Link from 'next/link'

export function BeneficiaryWorkbookSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Free Beneficiary Planning Workbook
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Download our comprehensive workbook to help organize important information for your beneficiaries. This valuable resource includes:
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Important document checklist',
                  'Contact information organizer',
                  'Asset inventory worksheet',
                  'Final wishes planner',
                  'Step-by-step guide for beneficiaries'
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/workbook"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Download Free Workbook
                <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent rounded-2xl" />
              <SafeImage
                src="/images/workbook-preview.svg"
                alt="Beneficiary Planning Workbook Preview"
                width={600}
                height={400}
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-white px-6 py-3 rounded-lg shadow-lg">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-2 text-sm font-medium text-gray-900">4.9/5 Rating</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">From 1,000+ downloads</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 