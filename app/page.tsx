import { Suspense, lazy } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { SafeImage } from '../components/ui/image'
import { Inter } from 'next/font/google'
import Script from 'next/script'

// Lazy load components that are not needed immediately
const FAQItem = lazy(() => import('../components/ui/faq-item').then(mod => ({ default: mod.FAQItem })))
const CarrierLogos = lazy(() => import('../components/carriers/CarrierLogos').then(mod => ({ default: mod.CarrierLogos })))
const SocialLinks = lazy(() => import('../components/ui/social-links').then(mod => ({ default: mod.SocialLinks })))

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="bg-white py-12 md:py-20">
        <div className="container-custom grid md:grid-cols-2 gap-8 md:gap-12 items-center px-4 md:px-6">
          <div className="space-y-6 md:space-y-8">
            <div className="flex flex-wrap gap-3 md:gap-4">
              <span className="trust-badge text-sm md:text-base">
                <SafeImage src="/images/bbb-logo.svg" alt="BBB A+ Rating" width={20} height={20} className="mr-2" />
                A+ BBB Rating
              </span>
              <span className="trust-badge text-sm md:text-base">
                <SafeImage src="/images/shield.svg" alt="Licensed & Insured" width={20} height={20} className="mr-2" />
                Licensed & Insured
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight text-gray-900">Protect Your Family's Future with Affordable Final Expense Insurance</h1>
            <p className="text-lg md:text-xl text-gray-600">Get peace of mind knowing your loved ones won&apos;t face financial burden. Coverage starts at just $20/month.</p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Link 
                href="/quote" 
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 transition-colors"
              >
                Get Your Free Quote
              </Link>
              <Link 
                href="/features" 
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-base font-medium text-blue-600 bg-white border-2 border-blue-600 rounded-md shadow-sm hover:bg-gray-50 transition-colors"
              >
                <span>Learn More</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="mx-auto group animate-float w-full max-w-[600px] relative overflow-hidden rounded-lg shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent z-10"></div>
            <SafeImage
              src="/images/family-generations.svg"
              alt="Three generations of family together - grandparents, parents, and children"
              width={600}
              height={400}
              className="w-full h-[300px] sm:h-[400px] object-cover bg-white transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* After Hero Section */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-center text-2xl font-bold text-gray-900 mb-8">Trusted By Leading Insurance Carriers</h2>
          <Suspense fallback={<div className="h-20" />}>
            <div className="animate-float">
              <CarrierLogos />
            </div>
          </Suspense>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container-custom">
          <h2 className="text-center mb-16">Why Choose SafeHaven?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="feature-card">
              <div className="icon-container mb-6">
                <SafeImage src="/images/shield-check.svg" alt="Guaranteed Coverage" width={32} height={32} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Guaranteed Coverage</h3>
              <p>No medical exam required. Coverage guaranteed for ages 50-85, regardless of health conditions.</p>
            </div>
            <div className="feature-card">
              <div className="icon-container mb-6">
                <SafeImage src="/images/dollar.svg" alt="Affordable Rates" width={32} height={32} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Affordable Rates</h3>
              <p>Lock in your rate starting at $20/month. Your premium never increases, and your coverage never decreases.</p>
            </div>
            <div className="feature-card">
              <div className="icon-container mb-6">
                <SafeImage src="/images/clock.svg" alt="Fast Claims" width={32} height={32} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Fast Claims</h3>
              <p>Claims typically paid within 24-48 hours. Your family gets the support they need, when they need it most.</p>
            </div>
          </div>
        </div>
      </section>

      {/* After Features Section */}
      <section className="py-12 bg-blue-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <h4 className="text-4xl font-bold text-primary mb-2">50K+</h4>
              <p className="text-gray-600">Families Protected</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold text-primary mb-2">98%</h4>
              <p className="text-gray-600">Claims Satisfaction</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold text-primary mb-2">A+</h4>
              <p className="text-gray-600">BBB Rating</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold text-primary mb-2">24/7</h4>
              <p className="text-gray-600">Customer Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-center mb-16">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-white text-2xl font-bold flex items-center justify-center mx-auto mb-6">1</div>
              <h3 className="text-xl font-semibold mb-4">Get Your Quote</h3>
              <p>Fill out our simple form to receive your personalized quote instantly.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-white text-2xl font-bold flex items-center justify-center mx-auto mb-6">2</div>
              <h3 className="text-xl font-semibold mb-4">Choose Your Plan</h3>
              <p>Select the coverage amount that best fits your needs and budget.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-white text-2xl font-bold flex items-center justify-center mx-auto mb-6">3</div>
              <h3 className="text-xl font-semibold mb-4">Apply Online</h3>
              <p>Complete your application online in minutes. No medical exam required.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-white text-2xl font-bold flex items-center justify-center mx-auto mb-6">4</div>
              <h3 className="text-xl font-semibold mb-4">Get Covered</h3>
              <p>Your coverage begins immediately upon approval and payment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Before Testimonials Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <h3 className="text-center text-2xl font-semibold text-gray-600 mb-12">Featured In</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center justify-items-center">
            <div className="hover:opacity-75 transition-opacity">
              <SafeImage src="/images/media/media-1.svg" alt="Forbes" width={150} height={50} className="grayscale hover:grayscale-0 transition-all" />
            </div>
            <div className="hover:opacity-75 transition-opacity">
              <SafeImage src="/images/media/media-2.svg" alt="Bloomberg" width={150} height={50} className="grayscale hover:grayscale-0 transition-all" />
            </div>
            <div className="hover:opacity-75 transition-opacity">
              <SafeImage src="/images/media/media-3.svg" alt="Reuters" width={150} height={50} className="grayscale hover:grayscale-0 transition-all" />
            </div>
            <div className="hover:opacity-75 transition-opacity">
              <SafeImage src="/images/media/media-4.svg" alt="Wall Street Journal" width={150} height={50} className="grayscale hover:grayscale-0 transition-all" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container-custom">
          <h2 className="text-center mb-16">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="testimonial-card">
              <div className="flex items-center mb-6">
                <SafeImage src="/images/customer-1.svg" alt="Sarah Johnson" width={64} height={64} className="rounded-full" />
                <div className="ml-4">
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-sm text-gray-600">Age 65, Florida</p>
                </div>
              </div>
              <p>&quot;The process was so simple, and the rates were much better than I expected. Knowing my family is protected gives me peace of mind.&quot;</p>
            </div>
            <div className="testimonial-card">
              <div className="flex items-center mb-6">
                <SafeImage src="/images/customer-2.svg" alt="Robert Martinez" width={64} height={64} className="rounded-full" />
                <div className="ml-4">
                  <h4 className="font-semibold">Robert Martinez</h4>
                  <p className="text-sm text-gray-600">Age 72, Texas</p>
                </div>
              </div>
              <p>&quot;I was worried about getting coverage at my age, but SafeHaven made it easy. No medical exam and great customer service!&quot;</p>
            </div>
            <div className="testimonial-card">
              <div className="flex items-center mb-6">
                <SafeImage src="/images/customer-3.svg" alt="Mary Wilson" width={64} height={64} className="rounded-full" />
                <div className="ml-4">
                  <h4 className="font-semibold">Mary Wilson</h4>
                  <p className="text-sm text-gray-600">Age 58, Ohio</p>
                </div>
              </div>
              <p>&quot;After comparing several options, SafeHaven offered the best value. The claims process was quick and hassle-free.&quot;</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <Suspense fallback={<div className="h-96" />}>
        <section id="faq" className="py-20 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-center mb-16">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <FAQItem
                question="What is final expense insurance?"
                answer="Final expense insurance is a type of whole life insurance designed to cover end-of-life expenses, including funeral costs, medical bills, and other outstanding debts."
              />
              <FAQItem
                question="Who can qualify for coverage?"
                answer="U.S. residents aged 50-85 can qualify for coverage. No medical exam is required, and acceptance is guaranteed regardless of health conditions."
              />
              <FAQItem
                question="How much coverage do I need?"
                answer="Coverage amounts typically range from $5,000 to $25,000. Our agents can help you determine the right amount based on your needs and budget."
              />
              <FAQItem
                question="How quickly can I get coverage?"
                answer="Coverage can begin immediately upon approval and first premium payment. The application process is simple and can be completed online in minutes."
              />
              <FAQItem
                question="Are there any waiting periods?"
                answer="Most policies have a 2-year limited benefit period for natural causes of death. However, accidental death is covered from day one at full benefit amount."
              />
              <FAQItem
                question="Can I cancel my policy?"
                answer="Yes, you can cancel your policy at any time. If you cancel within the first 30 days, you'll receive a full refund of any premiums paid."
              />
            </div>
          </div>
        </section>
      </Suspense>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-8 text-white">Ready to Protect Your Family's Future?</h2>
          <p className="text-xl mb-12 text-white">Get your free quote today and join thousands of satisfied customers who trust SafeHaven.</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/quote" className="button-primary bg-white text-blue-600 hover:bg-gray-100 text-center px-8 py-3 rounded-md font-semibold">
              Get Your Free Quote
            </Link>
            <Link href="tel:+18446284442" className="button-primary bg-blue-700 text-white hover:bg-blue-800 flex items-center justify-center gap-2 group px-8 py-3 rounded-md font-semibold">
              <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Speak to an Agent</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Add Trust Badges near CTA */}
      <div className="flex flex-wrap justify-center gap-6 mb-12">
        <div className="flex items-center space-x-2 bg-white/90 px-4 py-2 rounded-full shadow-sm">
          <SafeImage src="/images/badges/secure.svg" alt="Secure Transaction" width={24} height={24} />
          <span className="text-sm">Secure Transaction</span>
        </div>
        <div className="flex items-center space-x-2 bg-white/90 px-4 py-2 rounded-full shadow-sm">
          <SafeImage src="/images/badges/privacy.svg" alt="Privacy Protected" width={24} height={24} />
          <span className="text-sm">Privacy Protected</span>
        </div>
        <div className="flex items-center space-x-2 bg-white/90 px-4 py-2 rounded-full shadow-sm">
          <SafeImage src="/images/badges/guarantee.svg" alt="Money-Back Guarantee" width={24} height={24} />
          <span className="text-sm">30-Day Money-Back Guarantee</span>
        </div>
      </div>

      {/* Add Emergency Support Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-primary text-white py-2 text-center z-30">
        <div className="container-custom flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-2 md:mb-0">Need immediate assistance? Our support team is available 24/7</p>
          <a href="tel:+18446284442" className="text-white font-semibold hover:underline">
            Call +1 (844) 628-4442
          </a>
        </div>
      </div>

      {/* Footer */}
      <Suspense fallback={<div className="h-40" />}>
        <footer className="bg-gray-900 text-white py-12">
          <div className="container-custom">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-6">
                  <SafeImage src="/images/logo-white.svg" alt="SafeHaven Logo" width={40} height={40} />
                  <span className="text-2xl font-bold">SafeHaven</span>
                </div>
                <p className="text-gray-400">Protecting families with affordable final expense insurance since 2010.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li><Link href="/" className="text-gray-400 hover:text-white">Home</Link></li>
                  <li><Link href="/features" className="text-gray-400 hover:text-white">Features</Link></li>
                  <li><Link href="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
                  <li><Link href="/privacy-policy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Contact</h4>
                <ul className="space-y-2">
                  <li className="text-gray-400">+1 (844) 628-4442</li>
                  <li className="text-gray-400">support@safehaven.com</li>
                  <li className="text-gray-400">123 Insurance Ave, Suite 100<br />Tampa, FL 33601</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                <Suspense fallback={<div className="h-20" />}>
                  <SocialLinks />
                </Suspense>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
              <p>&copy; 2024 SafeHaven Insurance. All rights reserved.</p>
              <div className="mt-4">
                <Link href="/privacy-policy" className="text-gray-400 hover:text-white mx-4" prefetch>Privacy Policy</Link>
                <Link href="/terms" className="text-gray-400 hover:text-white mx-4" prefetch>Terms of Service</Link>
                <Link href="/licensing" className="text-gray-400 hover:text-white mx-4" prefetch>Licensing</Link>
              </div>
            </div>
          </div>
        </footer>
      </Suspense>

      {/* Why Choose SafeHaven Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose SafeHaven?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Licensed & Insured</h3>
              <p className="text-gray-600">We are fully licensed insurance professionals with years of experience in final expense coverage.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Approval</h3>
              <p className="text-gray-600">Get approved in as little as 24 hours with our streamlined application process.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Affordable Plans</h3>
              <p className="text-gray-600">Flexible payment options starting as low as $20/month to fit your budget.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Protect Your Family's Future Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Protect Your Family&apos;s Future?</h2>
            <p className="text-xl text-gray-600 mb-8">Get your free quote today and secure peace of mind for your loved ones.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quote" className="bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-900 transition-colors">
                Get Your Free Quote
              </Link>
              <Link href="tel:(888)123-4567" className="border-2 border-blue-800 text-blue-800 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Call (888) 123-4567
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}