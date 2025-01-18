'use client';

import { GuideDownloadButton } from '@/components/GuideDownloadButton';

export default function GuidePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Final Expense Insurance Guide</h1>
      <div className="max-w-xl mx-auto">
        <GuideDownloadButton />
      </div>
    </div>
  );
} 