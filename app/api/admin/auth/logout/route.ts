import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { cookies } from 'next/headers'

export async function POST() {
  try {
    // Sign out from Supabase
    const { error } = await supabase.auth.signOut()
    if (error) throw error

    // Remove admin access cookie
    cookies().delete('adminAccess')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Admin Logout Error:', error)
    return NextResponse.json(
      { error: 'Failed to logout' },
      { status: 500 }
    )
  }
} 