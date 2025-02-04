'use client'

import { memo, useState, useEffect } from 'react'
import DashboardLayout from '@/components/admin/DashboardLayout'
import { BarChart, PieChart } from '@/components/admin/charts'
import dynamic from 'next/dynamic'

// Dynamically import icons
const Icons = dynamic(() => import('@/components/admin/DashboardIcons'), { ssr: false })

type IconName = 'UsersIcon' | 'ChartBarIcon' | 'DocumentTextIcon' | 'ClockIcon'

// Stats Card Component
const StatsCard = memo(({ icon, title, value, isLoading }: {
  icon: IconName
  title: string
  value: string | number
  isLoading?: boolean
}) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center gap-4">
      <div className="flex-shrink-0 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
        <Icons name={icon} className="h-6 w-6 text-blue-600 dark:text-blue-400" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
        {isLoading ? (
          <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 animate-pulse rounded mt-1" />
        ) : (
          <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">{value}</p>
        )}
      </div>
    </div>
  </div>
))

StatsCard.displayName = 'StatsCard'

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dashboardData, setDashboardData] = useState<any>(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await fetch('/api/admin')
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data')
        }
        const data = await response.json()
        setDashboardData(data)
      } catch (err) {
        console.error('Error fetching dashboard data:', err)
        setError(err instanceof Error ? err.message : 'Failed to load dashboard data')
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const stats = [
    { icon: 'UsersIcon' as IconName, title: 'Active Agents', value: dashboardData?.summary?.activeAgents || '0' },
    { icon: 'ChartBarIcon' as IconName, title: 'Success Rate', value: `${dashboardData?.summary?.successRate || '0.0'}%` },
    { icon: 'DocumentTextIcon' as IconName, title: 'Active Deals', value: dashboardData?.summary?.activeDeals || '0' },
    { icon: 'ClockIcon' as IconName, title: 'Recent Activities', value: dashboardData?.summary?.recentActivities || '0' },
  ]

  // Transform data for charts
  const agentPerformanceData = dashboardData?.agentPerformance?.map((agent: any) => ({
    name: agent.name,
    value: agent.revenue
  })) || []

  const salesStageData = dashboardData?.salesStages?.map((stage: any) => ({
    name: stage.name,
    value: stage.count
  })) || []

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Real-time overview of agent performance and sales metrics</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <StatsCard key={stat.title} {...stat} isLoading={isLoading} />
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BarChart
            data={agentPerformanceData}
            title="Agent Performance"
            colors={{ bar: '#3B82F6' }}
            isLoading={isLoading}
            error={error || undefined}
          />
          <PieChart
            data={salesStageData}
            title="Sales Stage Distribution"
            colors={['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']}
            isLoading={isLoading}
            error={error || undefined}
          />
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Activity</h3>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {isLoading ? (
              <div className="px-6 py-4 space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse flex justify-between items-center">
                    <div className="space-y-2">
                      <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded" />
                      <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
                    </div>
                    <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="px-6 py-12 text-center">
                <p className="text-red-500 dark:text-red-400 mb-2">Failed to load activities</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{error}</p>
              </div>
            ) : dashboardData?.recentActivities?.length > 0 ? (
              dashboardData.recentActivities.map((activity: any) => (
                <div key={activity.id} className="px-6 py-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.description}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{activity.agent}</p>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(activity.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                No recent activities
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default DashboardPage 