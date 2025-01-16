import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/ui/navigation'
import ClientLayout from '@/components/ClientLayout'

const inter = Inter({ subsets: ['latin'] })

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
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
