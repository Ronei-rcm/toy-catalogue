'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface TrackProps extends React.TrackHTMLAttributes<HTMLTrackElement> {
  kind: 'subtitles' | 'captions' | 'descriptions' | 'chapters' | 'metadata';
  src: string;
  srcLang: string;
  label?: string;
  default?: boolean;
}

const Track = forwardRef<HTMLTrackElement, TrackProps>(
  ({ className, kind, src, srcLang, label, default: isDefault, ...props }, ref) => {
    return (
      <track
        ref={ref}
        kind={kind}
        src={src}
        srcLang={srcLang}
        label={label}
        default={isDefault}
        className={cn(className)}
        {...props}
      />
    );
  }
);

Track.displayName = 'Track';

export { Track }; 