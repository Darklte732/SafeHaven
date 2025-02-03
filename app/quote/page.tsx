import QuoteForm from '@/components/quote/quote-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Get a Quote - SafeHaven Insurance',
  description: 'Get a personalized insurance quote from SafeHaven Insurance. Fast, easy, and tailored to your needs.',
};

export default function QuotePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Get Your Insurance Quote</h1>
      <div className="max-w-2xl mx-auto">
        <QuoteForm />
      </div>
    </div>
  );
} 