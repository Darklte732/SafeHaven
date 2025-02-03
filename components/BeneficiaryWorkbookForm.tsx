'use client';

import React, { useState } from 'react';
import { FormInput } from '@/components/FormInput';
import { FormSuccess } from '@/components/FormSuccess';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { PhoneInput } from '@/components/PhoneInput';
import { Label } from '@/components/Label';
import { useRouter } from 'next/navigation';

export function BeneficiaryWorkbookForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: (formData.get('name') as string)?.trim(),
      email: (formData.get('email') as string)?.trim().toLowerCase(),
      phone: formData.get('phone') as string,
      zip: formData.get('zipCode') as string,
      type: 'workbook' as const,
      status: 'new' as const,
      family_members: formData.get('familyMembers') as string,
      message: null,
      coverage_amount: null
    };

    // Validate required fields
    if (!data.name || !data.email) {
      setError('Name and email are required');
      setIsLoading(false);
      return;
    }

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

      setSuccess(true);
      
      // Reset form
      e.currentTarget.reset();
      
      // Redirect to workbook page after short delay
      setTimeout(() => {
        router.push('/workbook');
      }, 1500);
    } catch (err: any) {
      console.error('Form submission error:', err);
      setError(err.message || 'Failed to save your information. Please try again.');
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

      <div>
        <Label htmlFor="familyMembers">Number of Family Members (Optional)</Label>
        <FormInput
          id="familyMembers"
          name="familyMembers"
          type="number"
          min="1"
          placeholder="2"
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
          'Create Your Personalized Workbook'
        )}
      </button>

      {error && (
        <p className="text-red-600 text-sm mt-2">{error}</p>
      )}

      {success && (
        <FormSuccess message="Thank you! You'll be redirected to the workbook page in a moment..." />
      )}
    </form>
  );
} 