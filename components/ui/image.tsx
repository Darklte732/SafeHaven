'use client'

import Image from 'next/image'
import { ComponentProps } from 'react'

export type SafeImageProps = ComponentProps<typeof Image>

export function SafeImage(props: SafeImageProps) {
  return (
    <Image
      {...props}
      alt={props.alt || 'Image'}
      width={props.width || 24}
      height={props.height || 24}
    />
  )
} 