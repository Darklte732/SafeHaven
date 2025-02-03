'use client'

import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'
import { useState, useEffect } from 'react'

interface DataPoint {
  name: string
  value: number
}

interface PieChartProps {
  data: DataPoint[]
  title: string
  height?: number
  colors?: string[]
  isLoading?: boolean
  error?: string
}

const DEFAULT_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']

export default function PieChart({
  data,
  title,
  height = 300,
  colors = DEFAULT_COLORS,
  isLoading = false,
  error
}: PieChartProps) {
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

  const total = data.reduce((sum, item) => sum + item.value, 0)

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    name
  }: any) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return percent > 0.05 ? (
      <text
        x={x}
        y={y}
        fill="#6B7280"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-xs"
      >
        {`${name} (${(percent * 100).toFixed(0)}%)`}
      </text>
    ) : null
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">{title}</h3>
      <div style={{ height: `${height}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              innerRadius={60}
              fill="#8884d8"
              dataKey="value"
              animationDuration={1000}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                  strokeWidth={0}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                border: 'none',
                borderRadius: '0.5rem',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                padding: '0.75rem'
              }}
              formatter={(value: number) => [`${value} (${((value / total) * 100).toFixed(1)}%)`, 'Count']}
            />
            <Legend
              formatter={(value) => <span className="text-gray-700 dark:text-gray-300">{value}</span>}
              wrapperStyle={{ paddingTop: '20px' }}
            />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
} 