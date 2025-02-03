import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

const mockData = {
  summary: {
    activeAgents: 12,
    successRate: 68.5,
    activeDeals: 24,
    recentActivities: 8
  },
  agentPerformance: [
    { name: 'John Smith', revenue: 125000 },
    { name: 'Sarah Johnson', revenue: 98000 },
    { name: 'Michael Brown', revenue: 87500 },
    { name: 'Emily Davis', revenue: 76000 },
    { name: 'David Wilson', revenue: 65000 }
  ],
  salesStages: [
    { name: 'Initial Contact', count: 45 },
    { name: 'Needs Assessment', count: 32 },
    { name: 'Proposal', count: 28 },
    { name: 'Negotiation', count: 15 },
    { name: 'Closed', count: 20 }
  ],
  recentActivities: [
    {
      id: 1,
      description: 'New policy created for client',
      agent: 'John Smith',
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString() // 30 minutes ago
    },
    {
      id: 2,
      description: 'Client meeting scheduled',
      agent: 'Sarah Johnson',
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString() // 1 hour ago
    },
    {
      id: 3,
      description: 'Quote approved',
      agent: 'Michael Brown',
      timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString() // 2 hours ago
    }
  ]
}

export async function GET(request: NextRequest) {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return NextResponse.json(mockData)
  } catch (error) {
    console.error('Error fetching KPI data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch KPI data' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient()
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