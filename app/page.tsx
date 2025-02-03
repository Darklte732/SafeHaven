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
      <nav className="fixed top-0 left-0 right-0 bg-white z-50 border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Image src="/logo.png" alt="SafeHaven" width={32} height={32} className="mr-2" />
            <span className="text-xl font-semibold">SafeHaven</span>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/features" className="text-gray-600 hover:text-gray-900">Features</Link>
            <Link href="/get-quote" className="text-gray-600 hover:text-gray-900">Get Quote</Link>
            <Link href="/faq" className="text-gray-600 hover:text-gray-900">FAQ</Link>
            <Link href="/chat" className="text-gray-600 hover:text-gray-900">Chat</Link>
            <Link href="/admin" className="bg-[#3B82F6] text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Admin Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="w-full lg:w-1/2 pr-0 lg:pr-16">
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-5 h-5 mr-1 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  A+ BBB Rating
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-5 h-5 mr-1 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Licensed & Insured
                </div>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Protect Your Family's Future with Affordable Final Expense Insurance
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Get peace of mind knowing your loved ones won't face financial burden. Coverage starts at just $20/month.
              </p>
              <div className="flex space-x-4">
                <Link
                  href="/quote"
                  className="bg-[#3B82F6] text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600"
                >
                  Get Your Free Quote
                </Link>
                <Link
                  href="/learn-more"
                  className="text-[#3B82F6] border-2 border-[#3B82F6] px-6 py-3 rounded-lg font-semibold hover:bg-blue-50"
                >
                  Learn More →
                </Link>
              </div>
            </div>
            <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
              <div className="bg-blue-100 rounded-lg p-8 relative">
                <Image
                  src="/family-illustration.svg"
                  alt="Family Protection"
                  width={500}
                  height={400}
                  className="w-full"
                />
                <div className="absolute bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm">
                  98% Claims Satisfaction
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <div className="inline-block px-4 py-2 bg-red-100 text-red-600 rounded-full text-sm font-medium mb-6">
                The Problem
              </div>
              <h2 className="text-3xl font-bold mb-8">The Hidden Cost of Being Unprepared</h2>
              <p className="text-gray-600 mb-8">
                Many families face unexpected financial burdens during their most difficult moments.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  Average funeral costs exceed $9,000
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  Unexpected medical bills can reach tens of thousands
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  78% of Americans live paycheck to paycheck
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  Grieving families often struggle with debt
                </li>
              </ul>
            </div>
            <div>
              <div className="inline-block px-4 py-2 bg-green-100 text-green-600 rounded-full text-sm font-medium mb-6">
                The Solution
              </div>
              <h2 className="text-3xl font-bold mb-8">Peace of Mind with SafeHaven</h2>
              <p className="text-gray-600 mb-8">
                We provide comprehensive coverage that ensures your family's financial security.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Guaranteed acceptance for ages 50-85
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Coverage from $5,000 to $50,000
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Claims paid within 24-48 hours
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  No medical exam required
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-8 items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-2xl font-bold text-blue-600">A+ BBB Rating</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-2xl font-bold text-blue-600">SSL Secured</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-2xl font-bold text-blue-600">Licensed & Insured</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Stats */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured In</h2>
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">50K+</div>
              <div className="text-gray-600">Families Protected</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-600">Claims Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Calculator */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Calculate Your Coverage</h2>
          <p className="text-center text-gray-600 mb-12">
            Use our calculator to estimate your monthly premium and find the right coverage for your needs.
          </p>
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="mb-8">
                  <label className="block text-gray-700 mb-2">Your Age: {age}</label>
                  <input
                    type="range"
                    min="50"
                    max="85"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>50</span>
                    <span>85</span>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">
                    Coverage Amount: ${coverageAmount.toLocaleString()}
                  </label>
                  <input
                    type="range"
                    min="5000"
                    max="50000"
                    step="5000"
                    value={coverageAmount}
                    onChange={(e) => setCoverageAmount(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>$5,000</span>
                    <span>$50,000</span>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Your Estimated Premium</h3>
                <div className="text-4xl font-bold text-blue-600 mb-6">
                  ${((coverageAmount * 0.003) + (age - 50) * 0.5).toFixed(2)}/month
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Guaranteed acceptance
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    No medical exam required
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Rate locked in for life
                  </li>
                </ul>
                <Link
                  href="/quote"
                  className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg mt-6 font-semibold hover:bg-blue-700"
                >
                  Get Your Free Quote
                </Link>
              </div>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">
            * Rates are for illustration purposes only. Final rate will be determined during the application process.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Frequently Asked Questions</h2>
          <p className="text-center text-gray-600 mb-12">
            Find answers to common questions about our final expense insurance coverage.
          </p>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              <details className="bg-white rounded-lg p-6">
                <summary className="text-lg font-semibold cursor-pointer">
                  What is final expense insurance?
                </summary>
                <p className="mt-4 text-gray-600">
                  Final expense insurance is a type of whole life insurance designed to cover end-of-life expenses such as funeral costs, medical bills, and other outstanding debts.
                </p>
              </details>
              <details className="bg-white rounded-lg p-6">
                <summary className="text-lg font-semibold cursor-pointer">
                  How much coverage do I need?
                </summary>
                <p className="mt-4 text-gray-600">
                  Coverage needs vary, but most families choose between $10,000 and $25,000 to cover final expenses. Our agents can help you determine the right amount for your situation.
                </p>
              </details>
              <details className="bg-white rounded-lg p-6">
                <summary className="text-lg font-semibold cursor-pointer">
                  Do I need a medical exam?
                </summary>
                <p className="mt-4 text-gray-600">
                  No medical exam is required. Coverage is guaranteed for ages 50-85, regardless of health conditions.
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-blue-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Protect Your Family's Future?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of satisfied customers who trust SafeHaven Insurance. Get your free quote today and secure peace of mind for your loved ones.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/quote"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50"
            >
              Get Your Free Quote →
            </Link>
            <Link
              href="tel:(844)628-4442"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700"
            >
              Call (844) 628-4442
            </Link>
          </div>
          <div className="flex justify-center space-x-8 mt-8">
            <div className="flex items-center text-white">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Secure Transaction
            </div>
            <div className="flex items-center text-white">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Privacy Protected
            </div>
            <div className="flex items-center text-white">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              30-Day Money-Back Guarantee
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}