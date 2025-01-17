'use client';

import React from 'react';
import Image from 'next/image';

const features = [
  {
    title: 'Guaranteed Coverage',
    description: 'No medical exam required. Coverage guaranteed for ages 50-85, regardless of health conditions.',
    icon: '/images/shield-check.svg',
  },
  {
    title: 'Affordable Rates',
    description: 'Lock in your rate starting at $20/month. Your premium never increases, and your coverage never decreases.',
    icon: '/images/dollar.svg',
  },
  {
    title: 'Fast Claims',
    description: 'Claims typically paid within 24-48 hours. Your family gets the support they need, when they need it most.',
    icon: '/images/clock.svg',
  },
];

export function Features() {
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-16">Why Choose SafeHaven?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={24}
                  height={24}
                  className="text-blue-800"
                />
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 