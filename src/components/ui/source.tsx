'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface SourceProps extends React.HTMLAttributes<HTMLElement> {
  srcSet: string;
  media?: string;
  type?: string;
}

const Source = forwardRef<HTMLElement, SourceProps>(
  ({ className, srcSet, media, type, ...props }, ref) => {
    return (
      <source
        ref={ref}
        srcSet={srcSet}
        media={media}
        type={type}
        className={cn(className)}
        {...props}
      />
    );
  }
);

Source.displayName = 'Source';

export { Source }; 