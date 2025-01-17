import React from 'react';
import { Input } from '@/components/ui/input';

interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    value: string;
    onChange: (value: string) => void;
}

export function PhoneInput({ value, onChange, className, ...props }: PhoneInputProps) {
    const formatPhoneNumber = (input: string) => {
        // Remove all non-numeric characters
        const cleaned = input.replace(/\D/g, '');
        
        // Format the number
        let formatted = cleaned;
        if (cleaned.length > 0) {
            if (cleaned.length <= 3) {
                formatted = cleaned;
            } else if (cleaned.length <= 6) {
                formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
            } else {
                formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
            }
        }
        
        return formatted;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhoneNumber(e.target.value);
        onChange(formatted);
    };

    return (
        <Input
            type="tel"
            value={formatPhoneNumber(value)}
            onChange={handleChange}
            className={className}
            maxLength={14}
            {...props}
        />
    );
} 