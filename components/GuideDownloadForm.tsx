'use client';

import React, { useState } from 'react';
import { FormInput } from './FormInput';
import { FormSuccess } from './FormSuccess';
import { LoadingSpinner } from './LoadingSpinner';
import { PhoneInput } from './PhoneInput';
import { Label } from './Label';

const GUIDE_URL = 'https://drive.google.com/file/d/1Hs_Ys0Iu_0XJIlWRFtPjwBZKE-5_GBXJ/view?usp=sharing';

export function GuideDownloadForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [zip, setZip] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          zip,
          type: 'guide'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save lead information');
      }

      setSuccess(true);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err instanceof Error ? err.message : 'Failed to save lead information');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="space-y-4">
        <FormSuccess message="Thank you! Your information has been saved." />
        <a 
          href={GUIDE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full"
        >
          <button
            type="button"
            className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors"
          >
            Download Guide
          </button>
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Full Name</Label>
        <FormInput
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="John Smith"
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <FormInput
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="john@example.com"
        />
      </div>

      <div>
        <Label htmlFor="phone">Phone (Optional)</Label>
        <PhoneInput
          id="phone"
          value={phone}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
          placeholder="(555) 555-5555"
        />
      </div>

      <div>
        <Label htmlFor="zip">ZIP Code (Optional)</Label>
        <FormInput
          id="zip"
          type="text"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          placeholder="12345"
          pattern="[0-9]{5}"
        />
      </div>

      {error && (
        <div className="text-red-500 text-sm mt-2">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {loading ? <LoadingSpinner /> : 'Submit Form'}
      </button>
    </form>
  );
} 