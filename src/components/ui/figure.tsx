'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export interface FigureProps extends React.HTMLAttributes<HTMLElement> {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}

const Figure = forwardRef<HTMLElement, FigureProps>(
  ({ className, src, alt, caption, width, height, objectFit = 'cover', ...props }, ref) => {
    return (
      <figure
        ref={ref}
        className={cn('space-y-2', className)}
        {...props}
      >
        <div className="relative overflow-hidden rounded-lg">
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
        </div>
        {caption && (
          <figcaption className="text-center text-sm text-muted-foreground">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }
);

Figure.displayName = 'Figure';

export { Figure }; 