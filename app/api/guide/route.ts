import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import puppeteer from 'puppeteer-core';
import nodemailer from 'nodemailer';
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

// Initialize email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

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
    const { data: existingLead } = await supabase
      .from('leads')
      .select('guide_sent_at')
      .eq('email', email)
      .single();

    // If guide was sent in the last 24 hours, prevent resending
    if (existingLead?.guide_sent_at) {
      const lastSent = new Date(existingLead.guide_sent_at);
      const hoursSinceLastSent = (Date.now() - lastSent.getTime()) / (1000 * 60 * 60);
      
      if (hoursSinceLastSent < 24) {
        return NextResponse.json(
          { error: 'Guide was already sent. Please wait 24 hours before requesting again.' },
          { status: 400 }
        );
      }
    }

    // Launch browser
    browser = await puppeteer.launch({
      executablePath: process.env.CHROME_PATH,
      args: ['--no-sandbox'],
    });

    const page = await browser.newPage();

    // Read the HTML template
    const templatePath = join(process.cwd(), 'templates', 'final-expense-guide.html');
    const template = readFileSync(templatePath, 'utf8');

    // Set content and generate PDF
    await page.setContent(template, {
      waitUntil: 'networkidle0',
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
      await supabase
        .from('leads')
        .update(leadData)
        .eq('email', email);
    } else {
      await supabase
        .from('leads')
        .insert([leadData]);
    }

    // Send email with PDF attachment
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Your Final Expense Insurance Guide',
      html: `
        <h1>Thank you for requesting our guide!</h1>
        <p>Dear ${name},</p>
        <p>Please find attached your comprehensive guide to Final Expense Insurance.</p>
        <p>If you have any questions or would like to discuss your coverage options, please don't hesitate to contact us.</p>
        <br>
        <p>Best regards,</p>
        <p>The SafeHaven Insurance Team</p>
      `,
      attachments: [
        {
          filename: 'Final-Expense-Insurance-Guide.pdf',
          content: pdf,
        },
      ],
    });

    // Send internal notification
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: 'New Guide Download Lead',
      html: `
        <h2>New Guide Download</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        ${zipCode ? `<p><strong>ZIP Code:</strong> ${zipCode}</p>` : ''}
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error processing guide request:', error);
    return NextResponse.json(
      { error: 'Failed to process guide request' },
      { status: 500 }
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }
} 