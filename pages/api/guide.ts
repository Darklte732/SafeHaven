import { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer-core';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Email validation function
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Phone validation function
function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+?1?\d{10,14}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, name, phone, zipCode } = req.body;

    // Input validation
    if (!email || !name || !phone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    if (!isValidPhone(phone)) {
      return res.status(400).json({ error: 'Invalid phone number format' });
    }

    // Check for existing lead
    const { data: existingLead } = await supabase
      .from('leads')
      .select('*')
      .eq('email', email)
      .single();

    // Check if guide was sent in the last 24 hours
    if (existingLead?.guide_sent_at) {
      const lastSentDate = new Date(existingLead.guide_sent_at);
      const hoursSinceLastSent = (Date.now() - lastSentDate.getTime()) / (1000 * 60 * 60);
      
      if (hoursSinceLastSent < 24) {
        return res.status(429).json({ error: 'Guide was already sent in the last 24 hours' });
      }
    }

    // Generate PDF
    const browser = await puppeteer.launch({
      executablePath: process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      args: ['--no-sandbox'],
      headless: true
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });
    await page.goto(`${process.env.NEXT_PUBLIC_BASE_URL}/guide-content`, {
      waitUntil: 'networkidle0'
    });

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' }
    });

    await browser.close();

    // Store or update lead information
    const leadData = {
      email,
      name,
      phone,
      zip_code: zipCode,
      guide_requested: true,
      guide_sent_at: new Date().toISOString(),
      status: 'active',
      source: 'website',
      notes: 'Requested insurance guide'
    };

    if (existingLead) {
      await supabase
        .from('leads')
        .update(leadData)
        .eq('id', existingLead.id);
    } else {
      await supabase
        .from('leads')
        .insert([leadData]);
    }

    // Send email with PDF attachment
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    // Send guide to user
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Your Insurance Guide from SafeHaven',
      html: `
        <h1>Hello ${name},</h1>
        <p>Thank you for requesting our comprehensive insurance guide. Please find it attached to this email.</p>
        <p>Our team will reach out to you shortly to discuss your insurance needs.</p>
        <br>
        <p>Best regards,</p>
        <p>The SafeHaven Team</p>
      `,
      attachments: [{
        filename: 'insurance-guide.pdf',
        content: Buffer.from(pdf)
      }]
    });

    // Send internal notification
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.NOTIFICATION_EMAIL,
      subject: 'New Lead: Guide Downloaded',
      html: `
        <h2>New Lead Information</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>ZIP Code:</strong> ${zipCode}</p>
        <p><strong>Action:</strong> Downloaded Insurance Guide</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      `
    });

    return res.status(200).json({ message: 'Guide sent successfully' });
  } catch (error) {
    console.error('Error processing guide request:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 