'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="w-[180px] h-[40px]">
                <svg width="180" height="40" viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2563eb"/>
                      <stop offset="100%" stopColor="#1d4ed8"/>
                    </linearGradient>
                  </defs>
                  
                  <path d="M24 4L8 10V18C8 28.84 15.68 39.184 24 42C32.32 39.184 40 28.84 40 18V10L24 4Z" 
                        transform="scale(0.5) translate(8, -4)"
                        fill="url(#shieldGradient)" 
                        stroke="#1e40af" 
                        strokeWidth="1.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"/>
                  
                  <path d="M14 16L17 19L22 14" 
                        stroke="white" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"/>
                  
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