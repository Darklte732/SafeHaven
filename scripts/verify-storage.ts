import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const BUCKET_NAME = 'guides';
const FILE_PATH = 'final-expense-guide.pdf';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing required environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyStorage() {
  try {
    // 1. Check bucket exists and is public
    console.log('Checking bucket settings...');
    const { data: buckets } = await supabase.storage.listBuckets();
    const guidesBucket = buckets?.find(b => b.name === BUCKET_NAME);

    if (!guidesBucket) {
      throw new Error('Guides bucket not found');
    }

    if (!guidesBucket.public) {
      console.log('Bucket is not public, updating settings...');
      const { error: updateError } = await supabase.storage.updateBucket(BUCKET_NAME, {
        public: true,
        allowedMimeTypes: ['application/pdf'],
        fileSizeLimit: 10485760 // 10MB
      });

      if (updateError) {
        throw new Error(`Failed to update bucket: ${updateError.message}`);
      }
    }

    // 2. Verify file exists
    console.log('Checking file exists...');
    const { data: files } = await supabase.storage
      .from(BUCKET_NAME)
      .list();

    const guideFile = files?.find(f => f.name === FILE_PATH);
    if (!guideFile) {
      throw new Error('Guide file not found in bucket');
    }

    // 3. Get and verify public URL
    console.log('Getting public URL...');
    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(FILE_PATH);

    console.log('\nStorage Verification Results:');
    console.log('----------------------------');
    console.log('Bucket Status: ✅ Public');
    console.log('File Status: ✅ Found');
    console.log('Public URL:', publicUrl);
    console.log('\nTest this URL in your browser to verify direct access.');

  } catch (error) {
    console.error('Verification failed:', error);
    process.exit(1);
  }
}

verifyStorage(); 