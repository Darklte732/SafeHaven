'use client';

import React from 'react';
import Image from 'next/image';

const mediaLogos = [
  {
    name: 'Forbes',
    logo: '/images/media/forbes.svg',
  },
  {
    name: 'Bloomberg',
    logo: '/images/media/bloomberg.svg',
  },
  {
    name: 'Reuters',
    logo: '/images/media/reuters.svg',
  },
  {
    name: 'WSJ',
    logo: '/images/media/wsj.svg',
  },
];

export function FeaturedIn() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-12">
          Featured In
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center justify-items-center">
          {mediaLogos.map((media) => (
            <div
              key={media.name}
              className="relative w-40 h-12 grayscale hover:grayscale-0 transition-all"
            >
              <Image
                src={media.logo}
                alt={media.name}
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