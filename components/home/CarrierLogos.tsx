'use client'

import Image from 'next/image'

const carriers = [
  {
    name: 'Mutual of Omaha',
    logo: '/images/carriers/mutual-of-omaha.png',
    delay: '0'
  },
  {
    name: 'Corebridge Financial',
    logo: '/images/carriers/corebridge.png',
    delay: '100'
  },
  {
    name: 'American-Amicable',
    logo: '/images/carriers/american-amicable.png',
    delay: '200'
  },
  {
    name: 'GTL',
    logo: '/images/carriers/gtl.png',
    delay: '300'
  }
]

export function CarrierLogos() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
          Trusted By Leading Insurance Carriers
        </h2>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {carriers.map((carrier) => (
            <div
              key={carrier.name}
              className="flex justify-center transform hover:-translate-y-1 transition-transform duration-300 ease-in-out"
              style={{ animationDelay: `${carrier.delay}ms` }}
            >
              <Image
                src={carrier.logo}
                alt={carrier.name}
                width={200}
                height={100}
                className="h-16 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 