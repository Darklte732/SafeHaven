import React from 'react';
import { cn } from '@/lib/utils';

interface FormErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {
  message?: string;
}

export function FormError({ message, className, ...props }: FormErrorProps) {
  if (!message) return null;

  return (
    <p
      className={cn(
        'text-sm font-medium text-destructive mt-1',
        className
      )}
      {...props}
    >
      {message}
    </p>
  );
} 