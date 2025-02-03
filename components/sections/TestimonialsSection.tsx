'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { SafeImage } from '../ui/image'

interface Testimonial {
  id: number
  quote: string
  author: string
  role: string
  company: string
  image: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "The peace of mind SafeHaven provides is invaluable. Their team made the entire process incredibly simple, and I got coverage within 24 hours.",
    author: "Sarah Mitchell",
    role: "Business Owner",
    company: "Mitchell Family Bakery",
    image: "/images/testimonials/sarah.jpg",
    rating: 5
  },
  {
    id: 2,
    quote: "I was amazed by how affordable and comprehensive the coverage is. The customer service team went above and beyond to help me find the perfect plan.",
    author: "James Rodriguez",
    role: "Father of Three",
    company: "Tech Professional",
    image: "/images/testimonials/james.jpg",
    rating: 5
  },
  {
    id: 3,
    quote: "After comparing multiple providers, SafeHaven stood out for their transparency and excellent rates. The claims process is remarkably smooth.",
    author: "Linda Kim",
    role: "Financial Advisor",
    company: "Wealth Partners LLC",
    image: "/images/testimonials/linda.jpg",
    rating: 5
  }
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prev) => {
      let next = prev + newDirection
      if (next < 0) next = testimonials.length - 1
      if (next >= testimonials.length) next = 0
      return next
    })
  }

  return (
    <section ref={ref} className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600">
            Don't just take our word for it. Here's what families and businesses have to say about SafeHaven Insurance.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x)

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1)
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1)
                }
              }}
              className="absolute w-full"
            >
              <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
                <div className="flex items-center mb-6">
                  <SafeImage
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].author}
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {testimonials[currentIndex].author}
                    </h3>
                    <p className="text-gray-600">
                      {testimonials[currentIndex].role}
                    </p>
                    <p className="text-sm text-gray-500">
                      {testimonials[currentIndex].company}
                    </p>
                  </div>
                  <div className="ml-auto flex">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <blockquote className="text-xl text-gray-800 italic mb-6">
                  "{testimonials[currentIndex].quote}"
                </blockquote>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="absolute -left-12 top-1/2 transform -translate-y-1/2">
            <button
              onClick={() => paginate(-1)}
              className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 focus:outline-none"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          <div className="absolute -right-12 top-1/2 transform -translate-y-1/2">
            <button
              onClick={() => paginate(1)}
              className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 focus:outline-none"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1)
                  setCurrentIndex(index)
                }}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 