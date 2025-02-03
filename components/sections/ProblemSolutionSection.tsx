'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Container } from "@/components/ui/Container"

const problems = [
  {
    title: "Complex Insurance Jargon",
    problem: "Insurance can be overwhelming with complex terms and conditions that are hard to understand.",
    solution: "We break down complex insurance terms into simple, easy-to-understand language, ensuring you know exactly what you're covered for."
  },
  {
    title: "Time-Consuming Process",
    problem: "Traditional insurance applications can take days or weeks to process with lots of paperwork.",
    solution: "Our streamlined digital process lets you get quotes and coverage in minutes, not days, with minimal paperwork required."
  },
  {
    title: "Unclear Coverage",
    problem: "Many people don't know if they have the right coverage or if they're paying too much.",
    solution: "Our expert advisors analyze your needs and recommend the perfect coverage at the best price, ensuring you're properly protected."
  }
]

export const ProblemSolutionSection = () => {
  return (
    <div className="py-24 sm:py-32 bg-white">
      <Container>
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Better Insurance</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Insurance Doesn't Have to Be Complicated
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We've simplified the insurance process to make it easy for you to get the coverage you need.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {problems.map((item) => (
              <div key={item.title} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  {item.title}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    <span className="font-semibold text-red-600">Problem: </span>
                    {item.problem}
                  </p>
                  <p className="mt-4">
                    <span className="font-semibold text-green-600">Solution: </span>
                    {item.solution}
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </div>
  )
}

export default ProblemSolutionSection 