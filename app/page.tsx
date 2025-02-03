import { Suspense } from 'react'
import dynamic from 'next/dynamic'

const HomePageWrapper = dynamic(() => import('@/components/wrappers/HomePageWrapper'), {
  ssr: true,
  loading: () => (
    <div className="flex flex-col min-h-screen animate-pulse">
      <div className="h-screen bg-gray-100" />
      <div className="h-96 bg-gray-50" />
      <div className="h-96 bg-gray-100" />
      <div className="h-64 bg-gray-50" />
    </div>
  ),
})

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Suspense fallback={
        <div className="flex flex-col min-h-screen animate-pulse">
          <div className="h-screen bg-gray-100" />
          <div className="h-96 bg-gray-50" />
          <div className="h-96 bg-gray-100" />
          <div className="h-64 bg-gray-50" />
        </div>
      }>
        <HomePageWrapper />
      </Suspense>
    </main>
  )
}