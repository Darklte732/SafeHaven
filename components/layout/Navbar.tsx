'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <div className="w-40 h-10 relative">
                <svg viewBox="0 0 200 40" className="absolute inset-0">
                  <circle cx="20" cy="20" r="16" fill="#1e40af" />
                  <path
                    d="M14 20l4 4 8-8"
                    stroke="white"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <text x="48" y="24" 
                        fontFamily="Arial, sans-serif" 
                        fontSize="22" 
                        fontWeight="700" 
                        fill="#1e40af" 
                        letterSpacing="-0.02em">SafeHaven</text>
                  
                  <text x="48" y="36" 
                        fontFamily="Arial, sans-serif" 
                        fontSize="12" 
                        fontWeight="500" 
                        fill="#64748b">Insurance</text>
                </svg>
              </div>
            </Link>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <Link
              href="/features"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                pathname === '/features'
                  ? 'text-primary-600 border-b-2 border-primary-500'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Features
            </Link>
            <Link
              href="/quote"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                pathname === '/quote'
                  ? 'text-primary-600 border-b-2 border-primary-500'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Get Quote
            </Link>
            <Link
              href="/faq"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                pathname === '/faq'
                  ? 'text-primary-600 border-b-2 border-primary-500'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              FAQ
            </Link>
            <Link
              href="/chat"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                pathname === '/chat'
                  ? 'text-primary-600 border-b-2 border-primary-500'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Chat with AI
            </Link>
          </div>

          <div className="flex items-center">
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
} 