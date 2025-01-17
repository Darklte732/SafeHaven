'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { TrustBadges } from '@/components/ui/trust-badges';
import { SafeImage } from '@/components/ui/image';

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-8">
            <TrustBadges />
            
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
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Link href="/quote">Get Your Free Quote</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                <Link href="/features">Learn More →</Link>
              </Button>
            </div>
          </div>

          <div className="relative lg:ml-10">
            <div className="bg-blue-100 rounded-2xl p-8">
              <div className="relative aspect-[4/3]">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent rounded-xl" />
                <SafeImage
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