'use client';

import React from 'react';

const GUIDE_URL = 'https://drive.google.com/file/d/1cPJgM4D4HR_eQLIF8miQA6uTHDzN0NyN/view?usp=drive_link';

export function GuideDownloadButton() {
  return (
    <a 
      href={GUIDE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full"
    >
      <button
        type="button"
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        Download Free Guide
      </button>
    </a>
  );
} 