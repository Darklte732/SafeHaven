'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { SafeImage } from '../ui/image'

export default function FeaturesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const features = [
    {
      title: 'Guaranteed Coverage',
      description: 'No medical exam required. Coverage guaranteed for ages 50-85.',
      icon: '/images/features/shield-check.svg',
      color: 'blue'
    },
    {
      title: 'Fast Claims Process',
      description: 'Claims typically paid within 24-48 hours of submission.',
      icon: '/images/features/clock.svg',
      color: 'green'
    },
    {
      title: 'Affordable Coverage',
      description: 'Plans starting at $20/month with locked-in rates.',
      icon: '/images/features/dollar.svg',
      color: 'blue'
    },
    {
      title: '24/7 Support',
      description: 'Access to our dedicated support team anytime you need help.',
      icon: '/images/features/support.svg',
      color: 'blue'
    },
    {
      title: 'Easy Application',
      description: 'Simple online application process with instant approval.',
      icon: '/images/features/document.svg',
      color: 'blue'
    },
    {
      title: 'Flexible Options',
      description: 'Choose coverage amounts from $5,000 to $50,000.',
      icon: '/images/features/options.svg',
      color: 'blue'
    }
  ]

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose SafeHaven?
          </h2>
          <p className="text-lg text-gray-600">
            We make it easy to protect your family's future with affordable coverage and exceptional service.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <SafeImage
                    src={feature.icon}
                    alt={feature.title}
                    width={24}
                    height={24}
                    className="text-blue-600"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 ml-3">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 flex-grow">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 
