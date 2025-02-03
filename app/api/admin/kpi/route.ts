import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import type { KPIDashboard, TopPerformer } from '@/types/kpi'
import { supabase } from '@/lib/supabase'
import { createServerClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = createServerClient()
    
    // Fetch KPI data
    const { data: kpiData, error } = await supabase
      .from('admin_kpi')
      .select('*')
      .single()

    if (error) throw error

    return NextResponse.json(kpiData)
  } catch (error) {
    console.error('Error fetching KPI data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch KPI data' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const data = await request.json()

    // Get current user session
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Validate user is admin
    const { data: userRole } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    if (userRole?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 403 }
      )
    }

    // Update KPI metric
    const { error: updateError } = await supabase
      .from('kpi_metrics')
      .upsert(data)

    if (updateError) throw updateError

    // Record metric history
    await supabase
      .from('kpi_history')
      .insert({
        metric_id: data.id,
        value: data.value,
      })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Error updating KPI data:', error)
    return NextResponse.json(
      { error: 'Failed to update KPI data' },
      { status: 500 }
    )
  }
} 