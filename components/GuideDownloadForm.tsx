'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { PhoneInput } from '@/components/ui/phone-input';
import { toast } from 'sonner';
import { FormError } from '@/components/ui/form-error';
import { FormSuccess } from '@/components/ui/form-success';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface FormData {
  name: string;
  email: string;
  phone: string;
  zipCode: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  zipCode?: string;
}

export function GuideDownloadForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    zipCode: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = (): FormErrors => {
    const errors: FormErrors = {};

    if (!formData.name) {
      errors.name = 'Name is required';
    }

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }

    if (formData.phone && !/^\+?1?\s*\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/.test(formData.phone)) {
      errors.phone = 'Invalid phone format';
    }

    if (formData.zipCode && !/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      errors.zipCode = 'Invalid ZIP code format';
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage('');
    setErrors({});
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/guide', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to download guide');
      }

      // Get the blob data from the response
      const blob = await response.blob();
      
      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary link and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = 'SafeHaven-Final-Expense-Guide.pdf';
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      // Show success message
      setSuccessMessage('Thank you! Your guide is being downloaded.');
      toast.success('Form submitted successfully!');
      
      // Reset form
      setFormData({ name: '', email: '', phone: '', zipCode: '' });

    } catch (error) {
      console.error('Error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to process request';
      toast.error(errorMessage);
      setErrors(prev => ({ ...prev, submit: errorMessage }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Smith"
          className="mt-1"
        />
        <FormError message={errors.name} />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
          className="mt-1"
        />
        <FormError message={errors.email} />
      </div>

      <div>
        <Label htmlFor="phone">Phone (Optional)</Label>
        <PhoneInput
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={(value) => {
            setFormData(prev => ({ ...prev, phone: value }));
            setErrors(prev => ({ ...prev, phone: undefined }));
          }}
          className="mt-1"
        />
        <FormError message={errors.phone} />
      </div>

      <div>
        <Label htmlFor="zipCode">ZIP Code (Optional)</Label>
        <Input
          id="zipCode"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          placeholder="12345"
          className="mt-1"
        />
        <FormError message={errors.zipCode} />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <LoadingSpinner className="mr-2" />
            Processing...
          </>
        ) : (
          'Download Free Guide'
        )}
      </Button>

      <FormSuccess message={successMessage} />
    </form>
  );
} 