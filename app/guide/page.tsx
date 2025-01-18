'use client';

import { useState } from 'react';
import { GuideDownloadForm } from '@/components/GuideDownloadForm';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function GuidePage() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isPreviewLoading, setIsPreviewLoading] = useState(true);

  return (
    <main className="flex-1 py-12 lg:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          {/* Left Column - Content */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full">
                  Free Guide
                </span>
                <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
                  Instant Download
                </span>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Your Guide to Final Expense Insurance
              </h1>
              <p className="text-xl text-gray-600 md:text-2xl">
                Protect your family's future with our comprehensive guide to final expense insurance.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">What's Inside:</h2>
              <ul className="grid gap-3">
                <li className="flex items-center">
                  <svg
                    className="mr-3 h-6 w-6 text-blue-500 flex-shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-lg">Expert insights on coverage options</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-3 h-6 w-6 text-blue-500 flex-shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-lg">Cost comparison and budgeting tips</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-3 h-6 w-6 text-blue-500 flex-shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-lg">Step-by-step application process</span>
                </li>
              </ul>
            </div>

            <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Preview Guide
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Guide Preview</DialogTitle>
                  <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="sr-only">Close</span>
                  </DialogClose>
                </DialogHeader>
                
                <div className="mt-6 space-y-6 text-gray-700">
                  <div className="prose prose-blue max-w-none">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Understanding Final Expense Insurance</h2>
                    
                    <p className="mb-4">
                      Final expense insurance, also known as burial insurance, is a specialized whole life insurance policy designed to cover end-of-life expenses. This guide will help you understand:
                    </p>
                    
                    <ul className="list-disc pl-6 mb-4 space-y-2">
                      <li>How final expense insurance differs from traditional life insurance</li>
                      <li>Why it's an important part of financial planning</li>
                      <li>Who should consider this type of coverage</li>
                    </ul>

                    <div className="bg-blue-50 p-4 rounded-lg mb-4">
                      <h3 className="text-lg font-semibold text-blue-900 mb-2">Key Benefits</h3>
                      <ul className="list-none space-y-2">
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Guaranteed acceptance options available
                        </li>
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Fixed premiums that never increase
                        </li>
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Coverage that never expires
                        </li>
                      </ul>
                    </div>

                    <div className="text-center mt-8 pt-6 border-t">
                      <p className="text-sm text-gray-500 mb-4">This is just a preview. Download the full guide to learn more about:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>Coverage amounts and policy options</li>
                        <li>How to choose the right plan</li>
                        <li>The application process</li>
                        <li>And much more...</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
                <span>PDF Format</span>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>10 Minute Read</span>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:sticky lg:top-8 space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <GuideDownloadForm />
            </div>
            
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-3 text-sm">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Instant Download</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>100% Free</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 