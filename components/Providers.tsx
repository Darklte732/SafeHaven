'use client'

import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from '@/context/ThemeContext'

export default function Providers({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider>
      {children}
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
    </ThemeProvider>
  )
} 