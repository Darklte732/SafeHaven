'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SafeImage } from './image';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <SafeImage
                src="/images/logo.svg"
                alt="SafeHaven Insurance"
                width={40}
                height={40}
              />
              <span className="ml-2 text-xl font-semibold text-gray-900">SafeHaven</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/features" className="text-gray-600 hover:text-gray-900">Features</Link>
            <Link href="/quote" className="text-gray-600 hover:text-gray-900">Get Quote</Link>
            <Link href="/faq" className="text-gray-600 hover:text-gray-900">FAQ</Link>
            <Link href="/chat" className="text-gray-600 hover:text-gray-900">Chat with AI</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            href="/features"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            Features
          </Link>
          <Link
            href="/quote"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            Get Quote
          </Link>
          <Link
            href="/faq"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            FAQ
          </Link>
          <Link
            href="/chat"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            Chat with AI
          </Link>
        </div>
      </div>
    </nav>
  );
}