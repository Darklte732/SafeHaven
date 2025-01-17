import React from 'react';

export default function GuideContent() {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          The Ultimate Guide to Insurance Coverage
        </h1>
        <p className="text-xl text-gray-600">
          A Comprehensive Resource for Understanding and Choosing the Right Insurance Protection
        </p>
        <div className="mt-6 text-sm text-gray-500">
          Prepared by SafeHaven Insurance Experts
        </div>
      </header>

      <main className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Understanding Insurance Basics</h2>
          <p className="text-gray-600 mb-6">
            Insurance is a crucial financial tool that protects you and your assets from unexpected events.
            This comprehensive guide will help you understand the fundamentals of insurance and make informed
            decisions about your coverage needs.
          </p>
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-medium text-gray-700 mb-4">Key Insurance Concepts</h3>
            <ul className="list-disc pl-6 text-gray-600 space-y-3">
              <li><strong>Premium:</strong> The amount you pay for insurance coverage</li>
              <li><strong>Deductible:</strong> Your out-of-pocket expense before insurance coverage begins</li>
              <li><strong>Coverage Limit:</strong> The maximum amount your policy will pay</li>
              <li><strong>Claim:</strong> A formal request for payment under your insurance policy</li>
              <li><strong>Policyholder:</strong> The person or entity covered by the insurance policy</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-gray-700">Why Insurance Matters</h3>
            <p className="text-gray-600">
              Insurance provides essential financial protection against life's uncertainties. Without proper
              coverage, you could face significant financial hardship from unexpected events such as:
            </p>
            <ul className="list-disc pl-6 text-gray-600">
              <li>Accidents and injuries</li>
              <li>Natural disasters</li>
              <li>Property damage</li>
              <li>Medical emergencies</li>
              <li>Legal liabilities</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Types of Insurance Coverage</h2>
          <p className="text-gray-600 mb-6">
            Different types of insurance protect various aspects of your life. Understanding each type
            helps you build a comprehensive protection strategy.
          </p>
          <div className="grid gap-6">
            <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
              <h3 className="text-xl font-medium text-blue-600 mb-3">Auto Insurance</h3>
              <p className="text-gray-600 mb-4">
                Protect yourself, your vehicle, and others on the road with comprehensive auto coverage.
              </p>
              <h4 className="font-medium text-gray-700 mb-2">Coverage Options:</h4>
              <ul className="list-disc pl-6 text-gray-600">
                <li>Liability coverage (required by law)</li>
                <li>Collision coverage</li>
                <li>Comprehensive coverage</li>
                <li>Personal injury protection</li>
                <li>Uninsured/underinsured motorist coverage</li>
              </ul>
            </div>

            <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
              <h3 className="text-xl font-medium text-blue-600 mb-3">Home Insurance</h3>
              <p className="text-gray-600 mb-4">
                Protect your most valuable asset with comprehensive home insurance coverage.
              </p>
              <h4 className="font-medium text-gray-700 mb-2">Key Protections:</h4>
              <ul className="list-disc pl-6 text-gray-600">
                <li>Dwelling coverage</li>
                <li>Personal property protection</li>
                <li>Liability coverage</li>
                <li>Additional living expenses</li>
                <li>Natural disaster protection</li>
              </ul>
            </div>

            <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
              <h3 className="text-xl font-medium text-blue-600 mb-3">Life Insurance</h3>
              <p className="text-gray-600 mb-4">
                Secure your family's financial future with the right life insurance policy.
              </p>
              <h4 className="font-medium text-gray-700 mb-2">Types of Life Insurance:</h4>
              <ul className="list-disc pl-6 text-gray-600">
                <li>Term life insurance</li>
                <li>Whole life insurance</li>
                <li>Universal life insurance</li>
                <li>Variable life insurance</li>
                <li>Final expense insurance</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Choosing the Right Coverage</h2>
          <p className="text-gray-600 mb-6">
            Selecting the right insurance coverage requires careful consideration of your unique situation
            and needs. Our expert recommendations will help you make informed decisions.
          </p>
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-medium text-gray-700 mb-4">Factors to Consider</h3>
            <div className="grid gap-4">
              <div>
                <h4 className="font-medium text-gray-700">Current Life Situation</h4>
                <ul className="list-disc pl-6 text-gray-600">
                  <li>Marital status and dependents</li>
                  <li>Property ownership</li>
                  <li>Current income and assets</li>
                  <li>Health conditions</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">Future Plans</h4>
                <ul className="list-disc pl-6 text-gray-600">
                  <li>Career changes or retirement</li>
                  <li>Family planning</li>
                  <li>Property purchases</li>
                  <li>Investment goals</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">Risk Assessment</h4>
                <ul className="list-disc pl-6 text-gray-600">
                  <li>Occupation hazards</li>
                  <li>Lifestyle factors</li>
                  <li>Geographic location</li>
                  <li>Asset value and exposure</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Making and Managing Claims</h2>
          <p className="text-gray-600 mb-6">
            Understanding the claims process ensures you receive the coverage you need when you need it most.
            Follow these guidelines for a smooth claims experience.
          </p>
          <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-medium text-gray-700 mb-4">Claims Process Steps</h3>
            <ol className="list-decimal pl-6 text-gray-600 space-y-4">
              <li>
                <strong>Document Everything</strong>
                <ul className="list-disc pl-6 mt-2">
                  <li>Take photos and videos</li>
                  <li>Gather witness information</li>
                  <li>Keep receipts and records</li>
                </ul>
              </li>
              <li>
                <strong>Contact Your Insurance Provider</strong>
                <ul className="list-disc pl-6 mt-2">
                  <li>Report the incident promptly</li>
                  <li>Get claim reference numbers</li>
                  <li>Ask about next steps</li>
                </ul>
              </li>
              <li>
                <strong>Follow Up and Track Progress</strong>
                <ul className="list-disc pl-6 mt-2">
                  <li>Keep communication records</li>
                  <li>Meet deadlines</li>
                  <li>Review settlement offers</li>
                </ul>
              </li>
            </ol>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Cost-Saving Strategies</h2>
          <p className="text-gray-600 mb-6">
            Learn how to maintain comprehensive coverage while managing insurance costs effectively.
          </p>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-medium text-gray-700 mb-4">Ways to Save</h3>
            <div className="grid gap-4">
              <div>
                <h4 className="font-medium text-gray-700">Bundle Policies</h4>
                <p className="text-gray-600">Combine multiple policies with one insurer for discounts.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">Maintain Good Records</h4>
                <p className="text-gray-600">Keep a clean driving record and good credit score.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">Review Regularly</h4>
                <p className="text-gray-600">Assess your coverage annually and adjust as needed.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">Risk Mitigation</h4>
                <p className="text-gray-600">Install safety features and maintain your property.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Next Steps</h2>
          <div className="space-y-6">
            <p className="text-blue-700">
              Ready to explore your insurance options? Our team of experts is here to help you find the
              perfect coverage for your needs. We offer:
            </p>
            <ul className="list-disc pl-6 text-blue-700">
              <li>Free consultation with insurance experts</li>
              <li>Personalized coverage recommendations</li>
              <li>Competitive quotes from top insurers</li>
              <li>Ongoing support and policy reviews</li>
            </ul>
            <p className="text-blue-700 font-medium">
              Contact us today to schedule your free consultation and take the first step toward
              comprehensive insurance protection.
            </p>
          </div>
        </section>
      </main>

      <footer className="mt-12 pt-8 border-t border-gray-200">
        <div className="text-center text-gray-500">
          <p>© {new Date().getFullYear()} SafeHaven Insurance. All rights reserved.</p>
          <p className="mt-2">This guide is for informational purposes only and should not be considered as financial or legal advice.</p>
          <p className="mt-2">For specific insurance recommendations, please consult with our licensed insurance professionals.</p>
        </div>
      </footer>
    </div>
  );
} 