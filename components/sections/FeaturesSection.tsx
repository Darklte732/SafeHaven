'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { SafeImage } from '../ui/image'
import Image from "next/image"
import { Container } from "@/components/ui/Container"

const features = [
  {
    name: "Instant Coverage",
    description: "Get covered in minutes with our streamlined digital application process. No waiting periods for most policies.",
    icon: "/images/features/clock.svg",
  },
  {
    name: "Affordable Plans",
    description: "Find plans that fit your budget with flexible payment options and competitive rates from top carriers.",
    icon: "/images/features/dollar.svg",
  },
  {
    name: "Expert Support",
    description: "Our licensed insurance advisors are here to help you 24/7 with any questions or concerns.",
    icon: "/images/features/support.svg",
  },
  {
    name: "Easy Claims",
    description: "File claims quickly and easily through our online portal, with most claims processed within 24-48 hours.",
    icon: "/images/features/document.svg",
  },
  {
    name: "Flexible Options",
    description: "Customize your coverage with add-ons and riders to create the perfect plan for your needs.",
    icon: "/images/features/options.svg",
  },
  {
    name: "Secure & Trusted",
    description: "Rest easy knowing you're protected by an A+ rated insurance provider with strong financial stability.",
    icon: "/images/features/shield-check.svg",
  },
]

export const FeaturesSection = () => {
  return (
    <div className="py-24 sm:py-32 bg-gray-50">
      <Container>
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Everything You Need</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Insurance Made Simple
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We've reimagined the insurance experience to make it easier, faster, and more transparent than ever before.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <Image
                    src={feature.icon}
                    alt={feature.name}
                    className="h-8 w-8 flex-none"
                    width={32}
                    height={32}
                  />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </div>
  )
}

export default FeaturesSection 
