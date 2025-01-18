import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Add interfaces for the data types
interface FamilyMember {
  name: string;
  relationship: string;
  contact: string;
}

interface Asset {
  type: string;
  description: string;
  value: string;
}

interface InsurancePolicy {
  type: string;
  provider: string;
  policyNumber: string;
  coverage: string;
}

export async function POST(request: Request) {
  try {
    const workbookData = await request.json();

    // Launch browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Generate HTML content
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Beneficiary Planning Workbook</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
          
          body {
            font-family: 'Inter', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px;
          }

          h1 {
            color: #1a365d;
            text-align: center;
            margin-bottom: 40px;
          }

          h2 {
            color: #2c5282;
            border-bottom: 2px solid #e2e8f0;
            padding-bottom: 10px;
            margin-top: 30px;
          }

          .section {
            margin: 30px 0;
            padding: 20px;
            background: #f8fafc;
            border-radius: 8px;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
          }

          th, td {
            border: 1px solid #e2e8f0;
            padding: 12px;
            text-align: left;
          }

          th {
            background: #f1f5f9;
          }
        </style>
      </head>
      <body>
        <h1>Beneficiary Planning Workbook</h1>

        <div class="section">
          <h2>Personal Information</h2>
          <table>
            <tr>
              <th>Full Name</th>
              <td>${workbookData.personalInfo.fullName}</td>
            </tr>
            <tr>
              <th>Date of Birth</th>
              <td>${workbookData.personalInfo.dateOfBirth}</td>
            </tr>
            <tr>
              <th>Address</th>
              <td>${workbookData.personalInfo.address}</td>
            </tr>
            <tr>
              <th>Phone</th>
              <td>${workbookData.personalInfo.phone}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>${workbookData.personalInfo.email}</td>
            </tr>
          </table>
        </div>

        <div class="section">
          <h2>Family Members</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Relationship</th>
                <th>Contact Information</th>
              </tr>
            </thead>
            <tbody>
              ${workbookData.familyMembers.map((member: FamilyMember) => `
                <tr>
                  <td>${member.name}</td>
                  <td>${member.relationship}</td>
                  <td>${member.contact}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div class="section">
          <h2>Assets</h2>
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Description</th>
                <th>Estimated Value</th>
              </tr>
            </thead>
            <tbody>
              ${workbookData.assets.map((asset: Asset) => `
                <tr>
                  <td>${asset.type}</td>
                  <td>${asset.description}</td>
                  <td>${asset.value}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div class="section">
          <h2>Insurance Policies</h2>
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Provider</th>
                <th>Policy Number</th>
                <th>Coverage Amount</th>
              </tr>
            </thead>
            <tbody>
              ${workbookData.insurance.map((policy: InsurancePolicy) => `
                <tr>
                  <td>${policy.type}</td>
                  <td>${policy.provider}</td>
                  <td>${policy.policyNumber}</td>
                  <td>${policy.coverage}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div style="margin-top: 40px; text-align: center; color: #666;">
          <p>Generated on ${new Date().toLocaleDateString()}</p>
          <p>SafeHaven Insurance • (844) 628-4442</p>
        </div>
      </body>
      </html>
    `;

    // Set content and wait for fonts to load
    await page.setContent(html, {
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

    // Save lead data to database
    const { error: dbError } = await supabase
      .from('leads')
      .insert([
        {
          name: workbookData.personalInfo.fullName,
          email: workbookData.personalInfo.email,
          phone: workbookData.personalInfo.phone,
          zip_code: workbookData.personalInfo.address.match(/\d{5}/)?.[0] || null,
          lead_type: 'workbook',
          status: 'completed',
          created_at: new Date().toISOString(),
          additional_data: workbookData,
        },
      ]);

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Failed to save lead information' },
        { status: 500 }
      );
    }

    // Upload to Supabase Storage
    const fileName = `workbook-${Date.now()}.pdf`;
    const { error: uploadError } = await supabase
      .storage
      .from('workbooks')
      .upload(fileName, pdfBuffer, {
        contentType: 'application/pdf',
        cacheControl: '3600',
        upsert: true
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return NextResponse.json(
        { error: 'Failed to save workbook' },
        { status: 500 }
      );
    }

    // Get the public URL
    const { data: urlData } = supabase
      .storage
      .from('workbooks')
      .getPublicUrl(fileName);

    if (!urlData.publicUrl) {
      console.error('Failed to get public URL');
      return NextResponse.json(
        { error: 'Failed to generate download link' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      url: urlData.publicUrl,
      fileName: 'SafeHaven-Beneficiary-Planning-Workbook.pdf',
    });

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 