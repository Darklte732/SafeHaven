import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

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

    // Set CORS policy
    const { error: corsError } = await supabase
      .storage
      .getBucket('workbooks');

    if (corsError) {
      throw corsError;
    }

    console.log('Storage setup completed successfully');

  } catch (error) {
    console.error('Error setting up storage:', error);
    process.exit(1);
  }
}

setupWorkbookStorage(); 