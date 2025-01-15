import { FAQItem } from '../../components/ui/faq-item'
import { SafeImage } from '../../components/ui/image'

export default function FAQPage() {
  return (
    <main className="min-h-screen">
      {/* FAQ Content */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <h1 className="text-4xl font-bold text-center mb-16">Frequently Asked Questions</h1>
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
            <FAQItem
              question="What happens if I miss a payment?"
              answer="There is typically a 30-day grace period for missed payments. During this time, your coverage remains active. After the grace period, the policy may lapse."
            />
            <FAQItem
              question="Can I change my coverage amount later?"
              answer="Yes, you may be able to adjust your coverage amount. Contact our customer service team to discuss your options."
            />
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