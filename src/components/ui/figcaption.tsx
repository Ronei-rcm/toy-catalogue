'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface FigcaptionProps extends React.HTMLAttributes<HTMLElement> {
  align?: 'left' | 'center' | 'right';
}

const Figcaption = forwardRef<HTMLElement, FigcaptionProps>(
  ({ className, align = 'center', children, ...props }, ref) => {
    return (
      <figcaption
        ref={ref}
        className={cn(
          'text-sm text-muted-foreground',
          {
            'text-left': align === 'left',
            'text-center': align === 'center',
            'text-right': align === 'right',
          },
          className
        )}
        {...props}
      >
        {children}
      </figcaption>
    );
  }
);

Figcaption.displayName = 'Figcaption';

export { Figcaption }; 