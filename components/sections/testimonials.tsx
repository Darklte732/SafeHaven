'use client';

import React from 'react';
import Image from 'next/image';

const testimonials = [
  {
    name: 'Sarah Johnson',
    location: 'Age 65, Florida',
    image: '/images/avatars/sarah.svg',
    quote: 'The process was so simple, and the rates were much better than I expected. Knowing my family is protected gives me peace of mind.',
  },
  {
    name: 'Robert Martinez',
    location: 'Age 72, Texas',
    image: '/images/avatars/robert.svg',
    quote: 'I was worried about getting coverage at my age, but SafeHaven made it easy. No medical exam and great customer service!',
  },
  {
    name: 'Mary Wilson',
    location: 'Age 58, Ohio',
    image: '/images/avatars/mary.svg',
    quote: 'After comparing several options, SafeHaven offered the best value. The claims process was quick and hassle-free.',
  },
];

export function Testimonials() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          What Our Customers Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-6">
                <div className="relative h-12 w-12">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.location}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 