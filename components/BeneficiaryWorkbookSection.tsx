'use client';

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

export function BeneficiaryWorkbookSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const handleDownload = async () => {
    try {
      // Track download event
      console.log('Workbook download started');
      
      // Simulate download delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In production, this would be a real download
      window.location.href = '/downloads/beneficiary-workbook.pdf';
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
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
              <ul className="space-y-4">
                {[
                  'Important document checklist',
                  'Contact information organizer',
                  'Asset inventory worksheet',
                  'Final wishes planner',
                  'Step-by-step guide for beneficiaries'
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <button 
                onClick={handleDownload}
                className="mt-8 inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Download Free Workbook
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
              </button>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/images/workbook-preview.png"
                    alt="Beneficiary Planning Workbook Preview"
                    fill
                    className="object-contain rounded-lg"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="space-y-4 mt-6">
                  <div className="h-4 bg-gray-100 rounded w-3/4" />
                  <div className="h-4 bg-gray-100 rounded w-1/2" />
                  <div className="h-4 bg-gray-100 rounded w-5/6" />
                </div>
              </div>
              <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg px-4 py-2">
                <div className="flex items-center">
                  <div className="text-yellow-400 mr-1">★</div>
                  <span className="font-medium">4.9/5 Rating</span>
                  <span className="text-sm text-gray-500 ml-2">From 1,000+ downloads</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 