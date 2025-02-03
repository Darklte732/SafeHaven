const puppeteer = require('puppeteer');
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function generateGuide() {
  try {
    // Launch browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Read the HTML template
    const templatePath = path.join(process.cwd(), 'public', 'guide-template.html');
    const template = fs.readFileSync(templatePath, 'utf8');

    // Set content and wait for fonts to load
    await page.setContent(template, {
      waitUntil: ['networkidle0', 'domcontentloaded']
    });

    // Wait for fonts to load
    await page.evaluateHandle('document.fonts.ready');

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'Letter',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px'
      }
    });

    // Close browser
    await browser.close();

    // Save PDF locally first
    const outputPath = path.join(process.cwd(), 'public', 'final-expense-guide.pdf');
    fs.writeFileSync(outputPath, pdfBuffer);

    console.log('PDF generated successfully');

    // Upload to Supabase Storage
    const { error: bucketError } = await supabase
      .storage
      .createBucket('guides', {
        public: true,
        allowedMimeTypes: ['application/pdf'],
        fileSizeLimit: 5242880 // 5MB
      });

    if (bucketError && bucketError.message !== 'Bucket already exists') {
      throw bucketError;
    }

    // Upload the PDF
    const { error: uploadError } = await supabase
      .storage
      .from('guides')
      .upload('final-expense-guide.pdf', pdfBuffer, {
        contentType: 'application/pdf',
        cacheControl: '3600',
        upsert: true
      });

    if (uploadError) {
      throw uploadError;
    }

    // Get the public URL
    const { data: { publicUrl } } = supabase
      .storage
      .from('guides')
      .getPublicUrl('final-expense-guide.pdf');

    console.log('Guide uploaded successfully');
    console.log('Public URL:', publicUrl);

  } catch (error) {
    console.error('Error generating guide:', error);
    process.exit(1);
  }
}

generateGuide(); 