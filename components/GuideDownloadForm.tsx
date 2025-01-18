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

  const downloadFile = async (url: string, fileName: string) => {
    try {
      // Create an invisible iframe
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);

      // Create a form inside the iframe
      const form = document.createElement('form');
      form.method = 'GET';
      form.action = url;

      // Add the form to the iframe and submit it
      if (iframe.contentWindow) {
        iframe.contentWindow.document.body.appendChild(form);
        form.submit();
      }

      // Clean up after a delay
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 2000);

      setSuccessMessage('Guide download started!');
      toast.success('Your guide is being downloaded!');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download guide. Please try again.');
      throw error;
    }
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
      console.log('Submitting form data:', formData);
      const response = await fetch('/api/guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to download guide');
      }

      const data = await response.json();
      if (!data.url) {
        throw new Error('No download URL received');
      }

      await downloadFile(data.url, data.fileName);
      setFormData({ name: '', email: '', phone: '', zipCode: '' });
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to download guide';
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