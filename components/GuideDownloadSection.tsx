'use client';

import React from 'react';
import { GuideDownloadButton } from './GuideDownloadButton';

export function GuideDownloadSection() {
  return (
    <section className="bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">
          Download Your Free Final Expense Insurance Guide
        </h2>
        <p className="text-gray-600 mb-8">
          Learn everything you need to know about final expense insurance and how it can protect your loved ones.
        </p>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">What's Inside:</h3>
            <ul className="space-y-2 text-left max-w-md mx-auto mb-6">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Understanding Final Expense Insurance
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Coverage Options and Costs
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                How to Choose the Right Policy
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Tips for Getting the Best Rates
              </li>
            </ul>
          </div>

          <div className="max-w-sm mx-auto">
            <GuideDownloadButton />
          </div>

          <div className="mt-8 text-gray-600 italic">
            "This guide helped me understand exactly what I needed to protect my family. Highly recommended!"
            <div className="mt-2 font-semibold">- Sarah M.</div>
          </div>
        </div>
      </div>
    </section>
  );
} 