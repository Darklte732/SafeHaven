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
    <section className="py-20 bg-white">
      <div className="container-custom">
        <h2 className="text-center text-3xl font-bold text-gray-900 mb-16">
          What Our Customers Say
        </h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-header">
                <SafeImage 
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="testimonial-image"
                />
                <div className="testimonial-info">
                  <h4 className="testimonial-name">{testimonial.name}</h4>
                  <p className="testimonial-location">{testimonial.location}</p>
                </div>
              </div>
              <p className="testimonial-quote">&quot;{testimonial.quote}&quot;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 