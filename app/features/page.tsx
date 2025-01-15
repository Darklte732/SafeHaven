import { SafeImage } from '../../components/ui/image'
import { Navigation } from '../../components/ui/navigation'

export default function FeaturesPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Features Hero */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container-custom">
          <h1 className="text-4xl font-bold text-center mb-16">Our Features</h1>
          
          {/* Main Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="feature-card">
              <div className="icon-container mb-6">
                <SafeImage src="/images/shield-check.svg" alt="Guaranteed Coverage" width={32} height={32} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Guaranteed Coverage</h3>
              <p>No medical exam required. Coverage guaranteed for ages 50-85, regardless of health conditions.</p>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li>• No medical exams</li>
                <li>• Guaranteed acceptance</li>
                <li>• Age 50-85 eligible</li>
                <li>• Pre-existing conditions accepted</li>
              </ul>
            </div>

            <div className="feature-card">
              <div className="icon-container mb-6">
                <SafeImage src="/images/dollar.svg" alt="Affordable Rates" width={32} height={32} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Affordable Rates</h3>
              <p>Lock in your rate starting at $20/month. Your premium never increases, and your coverage never decreases.</p>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li>• Rates from $20/month</li>
                <li>• Locked-in premiums</li>
                <li>• Flexible payment options</li>
                <li>• No rate increases</li>
              </ul>
            </div>

            <div className="feature-card">
              <div className="icon-container mb-6">
                <SafeImage src="/images/clock.svg" alt="Fast Claims" width={32} height={32} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Fast Claims</h3>
              <p>Claims typically paid within 24-48 hours. Your family gets the support they need, when they need it most.</p>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li>• 24-48 hour claims processing</li>
                <li>• Simple claims process</li>
                <li>• Direct deposit available</li>
                <li>• Dedicated claims support</li>
              </ul>
            </div>
          </div>

          {/* Additional Features */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-20">
            <h2 className="text-3xl font-bold mb-8 text-center">Additional Benefits</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Policy Features</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Coverage never decreases</li>
                  <li>✓ Premiums never increase</li>
                  <li>✓ Policy builds cash value</li>
                  <li>✓ Coverage cannot be cancelled</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Customer Support</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ 24/7 customer service</li>
                  <li>✓ Dedicated insurance agents</li>
                  <li>✓ Online account management</li>
                  <li>✓ Multilingual support available</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
                <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="/features" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="/faq" className="text-gray-400 hover:text-white">FAQ</a></li>
                <li><a href="/privacy-policy" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
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
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <SafeImage src="/images/facebook.svg" alt="Facebook" width={24} height={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <SafeImage src="/images/twitter.svg" alt="Twitter" width={24} height={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <SafeImage src="/images/linkedin.svg" alt="LinkedIn" width={24} height={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
} 