import React from 'react';
import type { AppProps } from 'next/app';
import { Toaster } from 'sonner';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster position="top-center" />
    </>
  );
} 