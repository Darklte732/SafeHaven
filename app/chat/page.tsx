'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ChatInterface from '@/components/ChatInterface';

const preQualifyQuestions = [
  {
    id: 'age',
    question: 'What is your age?',
    type: 'select',
    options: ['Under 50', '50-60', '61-70', '71-80', 'Over 80']
  },
  {
    id: 'health',
    question: 'How would you rate your overall health?',
    type: 'select',
    options: ['Excellent', 'Good', 'Fair', 'Poor']
  },
  {
    id: 'coverage',
    question: 'What type of coverage are you interested in?',
    type: 'select',
    options: ['Final Expense', 'Term Life', 'Whole Life', 'Not Sure']
  },
  {
    id: 'timeline',
    question: 'When are you looking to get coverage?',
    type: 'select',
    options: ['Immediately', 'Within 30 days', 'Within 3 months', 'Just researching']
  }
];

export default function ChatPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showOptIn, setShowOptIn] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [optInData, setOptInData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    consentToContact: false,
    consentToHIPAA: false
  });

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({ ...prev, [preQualifyQuestions[currentStep].id]: answer }));
    if (currentStep < preQualifyQuestions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowOptIn(true);
    }
  };

  const handleOptInSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Save opt-in data to database here
    setShowChat(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Chat with SafeHaven AI Assistant
          </h1>
          <p className="text-xl text-gray-600">
            Get instant answers about final expense insurance, coverage options, and more.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {showChat ? (
            <ChatInterface userProfile={optInData} preQualAnswers={answers} />
          ) : !showOptIn ? (
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">
                  Question {currentStep + 1} of {preQualifyQuestions.length}
                </h2>
                <div className="h-2 bg-gray-200 rounded">
                  <div 
                    className="h-2 bg-blue-600 rounded transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / preQualifyQuestions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl mb-4">{preQualifyQuestions[currentStep].question}</h3>
                <div className="grid gap-3">
                  {preQualifyQuestions[currentStep].options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleAnswer(option)}
                      className="w-full py-3 px-4 text-left border rounded-lg hover:bg-blue-50 hover:border-blue-500 transition-colors"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Complete Your Profile</h2>
              <form onSubmit={handleOptInSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border rounded-lg"
                      value={optInData.firstName}
                      onChange={(e) => setOptInData(prev => ({ ...prev, firstName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border rounded-lg"
                      value={optInData.lastName}
                      onChange={(e) => setOptInData(prev => ({ ...prev, lastName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-3 py-2 border rounded-lg"
                      value={optInData.email}
                      onChange={(e) => setOptInData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full px-3 py-2 border rounded-lg"
                      value={optInData.phone}
                      onChange={(e) => setOptInData(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-lg"
                      value={optInData.address}
                      onChange={(e) => setOptInData(prev => ({ ...prev, address: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-lg"
                      value={optInData.city}
                      onChange={(e) => setOptInData(prev => ({ ...prev, city: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-lg"
                      value={optInData.state}
                      onChange={(e) => setOptInData(prev => ({ ...prev, state: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border rounded-lg"
                      value={optInData.zipCode}
                      onChange={(e) => setOptInData(prev => ({ ...prev, zipCode: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-4 border-t pt-6">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      required
                      id="consentToContact"
                      className="mt-1"
                      checked={optInData.consentToContact}
                      onChange={(e) => setOptInData(prev => ({ ...prev, consentToContact: e.target.checked }))}
                    />
                    <label htmlFor="consentToContact" className="ml-2 text-sm text-gray-600">
                      I consent to receive calls, text messages, and emails about insurance products from SafeHaven Insurance and its licensed insurance agents. I understand that consent is not required to make a purchase and that standard message and data rates may apply. *
                    </label>
                  </div>

                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      required
                      id="consentToHIPAA"
                      className="mt-1"
                      checked={optInData.consentToHIPAA}
                      onChange={(e) => setOptInData(prev => ({ ...prev, consentToHIPAA: e.target.checked }))}
                    />
                    <label htmlFor="consentToHIPAA" className="ml-2 text-sm text-gray-600">
                      I acknowledge that I have read and agree to the HIPAA Authorization, Privacy Policy, and Terms of Service. I understand that this authorization allows SafeHaven Insurance to use my personal health information to provide insurance quotes and services. *
                    </label>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Start Chat
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Additional Resources */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <Link href="/guide" className="block bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-2">Free Insurance Guide</h3>
            <p className="text-gray-600">Download our comprehensive guide to final expense insurance.</p>
          </Link>
          
          <Link href="/quote" className="block bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-2">Get a Quote</h3>
            <p className="text-gray-600">Get an instant quote for final expense insurance coverage.</p>
          </Link>
          
          <Link href="/faq" className="block bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-2">FAQ</h3>
            <p className="text-gray-600">Find answers to commonly asked questions about our services.</p>
          </Link>
        </div>

        {/* Legal Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            By using this service, you agree to our Terms of Service and Privacy Policy. 
            Your information is protected by industry-standard security measures and 
            will only be used in accordance with our HIPAA compliance standards.
          </p>
        </div>
      </div>
    </div>
  );
} 