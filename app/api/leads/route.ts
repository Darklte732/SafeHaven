import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Debug logging for environment variables
console.log('Environment variables check:');
console.log('NEXT_PUBLIC_SUPABASE_URL exists:', !!process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('SUPABASE_SERVICE_ROLE_KEY exists:', !!process.env.SUPABASE_SERVICE_ROLE_KEY);

// Validate environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing environment variables:');
  console.error('- NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? 'present' : 'missing');
  console.error('- SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? 'present' : 'missing');
  throw new Error('Missing required environment variables');
}

// Initialize Supabase client with service role key for admin access
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Test database connection
async function testConnection() {
  try {
    const { data, error } = await supabase.from('quotes').select('count(*)').limit(1);
    if (error) {
      console.error('Connection test error:', error);
      throw error;
    }
    console.log('Connection test successful');
    return true;
  } catch (error) {
    console.error('Database connection test failed:', error);
    return false;
  }
}

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

export async function POST(request: Request) {
  try {
    // Test connection before proceeding
    const isConnected = await testConnection();
    if (!isConnected) {
      return NextResponse.json(
        { error: 'Unable to connect to database. Please try again.' },
        { status: 503 }
      );
    }

    // Log request start
    console.log('Processing lead submission...');

    const rawData = await request.json();
    console.log('Raw lead data received:', rawData);

    // Validate required fields
    if (!rawData.name?.trim()) {
      console.log('Validation failed: Missing name');
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }
    if (!rawData.email?.trim()) {
      console.log('Validation failed: Missing email');
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Format and validate data
    const leadData: LeadData = {
      name: rawData.name.trim(),
      email: rawData.email.toLowerCase().trim(),
      phone: rawData.phone?.trim() || null,
      zip: rawData.zip?.trim() || null,
      type: rawData.type || 'guide',
      status: rawData.status || 'new',
      family_members: rawData.family_members?.toString() || null,
      message: rawData.message?.trim() || null,
      coverage_amount: rawData.coverage_amount?.toString() || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    console.log('Formatted lead data:', leadData);

    // Insert into quotes table
    const { data: insertedLead, error: insertError } = await supabase
      .from('quotes')
      .insert([leadData])
      .select('*')
      .single();

    if (insertError) {
      console.error('Database insert error:', {
        code: insertError.code,
        message: insertError.message,
        details: insertError.details,
        hint: insertError.hint
      });
      
      // Handle specific error cases
      if (insertError.code === '23505') {
        return NextResponse.json(
          { error: 'This email has already been registered' },
          { status: 409 }
        );
      }

      if (insertError.code === '42703') {
        return NextResponse.json(
          { error: 'Database schema mismatch. Please contact support.' },
          { status: 500 }
        );
      }

      throw insertError;
    }

    console.log('Successfully saved lead:', insertedLead);

    return NextResponse.json({
      success: true,
      message: 'Lead information saved successfully',
      data: insertedLead
    });

  } catch (error: any) {
    console.error('Server error:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });

    // Provide more specific error messages based on error type
    if (error.message?.includes('connection')) {
      return NextResponse.json(
        { error: 'Database connection failed. Please try again.' },
        { status: 503 }
      );
    }

    if (error.message?.includes('schema')) {
      return NextResponse.json(
        { error: 'Database configuration error. Please contact support.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to save lead information. Please try again.' },
      { status: 500 }
    );
  }
} 