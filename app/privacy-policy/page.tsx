import { SafeImage } from '../../components/ui/image'
import Link from 'next/link'

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Privacy Policy Content */}
      <section className="py-20">
        <div className="container-custom max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <div className="prose prose-lg max-w-none">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
                <p className="text-gray-600">
                  At SafeHaven Insurance, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. By using our services, you agree to the terms of this Privacy Policy.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
                <p className="text-gray-600 mb-4">We collect information that you provide directly to us, including:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Personal identification information (name, email address, phone number)</li>
                  <li>Demographic information (age, gender, location)</li>
                  <li>Health information for insurance purposes</li>
                  <li>Payment information</li>
                  <li>Information about your insurance preferences and needs</li>
                  <li>Communication history with our team</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
                <p className="text-gray-600 mb-4">We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Process your insurance applications</li>
                  <li>Communicate with you about your policy</li>
                  <li>Send you marketing communications (with your consent)</li>
                  <li>Improve our services and website</li>
                  <li>Comply with legal obligations</li>
                  <li>Prevent fraud and enhance security</li>
                  <li>Analyze website usage and trends</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Information Sharing</h2>
                <p className="text-gray-600 mb-4">
                  We may share your information with:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Insurance carriers to process your application</li>
                  <li>Service providers who assist in our operations</li>
                  <li>Legal authorities when required by law</li>
                  <li>Business partners with your consent</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
                <p className="text-gray-600">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
                <p className="text-gray-600 mb-4">You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Request a copy of your data</li>
                  <li>Lodge a complaint with supervisory authorities</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking</h2>
                <p className="text-gray-600">
                  We use cookies and similar tracking technologies to collect information about your browsing behavior and preferences. You can control cookie settings through your browser preferences.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
                <p className="text-gray-600">
                  Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
                <p className="text-gray-600">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                <p className="text-gray-600">
                  If you have questions about this Privacy Policy, please contact us at:<br />
                  Email: privacy@safehaven.com<br />
                  Phone: +1 (844) 628-4442<br />
                  Address: 123 Insurance Ave, Suite 100, Tampa, FL 33601
                </p>
              </div>

              <div className="border-t pt-8 mt-12">
                <p className="text-sm text-gray-500">
                  Last Updated: March 1, 2024
                </p>
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
                <li><Link href="/" className="text-gray-400 hover:text-white">Home</Link></li>
                <li><Link href="/features" className="text-gray-400 hover:text-white">Features</Link></li>
                <li><Link href="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
                <li><Link href="/privacy-policy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">+1 (844) 628-4442</li>
                <li className="text-gray-400">support@safehaven.com</li>
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