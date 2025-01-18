import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

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

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('Received lead data:', data);

    // Validate required fields
    if (!data.name || !data.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Format data for database
    const leadData = {
      full_name: data.name.trim(),
      email: data.email.toLowerCase().trim(),
      phone_number: data.phone?.trim() || null,
      zip_code: data.zipCode?.trim() || null,
      lead_type: data.lead_type,
      status: data.status,
      family_size: data.familyMembers || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    console.log('Formatted lead data:', leadData);

    // Insert into leads table
    const { data: insertedLead, error: insertError } = await supabase
      .from('leads')
      .insert([leadData])
      .select('*')
      .single();

    if (insertError) {
      console.error('Database insert error:', insertError);
      
      // Check for duplicate email
      if (insertError.code === '23505') {
        return NextResponse.json(
          { error: 'This email has already been registered' },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { error: 'Failed to save lead information' },
        { status: 500 }
      );
    }

    console.log('Successfully saved lead:', insertedLead);

    return NextResponse.json({
      success: true,
      message: 'Lead information saved successfully',
      data: insertedLead
    });

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 