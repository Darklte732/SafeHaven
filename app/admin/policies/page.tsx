'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/admin/DashboardLayout'
import { toast } from 'react-hot-toast'

interface Policy {
  id: string
  type: string
  customer: string
  status: string
  premium: number
  startDate: string
  endDate: string
  coverage: number
}

export default function PoliciesPage() {
  const [policies, setPolicies] = useState<Policy[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchPolicies()
  }, [])

  const fetchPolicies = async () => {
    try {
      const response = await fetch('/api/admin/policies')
      if (!response.ok) {
        throw new Error('Failed to fetch policies')
      }
      const data = await response.json()
      setPolicies(data)
    } catch (error) {
      console.error('Error fetching policies:', error)
      toast.error('Failed to load policies')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-700 rounded w-1/4"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Policies</h2>
          <p className="mt-1 text-sm text-gray-400">
            View and manage insurance policies
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Policy ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Premium
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Coverage
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Period
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {policies.map((policy) => (
                <tr key={policy.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {policy.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {policy.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {policy.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      policy.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : policy.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {policy.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    ${policy.premium.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    ${policy.coverage.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {new Date(policy.startDate).toLocaleDateString()} - {new Date(policy.endDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )
} 