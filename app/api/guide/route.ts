import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex
const phoneRegex = /^\+?1?\s*\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/;

const BUCKET_NAME = 'guides';
const FILE_PATH = 'final-expense-guide.pdf';

export async function POST(req: Request) {
  try {
    console.log('Starting guide download process...');
    const { name, email, phone, zipCode } = await req.json();
    console.log('Received form data:', { name, email, phone, zipCode });

    // Validate required fields
    if (!name || !email) {
      console.log('Validation failed: Missing required fields');
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!emailRegex.test(email)) {
      console.log('Validation failed: Invalid email format');
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate phone format if provided
    if (phone && !phoneRegex.test(phone)) {
      console.log('Validation failed: Invalid phone format');
      return NextResponse.json(
        { error: 'Invalid phone format' },
        { status: 400 }
      );
    }

    // Store lead information
    console.log('Storing lead information...');
    const timestamp = new Date().toISOString();
    const leadData = {
      email,
      name,
      phone,
      zip_code: zipCode,
      guide_requested: true,
      guide_sent_at: timestamp,
      status: 'active',
      source: 'website',
      created_at: timestamp,
      updated_at: timestamp,
    };

    const { error: upsertError } = await supabase
      .from('leads')
      .upsert(leadData, {
        onConflict: 'email',
        ignoreDuplicates: false
      });

    if (upsertError) {
      console.error('Failed to store lead:', upsertError);
      throw new Error('Failed to store lead information');
    }

    // Get a public URL for the file
    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(FILE_PATH);

    // Return the public URL
    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: 'SafeHaven-Final-Expense-Guide.pdf'
    });

  } catch (error: any) {
    console.error('Error processing guide request:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process guide request' },
      { status: 500 }
    );
  }
} 