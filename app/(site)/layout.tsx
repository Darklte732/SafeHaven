import { ReactNode } from 'react'

export const dynamic = 'force-static'
export const revalidate = 3600 // revalidate every hour

export default function SiteLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
} 