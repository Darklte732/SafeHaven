'use client';

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'What is final expense insurance?',
    answer: 'Final expense insurance is a type of whole life insurance designed to cover end-of-life expenses, including funeral costs, medical bills, and other outstanding debts.'
  },
  {
    question: 'Who can qualify for coverage?',
    answer: 'U.S. residents aged 50-85 can qualify for coverage. No medical exam is required, and acceptance is guaranteed regardless of health conditions.'
  },
  {
    question: 'How much coverage do I need?',
    answer: 'Coverage amounts typically range from $5,000 to $25,000. Our agents can help you determine the right amount based on your needs and budget.'
  },
  {
    question: 'How quickly can I get coverage?',
    answer: 'Coverage can begin immediately upon approval and first premium payment. The application process is simple and can be completed online in minutes.'
  },
  {
    question: 'Are there any waiting periods?',
    answer: 'Most policies have a 2-year limited benefit period for natural causes of death. However, accidental death is covered from day one at full benefit amount.'
  },
  {
    question: 'Can I cancel my policy?',
    answer: 'Yes, you can cancel your policy at any time. If you cancel within the first 30 days, you will receive a full refund of any premiums paid.'
  }
];

export function FAQ() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
} 