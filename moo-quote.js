const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const yargs = require('yargs');

// All the existing code and functions remain the same until the main script...

// Main script
(async () => {
    let browser;
    try {
        console.log("Launching browser...");
        browser = await puppeteer.launch({
            headless: false,
            args: ['--start-maximized'],
            defaultViewport: null
        });
        
        const page = await browser.newPage();
        
        // Login process
        console.log("Opening login page...");
        await page.goto('https://insurancetoolkits.com/login', { 
            waitUntil: 'networkidle2',
            timeout: 60000 
        });
        
        // ... rest of the existing code ...

        console.log("All quotes gathered:", allQuotes);
        
        // Save quotes to a file with timestamp
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `quotes_${timestamp}.json`;
        await fs.writeFile(filename, JSON.stringify(allQuotes, null, 2));
        console.log(`Quotes saved to ${filename}`);
        
        console.log("Process completed. Closing browser...");
        await browser.close();
    
    } catch (error) {
        console.error("Error occurred:", error);
        await page.screenshot({ path: `error_screenshot_${Date.now()}.png`, fullPage: true });
        console.log("Error screenshot saved");
        
        // Close browser even after error
        await browser.close();
    }
})(); 