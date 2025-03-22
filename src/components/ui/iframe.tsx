'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface IframeProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
  aspectRatio?: '16:9' | '4:3' | '1:1';
  allowFullscreen?: boolean;
  loading?: 'lazy' | 'eager';
  sandbox?: string;
}

const aspectRatioClasses = {
  '16:9': 'aspect-video',
  '4:3': 'aspect-[4/3]',
  '1:1': 'aspect-square',
};

const Iframe = forwardRef<HTMLIFrameElement, IframeProps>(
  ({ className, aspectRatio = '16:9', allowFullscreen = true, loading = 'lazy', sandbox, ...props }, ref) => {
    return (
      <div className={cn('relative overflow-hidden rounded-lg', aspectRatioClasses[aspectRatio])}>
        <iframe
          ref={ref}
          allowFullScreen={allowFullscreen}
          loading={loading}
          sandbox={sandbox}
          className={cn('absolute inset-0 h-full w-full border-0', className)}
          {...props}
        />
      </div>
    );
  }
);

Iframe.displayName = 'Iframe';

export { Iframe }; 