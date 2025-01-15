'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SafeImage } from './image';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Remove any existing widget first
    const existingWidget = document.querySelector('elevenlabs-convai');
    if (existingWidget) {
      existingWidget.remove();
    }

    // Remove any existing script
    const existingScript = document.querySelector('script[src="https://widget.elevenlabs.io/widget.js"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Create and load the script
    const script = document.createElement('script');
    script.src = 'https://widget.elevenlabs.io/widget.js';
    script.async = true;
    
    script.onload = () => {
      // Create widget after a small delay to ensure the script is fully loaded
      setTimeout(() => {
        const widget = document.createElement('elevenlabs-convai');
        widget.setAttribute('agent-id', 'KHOc8L54G71Pihv00Dca');
        widget.setAttribute('retracted', 'true');
        widget.setAttribute('position', 'bottom-right');
        widget.setAttribute('retraction-style', 'avatar');
        widget.setAttribute('avatar-retractable', 'true');
        widget.style.position = 'fixed';
        widget.style.bottom = '80px';
        widget.style.right = '20px';
        widget.style.zIndex = '9999';
        widget.style.display = 'block';
        document.body.appendChild(widget);
      }, 1000);
    };
    
    document.head.appendChild(script);
    
    return () => {
      const widget = document.querySelector('elevenlabs-convai');
      if (widget) widget.remove();
      const scriptToRemove = document.querySelector('script[src="https://widget.elevenlabs.io/widget.js"]');
      if (scriptToRemove) scriptToRemove.remove();
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <SafeImage
                src="/images/logo.png"
                alt="Safehaven Logo"
                width={140}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link href="/features" className="text-gray-600 hover:text-gray-900">Features</Link>
            <Link href="/quote" className="text-gray-600 hover:text-gray-900">Get Quote</Link>
            <Link href="/faq" className="text-gray-600 hover:text-gray-900">FAQ</Link>
            <Link 
              href="/login"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors"
            >
              Sign In
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
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
            href="/login"
            className="block px-3 py-2 rounded-md text-base font-medium text-white bg-primary hover:bg-primary/90"
          >
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
}