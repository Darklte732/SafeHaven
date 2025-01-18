'use client';

import React from 'react';
import { Input } from '@/components/ui/input';

interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange: (value: string) => void;
}

export function PhoneInput({ value, onChange, ...props }: PhoneInputProps) {
  const formatPhoneNumber = (input: string) => {
    // Remove all non-digit characters
    const digits = input.replace(/\D/g, '');
    
    // Format the number as (XXX) XXX-XXXX
    if (digits.length <= 3) {
      return digits;
    } else if (digits.length <= 6) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    } else {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhoneNumber(e.target.value);
    onChange(formattedValue);
  };

  return (
    <Input
      type="tel"
      value={value}
      onChange={handleChange}
      maxLength={14} // (XXX) XXX-XXXX = 14 characters
      placeholder="(555) 555-5555"
      {...props}
    />
  );
} 