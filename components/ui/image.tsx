'use client'

import { useState } from 'react'
import Image from 'next/image'

interface SafeImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
}

export function SafeImage({ src, alt, width, height, className, priority = false }: SafeImageProps) {
  const [isLoading, setLoading] = useState(true)
  const [hasError, setError] = useState(false)

  if (hasError) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-100 ${className || ''}`}
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <span className="text-gray-400">{alt}</span>
      </div>
    )
  }

  return (
    <div className={`relative ${isLoading ? 'animate-pulse bg-gray-200' : ''}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`duration-700 ease-in-out ${isLoading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0'} ${className || ''}`}
        priority={priority}
        quality={90}
        loading={priority ? 'eager' : 'lazy'}
        onLoadingComplete={() => setLoading(false)}
        onError={() => setError(true)}
      />
    </div>
  )
} 