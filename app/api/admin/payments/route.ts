import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const dummyPayments = [
      {
        id: 'PAY-001',
        policyId: 'POL-001',
        customer: 'John Doe',
        amount: 1200,
        status: 'completed',
        date: '2023-01-15',
        method: 'credit_card'
      },
      {
        id: 'PAY-002',
        policyId: 'POL-002',
        customer: 'Jane Smith',
        amount: 2400,
        status: 'completed',
        date: '2023-02-20',
        method: 'bank_transfer'
      },
      {
        id: 'PAY-003',
        policyId: 'POL-003',
        customer: 'Bob Wilson',
        amount: 1800,
        status: 'pending',
        date: '2023-03-10',
        method: 'credit_card'
      }
    ]

    return NextResponse.json(dummyPayments)
  } catch (error) {
    console.error('Error in payments route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 