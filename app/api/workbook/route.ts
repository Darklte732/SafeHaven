import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, phone, zipCode, familySize } = data;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Save lead data to database
    const { error: dbError } = await supabase
      .from('leads')
      .insert([
        {
          name,
          email,
          phone: phone || null,
          zip_code: zipCode || null,
          family_size: familySize || null,
          lead_type: 'workbook',
          status: 'new',
          created_at: new Date().toISOString(),
        },
      ]);

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Failed to save lead information' },
        { status: 500 }
      );
    }

    // Get a signed URL for the workbook
    const { data: signedUrl, error: storageError } = await supabase
      .storage
      .from('workbooks')
      .createSignedUrl('beneficiary-planning-workbook.pdf', 60);

    if (storageError || !signedUrl) {
      console.error('Storage error:', storageError);
      return NextResponse.json(
        { error: 'Failed to generate download link' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      url: signedUrl,
      fileName: 'SafeHaven-Beneficiary-Planning-Workbook.pdf',
    });

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 