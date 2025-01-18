import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(request: Request) {
  console.log('Starting POST request handler');
  
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    console.log('Supabase client initialized');

    const data = await request.json();
    console.log('Received data:', data);

    // Validate required fields
    if (!data.name || !data.email) {
      console.error('Missing required fields');
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Format data for customers table
    const customerData = {
      first_name: data.name.split(' ')[0],
      last_name: data.name.split(' ').slice(1).join(' '),
      email: data.email,
      phone: data.phone || null,
      zip: data.zip || null,
      created_at: new Date().toISOString(),
      status: 'new',
      type: data.type || 'guide',
      message: data.message || null,
      coverage_amount: data.coverage_amount || null,
      family_members: data.family_members || null
    };

    console.log('Formatted customer data:', customerData);

    // Insert into customers table
    const { error: insertError } = await supabase
      .from('customers')
      .insert(customerData);

    if (insertError) {
      console.error('Error inserting data:', insertError);
      return NextResponse.json(
        { error: 'Failed to save lead information' },
        { status: 500 }
      );
    }

    console.log('Successfully saved lead data');
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 