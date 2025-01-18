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

    // Get the file data directly
    const { data: fileData, error: downloadError } = await supabase
      .storage
      .from('guides')
      .download('final-expense-guide.pdf');

    if (downloadError || !fileData) {
      console.error('Download error:', downloadError);
      return NextResponse.json({ error: 'Failed to retrieve guide' }, { status: 500 });
    }

    // Convert the file data to a Buffer if it's not already
    const buffer = Buffer.from(await fileData.arrayBuffer());

    // Create response with the PDF file
    const response = new NextResponse(buffer);
    
    // Set appropriate headers for PDF download
    response.headers.set('Content-Type', 'application/pdf');
    response.headers.set('Content-Disposition', 'attachment; filename="SafeHaven-Final-Expense-Guide.pdf"');
    response.headers.set('Content-Length', buffer.length.toString());
    
    return response;

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 