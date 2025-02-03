import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load environment variables
dotenv.config({ path: '.env.local' });

const BUCKET_NAME = 'guides';
const FILE_NAME = 'final-expense-guide.pdf';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing required environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupStorage() {
  try {
    // Check if bucket exists
    console.log('Checking for existing bucket...');
    const { data: buckets } = await supabase.storage.listBuckets();
    const guidesBucket = buckets?.find(b => b.name === BUCKET_NAME);

    if (guidesBucket) {
      console.log('Updating existing bucket...');
      const { error: updateError } = await supabase.storage.updateBucket(BUCKET_NAME, {
        public: true,
        allowedMimeTypes: ['application/pdf'],
        fileSizeLimit: 10485760 // 10MB
      });

      if (updateError) {
        throw new Error(`Failed to update bucket: ${updateError.message}`);
      }
    } else {
      console.log('Creating new bucket...');
      const { error: createError } = await supabase.storage.createBucket(BUCKET_NAME, {
        public: true,
        allowedMimeTypes: ['application/pdf'],
        fileSizeLimit: 10485760 // 10MB
      });

      if (createError) {
        throw new Error(`Failed to create bucket: ${createError.message}`);
      }
    }

    // Upload the PDF file
    console.log('Uploading PDF file...');
    const filePath = path.join(process.cwd(), 'public', FILE_NAME);
    const fileBuffer = fs.readFileSync(filePath);

    // Remove existing file if it exists
    const { error: removeError } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([FILE_NAME]);

    if (removeError) {
      console.log('Note: No existing file found or error removing:', removeError.message);
    }

    // Upload new file
    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(FILE_NAME, fileBuffer, {
        contentType: 'application/pdf',
        cacheControl: '3600',
        upsert: true
      });

    if (uploadError) {
      throw new Error(`Failed to upload file: ${uploadError.message}`);
    }

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(FILE_NAME);

    console.log('Setup completed successfully!');
    console.log('Public URL:', publicUrl);

  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

setupStorage(); 