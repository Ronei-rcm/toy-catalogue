'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export interface PictureProps extends React.HTMLAttributes<HTMLElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  sources?: {
    srcSet: string;
    media?: string;
    type?: string;
  }[];
}

const Picture = forwardRef<HTMLElement, PictureProps>(
  ({ className, src, alt, width, height, objectFit = 'cover', sources, ...props }, ref) => {
    return (
      <picture
        ref={ref}
        className={cn('relative block', className)}
        {...props}
      >
        {sources?.map((source, index) => (
          <source
            key={index}
            srcSet={source.srcSet}
            media={source.media}
            type={source.type}
          />
        ))}
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={cn('transition-all duration-300', {
            'object-contain': objectFit === 'contain',
            'object-cover': objectFit === 'cover',
            'object-fill': objectFit === 'fill',
            'object-none': objectFit === 'none',
            'object-scale-down': objectFit === 'scale-down',
          })}
        />
      </picture>
    );
  }
);

Picture.displayName = 'Picture';

export { Picture }; 