'use client';

import * as React from 'react';
import { Input } from '@/components/ui/input';

interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    onChange: (value: string) => void;
    value: string;
}

export function PhoneInput({ onChange, value, className, ...props }: PhoneInputProps) {
    const formatPhoneNumber = (input: string): string => {
        const numbers = input.replace(/\D/g, '');
        if (numbers.length <= 3) {
            return numbers;
        } else if (numbers.length <= 6) {
            return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
        } else {
            return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhoneNumber(e.target.value);
        onChange(formatted);
    };

    return (
        <Input
            type="tel"
            value={value}
            onChange={handleChange}
            maxLength={14}
            className={className}
            {...props}
        />
    );
} 