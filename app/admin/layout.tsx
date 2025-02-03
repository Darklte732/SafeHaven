'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAdmin = () => {
      const adminAccess = Cookies.get('adminAccess')
      if (!adminAccess) {
        router.push('/admin/login')
      }
      setIsLoading(false)
    }

    checkAdmin()
  }, [router])

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 min-h-screen">
      {children}
    </div>
  )
} 