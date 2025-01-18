'use client';

import React, { useState } from 'react';
import { FormInput } from './FormInput';
import { FormSuccess } from './FormSuccess';
import { LoadingSpinner } from './LoadingSpinner';
import { PhoneInput } from './PhoneInput';
import { Label } from './Label';

export function GuideDownloadForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setDownloadUrl('');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      zipCode: formData.get('zipCode')
    };

    try {
      const response = await fetch('/api/guide', {
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

      // Store the download URL
      setDownloadUrl(result.url);
      setSuccess(true);
      
      // Try to start the download
      window.open(result.url, '_blank');
      
      // Reset form
      e.currentTarget.reset();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadClick = () => {
    if (downloadUrl) {
      window.open(downloadUrl, '_blank');
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
        <button
          type="button"
          onClick={handleDownloadClick}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
        >
          Download Guide Again
        </button>
      )}

      {error && (
        <p className="text-red-600 text-sm mt-2">{error}</p>
      )}

      {success && (
        <FormSuccess message="Thank you! Your guide should be downloading now. If it doesn't start automatically, click the button above to try again." />
      )}
    </form>
  );
} 