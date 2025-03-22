'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface EmbedProps extends React.EmbedHTMLAttributes<HTMLEmbedElement> {
  aspectRatio?: '16:9' | '4:3' | '1:1';
  type?: string;
}

const aspectRatioClasses = {
  '16:9': 'aspect-video',
  '4:3': 'aspect-[4/3]',
  '1:1': 'aspect-square',
};

const Embed = forwardRef<HTMLEmbedElement, EmbedProps>(
  ({ className, aspectRatio = '16:9', type, ...props }, ref) => {
    return (
      <div className={cn('relative overflow-hidden rounded-lg', aspectRatioClasses[aspectRatio])}>
        <embed
          ref={ref}
          type={type}
          className={cn('absolute inset-0 h-full w-full border-0', className)}
          {...props}
        />
      </div>
    );
  }
);

Embed.displayName = 'Embed';

export { Embed }; 