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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

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

      // Create a hidden link and click it to start the download
      const link = document.createElement('a');
      link.href = result.url;
      link.download = result.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

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

      {error && (
        <p className="text-red-600 text-sm mt-2">{error}</p>
      )}

      {success && (
        <FormSuccess message="Thank you! Your guide is downloading now. If it doesn't start automatically, check your downloads folder or try clicking the button again." />
      )}
    </form>
  );
} 