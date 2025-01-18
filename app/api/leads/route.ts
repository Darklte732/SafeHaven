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
  }
});

export async function POST(request: Request) {
  console.log('Starting POST request handler');
  
  try {
    // Test database connection first
    const { data: testData, error: testError } = await supabase
      .from('leads')
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

    // Format data for leads table
    const leadData = {
      name: data.name.trim(),
      email: data.email.toLowerCase().trim(),
      phone: data.phone || null,
      zip_code: data.zip || null,
      guide_requested: data.type === 'guide',
      status: 'new',
      source: 'website',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    console.log('Formatted lead data:', leadData);

    // Insert into leads table
    const { data: insertedData, error: insertError } = await supabase
      .from('leads')
      .insert([leadData])
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