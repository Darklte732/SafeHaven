import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex
const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;

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

    // Check for existing lead
    console.log('Checking for existing lead...');
    const { data: existingLead, error: leadError } = await supabase
      .from('leads')
      .select('guide_sent_at')
      .eq('email', email)
      .single();

    if (leadError && leadError.code !== 'PGRST116') {
      console.error('Database error:', leadError);
      throw new Error(`Database error: ${leadError.message}`);
    }

    // If guide was downloaded in the last 24 hours, prevent redownload
    if (existingLead?.guide_sent_at) {
      const lastSent = new Date(existingLead.guide_sent_at);
      const hoursSinceLastSent = (Date.now() - lastSent.getTime()) / (1000 * 60 * 60);
      
      if (hoursSinceLastSent < 24) {
        console.log('Guide was recently downloaded');
        return NextResponse.json(
          { error: 'Guide was already downloaded. Please wait 24 hours before requesting again.' },
          { status: 400 }
        );
      }
    }

    // Check if bucket exists, create if not
    console.log('Checking storage bucket...');
    const { data: buckets } = await supabase.storage.listBuckets();
    const guidesBucket = buckets?.find(b => b.name === BUCKET_NAME);
    
    if (!guidesBucket) {
      console.log('Creating storage bucket...');
      const { error: createError } = await supabase.storage.createBucket(BUCKET_NAME, {
        public: false
      });
      
      if (createError) {
        console.error('Bucket creation error:', createError);
        throw new Error('Failed to create storage bucket');
      }
    }

    // Get the guide file from storage
    console.log('Fetching guide from storage...');
    const { data: fileData, error: fileError } = await supabase.storage
      .from(BUCKET_NAME)
      .download(FILE_PATH);

    if (fileError) {
      console.error('File fetch error:', fileError);
      throw new Error('Failed to fetch guide file');
    }

    if (!fileData) {
      throw new Error('Guide file not found');
    }

    // Store or update lead information
    console.log('Updating lead information...');
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

    if (existingLead) {
      const { error: updateError } = await supabase
        .from('leads')
        .update(leadData)
        .eq('email', email);

      if (updateError) {
        console.error('Failed to update lead:', updateError);
        throw new Error(`Failed to update lead: ${updateError.message}`);
      }
    } else {
      const { error: insertError } = await supabase
        .from('leads')
        .insert([leadData]);

      if (insertError) {
        console.error('Failed to insert lead:', insertError);
        throw new Error(`Failed to insert lead: ${insertError.message}`);
      }
    }

    console.log('Lead information updated successfully');

    // Return the PDF file
    console.log('Sending PDF response...');
    return new NextResponse(fileData, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Final-Expense-Insurance-Guide.pdf"',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      },
    });
  } catch (error: any) {
    console.error('Error processing guide request:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process guide request' },
      { status: 500 }
    );
  }
} 