'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface FieldsetProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  legend?: string;
  description?: string;
}

const Fieldset = forwardRef<HTMLFieldSetElement, FieldsetProps>(
  ({ className, legend, description, children, ...props }, ref) => {
    return (
      <fieldset
        ref={ref}
        className={cn('space-y-4', className)}
        {...props}
      >
        {legend && (
          <legend className="text-sm font-medium leading-none">
            {legend}
          </legend>
        )}
        {children}
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </fieldset>
    );
  }
);

Fieldset.displayName = 'Fieldset';

export { Fieldset }; 