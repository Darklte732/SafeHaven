import React from 'react';
import { Navigation } from '../../components/ui/navigation';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        
        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">By accessing and using SafeHaven's services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Description of Services</h2>
            <p className="mb-4">SafeHaven provides insurance comparison and quote services. We help users find suitable insurance coverage by connecting them with insurance providers.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. User Obligations</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Maintain the confidentiality of your account</li>
              <li>Use the services in compliance with applicable laws</li>
              <li>Not engage in any fraudulent or deceptive practices</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Privacy Policy</h2>
            <p className="mb-4">Your use of SafeHaven's services is also governed by our Privacy Policy. Please review our <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link> to understand our practices.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Limitation of Liability</h2>
            <p className="mb-4">SafeHaven is not liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Modifications to Terms</h2>
            <p className="mb-4">We reserve the right to modify these terms at any time. Continued use of our services after such modifications constitutes acceptance of the updated terms.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Contact Information</h2>
            <p className="mb-4">If you have any questions about these Terms of Service, please contact us at support@safehaven.lat</p>
          </section>
        </div>
      </div>
    </main>
  );
} 