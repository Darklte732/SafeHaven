'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function ProblemSolutionSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const problems = [
    'Average funeral costs exceed $9,000',
    'Unexpected medical bills can reach tens of thousands',
    '78% of Americans live paycheck to paycheck',
    'Grieving families often struggle with debt'
  ]

  const solutions = [
    'Guaranteed acceptance for ages 50-85',
    'Coverage from $5,000 to $50,000',
    'Claims paid within 24-48 hours',
    'No medical exam required'
  ]

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Problem Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-100">
              <span className="text-sm font-medium text-red-600">The Problem</span>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                The Hidden Cost of Being Unprepared
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Many families face unexpected financial burdens during their most difficult moments.
              </p>
            </div>

            <ul className="space-y-4">
              {problems.map((problem, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start text-gray-700"
                >
                  <svg
                    className="h-6 w-6 text-red-500 mr-3 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <span>{problem}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Solution Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100">
              <span className="text-sm font-medium text-green-600">The Solution</span>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Peace of Mind with SafeHaven
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We provide comprehensive coverage that ensures your family's financial security.
              </p>
            </div>

            <ul className="space-y-4">
              {solutions.map((solution, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start text-gray-700"
                >
                  <svg
                    className="h-6 w-6 text-green-500 mr-3 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>{solution}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 