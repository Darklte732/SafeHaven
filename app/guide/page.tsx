'use client';

import React from 'react';
import { GuideDownloadButton } from '@/components/GuideDownloadButton';
import { WorkbookDownloadButton } from '@/components/WorkbookDownloadButton';

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Free Resources to Secure Your Family's Future
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Access our comprehensive guide and planning workbook to make informed decisions about final expense insurance and estate planning.
          </p>
          <p className="text-lg text-blue-600 font-semibold mb-8">
            Join over 1,000+ families who have already secured their legacy
          </p>
        </div>

        {/* Value Proposition Banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-12">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center justify-center text-center">
              <div>
                <span className="text-blue-500 text-2xl">🔒</span>
                <p className="font-medium">100% Free Resources</p>
              </div>
            </div>
            <div className="flex items-center justify-center text-center">
              <div>
                <span className="text-blue-500 text-2xl">📋</span>
                <p className="font-medium">Expert-Crafted Content</p>
              </div>
            </div>
            <div className="flex items-center justify-center text-center">
              <div>
                <span className="text-blue-500 text-2xl">⚡</span>
                <p className="font-medium">Instant Download</p>
              </div>
            </div>
          </div>
        </div>

        {/* Guide Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Final Expense Insurance Guide
              </h2>
              <p className="text-gray-600 mb-6">
                Our detailed guide helps you understand everything you need to know about final expense insurance and how it protects your loved ones.
              </p>
              <div className="space-y-4 mb-6">
                <h3 className="text-xl font-semibold">What You'll Learn:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>How final expense insurance works and why it's important</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Different types of policies and their benefits</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>How to calculate the right coverage amount</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Tips for choosing the best policy for your needs</span>
                  </li>
                </ul>
              </div>
              <div className="max-w-xs">
                <GuideDownloadButton />
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Key Benefits:</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      📚
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium">Easy to Understand</h4>
                    <p className="text-gray-600">Clear explanations of complex insurance terms and concepts</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      💡
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium">Practical Examples</h4>
                    <p className="text-gray-600">Real-world scenarios and case studies</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      ✅
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium">Decision Support</h4>
                    <p className="text-gray-600">Tools and checklists to help you make informed choices</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Workbook Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">How to Use the Workbook:</h3>
                <ol className="space-y-4 list-decimal list-inside">
                  <li className="text-gray-800">
                    <span className="font-medium">Start with Personal Info:</span>
                    <p className="text-gray-600 ml-6">Fill in your basic information and important contacts</p>
                  </li>
                  <li className="text-gray-800">
                    <span className="font-medium">Add Family Details:</span>
                    <p className="text-gray-600 ml-6">Document information about your beneficiaries and loved ones</p>
                  </li>
                  <li className="text-gray-800">
                    <span className="font-medium">List Your Assets:</span>
                    <p className="text-gray-600 ml-6">Record all your assets, accounts, and important documents</p>
                  </li>
                  <li className="text-gray-800">
                    <span className="font-medium">Calculate Coverage:</span>
                    <p className="text-gray-600 ml-6">Use our calculator to determine optimal insurance coverage</p>
                  </li>
                  <li className="text-gray-800">
                    <span className="font-medium">Regular Updates:</span>
                    <p className="text-gray-600 ml-6">Review and update the information annually or after major life events</p>
                  </li>
                </ol>
                <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <span className="font-semibold">Pro Tip:</span> Keep a digital copy of the workbook and share its location with trusted family members.
                  </p>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Beneficiary Planning Workbook
              </h2>
              <p className="text-gray-600 mb-6">
                A comprehensive workbook designed to help you organize all the essential information your loved ones will need.
              </p>
              <div className="space-y-4 mb-6">
                <h3 className="text-xl font-semibold">Included Sections:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Personal Information Organizer</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Family Member Details Section</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Asset Inventory Worksheets</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Insurance Coverage Calculator</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Important Documents Checklist</span>
                  </li>
                </ul>
              </div>
              <div className="max-w-xs">
                <WorkbookDownloadButton />
              </div>
            </div>
          </div>
        </div>

        {/* Social Proof Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8">What Others Are Saying</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-yellow-400 flex justify-center mb-4">
                ★★★★★
              </div>
              <p className="text-gray-600 italic mb-4">
                "The guide helped me understand exactly what I needed. The workbook keeps everything organized!"
              </p>
              <p className="font-semibold">- Sarah M.</p>
            </div>
            <div className="text-center">
              <div className="text-yellow-400 flex justify-center mb-4">
                ★★★★★
              </div>
              <p className="text-gray-600 italic mb-4">
                "Finally, clear explanations about final expense insurance. No more confusion!"
              </p>
              <p className="font-semibold">- James K.</p>
            </div>
            <div className="text-center">
              <div className="text-yellow-400 flex justify-center mb-4">
                ★★★★★
              </div>
              <p className="text-gray-600 italic mb-4">
                "The workbook is a game-changer. My family knows exactly where to find everything."
              </p>
              <p className="font-semibold">- Michael R.</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-lg text-gray-600">
              Join thousands of families who have already taken the first step towards securing their legacy
            </p>
            <div className="flex justify-center items-center space-x-8 mt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">1,000+</div>
                <div className="text-sm text-gray-600">Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">4.9/5</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">98%</div>
                <div className="text-sm text-gray-600">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-4">
            Download both resources today and take the first step in securing your family's future.
          </p>
          <p className="text-lg text-green-600 font-medium mb-8">
            ✓ Instant Download &nbsp; ✓ No Credit Card Required &nbsp; ✓ 100% Free
          </p>
          <div className="flex justify-center space-x-4">
            <div className="max-w-xs">
              <GuideDownloadButton />
            </div>
            <div className="max-w-xs">
              <WorkbookDownloadButton />
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <div className="flex justify-center items-center space-x-6 text-gray-400">
            <span>🔒 Secure Download</span>
            <span>|</span>
            <span>📱 Mobile-Friendly PDF</span>
            <span>|</span>
            <span>🔄 Regular Updates</span>
          </div>
        </div>
      </div>
    </div>
  );
} 