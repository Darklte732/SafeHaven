import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    // 1. Get form data
    const data = await request.json();
    const { name, email, phone, zipCode } = data;

    // 2. Save lead data
    const { error: dbError } = await supabase
      .from('leads')
      .insert([{ 
        name, 
        email, 
        phone, 
        zip_code: zipCode,
        created_at: new Date().toISOString(),
        status: 'active'
      }]);

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json({ error: 'Failed to save lead information' }, { status: 500 });
    }

    // 3. Get a fresh download URL
    const { data: fileData, error: downloadError } = await supabase
      .storage
      .from('guides')
      .createSignedUrl('final-expense-guide.pdf', 60, {
        download: true
      });

    if (downloadError || !fileData) {
      console.error('Download error:', downloadError);
      return NextResponse.json({ error: 'Failed to generate download link' }, { status: 500 });
    }

    // 4. Return the download URL
    return NextResponse.json({
      success: true,
      downloadUrl: fileData.signedUrl
    });

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 