'use client';

import React from 'react';

const WORKBOOK_URL = 'https://drive.google.com/file/d/1Q3guYxl28UzAkI1nkFEIbyq9h1mAf5TZ/view?usp=sharing';

export function WorkbookDownloadButton() {
  return (
    <a 
      href={WORKBOOK_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full"
    >
      <button
        type="button"
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        Download Free Workbook
      </button>
    </a>
  );
} 