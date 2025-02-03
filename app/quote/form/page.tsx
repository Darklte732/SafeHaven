'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function QuoteForm() {
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    dateOfBirth: '',
    tobaccoUse: 'no',
    coverageAmount: searchParams?.get('coverage') || '',
    streetAddress: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Add your form submission logic here
      console.log('Form submitted:', formData)
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  if (!isMounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Complete Your Quote</h1>
          
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 space-y-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="tobaccoUse" className="block text-sm font-medium text-gray-700 mb-1">
                Tobacco Use
              </label>
              <select
                id="tobaccoUse"
                name="tobaccoUse"
                value={formData.tobaccoUse}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>

            <div>
              <label htmlFor="coverageAmount" className="block text-sm font-medium text-gray-700 mb-1">
                Coverage Amount
              </label>
              <input
                type="text"
                id="coverageAmount"
                name="coverageAmount"
                value={formData.coverageAmount}
                onChange={handleChange}
                required
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>

            <div>
              <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700 mb-1">
                Street Address
              </label>
              <input
                type="text"
                id="streetAddress"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Processing...' : 'Submit Quote Request'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
} 