require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing required environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function uploadGuide() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'final-expense-guide.pdf');
    const fileBuffer = fs.readFileSync(filePath);

    console.log('Uploading guide to Supabase storage...');

    // First, try to remove the existing file
    const { error: removeError } = await supabase.storage
      .from('guides')
      .remove(['final-expense-guide.pdf']);

    if (removeError) {
      console.log('Note: No existing file found or error removing:', removeError.message);
    }

    // Upload the new file
    const { data, error } = await supabase.storage
      .from('guides')
      .upload('final-expense-guide.pdf', fileBuffer, {
        contentType: 'application/pdf',
        cacheControl: '3600',
        upsert: true
      });

    if (error) {
      throw error;
    }

    console.log('Guide uploaded successfully!');
    console.log('File path:', data.path);

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('guides')
      .getPublicUrl('final-expense-guide.pdf');

    console.log('Public URL:', publicUrl);
  } catch (error) {
    console.error('Error uploading guide:', error);
    process.exit(1);
  }
}

uploadGuide(); 