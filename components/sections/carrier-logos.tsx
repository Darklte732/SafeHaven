'use client';

import React from 'react';
import Image from 'next/image';

const carriers = [
  {
    name: 'Mutual of Omaha',
    logo: '/images/carriers/mutual-of-omaha.png',
  },
  {
    name: 'Corebridge Financial',
    logo: '/images/carriers/corebridge.png',
  },
  {
    name: 'American-Amicable',
    logo: '/images/carriers/american-amicable.png',
  },
  {
    name: 'GTL',
    logo: '/images/carriers/gtl.png',
  },
];

export function CarrierLogos() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-8">
          Trusted By Leading Insurance Carriers
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          {carriers.map((carrier) => (
            <div
              key={carrier.name}
              className="relative w-40 h-20 grayscale hover:grayscale-0 transition-all"
            >
              <Image
                src={carrier.logo}
                alt={carrier.name}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 