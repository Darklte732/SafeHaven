import puppeteer from 'puppeteer';
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join } from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env.local
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

async function generateAndUploadGuide() {
  let browser;
  try {
    console.log('Launching browser...');
    browser = await puppeteer.launch({
      headless: true
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 1600 });

    // Read the HTML template
    console.log('Reading HTML template...');
    const templatePath = join(process.cwd(), 'templates', 'final-expense-guide.html');
    const template = readFileSync(templatePath, 'utf8');

    // Set content and generate PDF
    console.log('Setting page content...');
    await page.setContent(template, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    console.log('Generating PDF...');
    const pdf = await page.pdf({
      format: 'a4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px',
      },
    });

    console.log('PDF generated successfully');

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
        throw new Error(`Failed to create bucket: ${createError.message}`);
      }
    }

    // Upload PDF to storage
    console.log('Uploading PDF to storage...');
    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(FILE_PATH, pdf, {
        contentType: 'application/pdf',
        upsert: true
      });

    if (uploadError) {
      throw new Error(`Failed to upload PDF: ${uploadError.message}`);
    }

    console.log('PDF uploaded successfully!');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

generateAndUploadGuide(); 