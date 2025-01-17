'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SafeImage } from './image';
import { Button } from '@/components/ui/button';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-blue-600">
                SafeHaven
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/features" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
                Features
              </Link>
              <Link href="/faq" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
                FAQ
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/guide" className="hidden sm:inline-flex">
              <Button 
                variant="outline" 
                size="default"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Download Free Guide
              </Button>
            </Link>
            <Link href="/quote">
              <Button 
                variant="default"
                size="default"
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                Get a Quote
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className="sm:hidden">
        <div className="pt-2 pb-3 space-y-1">
          <Link href="/features" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50">
            Features
          </Link>
          <Link href="/faq" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50">
            FAQ
          </Link>
          <Link href="/guide" className="block pl-3 pr-4 py-2 text-base font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50">
            Download Free Guide
          </Link>
        </div>
      </div>
    </nav>
  );
}