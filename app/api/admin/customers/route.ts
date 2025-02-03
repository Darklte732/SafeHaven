import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data: customers, error } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(customers || [])
  } catch (error) {
    console.error('Customers API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch customers' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { data, error } = await supabase
      .from('customers')
      .insert([body])
      .select()

    if (error) throw error

    return NextResponse.json(data?.[0] || null)
  } catch (error) {
    console.error('Create Customer Error:', error)
    return NextResponse.json(
      { error: 'Failed to create customer' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, ...updates } = body

    const { data, error } = await supabase
      .from('customers')
      .update(updates)
      .eq('id', id)
      .select()

    if (error) throw error

    return NextResponse.json(data?.[0] || null)
  } catch (error) {
    console.error('Update Customer Error:', error)
    return NextResponse.json(
      { error: 'Failed to update customer' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Customer ID is required' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('customers')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete Customer Error:', error)
    return NextResponse.json(
      { error: 'Failed to delete customer' },
      { status: 500 }
    )
  }
} 