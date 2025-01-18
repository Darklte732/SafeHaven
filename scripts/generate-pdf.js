const puppeteer = require('puppeteer');
const path = require('path');

async function generatePDF() {
  try {
    console.log('Launching browser...');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Get absolute paths
    const htmlPath = path.join(process.cwd(), 'public', 'final-expense-guide.html');
    const pdfPath = path.join(process.cwd(), 'public', 'final-expense-guide.pdf');

    console.log('Loading HTML file...');
    await page.goto(`file://${htmlPath}`, {
      waitUntil: 'networkidle0'
    });

    // Wait for images to load
    await page.waitForSelector('img');

    console.log('Generating PDF...');
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px'
      }
    });

    console.log('PDF generated successfully!');
    await browser.close();
  } catch (error) {
    console.error('Error generating PDF:', error);
    process.exit(1);
  }
}

generatePDF(); 