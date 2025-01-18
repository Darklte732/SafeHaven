'use client';

import React, { useState } from 'react';
import { FormInput } from '@/components/FormInput';
import { FormSuccess } from '@/components/FormSuccess';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { PhoneInput } from '@/components/PhoneInput';
import { Label } from '@/components/Label';

const GUIDE_DOWNLOAD_URL = 'https://drive.google.com/file/d/1cPJgM4D4HR_eQLIF8miQA6uTHDzN0NyN/view?usp=drive_link';

export function GuideDownloadForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      zipCode: formData.get('zipCode') as string,
      lead_type: 'guide' as const,
      status: 'completed' as const
    };

    try {
      // Save lead data
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form');
      }

      // Open the guide in a new tab
      window.open(GUIDE_DOWNLOAD_URL, '_blank');
      setSuccess(true);
      
      // Reset form
      e.currentTarget.reset();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Full Name</Label>
        <FormInput
          id="name"
          name="name"
          type="text"
          placeholder="John Smith"
          required
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <FormInput
          id="email"
          name="email"
          type="email"
          placeholder="john@example.com"
          required
        />
      </div>

      <div>
        <Label htmlFor="phone">Phone (Optional)</Label>
        <PhoneInput
          id="phone"
          name="phone"
          placeholder="(555) 555-5555"
        />
      </div>

      <div>
        <Label htmlFor="zipCode">ZIP Code (Optional)</Label>
        <FormInput
          id="zipCode"
          name="zipCode"
          type="text"
          placeholder="12345"
          pattern="[0-9]{5}"
        />
      </div>

      {!success ? (
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            'Download Free Guide'
          )}
        </button>
      ) : (
        <a
          href={GUIDE_DOWNLOAD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full"
        >
          <button
            type="button"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
          >
            Download Guide Again
          </button>
        </a>
      )}

      {error && (
        <p className="text-red-600 text-sm mt-2">{error}</p>
      )}

      {success && (
        <FormSuccess message="Thank you! Your guide should be opening in a new tab. If it doesn't open automatically, click the button above to download it again." />
      )}
    </form>
  );
} 