import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface LeadData {
  name: string;
  email: string;
  phone?: string | null;
  zipCode?: string | null;
  lead_type: 'guide' | 'workbook';
  status: 'started' | 'completed';
  familyMembers?: string | null;
}

export async function POST(request: Request) {
  try {
    const data: LeadData = await request.json();

    // Validate required fields
    if (!data.name || !data.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Format data to match Supabase schema
    const leadData = {
      full_name: data.name,
      email: data.email,
      phone_number: data.phone || null,
      zip_code: data.zipCode || null,
      lead_type: data.lead_type,
      status: data.status,
      family_size: data.familyMembers || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Save lead data to database
    const { error: dbError } = await supabase
      .from('leads')
      .insert([leadData]);

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Failed to save lead information' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Lead information saved successfully',
    });

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 