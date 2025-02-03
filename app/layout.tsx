import { Inter } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/footer'
import { ScrollProgress } from '@/components/ScrollProgress'
import { ExitIntentPopup } from '@/components/ExitIntentPopup'
import './globals.css'
import Providers from '@/components/Providers'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} h-full`} suppressHydrationWarning>
        <ScrollProgress />
        <Header />
        <main className="min-h-screen">
          <Providers>{children}</Providers>
        </main>
        <Footer />
        <ExitIntentPopup />
      </body>
    </html>
  )
}
