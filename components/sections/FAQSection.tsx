'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Container } from "@/components/ui/Container"

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
    answer: "Most policies can be activated within minutes of completing your application. Once your payment is processed, your coverage begins immediately.",
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
  },
  {
    question: "What types of insurance do you offer?",
    answer: "We offer a comprehensive range of insurance products including life, health, auto, and home insurance. Each can be customized to meet your specific needs.",
    category: "insurance"
  },
  {
    question: "How do I file a claim?",
    answer: "Filing a claim is easy through our online portal. Simply log in to your account, navigate to the claims section, and follow the guided process. Most claims are processed within 24-48 hours.",
    category: "claims"
  },
  {
    question: "Are there any age restrictions?",
    answer: "Coverage options are available for all ages, though specific terms and rates may vary. Contact us for personalized information based on your age and needs.",
    category: "eligibility"
  },
  {
    question: "Can I modify my coverage after purchase?",
    answer: "Yes, you can modify your coverage at any time. Contact our customer service team or log in to your account to make changes to your policy.",
    category: "process"
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, direct bank transfers, and digital payment methods. You can choose between monthly, quarterly, or annual payment schedules.",
    category: "pricing"
  },
]

const categories = [
  { id: 'all', name: 'All Questions' },
  { id: 'basics', name: 'Basics' },
  { id: 'coverage', name: 'Coverage' },
  { id: 'eligibility', name: 'Eligibility' },
  { id: 'process', name: 'Process' },
  { id: 'pricing', name: 'Pricing' },
  { id: 'claims', name: 'Claims' },
  { id: 'insurance', name: 'Insurance' },
]

export const FAQSection = () => {
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
    <div className="py-24 sm:py-32 bg-gray-50">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">FAQ</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Find answers to common questions about our insurance services. Can't find what you're looking for? Contact our support team.
          </p>
        </div>
        <dl className="mx-auto mt-16 max-w-4xl space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div
              key={faq.question}
              className="bg-white px-6 py-4 rounded-lg shadow-sm"
            >
              <dt>
                <button
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="flex w-full items-start justify-between text-left"
                >
                  <span className="text-base font-semibold leading-7 text-gray-900">
                    {faq.question}
                  </span>
                  <span className="ml-6 flex h-7 items-center">
                    <svg
                      className={`h-6 w-6 transform ${
                        expandedIndex === index ? "rotate-180" : ""
                      } text-gray-400`}
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </span>
                </button>
              </dt>
              <dd
                className={`${
                  expandedIndex === index ? "mt-2" : "hidden"
                } pr-12 text-base leading-7 text-gray-600`}
              >
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </div>
  )
}

export default FAQSection 