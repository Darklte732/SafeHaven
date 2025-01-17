'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface TrustBadgesProps extends React.HTMLAttributes<HTMLDivElement> {}

export function TrustBadges({ className, ...props }: TrustBadgesProps) {
  return (
    <div className={cn('flex items-center gap-4', className)} {...props}>
      <div className="flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
          <svg
            className="h-4 w-4"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2Z" />
          </svg>
        </div>
        <span className="text-sm font-medium">A+ BBB Rating</span>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
          <svg
            className="h-4 w-4"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 11.99H19C18.47 16.11 15.72 19.78 12 20.93V12H5V6.3L12 3.19V11.99Z" />
          </svg>
        </div>
        <span className="text-sm font-medium">Licensed & Insured</span>
      </div>
    </div>
  );
} 