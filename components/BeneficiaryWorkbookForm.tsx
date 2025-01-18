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
  familySize: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  zipCode?: string;
  familySize?: string;
}

export function BeneficiaryWorkbookForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    zipCode: '',
    familySize: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showDownloadButton, setShowDownloadButton] = useState(false);

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

    if (formData.familySize && !/^[1-9][0-9]*$/.test(formData.familySize)) {
      errors.familySize = 'Please enter a valid number';
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage('');
    setErrors({});
    setShowDownloadButton(false);
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/workbook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to process request');
      }

      setSuccessMessage('Thank you! Click the button below to download your workbook.');
      toast.success('Form submitted successfully!');
      
      setFormData({ name: '', email: '', phone: '', zipCode: '', familySize: '' });
      setShowDownloadButton(true);

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
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Free Workbook: Plan for Your Loved Ones</h2>
        <p className="text-gray-600 mt-2">Get your comprehensive beneficiary planning workbook to secure your family's future.</p>
      </div>

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

      <div>
        <Label htmlFor="familySize">Number of Family Members (Optional)</Label>
        <Input
          id="familySize"
          name="familySize"
          type="number"
          min="1"
          value={formData.familySize}
          onChange={handleChange}
          placeholder="e.g., 4"
          className="mt-1"
        />
        <FormError message={errors.familySize} />
      </div>

      {!showDownloadButton ? (
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
          {isLoading ? (
            <>
              <LoadingSpinner className="mr-2" />
              Processing...
            </>
          ) : (
            'Download Your Free Workbook!'
          )}
        </Button>
      ) : (
        <div className="w-full">
          <a 
            href="https://powrsyajxwotomihmvum.supabase.co/storage/v1/object/public/workbooks/beneficiary-planning-workbook.pdf"
            download="SafeHaven-Beneficiary-Planning-Workbook.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full"
            onClick={() => toast.success('Download started!')}
          >
            <Button 
              type="button" 
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Download Your Free Workbook!
            </Button>
          </a>
          <p className="text-sm text-gray-500 mt-2 text-center">
            If the download doesn't start automatically, click the button again
          </p>
        </div>
      )}

      <FormSuccess message={successMessage} />
    </form>
  );
} 