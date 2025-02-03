'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface FAQ {
  question: string
  answer: string
  category: string
}

const faqs: FAQ[] = [
  {
    question: "What is final expense insurance?",
    answer: "Final expense insurance is a type of whole life insurance designed to cover end-of-life expenses, including funeral costs, medical bills, and other outstanding debts. It provides peace of mind knowing your loved ones won't face financial burden during a difficult time.",
    category: "basics"
  },
  {
    question: "How much coverage do I need?",
    answer: "Coverage needs vary by individual, but most people choose between $5,000 and $25,000. Consider factors like funeral costs (average $15,000-$16,000), outstanding medical bills, and other end-of-life expenses when determining your coverage amount.",
    category: "coverage"
  },
  {
    question: "Do I need a medical exam?",
    answer: "No medical exam is required for our final expense insurance. Coverage is guaranteed for ages 50-85, regardless of health conditions. We only ask a few simple health questions to determine your specific plan.",
    category: "eligibility"
  },
  {
    question: "How quickly can I get coverage?",
    answer: "With our streamlined application process, you can get approved in as little as 24 hours. Coverage begins immediately upon approval and first premium payment.",
    category: "process"
  },
  {
    question: "Are the rates guaranteed?",
    answer: "Yes, your premium rate is locked in and will never increase. The coverage amount also remains the same for the life of the policy.",
    category: "pricing"
  },
  {
    question: "How do claims work?",
    answer: "We pride ourselves on a simple, fast claims process. Claims are typically paid within 24-48 hours of submission with proper documentation. Our dedicated claims team is available 24/7 to assist beneficiaries.",
    category: "claims"
  }
]

const categories = [
  { id: 'all', name: 'All Questions' },
  { id: 'basics', name: 'Basics' },
  { id: 'coverage', name: 'Coverage' },
  { id: 'eligibility', name: 'Eligibility' },
  { id: 'process', name: 'Process' },
  { id: 'pricing', name: 'Pricing' },
  { id: 'claims', name: 'Claims' }
]

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const filteredFaqs = activeCategory === 'all'
    ? faqs
    : faqs.filter(faq => faq.category === activeCategory)

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
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Find answers to common questions about our final expense insurance coverage.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={false}
                animate={{ backgroundColor: expandedIndex === index ? 'rgb(249, 250, 251)' : 'white' }}
                className="rounded-lg border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="text-gray-900 font-medium">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                      expandedIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <AnimatePresence initial={false}>
                  {expandedIndex === index && (
                    <motion.div
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { opacity: 1, height: "auto" },
                        collapsed: { opacity: 0, height: 0 }
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Contact Support */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Still have questions? We're here to help.
            </p>
            <a
              href="tel:+18446284442"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call (844) 628-4442
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 