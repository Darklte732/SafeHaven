import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const PDF_URL = 'https://powrsyajxwotomihmvum.supabase.co/storage/v1/object/public/guides/final-expense-guide.pdf';
const BUCKET_NAME = 'guides';
const FILE_NAME = 'final-expense-guide.pdf';

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

    // Get both public URL and signed URL as fallbacks
    const { data: signedUrlData } = await supabase
      .storage
      .from(BUCKET_NAME)
      .createSignedUrl(FILE_NAME, 300);

    const { data: publicUrlData } = supabase
      .storage
      .from(BUCKET_NAME)
      .getPublicUrl(FILE_NAME);

    // Return all available URLs for the client to try
    return NextResponse.json({
      success: true,
      urls: {
        direct: PDF_URL,
        signed: signedUrlData?.signedUrl,
        public: publicUrlData?.publicUrl
      }
    });

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 