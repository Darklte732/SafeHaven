import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

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
    console.error('Admin API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    // Verify admin session
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify admin role
    const { data: agentData, error: agentError } = await supabase
      .from('agents')
      .select('role')
      .eq('user_id', session.user.id)
      .single()

    if (agentError || agentData?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { action, data } = body

    switch (action) {
      case 'create_agent':
        const { data: newAgent, error: createError } = await supabase
          .from('agents')
          .insert([data])
          .select()
          .single()

        if (createError) throw createError
        return NextResponse.json(newAgent)

      case 'update_agent':
        const { data: updatedAgent, error: updateError } = await supabase
          .from('agents')
          .update(data)
          .eq('id', data.id)
          .select()
          .single()

        if (updateError) throw updateError
        return NextResponse.json(updatedAgent)

      case 'delete_agent':
        const { error: deleteError } = await supabase
          .from('agents')
          .delete()
          .eq('id', data.id)

        if (deleteError) throw deleteError
        return NextResponse.json({ success: true })

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Admin API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 