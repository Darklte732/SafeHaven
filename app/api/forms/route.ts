import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { supabase } from '@/lib/supabase'
import type { Database } from '@/types/supabase'

type Form = Database['public']['Tables']['forms']['Row']

export const runtime = 'edge'
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabase
      .from('forms')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Database error occurred' },
        { status: 500 }
      )
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Error fetching forms:', error)
    return NextResponse.json(
      { error: 'Failed to fetch forms' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const form = await request.json()
    
    // Validate required fields
    const requiredFields = ['first_name', 'last_name', 'phone', 'email']
    for (const field of requiredFields) {
      if (!form[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    const { data, error } = await supabase
      .from('forms')
      .insert([form])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Database error occurred' },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error creating form:', error)
    return NextResponse.json(
      { error: 'Failed to create form' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const form = await request.json()
    
    if (!form.id) {
      return NextResponse.json(
        { error: 'Form ID is required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('forms')
      .update(form)
      .eq('id', form.id)
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Database error occurred' },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error updating form:', error)
    return NextResponse.json(
      { error: 'Failed to update form' },
      { status: 500 }
    )
  }
} 