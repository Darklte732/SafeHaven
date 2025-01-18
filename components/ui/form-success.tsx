import React from 'react';
import { cn } from '@/lib/utils';

interface FormSuccessProps extends React.HTMLAttributes<HTMLParagraphElement> {
  message?: string;
}

export function FormSuccess({ message, className, ...props }: FormSuccessProps) {
  if (!message) return null;

  return (
    <p
      className={cn(
        'text-sm font-medium text-emerald-500 mt-1',
        className
      )}
      {...props}
    >
      {message}
    </p>
  );
} 