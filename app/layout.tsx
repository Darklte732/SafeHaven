import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/footer'
import { ScrollProgress } from '@/components/ScrollProgress'
import { ExitIntentPopup } from '@/components/ExitIntentPopup'
import './globals.css'
import Providers from '@/components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SafeHaven Insurance - Affordable Final Expense Coverage',
  description: 'Get peace of mind with SafeHaven Insurance. Affordable final expense coverage starting at $20/month. No medical exam required.',
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
    <html lang="en" className="h-full scroll-smooth" suppressHydrationWarning>
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
        {/* Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
            `,
          }}
        />
      </head>
      <body className={`${inter.className} h-full`} suppressHydrationWarning>
        <ScrollProgress />
        <Header />
        <main className="min-h-screen">
          <Providers>{children}</Providers>
        </main>
        <Footer />
        <ExitIntentPopup />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
