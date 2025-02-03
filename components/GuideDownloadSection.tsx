'use client';

import React from 'react';
import { GuideDownloadButton } from './GuideDownloadButton';

export function GuideDownloadSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Download Your Free Final Expense Insurance Guide
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12">
            Learn everything you need to know about final expense insurance and how it can protect your loved ones.
          </p>
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">What's Inside:</h3>
                <ul className="space-y-4">
                  {[
                    'Understanding Final Expense Insurance',
                    'Coverage Options and Costs',
                    'How to Choose the Right Policy',
                    'Tips for Getting the Best Rates',
                    'Common Mistakes to Avoid',
                    'Frequently Asked Questions'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <button className="mt-8 w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Download Free Guide
                </button>
              </div>
              <div className="relative">
                <div className="aspect-w-3 aspect-h-4 bg-gray-100 rounded-lg mb-6" />
                <div className="space-y-4">
                  <div className="h-4 bg-gray-100 rounded w-2/3" />
                  <div className="h-4 bg-gray-100 rounded w-1/2" />
                  <div className="h-4 bg-gray-100 rounded w-3/4" />
                </div>
                <div className="mt-8">
                  <blockquote className="italic text-gray-600">
                    "This guide helped me understand exactly what I needed to protect my family. Highly recommended!"
                  </blockquote>
                  <div className="mt-4 flex items-center">
                    <div className="w-10 h-10 bg-gray-100 rounded-full" />
                    <div className="ml-3">
                      <div className="font-medium text-gray-900">Sarah M.</div>
                      <div className="text-sm text-gray-500">Verified Customer</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 