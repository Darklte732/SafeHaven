import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/ui/navigation'
import dynamic from 'next/dynamic'

const inter = Inter({ subsets: ['latin'] })

// Dynamically import the client component with no SSR
const VoiceChatWidget = dynamic(() => import('@/components/VoiceChatWidget'), { ssr: false })

export const metadata: Metadata = {
  title: 'SafeHaven Insurance - Affordable Final Expense Coverage',
  description: 'Protect your family\'s future with affordable final expense insurance. Get coverage from $20/month with no medical exam required.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        {children}
        <VoiceChatWidget />
      </body>
    </html>
  )
}
