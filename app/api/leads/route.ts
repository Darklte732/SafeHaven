import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Initialize Supabase client with proper configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing required environment variables for Supabase connection');
}

// Create Supabase client with additional options
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  },
  db: {
    schema: 'public'
  }
});

export async function POST(request: Request) {
  console.log('Starting POST request handler');
  
  try {
    // Test database connection first
    const { data: testData, error: testError } = await supabase
      .from('customers')
      .select('id')
      .limit(1);

    if (testError) {
      console.error('Database connection test failed:', testError);
      throw new Error('Unable to connect to database');
    }

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
      last_name: data.name.split(' ').slice(1).join(' ') || null, // Handle single name
      email: data.email.toLowerCase().trim(),
      phone: data.phone || null,
      zip: data.zip || null,
      created_at: new Date().toISOString(),
      status: 'new',
      type: data.type || 'guide'
    };

    console.log('Formatted customer data:', customerData);

    // Insert into customers table
    const { data: insertedData, error: insertError } = await supabase
      .from('customers')
      .insert([customerData])
      .select()
      .single();

    if (insertError) {
      console.error('Error inserting data:', insertError);
      
      if (insertError.code === '23505') {
        return NextResponse.json(
          { error: 'This email has already been registered' },
          { status: 409 }
        );
      }

      throw new Error('Failed to save lead information');
    }

    console.log('Successfully saved lead data:', insertedData);
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 