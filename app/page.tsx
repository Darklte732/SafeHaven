'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  const [age, setAge] = useState(50);
  const [coverageAmount, setCoverageAmount] = useState(10000);

  return (
    <div className="min-h-screen">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-white z-50 border-b border-gray-200">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" alt="SafeHaven" width={32} height={32} className="mr-2" />
              <span className="text-xl font-bold">SafeHaven</span>
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link href="/features" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Features</Link>
            <Link href="/get-quote" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Get Quote</Link>
            <Link href="/faq" className="text-gray-600 hover:text-gray-900 text-sm font-medium">FAQ</Link>
            <Link href="/chat" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Chat</Link>
            <Link href="/admin" className="bg-[#3B82F6] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
              Admin Dashboard
            </Link>
            <Link href="/support" className="bg-[#3B82F6] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
              24/7 Support
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-28 pb-20 bg-gradient-to-br from-blue-500 to-blue-600">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center -mx-4">
            <div className="w-full lg:w-1/2 px-4 mb-12 lg:mb-0">
              <div className="flex items-center space-x-6 mb-8">
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <svg className="w-5 h-5 text-white mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white text-sm font-medium">A+ BBB Rating</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <svg className="w-5 h-5 text-white mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white text-sm font-medium">Licensed & Insured</span>
                </div>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Protect Your Family's Future with Affordable Final Expense Insurance
              </h1>
              <p className="text-xl text-white/90 mb-10 leading-relaxed">
                Get peace of mind knowing your loved ones won't face financial burden. Coverage starts at just $20/month.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/quote"
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-all transform hover:scale-105"
                >
                  Get Your Free Quote
                </Link>
                <Link
                  href="/learn-more"
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition-all"
                >
                  Learn More →
                </Link>
              </div>
            </div>
            <div className="w-full lg:w-1/2 px-4">
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <Image
                    src="/family-illustration.svg"
                    alt="Family Protection"
                    width={600}
                    height={400}
                    className="w-full h-auto"
                    priority
                  />
                  <div className="absolute -bottom-4 right-4 bg-green-500 text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg">
                    98% Claims Satisfaction
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-red-50 text-red-600 rounded-full text-sm font-medium mb-8">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                The Problem
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                The Hidden Cost of Being Unprepared
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Many families face unexpected financial burdens during their most difficult moments.
              </p>
              <ul className="space-y-6">
                {[
                  'Average funeral costs exceed $9,000',
                  'Unexpected medical bills can reach tens of thousands',
                  '78% of Americans live paycheck to paycheck',
                  'Grieving families often struggle with debt'
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mt-1">
                      <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="ml-3 text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-green-50 text-green-600 rounded-full text-sm font-medium mb-8">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                The Solution
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Peace of Mind with SafeHaven
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We provide comprehensive coverage that ensures your family's financial security.
              </p>
              <ul className="space-y-6">
                {[
                  'Guaranteed acceptance for ages 50-85',
                  'Coverage from $5,000 to $50,000',
                  'Claims paid within 24-48 hours',
                  'No medical exam required'
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="ml-3 text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 border-t border-gray-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image
                  src="/bbb-logo.svg"
                  alt="BBB Rating"
                  width={40}
                  height={40}
                  className="text-blue-600"
                />
              </div>
              <div className="text-xl font-bold text-gray-900">A+ BBB Rating</div>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image
                  src="/ssl-icon.svg"
                  alt="SSL Secured"
                  width={40}
                  height={40}
                  className="text-blue-600"
                />
              </div>
              <div className="text-xl font-bold text-gray-900">SSL Secured</div>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image
                  src="/license-icon.svg"
                  alt="Licensed & Insured"
                  width={40}
                  height={40}
                  className="text-blue-600"
                />
              </div>
              <div className="text-xl font-bold text-gray-900">Licensed & Insured</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Featured In</h2>
          <div className="grid grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">50K+</div>
              <div className="text-lg text-gray-600">Families Protected</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-lg text-gray-600">Claims Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-lg text-gray-600">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Calculator */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              Calculate Your Coverage
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12">
              Use our calculator to estimate your monthly premium and find the right coverage for your needs.
            </p>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <div className="mb-8">
                    <label className="block text-gray-700 font-medium mb-2">
                      Your Age: {age}
                    </label>
                    <input
                      type="range"
                      min="50"
                      max="85"
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>50</span>
                      <span>85</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Coverage Amount: ${coverageAmount.toLocaleString()}
                    </label>
                    <input
                      type="range"
                      min="5000"
                      max="50000"
                      step="5000"
                      value={coverageAmount}
                      onChange={(e) => setCoverageAmount(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>$5,000</span>
                      <span>$50,000</span>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-xl p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Your Estimated Premium
                  </h3>
                  <div className="text-5xl font-bold text-blue-600 mb-6">
                    ${((coverageAmount * 0.003) + (age - 50) * 0.5).toFixed(2)}
                    <span className="text-2xl font-medium">/month</span>
                  </div>
                  <ul className="space-y-4">
                    {[
                      'Guaranteed acceptance',
                      'No medical exam required',
                      'Rate locked in for life'
                    ].map((item, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/quote"
                    className="block w-full bg-blue-600 text-white text-center py-4 rounded-lg font-semibold mt-8 hover:bg-blue-700 transition-colors"
                  >
                    Get Your Free Quote
                  </Link>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500 text-center mt-4">
              * Rates are for illustration purposes only. Final rate will be determined during the application process.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12">
            Find answers to common questions about our final expense insurance coverage.
          </p>
          <div className="max-w-3xl mx-auto">
            <div className="flex space-x-4 justify-center mb-8">
              {[
                'All Questions',
                'Basics',
                'Coverage',
                'Eligibility',
                'Process',
                'Pricing',
                'Claims'
              ].map((tab, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    index === 0
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="space-y-4">
              {[
                {
                  question: 'What is final expense insurance?',
                  answer: 'Final expense insurance is a type of whole life insurance designed to cover end-of-life expenses such as funeral costs, medical bills, and other outstanding debts.'
                },
                {
                  question: 'How much coverage do I need?',
                  answer: 'Coverage needs vary, but most families choose between $10,000 and $25,000 to cover final expenses. Our agents can help you determine the right amount for your situation.'
                },
                {
                  question: 'Do I need a medical exam?',
                  answer: 'No medical exam is required. Coverage is guaranteed for ages 50-85, regardless of health conditions.'
                },
                {
                  question: 'How quickly can I get coverage?',
                  answer: 'Coverage can be approved instantly, and your policy can be active within 24 hours of application.'
                },
                {
                  question: 'Are the rates guaranteed?',
                  answer: 'Yes, once your policy is issued, your rates are locked in for life and will never increase.'
                }
              ].map((faq, index) => (
                <details
                  key={index}
                  className="bg-white rounded-xl shadow-sm group"
                >
                  <summary className="flex items-center justify-between cursor-pointer p-6">
                    <span className="text-lg font-medium text-gray-900">
                      {faq.question}
                    </span>
                    <svg
                      className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-blue-600 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Protect Your Family's Future?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
            Join thousands of satisfied customers who trust SafeHaven Insurance. Get your free quote today and secure peace of mind for your loved ones.
          </p>
          <div className="flex justify-center space-x-6 mb-10">
            <Link
              href="/quote"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Get Your Free Quote →
            </Link>
            <Link
              href="tel:(844)628-4442"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Call (844) 628-4442
            </Link>
          </div>
          <div className="flex justify-center items-center space-x-8">
            {[
              'Secure Transaction',
              'Privacy Protected',
              '30-Day Money-Back Guarantee'
            ].map((item, index) => (
              <div key={index} className="flex items-center text-white">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}