'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface AudioProps extends React.AudioHTMLAttributes<HTMLAudioElement> {
  autoplay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  preload?: 'auto' | 'metadata' | 'none';
  variant?: 'default' | 'compact';
}

const Audio = forwardRef<HTMLAudioElement, AudioProps>(
  ({ className, autoplay, controls = true, loop, muted, preload = 'metadata', variant = 'default', ...props }, ref) => {
    return (
      <div className={cn('w-full', variant === 'compact' && 'max-w-xs')}>
        <audio
          ref={ref}
          autoPlay={autoplay}
          controls={controls}
          loop={loop}
          muted={muted}
          preload={preload}
          className={cn('w-full', className)}
          {...props}
        />
      </div>
    );
  }
);

Audio.displayName = 'Audio';

export { Audio }; 