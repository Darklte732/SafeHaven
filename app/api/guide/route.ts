import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Make sure the bucket is public and the file has public access
const GUIDE_URL = `${supabaseUrl}/storage/v1/object/public/guides/final-expense-guide.pdf`;

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, phone, zipCode } = data;

    // Store lead data in database
    const { error: dbError } = await supabase
      .from('leads')
      .insert([{ name, email, phone, zip_code: zipCode }]);

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json({ error: 'Failed to save lead information' }, { status: 500 });
    }

    // Return the direct public URL
    return NextResponse.json({
      success: true,
      downloadUrl: GUIDE_URL
    });

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 