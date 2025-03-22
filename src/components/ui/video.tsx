'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface VideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  poster?: string;
  autoplay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  preload?: 'auto' | 'metadata' | 'none';
  aspectRatio?: '16:9' | '4:3' | '1:1';
}

const aspectRatioClasses = {
  '16:9': 'aspect-video',
  '4:3': 'aspect-[4/3]',
  '1:1': 'aspect-square',
};

const Video = forwardRef<HTMLVideoElement, VideoProps>(
  ({ className, poster, autoplay, controls = true, loop, muted, playsInline, preload = 'metadata', aspectRatio = '16:9', ...props }, ref) => {
    return (
      <div className={cn('relative overflow-hidden rounded-lg', aspectRatioClasses[aspectRatio])}>
        <video
          ref={ref}
          poster={poster}
          autoPlay={autoplay}
          controls={controls}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          preload={preload}
          className={cn('h-full w-full object-cover', className)}
          {...props}
        />
      </div>
    );
  }
);

Video.displayName = 'Video';

export { Video }; 