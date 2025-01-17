'use client';

import React from 'react';

const steps = [
  {
    number: '1',
    title: 'Get Your Quote',
    description: 'Fill out our simple form to receive your personalized quote instantly.',
  },
  {
    number: '2',
    title: 'Choose Your Plan',
    description: 'Select the coverage amount that best fits your needs and budget.',
  },
  {
    number: '3',
    title: 'Apply Online',
    description: 'Complete your application online in minutes. No medical exam required.',
  },
  {
    number: '4',
    title: 'Get Covered',
    description: 'Your coverage begins immediately upon approval and payment.',
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
          How It Works
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-6">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 