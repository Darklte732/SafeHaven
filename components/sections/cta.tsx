'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function CTA() {
  return (
    <section className="bg-blue-600 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          Ready to Protect Your Family's Future?
        </h2>
        <p className="text-xl text-white/90 mb-12">
          Get your free quote today and join thousands of satisfied customers who trust SafeHaven.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-md font-medium"
          >
            <Link href="/quote">Get Your Free Quote</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-2 border-white text-white hover:bg-blue-700 px-8 py-3 rounded-md font-medium"
          >
            <Link href="tel:+18446284442" className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Speak to an Agent
            </Link>
          </Button>
        </div>
        <div className="flex flex-wrap justify-center gap-6 mt-12">
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <span className="text-sm text-white">Secure Transaction</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span className="text-sm text-white">Privacy Protected</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm text-white">30-Day Money-Back Guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
} 