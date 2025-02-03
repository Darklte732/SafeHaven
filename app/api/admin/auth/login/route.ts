import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Authenticate with Supabase
    const { data: { user }, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (authError) throw authError

    // Check if user is an admin
    const { data: adminData, error: adminError } = await supabase
      .from('admins')
      .select('*')
      .eq('user_id', user?.id)
      .single()

    if (adminError || !adminData) {
      return NextResponse.json(
        { error: 'Unauthorized access' },
        { status: 403 }
      )
    }

    // Set admin access cookie
    cookies().set('adminAccess', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 // 24 hours
    })

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: adminData.name,
        role: adminData.role
      }
    })
  } catch (error) {
    console.error('Admin Login Error:', error)
    return NextResponse.json(
      { error: 'Failed to authenticate' },
      { status: 500 }
    )
  }
} 