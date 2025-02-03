'use client'

import { SafeImage } from '@/components/ui/image'

const testimonials = [
  {
    id: 1,
    name: 'James Wilson',
    role: 'Retired Teacher',
    image: 'https://placehold.co/400x400/png',
    quote: "The process was incredibly simple, and the peace of mind knowing my family is protected is priceless. Highly recommend SafeHaven Insurance."
  },
  {
    id: 2,
    name: 'Linda Martinez',
    role: 'Small Business Owner',
    image: 'https://placehold.co/400x400/png',
    quote: "I was amazed at how affordable the coverage was. The team was very helpful in explaining all my options."
  },
  {
    id: 3,
    name: 'Sarah Johnson',
    role: 'Healthcare Worker',
    image: 'https://placehold.co/400x400/png',
    quote: "As someone in healthcare, I understand the importance of being prepared. SafeHaven made it easy to secure my family's future."
  }
]

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Real stories from real people who trust SafeHaven Insurance
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-8"
            >
              <div className="flex items-center mb-6">
                <div className="flex-shrink-0">
                  <SafeImage
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              <blockquote>
                <p className="text-gray-600 dark:text-gray-300 italic">{testimonial.quote}</p>
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 