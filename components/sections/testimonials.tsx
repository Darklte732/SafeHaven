'use client';

import React from 'react';
import { SafeImage } from '../ui/image';

export function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <h2 className="text-center text-3xl font-bold text-gray-900 mb-16">What Our Customers Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-duration-300">
            <div className="flex items-center mb-6">
              <div className="relative h-16 w-16 flex-shrink-0">
                <SafeImage 
                  src="/images/testimonials/sarah-testimonial.jpg" 
                  alt="Sarah Johnson" 
                  width={64} 
                  height={64} 
                  className="rounded-full object-cover w-full h-full"
                />
              </div>
              <div className="ml-4">
                <h4 className="text-xl font-semibold text-gray-900">Sarah Johnson</h4>
                <p className="text-sm text-gray-600">Age 65, Florida</p>
              </div>
            </div>
            <p className="text-gray-600 italic">&quot;The process was so simple, and the rates were much better than I expected. Knowing my family is protected gives me peace of mind.&quot;</p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-duration-300">
            <div className="flex items-center mb-6">
              <div className="relative h-16 w-16 flex-shrink-0">
                <SafeImage 
                  src="/images/testimonials/robert-testimonial.jpg" 
                  alt="Robert Martinez" 
                  width={64} 
                  height={64} 
                  className="rounded-full object-cover w-full h-full"
                />
              </div>
              <div className="ml-4">
                <h4 className="text-xl font-semibold text-gray-900">Robert Martinez</h4>
                <p className="text-sm text-gray-600">Age 72, Texas</p>
              </div>
            </div>
            <p className="text-gray-600 italic">&quot;I was worried about getting coverage at my age, but SafeHaven made it easy. No medical exam and great customer service!&quot;</p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-duration-300">
            <div className="flex items-center mb-6">
              <div className="relative h-16 w-16 flex-shrink-0">
                <SafeImage 
                  src="/images/testimonials/mary-testimonial.jpg" 
                  alt="Mary Wilson" 
                  width={64} 
                  height={64} 
                  className="rounded-full object-cover w-full h-full"
                />
              </div>
              <div className="ml-4">
                <h4 className="text-xl font-semibold text-gray-900">Mary Wilson</h4>
                <p className="text-sm text-gray-600">Age 58, Ohio</p>
              </div>
            </div>
            <p className="text-gray-600 italic">&quot;After comparing several options, SafeHaven offered the best value. The claims process was quick and hassle-free.&quot;</p>
          </div>
        </div>
      </div>
    </section>
  );
} 