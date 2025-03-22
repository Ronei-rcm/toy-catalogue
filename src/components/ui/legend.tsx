'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface LegendProps extends React.HTMLAttributes<HTMLLegendElement> {
  required?: boolean;
}

const Legend = forwardRef<HTMLLegendElement, LegendProps>(
  ({ className, required, children, ...props }, ref) => {
    return (
      <legend
        ref={ref}
        className={cn(
          'text-sm font-medium leading-none',
          className
        )}
        {...props}
      >
        {children}
        {required && <span className="ml-1 text-destructive">*</span>}
      </legend>
    );
  }
);

Legend.displayName = 'Legend';

export { Legend }; 