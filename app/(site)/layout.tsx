'use client'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="pt-16">
      {children}
    </div>
  )
} 