import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thank You - SafeHaven Insurance',
  description: 'Thank you for requesting a quote from SafeHaven Insurance.',
};

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h1>
        <p className="text-gray-600 mb-6">
          We've received your quote request and our team will review it shortly.
          We'll get back to you within 24 hours with your personalized quote.
        </p>
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Have questions? Contact us at:
            <br />
            <a href="tel:1-800-SAFE-HAVEN" className="text-blue-600 hover:text-blue-700">
              1-800-SAFE-HAVEN
            </a>
          </p>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
} 