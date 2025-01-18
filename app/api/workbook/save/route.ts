import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Google Drive configuration
const DRIVE_FOLDER_ID = '1PKbG_YgKL8l9NJlmo1JQVAhKs0toA5yy';
const DEFAULT_WORKBOOK_ID = '1Q3guYxl28UzAkI1nkFEIbyq9h1mAf5TZ';

// Google Drive API setup
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/drive.file'],
});

const drive = google.drive({ version: 'v3', auth });

export async function POST(request: Request) {
  try {
    const workbookData = await request.json();
    
    // First, copy the default workbook template
    const copyResponse = await drive.files.copy({
      fileId: DEFAULT_WORKBOOK_ID,
      requestBody: {
        name: `Beneficiary_Workbook_${workbookData.personalInfo.fullName.replace(/\s+/g, '_')}.pdf`,
        parents: [DRIVE_FOLDER_ID],
      },
    });

    if (!copyResponse.data.id) {
      throw new Error('Failed to create workbook copy');
    }

    // Update the copied file with user's data
    const updateResponse = await drive.files.update({
      fileId: copyResponse.data.id,
      requestBody: {
        name: `Beneficiary_Workbook_${workbookData.personalInfo.fullName.replace(/\s+/g, '_')}.pdf`,
      },
    });

    // Get the web view link
    const getResponse = await drive.files.get({
      fileId: copyResponse.data.id,
      fields: 'webViewLink',
    });

    // Save reference in Supabase
    const { error: dbError } = await supabase
      .from('workbooks')
      .insert([
        {
          user_name: workbookData.personalInfo.fullName,
          user_email: workbookData.personalInfo.email,
          drive_file_id: copyResponse.data.id,
          drive_view_link: getResponse.data.webViewLink,
          created_at: new Date().toISOString(),
        },
      ]);

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error('Failed to save workbook reference');
    }

    return NextResponse.json({
      success: true,
      driveUrl: getResponse.data.webViewLink,
    });

  } catch (error) {
    console.error('Workbook save error:', error);
    return NextResponse.json(
      { error: 'Failed to save workbook: ' + (error as Error).message },
      { status: 500 }
    );
  }
} 