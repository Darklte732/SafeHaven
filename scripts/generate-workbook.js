const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generatePDF() {
  try {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox']
    });

    console.log('Creating new page...');
    const page = await browser.newPage();
    
    // Read the HTML template
    const templatePath = path.join(process.cwd(), 'public', 'workbook-template.html');
    const templateContent = fs.readFileSync(templatePath, 'utf8');

    // Set the content
    await page.setContent(templateContent, {
      waitUntil: 'networkidle0'
    });

    // Add custom styles for PDF
    await page.addStyleTag({
      content: `
        @page {
          margin: 50px;
          size: letter;
        }
        body {
          padding: 0;
          margin: 0;
        }
      `
    });

    console.log('Generating PDF...');
    const pdfBuffer = await page.pdf({
      format: 'Letter',
      printBackground: true,
      margin: {
        top: '50px',
        right: '50px',
        bottom: '50px',
        left: '50px'
      }
    });

    // Save the PDF
    const outputPath = path.join(process.cwd(), 'public', 'beneficiary-planning-workbook.pdf');
    fs.writeFileSync(outputPath, pdfBuffer);

    console.log('PDF generated successfully!');
    console.log('Output path:', outputPath);

    await browser.close();
  } catch (error) {
    console.error('Error generating PDF:', error);
    process.exit(1);
  }
}

generatePDF(); 