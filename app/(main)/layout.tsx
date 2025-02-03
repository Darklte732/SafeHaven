'use client'

import Navbar from '@/components/Navbar'
import { Toaster } from 'react-hot-toast'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1F2937',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <Navbar />
      <main className="min-h-screen pt-16">
        {children}
      </main>
    </>
  )
} 