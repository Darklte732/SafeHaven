'use client'

import { useSearchParams } from 'next/navigation'
import LoginForm from '@/components/auth/LoginForm'
import ClientOnly from '@/components/ClientOnly'

function LoginContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        {error && (
          <div className="rounded-md bg-red-50 p-4 mb-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}
        <LoginForm />
      </div>
    </div>
  )
}

const LoadingLogin = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
      </div>
      <div className="space-y-4 animate-pulse">
        <div className="h-12 bg-gray-200 rounded"></div>
        <div className="h-12 bg-gray-200 rounded"></div>
        <div className="h-12 bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
)

export default function LoginPage() {
  return (
    <ClientOnly fallback={<LoadingLogin />}>
      <LoginContent />
    </ClientOnly>
  )
} 