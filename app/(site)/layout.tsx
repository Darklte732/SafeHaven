import Navbar from '@/components/Navbar'
import { Suspense } from 'react'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Suspense>
        <Navbar />
      </Suspense>
      <div className="pt-16">
        {children}
      </div>
    </div>
  )
} 