'use client';

import Script from 'next/script';
import { Navigation } from '../../components/ui/navigation';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-24">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Thank You Message */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Thank You for Your Interest!</h1>
            <p className="text-xl text-gray-600 mb-8">
              One of our insurance specialists will review your information and contact you shortly.
              In the meantime, you can schedule a consultation at your convenience.
            </p>
          </div>

          {/* Calendly Integration */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">Schedule Your Consultation</h2>
            <div className="calendly-inline-widget" data-url="https://calendly.com/safehaven159/30min" style={{ minWidth: '320px', height: '700px' }}></div>
            <Script
              src="https://assets.calendly.com/assets/external/widget.js"
              strategy="lazyOnload"
            />
          </div>

          {/* Expectations Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6 text-center">What to Expect</h2>
            
            {/* Video Placeholder */}
            <div className="aspect-w-16 aspect-h-9 mb-8">
              <div className="w-full h-[400px] bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Expectations Video Coming Soon</span>
              </div>
            </div>

            {/* Steps */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                <h3 className="font-semibold mb-2">Initial Consultation</h3>
                <p className="text-gray-600">We'll discuss your needs and coverage options in detail.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                <h3 className="font-semibold mb-2">Personalized Plan</h3>
                <p className="text-gray-600">Receive a customized insurance solution that fits your budget.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                <h3 className="font-semibold mb-2">Easy Enrollment</h3>
                <p className="text-gray-600">Quick and simple enrollment process with immediate coverage.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 