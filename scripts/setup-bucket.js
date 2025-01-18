require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const BUCKET_NAME = 'guides';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing required environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupBucket() {
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

    // Update bucket policy to be public
    console.log('Setting bucket policy...');
    const { error: policyError } = await supabase.storage.getBucket(BUCKET_NAME);
    
    if (policyError) {
      throw new Error(`Failed to set bucket policy: ${policyError.message}`);
    }

    console.log('Bucket setup completed successfully!');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

setupBucket(); 