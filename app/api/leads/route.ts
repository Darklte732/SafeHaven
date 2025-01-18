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
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  // Test connection with retries
  for (let i = 0; i < retries; i++) {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('count(*)')
        .limit(1);

      if (error) {
        console.error('Connection test error:', error);
        throw error;
      }
      
      console.log('Supabase connection successful');
      return supabase;
    } catch (error) {
      console.error(`Connection attempt ${i + 1} failed:`, error);
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }

  throw new Error('Failed to establish database connection after retries');
}

export async function POST(request: Request) {
  let supabase;
  
  try {
    supabase = await initSupabaseClient();

    const rawData = await request.json();
    console.log('Raw lead data received:', rawData);

    // Validate required fields
    if (!rawData.name?.trim() || !rawData.email?.trim()) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Format data
    const leadData: LeadData = {
      name: rawData.name.trim(),
      email: rawData.email.toLowerCase().trim(),
      phone: rawData.phone?.trim() || null,
      zip: rawData.zip?.trim() || null,
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
    const { data: insertedLead, error: insertError } = await supabase
      .from('leads')
      .insert([leadData])
      .select()
      .single();

    if (insertError) {
      console.error('Insert error:', insertError);
      if (insertError.code === '23505') {
        return NextResponse.json(
          { error: 'This email has already been registered' },
          { status: 409 }
        );
      }
      throw insertError;
    }

    return NextResponse.json({
      success: true,
      message: 'Lead information saved successfully',
      data: insertedLead
    });

  } catch (error: any) {
    console.error('Server error:', error);

    // Specific error handling
    if (error.message?.includes('connection')) {
      return NextResponse.json(
        { error: 'Unable to connect to database. Please try again.' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to save lead information. Please try again.' },
      { status: 500 }
    );
  }
} 