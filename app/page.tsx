'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';

// Import all sections
import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { ProblemSolutionSection } from '@/components/sections/ProblemSolutionSection';
import ROICalculator from '@/components/sections/ROICalculator';
import SocialProofSection from '@/components/sections/SocialProofSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { CTASection } from '@/components/sections/CTASection';
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
    <main className="relative">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-[60]"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="flex flex-col min-h-screen">
        <HeroSection />
        <ProblemSolutionSection />
        <FeaturesSection />
        <ROICalculator />
        <TestimonialsSection />
        <SocialProofSection />
        <GuideDownloadSection />
        <BeneficiaryWorkbookSection />
        <FAQSection />
        <CTASection />
      </div>

      {showExitPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 relative">
            <button
              onClick={() => setShowExitPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <span className="sr-only">Close</span>
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

      {showChat && (
        <div className="fixed bottom-20 right-4 w-96 bg-white rounded-2xl shadow-xl z-40">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Chat with us</h3>
            <p className="text-sm text-gray-500">We typically reply within a few minutes</p>
          </div>
          <div className="h-96 p-6 overflow-y-auto">
            {/* Chat messages will go here */}
          </div>
          <div className="p-6 border-t border-gray-100">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="ml-4 text-blue-600 hover:text-blue-700">
                <span className="sr-only">Send message</span>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-4 right-4 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-700 transition-colors z-40"
      >
        <span className="sr-only">{showChat ? 'Close chat' : 'Open chat'}</span>
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

      {/* Calendly Integration */}
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </main>
  );
}