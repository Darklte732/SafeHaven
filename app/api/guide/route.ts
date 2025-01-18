import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

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

    // Generate a signed URL that's valid for 5 minutes
    const { data: signedUrlData, error: signedUrlError } = await supabase
      .storage
      .from('guides')
      .createSignedUrl('final-expense-guide.pdf', 300, {
        download: true,
        transform: {
          quality: 100
        }
      });

    if (signedUrlError || !signedUrlData) {
      console.error('Signed URL error:', signedUrlError);
      return NextResponse.json({ error: 'Failed to generate download link' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      downloadUrl: signedUrlData.signedUrl
    });

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 