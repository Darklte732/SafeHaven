import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  // Allow access to login page
  if (req.nextUrl.pathname === '/admin/login') {
    return NextResponse.next()
  }

  // Check for admin access cookie
  const adminAccess = req.cookies.get('adminAccess')

  // If no admin access and trying to access admin routes, redirect to admin login
  if (!adminAccess && req.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
} 