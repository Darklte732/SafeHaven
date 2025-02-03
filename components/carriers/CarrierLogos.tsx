'use client'

import Image from 'next/image'

export function CarrierLogos() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center justify-items-center">
      <div className="w-full max-w-[200px] transform transition-transform duration-300 hover:-translate-y-2 md:animate-float">
        <div className="relative bg-gray-50 p-4 rounded-lg group overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Image
              src="/images/photo-3.jpg"
              alt="Multi-generational family together"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"></div>
          </div>
          <div className="relative z-10 group-hover:opacity-0 transition-opacity duration-300">
            <Image
              src="/images/carriers/mutual-of-omaha.png"
              alt="Mutual of Omaha"
              width={200}
              height={80}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>
      </div>
      <div className="w-full max-w-[200px] transform transition-transform duration-300 hover:-translate-y-2 md:animate-float md:[animation-delay:1s]">
        <div className="relative bg-gray-50 p-4 rounded-lg group overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Image
              src="/images/photo-3.jpg"
              alt="Multi-generational family together"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"></div>
          </div>
          <div className="relative z-10 group-hover:opacity-0 transition-opacity duration-300">
            <Image
              src="/images/carriers/corebridge.png"
              alt="Corebridge Financial"
              width={200}
              height={80}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>
      </div>
      <div className="w-full max-w-[200px] transform transition-transform duration-300 hover:-translate-y-2 md:animate-float md:[animation-delay:2s]">
        <div className="relative bg-gray-50 p-4 rounded-lg group overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Image
              src="/images/photo-3.jpg"
              alt="Multi-generational family together"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"></div>
          </div>
          <div className="relative z-10 group-hover:opacity-0 transition-opacity duration-300">
            <Image
              src="/images/carriers/american-amicable.png"
              alt="American-Amicable"
              width={200}
              height={80}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>
      </div>
      <div className="w-full max-w-[200px] transform transition-transform duration-300 hover:-translate-y-2 md:animate-float md:[animation-delay:3s]">
        <div className="relative bg-gray-50 p-4 rounded-lg group overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Image
              src="/images/photo-3.jpg"
              alt="Multi-generational family together"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"></div>
          </div>
          <div className="relative z-10 group-hover:opacity-0 transition-opacity duration-300">
            <Image
              src="/images/carriers/gtl.png"
              alt="GTL"
              width={200}
              height={80}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  )
} 