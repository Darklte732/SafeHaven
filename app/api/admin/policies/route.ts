import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const dummyPolicies = [
      {
        id: 'POL-001',
        type: 'Auto Insurance',
        customer: 'John Doe',
        status: 'active',
        premium: 1200,
        startDate: '2023-01-15',
        endDate: '2024-01-14',
        coverage: 50000
      },
      {
        id: 'POL-002',
        type: 'Home Insurance',
        customer: 'Jane Smith',
        status: 'active',
        premium: 2400,
        startDate: '2023-02-20',
        endDate: '2024-02-19',
        coverage: 250000
      },
      {
        id: 'POL-003',
        type: 'Life Insurance',
        customer: 'Bob Wilson',
        status: 'pending',
        premium: 1800,
        startDate: '2023-03-10',
        endDate: '2024-03-09',
        coverage: 100000
      }
    ]

    return NextResponse.json(dummyPolicies)
  } catch (error) {
    console.error('Error in policies route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 