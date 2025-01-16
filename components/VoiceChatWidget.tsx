'use client';

import React from 'react';
import Script from 'next/script'
import { usePathname } from 'next/navigation'

export default function VoiceChatWidget() {
  const pathname = usePathname()
  
  // Don't render the widget on the quote page
  if (pathname === '/quote') {
    return null
  }

  return (
    <Script
      id="elevenlabs-widget"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          const script = document.createElement('script');
          script.src = 'https://elevenlabs.io/convai-widget/index.js';
          script.async = true;
          document.body.appendChild(script);
          
          const widget = document.createElement('elevenlabs-convai');
          widget.setAttribute('agent-id', 'KHOc8L54G71Pihv00Dca');
          widget.setAttribute('rating', '97');
          widget.setAttribute('form-validation', 'true');
          widget.setAttribute('interactive-elements', 'true');
          widget.setAttribute('performance-mode', 'high');
          document.body.appendChild(widget);
        `
      }}
    />
  )
} 