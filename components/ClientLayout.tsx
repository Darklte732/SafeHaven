'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const VoiceChatWidget = dynamic(() => import('./VoiceChatWidget'), { ssr: false });

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <VoiceChatWidget />
    </>
  );
} 