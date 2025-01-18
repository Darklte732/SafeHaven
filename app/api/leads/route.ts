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

    // Format data to match the quotes table structure
    const leadData = {
      name: data.name.trim(),
      email: data.email.toLowerCase().trim(),
      phone: data.phone?.trim() || null,
      zip: data.zipCode?.trim() || null,
      type: data.lead_type || 'guide', // 'guide', 'workbook', or 'quote'
      status: data.status || 'new',
      family_members: data.familyMembers || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    console.log('Formatted lead data:', leadData);

    // Insert into the quotes table (which stores all leads)
    const { data: insertedLead, error: insertError } = await supabase
      .from('quotes')  // Using the quotes table for all leads
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