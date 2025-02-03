'use client'

import dynamic from 'next/dynamic'
import ClientOnly from '@/components/ClientOnly'

const NavbarFallback = () => (
  <div className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
    <div className="animate-pulse h-full flex items-center px-4">
      <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
      <div className="ml-auto flex space-x-4">
        <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    </div>
  </div>
)

const Navbar = dynamic(() => import('@/components/Navbar'), {
  ssr: false,
  loading: () => <NavbarFallback />
})

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <div className="pt-16">
        {children}
      </div>
    </div>
  )
} 