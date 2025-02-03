'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { SafeImage } from '../ui/image'

export default function SocialProofSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const trustIndicators = [
    {
      image: '/images/bbb-rating.svg',
      title: 'A+ BBB Rating',
      alt: 'BBB Rating Logo'
    },
    {
      image: '/images/ssl-secure.svg',
      title: 'SSL Secured',
      alt: 'SSL Security Badge'
    },
    {
      image: '/images/licensed.svg',
      title: 'Licensed & Insured',
      alt: 'Licensed Insurance Badge'
    }
  ]

  const stats = [
    {
      value: '50K+',
      label: 'Families Protected',
      color: 'blue'
    },
    {
      value: '98%',
      label: 'Claims Satisfaction',
      color: 'blue'
    },
    {
      value: '24/7',
      label: 'Support Available',
      color: 'blue'
    }
  ]

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Trust Indicators */}
          <div className="grid grid-cols-3 gap-8 mb-16">
            {trustIndicators.map((indicator, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <SafeImage
                  src={indicator.image}
                  alt={indicator.alt}
                  width={64}
                  height={64}
                  className="mb-4"
                />
                <h3 className="text-gray-900 font-medium">{indicator.title}</h3>
              </div>
            ))}
          </div>

          {/* Featured In Section */}
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured In</h2>
            <div className="grid grid-cols-3 gap-8">
              {/* Add media logos here */}
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-4xl font-bold text-blue-600 mb-2`}>
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Customer Testimonials */}
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-center text-gray-600 mb-12">
              Don't just take our word for it. Here's what families and businesses have to say about SafeHaven
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote: "SafeHaven made the entire process so simple. I got coverage within 24 hours!",
                  author: "Sarah M.",
                  role: "Customer"
                },
                {
                  quote: "The peace of mind knowing my family is protected is priceless.",
                  author: "James R.",
                  role: "Customer"
                },
                {
                  quote: "Their customer service is exceptional. Always there when you need them.",
                  author: "Linda K.",
                  role: "Customer"
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <SafeImage
                      src={`/images/testimonials/avatar-${index + 1}.jpg`}
                      alt={testimonial.author}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div className="ml-4">
                      <div className="font-semibold text-gray-900">{testimonial.author}</div>
                      <div className="text-gray-600 text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 
