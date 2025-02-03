'use client'

import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

interface SafeImageProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string
}

export function SafeImage({ src, alt, fallbackSrc = '/images/placeholder.jpg', ...props }: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [error, setError] = useState(false)

  return (
    <Image
      {...props}
      src={error ? fallbackSrc : imgSrc}
      alt={alt}
      onError={() => {
        setImgSrc(fallbackSrc)
        setError(true)
      }}
    />
  )
} 