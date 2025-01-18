'use client';

import React from 'react';
import { WorkbookDownloadButton } from './WorkbookDownloadButton';

export function PlanningWorkbookSection() {
  return (
    <section className="bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">
          Free Workbook: Plan for Your Loved Ones
        </h2>
        <p className="text-gray-600 mb-8">
          Get our comprehensive beneficiary planning workbook to ensure your family's financial security.
        </p>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">What's Inside:</h3>
            <ul className="space-y-2 text-left max-w-md mx-auto mb-6">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Personal Information Organizer
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Family Member Details Section
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Asset Inventory Worksheets
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Insurance Coverage Calculator
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Important Documents Checklist
              </li>
            </ul>
          </div>

          <div className="max-w-sm mx-auto">
            <WorkbookDownloadButton />
          </div>

          <div className="mt-8 text-gray-600 italic">
            "The workbook helped me organize everything my family needs to know. It's an invaluable resource!"
            <div className="mt-2 font-semibold">- Michael R.</div>
          </div>
        </div>
      </div>
    </section>
  );
} 