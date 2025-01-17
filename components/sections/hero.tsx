'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-white pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-8">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white">
                  <svg
                    className="h-3 w-3"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2Z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-600">A+ BBB Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white">
                  <svg
                    className="h-3 w-3"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 11.99H19C18.47 16.11 15.72 19.78 12 20.93V12H5V6.3L12 3.19V11.99Z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-600">Licensed & Insured</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
                Protect Your Family's Future with{' '}
                <span className="text-blue-600">
                  Affordable Final Expense Insurance
                </span>
              </h1>
              <p className="text-lg text-gray-600">
                Get peace of mind knowing your loved ones won't face financial burden. Coverage starts at just $20/month.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium"
              >
                <Link href="/quote">Get Your Free Quote</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-md font-medium"
              >
                <Link href="/guide">Learn More →</Link>
              </Button>
            </div>
          </div>

          <div className="relative lg:ml-10">
            <div className="bg-blue-100 rounded-2xl p-8">
              <div className="relative aspect-[4/3]">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent rounded-xl" />
                <Image
                  src="/images/family-generations.svg"
                  alt="Three generations of family together"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 