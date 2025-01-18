'use client';

import React from 'react';
import { GuideDownloadForm } from './GuideDownloadForm';

export function GuideDownloadSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900">
              Free Guide: Understanding Final Expense Insurance
            </h2>
            
            <p className="text-lg text-gray-700">
              Download our comprehensive guide to learn everything you need to know about final expense insurance 
              and how it can protect your family's financial future.
            </p>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Inside the Guide:
              </h3>
              <ul className="space-y-3">
                {[
                  'How final expense insurance works',
                  'Coverage options and costs',
                  'Eligibility requirements',
                  'Claims process explained',
                  'Tips for choosing the right policy',
                  'Common questions answered',
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="h-6 w-6 text-green-500 mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-100 p-4 rounded-lg">
              <p className="text-blue-800 font-medium">
                "This guide helped me understand exactly what coverage I needed and how to get it. Highly recommended!" - John D.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-blue-200 rounded-lg transform -rotate-3"></div>
            <div className="relative bg-white p-6 rounded-lg shadow-lg">
              <GuideDownloadForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 