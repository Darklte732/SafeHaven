import dynamic from 'next/dynamic'

const Navbar = dynamic(() => import('@/components/Navbar'), {
  ssr: false
})

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <div className="pt-16">
        {children}
      </div>
    </div>
  )
} 