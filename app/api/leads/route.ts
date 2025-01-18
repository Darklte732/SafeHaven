import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Define expected data structure
interface LeadData {
  name: string;
  email: string;
  phone?: string | null;
  zip?: string | null;
  type: 'guide' | 'workbook' | 'quote';
  status: string;
  family_members?: string | null;
  message?: string | null;
  coverage_amount?: string | null;
  created_at?: string;
  updated_at?: string;
}

// Initialize Supabase client with retry mechanism
async function initSupabaseClient(retries = 3) {
  console.log('Initializing Supabase client...');
  console.log('Environment variables check:');
  console.log('NEXT_PUBLIC_SUPABASE_URL exists:', !!process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log('SUPABASE_SERVICE_ROLE_KEY exists:', !!process.env.SUPABASE_SERVICE_ROLE_KEY);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing environment variables:');
    console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? 'present' : 'missing');
    console.error('SUPABASE_SERVICE_ROLE_KEY:', supabaseKey ? 'present' : 'missing');
    throw new Error('Missing Supabase environment variables');
  }

  try {
    console.log('Creating Supabase client with URL:', supabaseUrl);
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // Test connection with retries
    for (let i = 0; i < retries; i++) {
      try {
        console.log(`Attempt ${i + 1} to connect to database...`);
        const { data, error } = await supabase
          .from('leads')
          .select('id')
          .limit(1);

        if (error) {
          console.error('Connection test error:', {
            code: error.code,
            message: error.message,
            details: error.details
          });
          throw error;
        }
        
        console.log('Supabase connection successful');
        return supabase;
      } catch (error: any) {
        console.error(`Connection attempt ${i + 1} failed:`, {
          message: error.message,
          code: error.code,
          details: error?.details
        });
        
        if (i === retries - 1) throw error;
        console.log(`Waiting ${Math.pow(2, i)} seconds before retry...`);
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
      }
    }

    throw new Error('Failed to establish database connection after retries');
  } catch (error: any) {
    console.error('Failed to initialize Supabase client:', {
      message: error.message,
      code: error.code,
      details: error?.details
    });
    throw error;
  }
}

export async function POST(request: Request) {
  let supabase;
  
  try {
    console.log('Starting POST request handler...');
    supabase = await initSupabaseClient();

    const rawData = await request.json();
    console.log('Raw lead data received:', rawData);

    // Validate required fields
    if (!rawData.name?.trim() || !rawData.email?.trim()) {
      console.log('Validation failed: Missing required fields');
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Format data
    const leadData = {
      name: rawData.name.trim(),
      email: rawData.email.toLowerCase().trim(),
      phone: rawData.phone?.trim() || null,
      zip_code: rawData.zip?.trim() || null,  // Changed to match database column name
      type: rawData.type || 'guide',
      status: 'new',
      family_members: rawData.family_members?.toString() || null,
      message: rawData.message?.trim() || null,
      coverage_amount: rawData.coverage_amount?.toString() || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    console.log('Formatted lead data:', leadData);

    // Insert into leads table
    console.log('Attempting to insert lead data...');
    const { data: insertedLead, error: insertError } = await supabase
      .from('leads')
      .insert([leadData])
      .select()
      .single();

    if (insertError) {
      console.error('Insert error:', {
        code: insertError.code,
        message: insertError.message,
        details: insertError.details
      });

      if (insertError.code === '23505') {
        return NextResponse.json(
          { error: 'This email has already been registered' },
          { status: 409 }
        );
      }

      if (insertError.code === '42P01') {
        return NextResponse.json(
          { error: 'Database table not found. Please contact support.' },
          { status: 500 }
        );
      }

      if (insertError.code === '42703') {
        return NextResponse.json(
          { error: 'Invalid column name. Please contact support.' },
          { status: 500 }
        );
      }

      throw insertError;
    }

    console.log('Lead successfully inserted:', insertedLead);
    return NextResponse.json({
      success: true,
      message: 'Lead information saved successfully',
      data: insertedLead
    });

  } catch (error: any) {
    console.error('Server error:', {
      message: error.message,
      code: error.code,
      details: error?.details,
      stack: error.stack
    });

    // Specific error handling
    if (error.message?.includes('connection')) {
      return NextResponse.json(
        { error: 'Unable to connect to database. Please try again.' },
        { status: 503 }
      );
    }

    if (error.code === '42P01') {
      return NextResponse.json(
        { error: 'Database table not found. Please contact support.' },
        { status: 500 }
      );
    }

    if (error.code === '42703') {
      return NextResponse.json(
        { error: 'Invalid column name. Please contact support.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to save lead information. Please try again.' },
      { status: 500 }
    );
  }
} 