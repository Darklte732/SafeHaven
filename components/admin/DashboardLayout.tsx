'use client'

import { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import { Suspense } from 'react'

interface LoadingSpinnerProps {
  className?: string
}

const LoadingSpinner = ({ className = 'h-8 w-8' }: LoadingSpinnerProps) => (
  <div className="flex items-center justify-center">
    <div className={`${className} animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 dark:border-gray-600 dark:border-t-blue-500`} />
  </div>
)

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main content */}
      <div className="lg:pl-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
              <LoadingSpinner className="h-12 w-12" />
            </div>
          }>
            {children}
          </Suspense>
        </main>
      </div>
    </div>
  )
} 