import React from 'react';
import Link from 'next/link';

export default function LicensingPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Licensing Information</h1>
        
        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Insurance Licensing</h2>
            <p className="mb-4">SafeHaven is a licensed insurance broker operating in compliance with state and federal regulations. Our license details are as follows:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Licensed in all 50 states and the District of Columbia</li>
              <li>Member of the National Association of Insurance Commissioners (NAIC)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">State-Specific Licenses</h2>
            <p className="mb-4">We maintain active insurance licenses in each state where we operate. Our agents are properly licensed in their respective jurisdictions to provide insurance advice and services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Professional Certifications</h2>
            <p className="mb-4">Our team maintains various professional certifications, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Certified Insurance Counselor (CIC)</li>
              <li>Chartered Property Casualty Underwriter (CPCU)</li>
              <li>Licensed Insurance Producer</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Regulatory Compliance</h2>
            <p className="mb-4">We adhere to all applicable insurance regulations and maintain compliance with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>State Insurance Departments</li>
              <li>Federal Insurance Regulations</li>
              <li>Consumer Protection Laws</li>
              <li>Data Privacy Requirements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Verification</h2>
            <p className="mb-4">Our licensing information can be verified through:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>National Insurance Producer Registry (NIPR)</li>
              <li>State Insurance Department Websites</li>
              <li>Better Business Bureau (BBB)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
            <p className="mb-4">For licensing inquiries or verification, please contact our compliance department at compliance@safehaven.lat</p>
          </section>

          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-600">Note: This licensing information is provided for transparency and compliance purposes. For the most current licensing information, please contact your state's insurance department or visit the NIPR website.</p>
          </div>
        </div>
      </div>
    </main>
  );
} 