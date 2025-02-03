'use client'

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { useState, useEffect } from 'react'

interface DataPoint {
  name: string
  value: number
  target?: number
}

interface BarChartProps {
  data: DataPoint[]
  title: string
  height?: number
  colors?: {
    bar: string
    target?: string
  }
  isLoading?: boolean
  error?: string
}

export default function BarChart({
  data,
  title,
  height = 300,
  colors = { bar: '#3B82F6', target: '#6B7280' },
  isLoading = false,
  error
}: BarChartProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">{title}</h3>
        <div className="h-[300px] flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 dark:border-gray-600 dark:border-t-blue-500" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">{title}</h3>
        <div className="h-[300px] flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 dark:text-red-400 mb-2">Failed to load chart data</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">{title}</h3>
        <div className="h-[300px] flex items-center justify-center text-gray-500 dark:text-gray-400">
          No data available
        </div>
      </div>
    )
  }

  const formatValue = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`
    }
    return `$${value}`
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">{title}</h3>
      <div style={{ height: `${height}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
            <XAxis
              dataKey="name"
              stroke="#6B7280"
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickLine={{ stroke: '#E5E7EB' }}
              axisLine={{ stroke: '#E5E7EB' }}
            />
            <YAxis
              stroke="#6B7280"
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickLine={{ stroke: '#E5E7EB' }}
              axisLine={{ stroke: '#E5E7EB' }}
              tickFormatter={formatValue}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                border: 'none',
                borderRadius: '0.5rem',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                padding: '0.75rem'
              }}
              cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
              formatter={(value: number) => [formatValue(value), 'Revenue']}
            />
            <Bar
              dataKey="value"
              fill={colors.bar}
              radius={[4, 4, 0, 0]}
              maxBarSize={50}
              animationDuration={1000}
            />
            {data.some(d => d.target !== undefined) && (
              <Bar
                dataKey="target"
                fill={colors.target}
                radius={[4, 4, 0, 0]}
                maxBarSize={50}
                animationDuration={1000}
              />
            )}
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
} 