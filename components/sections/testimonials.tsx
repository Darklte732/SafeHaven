'use client';

import React from 'react';
import { SafeImage } from '../ui/image';

const testimonials = [
  {
    name: 'Sarah Johnson',
    location: 'Age 65, Florida',
    image: '/images/testimonials/sarah-testimonial.jpg',
    quote: 'The process was so simple, and the rates were much better than I expected. Knowing my family is protected gives me peace of mind.'
  },
  {
    name: 'Robert Martinez',
    location: 'Age 72, Texas',
    image: '/images/testimonials/robert-testimonial.jpg',
    quote: 'I was worried about getting coverage at my age, but SafeHaven made it easy. No medical exam and great customer service!'
  },
  {
    name: 'Mary Wilson',
    location: 'Age 58, Ohio',
    image: '/images/testimonials/mary-testimonial.jpg',
    quote: 'After comparing several options, SafeHaven offered the best value. The claims process was quick and hassle-free.'
  }
];

export function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <h2 className="text-center text-3xl font-bold text-gray-900 mb-16">
          What Our Customers Say
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-xl border border-gray-100">
              <div className="flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 relative flex-shrink-0">
                    <SafeImage 
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="rounded-full object-cover"
                      priority={true}
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </div>
                <p className="text-gray-600">&quot;{testimonial.quote}&quot;</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 