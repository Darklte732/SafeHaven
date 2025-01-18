import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import puppeteer from 'puppeteer-core';
import { readFileSync } from 'fs';
import { join } from 'path';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex
const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;

export async function POST(req: Request) {
  let browser;
  try {
    const { name, email, phone, zipCode } = await req.json();

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate phone format if provided
    if (phone && !phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: 'Invalid phone format' },
        { status: 400 }
      );
    }

    // Check for existing lead
    const { data: existingLead, error: leadError } = await supabase
      .from('leads')
      .select('guide_sent_at')
      .eq('email', email)
      .single();

    if (leadError && leadError.code !== 'PGRST116') {
      throw new Error(`Database error: ${leadError.message}`);
    }

    // If guide was downloaded in the last 24 hours, prevent redownload
    if (existingLead?.guide_sent_at) {
      const lastSent = new Date(existingLead.guide_sent_at);
      const hoursSinceLastSent = (Date.now() - lastSent.getTime()) / (1000 * 60 * 60);
      
      if (hoursSinceLastSent < 24) {
        return NextResponse.json(
          { error: 'Guide was already downloaded. Please wait 24 hours before requesting again.' },
          { status: 400 }
        );
      }
    }

    // Launch browser
    browser = await puppeteer.launch({
      executablePath: process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: true,
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 1600 });

    // Read the HTML template
    const templatePath = join(process.cwd(), 'templates', 'final-expense-guide.html');
    const template = readFileSync(templatePath, 'utf8');

    // Set content and generate PDF
    await page.setContent(template, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

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

    // Store or update lead information
    const timestamp = new Date().toISOString();
    const leadData = {
      email,
      name,
      phone,
      zip_code: zipCode,
      guide_requested: true,
      guide_sent_at: timestamp,
      status: 'active',
      source: 'website',
      created_at: timestamp,
      updated_at: timestamp,
    };

    if (existingLead) {
      const { error: updateError } = await supabase
        .from('leads')
        .update(leadData)
        .eq('email', email);

      if (updateError) {
        throw new Error(`Failed to update lead: ${updateError.message}`);
      }
    } else {
      const { error: insertError } = await supabase
        .from('leads')
        .insert([leadData]);

      if (insertError) {
        throw new Error(`Failed to insert lead: ${insertError.message}`);
      }
    }

    // Return the PDF directly for download
    return new NextResponse(pdf, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Final-Expense-Insurance-Guide.pdf"',
      },
    });
  } catch (error: any) {
    console.error('Error processing guide request:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process guide request' },
      { status: 500 }
    );
  } finally {
    if (browser) {
      try {
        await browser.close();
      } catch (error) {
        console.error('Error closing browser:', error);
      }
    }
  }
} 