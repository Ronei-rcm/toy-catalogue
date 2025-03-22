'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export interface ImgProps extends React.HTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  loading?: 'lazy' | 'eager';
  sizes?: string;
}

const Img = forwardRef<HTMLImageElement, ImgProps>(
  ({ className, src, alt, width, height, objectFit = 'cover', loading = 'lazy', sizes, ...props }, ref) => {
    return (
      <Image
        ref={ref}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        sizes={sizes}
        className={cn('transition-all duration-300', {
          'object-contain': objectFit === 'contain',
          'object-cover': objectFit === 'cover',
          'object-fill': objectFit === 'fill',
          'object-none': objectFit === 'none',
          'object-scale-down': objectFit === 'scale-down',
        }, className)}
        {...props}
      />
    );
  }
);

Img.displayName = 'Img';

export { Img }; 