'use client';

import React from 'react';

const stats = [
  {
    value: '50K+',
    label: 'Families Protected',
  },
  {
    value: '98%',
    label: 'Claims Satisfaction',
  },
  {
    value: 'A+',
    label: 'BBB Rating',
  },
  {
    value: '24/7',
    label: 'Customer Support',
  },
];

export function Stats() {
  return (
    <section className="bg-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 