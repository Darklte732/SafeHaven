'use client'

import Image from "next/image"
import { Container } from "@/components/ui/Container"

const testimonials = [
  {
    content: "The process was incredibly simple and straightforward. I got my policy in minutes and the rates were better than I expected.",
    author: {
      name: "Sarah Johnson",
      role: "Homeowner",
      image: "/images/testimonials/avatar-1.jpg",
    },
  },
  {
    content: "Their customer service is exceptional. They took the time to understand my needs and found the perfect coverage for my family.",
    author: {
      name: "Michael Chen",
      role: "Business Owner",
      image: "/images/testimonials/avatar-2.jpg",
    },
  },
  {
    content: "I was amazed at how easy it was to file a claim. The whole process was handled professionally and quickly.",
    author: {
      name: "Emily Rodriguez",
      role: "Parent",
      image: "/images/testimonials/avatar-3.jpg",
    },
  },
]

export const TestimonialsSection = () => {
  return (
    <div className="py-24 sm:py-32 bg-white">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Testimonials</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            What Our Customers Say
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Don't just take our word for it. Here's what some of our satisfied customers have to say about their experience.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.author.name}
              className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5"
            >
              <blockquote className="text-gray-900">
                <p>{`"${testimonial.content}"`}</p>
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-x-4">
                <Image
                  src={testimonial.author.image}
                  alt={testimonial.author.name}
                  className="h-10 w-10 rounded-full bg-gray-50"
                  width={40}
                  height={40}
                />
                <div>
                  <div className="font-semibold">{testimonial.author.name}</div>
                  <div className="text-gray-600">{testimonial.author.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-16 flex justify-center gap-8">
          <div className="flex items-center gap-x-4">
            <Image
              src="/images/bbb-rating.svg"
              alt="BBB A+ Rating"
              className="h-12 w-auto"
              width={48}
              height={48}
            />
            <div className="text-sm leading-6">
              <div className="font-semibold text-gray-900">A+ BBB Rating</div>
              <div className="text-gray-600">Accredited Business</div>
            </div>
          </div>
          <div className="flex items-center gap-x-4">
            <Image
              src="/images/licensed.svg"
              alt="Licensed Insurance Provider"
              className="h-12 w-auto"
              width={48}
              height={48}
            />
            <div className="text-sm leading-6">
              <div className="font-semibold text-gray-900">Licensed Provider</div>
              <div className="text-gray-600">All 50 States</div>
            </div>
          </div>
          <div className="flex items-center gap-x-4">
            <Image
              src="/images/ssl-secure.svg"
              alt="SSL Secure"
              className="h-12 w-auto"
              width={48}
              height={48}
            />
            <div className="text-sm leading-6">
              <div className="font-semibold text-gray-900">SSL Secure</div>
              <div className="text-gray-600">256-bit Encryption</div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default TestimonialsSection 