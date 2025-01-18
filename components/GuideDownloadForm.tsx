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
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation (optional)
    if (formData.phone && !/^\(\d{3}\) \d{3}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // ZIP code validation (optional)
    if (formData.zipCode && !/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Please enter a valid ZIP code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setSuccess(false);

    try {
      const response = await fetch('/api/guide', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to download guide');
      }

      setSuccess(true);
      toast.success('Guide sent! Please check your email.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        zipCode: '',
      });
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong');
      setSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Smith"
          disabled={isLoading}
          className={errors.name ? 'border-red-500' : ''}
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
          disabled={isLoading}
          className={errors.email ? 'border-red-500' : ''}
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
            setFormData((prev) => ({
              ...prev,
              phone: value,
            }));
            if (errors.phone) {
              setErrors((prev) => ({
                ...prev,
                phone: undefined,
              }));
            }
          }}
          disabled={isLoading}
          className={errors.phone ? 'border-red-500' : ''}
        />
        <FormError message={errors.phone} />
      </div>

      <div>
        <Label htmlFor="zipCode">ZIP Code (Optional)</Label>
        <Input
          id="zipCode"
          name="zipCode"
          type="text"
          value={formData.zipCode}
          onChange={handleChange}
          placeholder="12345"
          maxLength={10}
          disabled={isLoading}
          className={errors.zipCode ? 'border-red-500' : ''}
        />
        <FormError message={errors.zipCode} />
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? (
          <>
            <LoadingSpinner className="mr-2" />
            Sending...
          </>
        ) : (
          'Download Guide'
        )}
      </Button>

      <FormSuccess
        message={
          success
            ? 'Guide sent! Please check your email for the download link.'
            : undefined
        }
      />
    </form>
  );
} 