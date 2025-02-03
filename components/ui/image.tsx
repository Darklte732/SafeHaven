'use client'

import Image from 'next/image'
import { useState } from 'react'

interface SafeImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
}

export function SafeImage({ src, alt, width, height, className = '', priority = false }: SafeImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`
          duration-700 ease-in-out
          ${isLoading ? 'scale-110 blur-lg' : 'scale-100 blur-0'}
        `}
        onLoad={() => setIsLoading(false)}
        priority={priority}
        quality={90}
        loading={priority ? 'eager' : 'lazy'}
      />
    </div>
  )
} 