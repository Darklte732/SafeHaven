'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import DashboardLayout from '@/components/admin/DashboardLayout'
import { toast } from 'react-hot-toast'
import type { KPIDashboard } from '@/types/kpi'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid'

export default function KPIDashboardPage() {
  const [dashboardData, setDashboardData] = useState<Record<string, KPIDashboard>>({})
  const [selectedPeriod, setSelectedPeriod] = useState<'daily' | 'weekly' | 'monthly'>('monthly')
  const [isLoading, setIsLoading] = useState(true)

  // Memoize the current dashboard data
  const dashboard = useMemo(() => 
    dashboardData[selectedPeriod] || null, 
    [dashboardData, selectedPeriod]
  )

  const fetchDashboard = useCallback(async (period: string) => {
    // If we already have this period's data, don't fetch again
    if (dashboardData[period]) return

    try {
      setIsLoading(true)
      const response = await fetch(`/api/admin/kpi?period=${period}`)
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data')
      }
      const data = await response.json()
      setDashboardData(prev => ({
        ...prev,
        [period]: data
      }))
    } catch (error) {
      console.error('Error fetching dashboard:', error)
      toast.error('Failed to load dashboard data')
    } finally {
      setIsLoading(false)
    }
  }, [dashboardData])

  // Initial data fetch
  useEffect(() => {
    fetchDashboard(selectedPeriod)
  }, [selectedPeriod, fetchDashboard])

  // Prefetch other periods
  useEffect(() => {
    const periods = ['daily', 'weekly', 'monthly']
    periods.forEach(period => {
      if (period !== selectedPeriod && !dashboardData[period]) {
        // Use requestIdleCallback for non-critical prefetching
        if ('requestIdleCallback' in window) {
          window.requestIdleCallback(() => fetchDashboard(period))
        } else {
          setTimeout(() => fetchDashboard(period), 1000)
        }
      }
    })
  }, [selectedPeriod, dashboardData, fetchDashboard])

  const handlePeriodChange = (newPeriod: 'daily' | 'weekly' | 'monthly') => {
    setSelectedPeriod(newPeriod)
    if (!dashboardData[newPeriod]) {
      fetchDashboard(newPeriod)
    }
  }

  // Memoize chart data transformations
  const revenueChartData = useMemo(() => {
    if (!dashboard) return []
    return dashboard.metrics
      .filter(m => m.category === 'financial')
      .map(m => ({
        name: m.name,
        value: m.value,
        target: m.target
      }))
  }, [dashboard])

  const salesChartData = useMemo(() => {
    if (!dashboard) return []
    return dashboard.metrics
      .filter(m => m.category === 'sales')
      .map(m => ({
        name: m.name,
        value: m.value,
        target: m.target
      }))
  }, [dashboard])

  const content = (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">KPI Dashboard</h2>
          <p className="mt-1 text-sm text-gray-400">
            Track your key performance indicators
          </p>
        </div>
        <div className="flex space-x-2">
          <select
            value={selectedPeriod}
            onChange={(e) => handlePeriodChange(e.target.value as typeof selectedPeriod)}
            className="bg-gray-700 text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>

      {isLoading && !dashboard ? (
        <div className="animate-pulse space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-700 rounded-lg"></div>
            ))}
          </div>
          <div className="h-96 bg-gray-700 rounded-lg"></div>
        </div>
      ) : !dashboard ? (
        <div className="text-center text-gray-400">
          No dashboard data available
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SummaryCard
              title="Total Policies"
              value={dashboard.summary.totalPolicies}
              trend={5.2}
              format="number"
            />
            <SummaryCard
              title="Active Customers"
              value={dashboard.summary.activeCustomers}
              trend={2.1}
              format="number"
            />
            <SummaryCard
              title="Revenue Growth"
              value={dashboard.summary.revenueGrowth}
              trend={dashboard.summary.revenueGrowth}
              format="percentage"
            />
            <SummaryCard
              title="Customer Satisfaction"
              value={dashboard.summary.customerSatisfaction}
              trend={1.5}
              format="percentage"
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-medium text-white mb-6">Revenue Trends</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        border: 'none',
                        borderRadius: '0.5rem',
                        color: '#fff'
                      }}
                    />
                    <Bar dataKey="value" fill="#3B82F6" />
                    <Bar dataKey="target" fill="#6B7280" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Sales Chart */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-medium text-white mb-6">Sales Performance</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        border: 'none',
                        borderRadius: '0.5rem',
                        color: '#fff'
                      }}
                    />
                    <Bar dataKey="value" fill="#10B981" />
                    <Bar dataKey="target" fill="#6B7280" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Top Performers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Agents */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-medium text-white mb-6">Top Performing Agents</h3>
              <div className="space-y-4">
                {dashboard.topPerformers.agents.map((agent) => (
                  <div key={agent.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">{agent.name}</p>
                      <p className="text-sm text-gray-400">{agent.policies} policies</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-white">
                        ${agent.revenue.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-medium text-white mb-6">Top Products</h3>
              <div className="space-y-4">
                {dashboard.topPerformers.products.map((product) => (
                  <div key={product.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">{product.name}</p>
                      <p className="text-sm text-gray-400">{product.sales} sales</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-white">
                        ${product.revenue.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )

  return <DashboardLayout>{content}</DashboardLayout>
}

// Memoize the SummaryCard component
const SummaryCard = React.memo(function SummaryCard({ 
  title, 
  value, 
  trend, 
  format 
}: {
  title: string
  value: number
  trend: number
  format: 'number' | 'percentage'
}) {
  const formattedValue = format === 'percentage'
    ? `${value.toFixed(1)}%`
    : value.toLocaleString()

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-sm font-medium text-gray-400">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold text-white">
          {formattedValue}
        </p>
        <p className={`ml-2 flex items-baseline text-sm font-semibold ${
          trend > 0 ? 'text-green-400' : 'text-red-400'
        }`}>
          {trend > 0 ? (
            <ArrowUpIcon className="h-4 w-4 flex-shrink-0 self-center text-green-400" />
          ) : (
            <ArrowDownIcon className="h-4 w-4 flex-shrink-0 self-center text-red-400" />
          )}
          <span className="ml-1">{Math.abs(trend)}%</span>
        </p>
      </div>
    </div>
  )
})

function getActivityColor(type: string): string {
  switch (type) {
    case 'policy_created':
      return 'bg-green-400'
    case 'policy_renewed':
      return 'bg-blue-400'
    case 'claim_filed':
      return 'bg-yellow-400'
    case 'payment_received':
      return 'bg-purple-400'
    default:
      return 'bg-gray-400'
  }
}

function formatActivityType(type: string): string {
  return type
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
} 