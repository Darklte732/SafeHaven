'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';

// Import missing components
import { BeneficiaryWorkbookSection } from '@/components/BeneficiaryWorkbookSection';
import { GuideDownloadSection } from '@/components/GuideDownloadSection';

// Import blur data URLs for images
import { blurDataUrl } from '@/lib/constants';

export default function HomePage() {
  const [age, setAge] = useState(50);
  const [coverageAmount, setCoverageAmount] = useState(10000);
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const { scrollYProgress } = useScroll();

  // Exit intent detection
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !localStorage.getItem('exitPopupShown')) {
        setShowExitPopup(true);
        localStorage.setItem('exitPopupShown', 'true');
      }
    };

    // Scroll depth tracking
    const scrollDepths = [25, 50, 75, 100];
    let triggeredDepths: number[] = [];

    const trackScrollDepth = () => {
      const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;
      scrollDepths.forEach(depth => {
        if (scrollPercent >= depth && !triggeredDepths.includes(depth)) {
          triggeredDepths.push(depth);
          console.log(`Scrolled to ${depth}%`);
        }
      });
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', trackScrollDepth);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', trackScrollDepth);
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-[60]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-200/80">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="relative w-8 h-8 mr-2.5">
                <Image
                  src="/images/logo.png"
                  alt="SafeHaven"
                  fill
                  className="object-contain"
                  sizes="32px"
                  priority
                />
              </div>
              <span className="text-xl font-bold tracking-tight">SafeHaven</span>
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link href="/features" className="text-gray-600 hover:text-gray-900 text-[0.9375rem] font-medium">Features</Link>
            <Link href="/get-quote" className="text-gray-600 hover:text-gray-900 text-[0.9375rem] font-medium">Get Quote</Link>
            <Link href="/faq" className="text-gray-600 hover:text-gray-900 text-[0.9375rem] font-medium">FAQ</Link>
            <Link href="/chat" className="text-gray-600 hover:text-gray-900 text-[0.9375rem] font-medium">Chat</Link>
            <Link 
              href="/admin" 
              className="bg-[#3B82F6] text-white px-4 py-2 rounded-lg text-[0.9375rem] font-medium hover:bg-blue-600 transition-all duration-200 shadow-sm hover:shadow"
            >
              Admin Dashboard
            </Link>
            <Link 
              href="/support" 
              className="bg-[#3B82F6] text-white px-4 py-2 rounded-lg text-[0.9375rem] font-medium hover:bg-blue-600 transition-all duration-200 shadow-sm hover:shadow"
            >
              24/7 Support
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-600 to-blue-700">
          <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.15] mix-blend-soft-light" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/[0.15] to-transparent" />
        </div>
        <div className="container mx-auto px-6 relative">
          <div className="flex flex-wrap items-center -mx-4">
            <div className="w-full lg:w-1/2 px-4 mb-12 lg:mb-0">
              <div className="flex items-center space-x-6 mb-8">
                <div className="flex items-center bg-white/10 backdrop-blur-[2px] px-4 py-2 rounded-full">
                  <svg className="w-5 h-5 text-white/90 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white/90 text-[0.9375rem] font-medium">A+ BBB Rating</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-[2px] px-4 py-2 rounded-full">
                  <svg className="w-5 h-5 text-white/90 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white/90 text-[0.9375rem] font-medium">Licensed & Insured</span>
                </div>
              </div>
              <h1 className="text-[3.25rem] lg:text-[3.75rem] font-bold text-white mb-6 leading-[1.1] tracking-tight">
                Protect Your Family's Future with Affordable Final Expense Insurance
              </h1>
              <p className="text-xl text-white/90 mb-10 leading-relaxed">
                Get peace of mind knowing your loved ones won't face financial burden. Coverage starts at just $20/month.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/quote"
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-all duration-200 transform hover:scale-[1.02] shadow-sm hover:shadow"
                >
                  Get Your Free Quote
                </Link>
                <Link
                  href="/learn-more"
                  className="bg-transparent border-2 border-white/80 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition-all duration-200"
                >
                  Learn More →
                </Link>
              </div>
            </div>
            <div className="w-full lg:w-1/2 px-4">
              <div className="relative">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 transform hover:scale-[1.02] transition-all duration-300">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src="/images/family-illustration.png"
                      alt="Family Protection"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  </div>
                  <div className="absolute -bottom-4 right-4 bg-green-500 text-white px-6 py-2 rounded-full text-[0.9375rem] font-medium shadow-lg transform hover:scale-105 transition-all duration-200">
                    98% Claims Satisfaction
                  </div>
                </div>
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl" />
                <div className="absolute -top-8 -left-8 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl" />
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

      {/* Calculator Section */}
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
                    <div className="relative">
                      <input
                        type="range"
                        min="50"
                        max="85"
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer before:absolute before:w-full before:h-2 before:bg-blue-600 before:rounded-l-lg"
                        style={{
                          backgroundImage: `linear-gradient(to right, #3B82F6 ${(age - 50) * (100/35)}%, #E5E7EB ${(age - 50) * (100/35)}%)`
                        }}
                      />
                      <div className="flex justify-between text-sm text-gray-500 mt-2">
                        <span>50</span>
                        <span>85</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Coverage Amount: ${coverageAmount.toLocaleString()}
                    </label>
                    <div className="relative">
                      <input
                        type="range"
                        min="5000"
                        max="50000"
                        step="5000"
                        value={coverageAmount}
                        onChange={(e) => setCoverageAmount(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer before:absolute before:w-full before:h-2 before:bg-blue-600 before:rounded-l-lg"
                        style={{
                          backgroundImage: `linear-gradient(to right, #3B82F6 ${(coverageAmount - 5000) * (100/45000)}%, #E5E7EB ${(coverageAmount - 5000) * (100/45000)}%)`
                        }}
                      />
                      <div className="flex justify-between text-sm text-gray-500 mt-2">
                        <span>$5,000</span>
                        <span>$50,000</span>
                      </div>
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
                        <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{item}</span>
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

      {/* Beneficiary Workbook Section */}
      <BeneficiaryWorkbookSection />

      {/* Guide Download Section */}
      <GuideDownloadSection />

      {/* Exit Intent Popup */}
      {showExitPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 relative">
            <button
              onClick={() => setShowExitPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Wait! Don't miss out...</h3>
            <p className="text-gray-600 mb-6">
              Get 20% off your first month when you sign up today.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowExitPopup(false);
                  window.location.href = '/quote?discount=20';
                }}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Claim Offer
              </button>
              <button
                onClick={() => setShowExitPopup(false)}
                className="flex-1 border border-gray-300 text-gray-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                No thanks
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Widget */}
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setShowChat(!showChat)}
          className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-700 transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {showChat ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            )}
          </svg>
        </button>
        {showChat && (
          <div className="absolute bottom-20 right-0 w-96 bg-white rounded-2xl shadow-xl">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Chat with us</h3>
              <p className="text-sm text-gray-500">We typically reply within a few minutes</p>
            </div>
            <div className="h-96 p-6">
              <div className="flex flex-col space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3 bg-gray-100 rounded-lg p-4 max-w-[80%]">
                    <p className="text-gray-900">Hi! How can we help you today?</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="ml-4 text-blue-600 hover:text-blue-700">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Calendly Integration */}
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </div>
  );
}