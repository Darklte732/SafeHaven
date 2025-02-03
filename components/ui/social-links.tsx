'use client';

import React from 'react';
import { SafeImage } from './image';

export function SocialLinks() {
  return (
    <div className="flex items-center space-x-4">
      <a
        href="https://www.facebook.com/profile.php?id=61572357714436"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:opacity-80 transition-opacity"
      >
        <SafeImage
          src="/images/facebook.svg"
          alt="Facebook"
          width={24}
          height={24}
        />
      </a>
      <a
        href="https://x.com/safehaven159"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:opacity-80 transition-opacity"
      >
        <SafeImage
          src="/images/twitter.svg"
          alt="X (Twitter)"
          width={24}
          height={24}
        />
      </a>
      <a
        href="https://linkedin.com/company/safehaven"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:opacity-80 transition-opacity"
      >
        <SafeImage
          src="/images/linkedin.svg"
          alt="LinkedIn"
          width={24}
          height={24}
        />
      </a>
    </div>
  );
} 