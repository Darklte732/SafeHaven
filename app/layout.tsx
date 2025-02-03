import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Providers from '@/components/Providers'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SafeHaven Insurance',
  description: 'Get peace of mind with our comprehensive final expense insurance coverage.',
  metadataBase: new URL('https://safehaven-insurance.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'SafeHaven Insurance - Affordable Final Expense Coverage',
    description: 'Get peace of mind with SafeHaven Insurance. Affordable final expense coverage starting at $20/month. No medical exam required.',
    url: 'https://safehaven-insurance.com',
    siteName: 'SafeHaven Insurance',
    images: [
      {
        url: 'https://safehaven-insurance.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SafeHaven Insurance',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SafeHaven Insurance - Affordable Final Expense Coverage',
    description: 'Get peace of mind with SafeHaven Insurance. Affordable final expense coverage starting at $20/month. No medical exam required.',
    images: ['https://safehaven-insurance.com/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
