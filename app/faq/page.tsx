'use client';

import { useState } from 'react';
import { SafeImage } from '@/components/ui/image';
import ClientOnly from '@/components/ClientOnly';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is final expense insurance?",
    answer: "Final expense insurance is a type of whole life insurance designed to cover end-of-life expenses, including funeral costs, medical bills, and other outstanding debts. It provides peace of mind knowing your loved ones won't face financial burden during a difficult time."
  },
  {
    question: "How much coverage do I need?",
    answer: "Coverage needs vary by individual, but most people choose between $5,000 and $25,000. Consider factors like funeral costs (average $15,000-$16,000), outstanding medical bills, and other end-of-life expenses when determining your coverage amount."
  },
  {
    question: "How quickly can I get coverage?",
    answer: "With our streamlined application process, you can get approved in as little as 24 hours. There's no medical exam required, and coverage can begin immediately upon approval and first premium payment."
  },
  {
    question: "Are there any waiting periods?",
    answer: "Most of our policies provide immediate coverage upon approval. However, some policies may have a 2-year limited benefit period for natural causes of death. Accidental death is covered from day one."
  },
  {
    question: "Can I cancel my policy?",
    answer: "Yes, you can cancel your policy at any time. We offer a 30-day money-back guarantee, allowing you to cancel within the first month for a full refund if you're not satisfied."
  },
  {
    question: "How do I file a claim?",
    answer: "Filing a claim is simple. Contact our claims department at 1-844-628-4442, and our team will guide you through the process. Most claims are processed and paid within 24-48 hours of receiving all required documentation."
  }
];

function FAQContent() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-24">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions about final expense insurance.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="faq-question"
              >
                <span>{faq.question}</span>
                <svg
                  className={`w-6 h-6 transform transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div className="faq-answer">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-gray-600 mb-6">Still have questions?</p>
          <div className="flex justify-center gap-4">
            <a href="/chat" className="button-cta">
              Chat with AI Assistant
            </a>
            <a href="tel:+18446284442" className="button-outline">
              Call (844) 628-4442
            </a>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 mt-12">
          <div className="badge-container">
            <SafeImage src="/images/badges/secure.svg" alt="Secure Transaction" width={24} height={24} />
            <span>Secure Transaction</span>
          </div>
          <div className="badge-container">
            <SafeImage src="/images/badges/privacy.svg" alt="Privacy Protected" width={24} height={24} />
            <span>Privacy Protected</span>
          </div>
          <div className="badge-container">
            <SafeImage src="/images/badges/guarantee.svg" alt="30-Day Money-Back Guarantee" width={24} height={24} />
            <span>30-Day Money-Back Guarantee</span>
          </div>
        </div>
      </div>
    </main>
  );
}

const LoadingFAQ = () => (
  <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-24">
    <div className="container-custom">
      <div className="text-center mb-12 animate-pulse">
        <div className="h-10 bg-gray-200 rounded w-2/3 mx-auto mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </main>
);

export default function FAQPage() {
  return (
    <ClientOnly fallback={<LoadingFAQ />}>
      <FAQContent />
    </ClientOnly>
  );
} 