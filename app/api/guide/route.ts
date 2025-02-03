import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const { name, email, phone, zipCode } = formData;

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
          lead_type: 'guide',
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

    // Get a public URL for the guide
    const { data: urlData } = supabase
      .storage
      .from('guides')
      .getPublicUrl('final-expense-guide.pdf');

    if (!urlData.publicUrl) {
      console.error('Failed to get public URL');
      return NextResponse.json(
        { error: 'Failed to generate download link' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      url: urlData.publicUrl,
      fileName: 'SafeHaven-Final-Expense-Guide.pdf',
    });

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 