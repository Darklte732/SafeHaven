import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script'
import { Navigation } from '@/components/ui/navigation'

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
        {children}
        <Script
          id="elevenlabs-widget"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              const script = document.createElement('script');
              script.src = 'https://elevenlabs.io/convai-widget/index.js';
              script.async = true;
              document.body.appendChild(script);
              
              const widget = document.createElement('elevenlabs-convai');
              widget.setAttribute('agent-id', 'KHOc8L54G71Pihv00Dca');
              widget.setAttribute('rating', '97');
              widget.setAttribute('form-validation', 'true');
              widget.setAttribute('interactive-elements', 'true');
              widget.setAttribute('performance-mode', 'high');
              document.body.appendChild(widget);
            `
          }}
        />
      </body>
    </html>
  )
}
