import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'SafeHaven Insurance - Your Trusted Insurance Partner',
  description: 'Get comprehensive insurance coverage with SafeHaven Insurance. We offer auto, home, life, and health insurance solutions tailored to your needs.',
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#3B82F6] text-white py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Protect What Matters Most
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-white/90">
              Get comprehensive insurance coverage tailored to your needs.
            </p>
            <Link
              href="/quote"
              className="inline-block bg-white text-[#3B82F6] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose SafeHaven Insurance?</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Trusted Coverage</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Comprehensive protection you can count on, backed by years of experience.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Affordable Rates</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Competitive pricing and flexible payment options to fit your budget.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4">24/7 Support</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Round-the-clock assistance whenever you need it, wherever you are.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-10">Ready to Get Started?</h2>
          <div className="space-x-6">
            <Link
              href="/quote"
              className="inline-block bg-[#3B82F6] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#2563EB] transition-colors"
            >
              Get a Quote
            </Link>
            <Link
              href="/contact"
              className="inline-block bg-white text-[#3B82F6] px-8 py-4 rounded-lg text-lg font-semibold border-2 border-[#3B82F6] hover:bg-blue-50 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}