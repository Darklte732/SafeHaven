'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
import ClientOnly from '@/components/ClientOnly'

function NavbarContent() {
  const pathname = usePathname()
  const supabase = createClientComponentClient()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single()
        
        setIsAdmin(profile?.role === 'admin')
      }
    }
    checkAdmin()
  }, [supabase])

  // Hide navbar on admin routes
  if (pathname?.startsWith('/admin')) return null

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="flex-shrink-0">
                <Image
                  src="/images/logo.svg"
                  alt="SafeHaven Insurance"
                  width={40}
                  height={40}
                  className="h-8 w-auto"
                  priority
                />
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                SafeHaven
              </span>
            </Link>
          </div>

          <div className="flex items-center">
            <div className="hidden md:flex md:items-center">
              <Link 
                href="/features" 
                className="px-3 py-2 text-base text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Features
              </Link>
              <Link 
                href="/quote" 
                className="px-3 py-2 text-base text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Get Quote
              </Link>
              <Link 
                href="/faq" 
                className="px-3 py-2 text-base text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                FAQ
              </Link>
              <Link 
                href="/chat" 
                className="px-3 py-2 text-base text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Chat
              </Link>
              <Link 
                href="/admin" 
                className="ml-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Admin Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default function Navbar() {
  return (
    <ClientOnly>
      <NavbarContent />
    </ClientOnly>
  )
} 