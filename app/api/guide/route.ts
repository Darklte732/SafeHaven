import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import puppeteer from 'puppeteer-core';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Configure email transporter
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Validation functions
const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const isValidPhone = (phone: string) => {
    const phoneRegex = /^\+?1?\d{10,14}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
};

export async function POST(req: Request) {
    try {
        const { email, name, phone, zipCode } = await req.json();

        // Input validation
        if (!email || !name) {
            return NextResponse.json({ 
                error: 'Name and email are required' 
            }, { status: 400 });
        }

        if (!isValidEmail(email)) {
            return NextResponse.json({ 
                error: 'Invalid email address' 
            }, { status: 400 });
        }

        if (phone && !isValidPhone(phone)) {
            return NextResponse.json({ 
                error: 'Invalid phone number' 
            }, { status: 400 });
        }

        // Check for existing lead
        const { data: existingLead } = await supabase
            .from('leads')
            .select('id, guide_sent_at')
            .eq('email', email)
            .single();

        // If guide was sent in the last 24 hours, don't send again
        if (existingLead?.guide_sent_at) {
            const lastSent = new Date(existingLead.guide_sent_at);
            const hoursSinceLastSent = (Date.now() - lastSent.getTime()) / (1000 * 60 * 60);
            
            if (hoursSinceLastSent < 24) {
                return NextResponse.json({ 
                    error: 'Guide was recently sent to this email' 
                }, { status: 429 });
            }
        }

        // Generate PDF from HTML template
        const browser = await puppeteer.launch({
            headless: true,
            executablePath: process.env.NODE_ENV === 'production' 
                ? process.env.PUPPETEER_EXECUTABLE_PATH 
                : puppeteer.executablePath()
        });
        
        const page = await browser.newPage();
        
        // Read and process the HTML template
        const templatePath = path.join(process.cwd(), 'public', 'final-expense-guide.html');
        let template = fs.readFileSync(templatePath, 'utf-8');
        
        // Replace placeholders with actual values
        template = template.replace('{{CURRENT_YEAR}}', new Date().getFullYear().toString());
        
        await page.setContent(template, {
            waitUntil: 'networkidle0'
        });
        
        // Generate PDF with improved settings
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                top: '20px',
                right: '20px',
                bottom: '20px',
                left: '20px'
            },
            displayHeaderFooter: true,
            headerTemplate: '<div></div>',
            footerTemplate: `
                <div style="font-size: 10px; text-align: center; width: 100%;">
                    Page <span class="pageNumber"></span> of <span class="totalPages"></span>
                </div>
            `
        });

        await browser.close();

        // Store or update lead information in Supabase
        const leadData = {
            email,
            name,
            phone: phone || null,
            zip_code: zipCode || null,
            guide_requested: true,
            guide_sent_at: new Date().toISOString(),
            status: 'new',
            source: 'guide_download',
            notes: 'Requested Final Expense Insurance Guide'
        };

        const { error: dbError } = existingLead 
            ? await supabase
                .from('leads')
                .update(leadData)
                .eq('id', existingLead.id)
            : await supabase
                .from('leads')
                .insert([leadData]);

        if (dbError) {
            console.error('Database error:', dbError);
            return NextResponse.json({ error: 'Database error' }, { status: 500 });
        }

        // Send email with PDF attachment
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Your Free Final Expense Insurance Guide is Here!',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #4267B2;">Hello ${name},</h2>
                    
                    <p>Thank you for requesting our Final Expense Insurance Guide! We're excited to help you understand more about protecting your loved ones.</p>
                    
                    <p>You'll find your comprehensive guide attached to this email. Inside, you'll discover:</p>
                    
                    <ul>
                        <li>What Final Expense Insurance covers</li>
                        <li>Why it's an important part of financial planning</li>
                        <li>How to choose the right coverage</li>
                        <li>Common myths and facts</li>
                    </ul>
                    
                    <p>A licensed agent will call you within 24 hours to answer any questions you may have and help you find the perfect coverage plan.</p>
                    
                    <div style="background-color: #f5f7fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p style="margin: 0;"><strong>Need immediate assistance?</strong></p>
                        <p style="margin: 10px 0;">Call us at: +1 806-621-2114</p>
                        <p style="margin: 0;">Visit: safehaveninsurance.com</p>
                    </div>
                    
                    <p>Thank you for choosing SafeHaven Insurance!</p>
                    
                    <div style="font-size: 12px; color: #666; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
                        <p>This email was sent to ${email}. If you did not request this guide, please ignore this email.</p>
                        <p>© ${new Date().getFullYear()} SafeHaven Insurance. All rights reserved.</p>
                    </div>
                </div>
            `,
            attachments: [{
                filename: 'SafeHaven-Final-Expense-Guide.pdf',
                content: pdfBuffer
            }]
        };

        await transporter.sendMail(mailOptions);

        // Send internal notification
        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
            subject: 'New Guide Download Lead',
            html: `
                <h2>New Lead Information</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
                ${zipCode ? `<p><strong>Zip Code:</strong> ${zipCode}</p>` : ''}
                <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
            `
        });

        return NextResponse.json({ 
            success: true,
            message: 'Guide has been sent to your email'
        });

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ 
            error: 'Internal server error',
            details: process.env.NODE_ENV === 'development' ? error : undefined
        }, { status: 500 });
    }
} 