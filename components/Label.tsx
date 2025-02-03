'use client';

import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor: string;
}

export function Label({ className = '', children, ...props }: LabelProps) {
  return (
    <label
      {...props}
      className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}
    >
      {children}
    </label>
  );
} 