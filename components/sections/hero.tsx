'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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
                <div className="relative h-full w-full">
                  <svg
                    className="h-full w-full text-blue-600"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 12.75C8.83 12.75 6.25 10.17 6.25 7C6.25 3.83 8.83 1.25 12 1.25C15.17 1.25 17.75 3.83 17.75 7C17.75 10.17 15.17 12.75 12 12.75ZM12 2.75C9.66 2.75 7.75 4.66 7.75 7C7.75 9.34 9.66 11.25 12 11.25C14.34 11.25 16.25 9.34 16.25 7C16.25 4.66 14.34 2.75 12 2.75Z" />
                    <path d="M12 22.75C9.97 22.75 7.95 22.27 6.08 21.31C4.31 20.41 2.84 19.12 1.74 17.51C1.52 17.19 1.51 16.77 1.72 16.44C3.24 14.11 5.37 12.29 7.91 11.16C8.33 10.96 8.84 11.04 9.17 11.37C10.03 12.23 11.01 12.75 12 12.75C12.99 12.75 13.97 12.23 14.83 11.37C15.16 11.04 15.67 10.96 16.09 11.16C18.63 12.29 20.76 14.11 22.28 16.44C22.49 16.77 22.48 17.19 22.26 17.51C21.16 19.12 19.69 20.41 17.92 21.31C16.05 22.27 14.03 22.75 12 22.75ZM3.41 17.04C4.32 18.25 5.5 19.25 6.89 19.95C8.45 20.74 10.22 21.15 12 21.15C13.78 21.15 15.55 20.74 17.11 19.95C18.5 19.25 19.68 18.25 20.59 17.04C19.2 15.12 17.36 13.6 15.22 12.66C14.12 13.56 13.06 14.15 12 14.15C10.94 14.15 9.88 13.56 8.78 12.66C6.64 13.6 4.8 15.12 3.41 17.04Z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 