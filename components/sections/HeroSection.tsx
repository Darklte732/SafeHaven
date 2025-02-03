'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { SafeImage } from '../ui/image'
import Image from "next/image"
import { Container } from "@/components/ui/Container"

interface HeroSectionProps {
  userSegment?: string
}

interface ContentType {
  title: string
  subtitle: string
  image: string
}

const contentMap: Record<string, ContentType> = {
  default: {
    title: "Protect Your Family's Future with Affordable Final Expense Insurance",
    subtitle: "Get peace of mind knowing your loved ones won't face financial burden. Coverage starts at just $20/month.",
    image: "/images/family-generations.svg"
  },
  business: {
    title: "Comprehensive Business Insurance Solutions",
    subtitle: "Protect your business and employees with our tailored insurance plans. Starting at $50/month.",
    image: "/images/business-team.svg"
  }
}

export const HeroSection = () => {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900">
      <Image
        src="/images/noise.svg"
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-20"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      <Container className="py-24 sm:py-32 lg:pb-40">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Protect Your Family's Future with Confidence
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Get personalized insurance coverage that gives you peace of mind. Our expert advisors help you find the perfect plan to protect what matters most.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="#get-quote"
              className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
            >
              Get Your Free Quote
            </Link>
            <Link href="#features" className="text-sm font-semibold leading-6 text-white">
              Learn more <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </Container>

      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      <div className="mt-16 sm:mt-24">
        <div className="relative isolate overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Image
              src="/images/family-illustration.svg"
              alt="Happy family protected by insurance"
              className="mx-auto max-w-full"
              width={1200}
              height={800}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection 
