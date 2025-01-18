require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials in environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupWorkbookStorage() {
  try {
    // Create workbooks bucket if it doesn't exist
    const { data: bucket, error: bucketError } = await supabase
      .storage
      .createBucket('workbooks', {
        public: true,
        fileSizeLimit: 10485760, // 10MB
        allowedMimeTypes: ['application/pdf']
      });

    if (bucketError) {
      if (bucketError.message.includes('already exists')) {
        console.log('Workbooks bucket already exists');
      } else {
        throw bucketError;
      }
    } else {
      console.log('Created workbooks bucket:', bucket);
    }

    // Update bucket settings
    const { error: updateError } = await supabase
      .storage
      .updateBucket('workbooks', {
        public: true,
        fileSizeLimit: 10485760,
        allowedMimeTypes: ['application/pdf']
      });

    if (updateError) {
      throw updateError;
    }

    console.log('Updated workbooks bucket settings');

    // Upload the workbook
    const filePath = path.join(process.cwd(), 'public', 'beneficiary-planning-workbook.pdf');
    const fileBuffer = fs.readFileSync(filePath);

    const { error: uploadError } = await supabase
      .storage
      .from('workbooks')
      .upload('beneficiary-planning-workbook.pdf', fileBuffer, {
        contentType: 'application/pdf',
        cacheControl: '3600',
        upsert: true
      });

    if (uploadError) {
      throw uploadError;
    }

    console.log('Uploaded workbook successfully');

    // Get the public URL
    const { data: publicUrl } = await supabase
      .storage
      .from('workbooks')
      .getPublicUrl('beneficiary-planning-workbook.pdf');

    console.log('Workbook public URL:', publicUrl.publicUrl);

  } catch (error) {
    console.error('Error setting up storage:', error);
    process.exit(1);
  }
}

setupWorkbookStorage(); 