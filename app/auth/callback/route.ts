import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    try {
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      if (error) {
        console.error('Auth callback error:', error)
        return NextResponse.redirect(
          `${process.env.NEXT_PUBLIC_SITE_URL}/login?error=Authentication failed`
        )
      }
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`)
    } catch (error) {
      console.error('Server error:', error)
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_SITE_URL}/login?error=Server error`
      )
    }
  }

  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/login?error=No code provided`)
} 