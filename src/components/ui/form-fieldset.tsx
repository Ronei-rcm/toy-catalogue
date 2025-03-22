import React from 'react';
import { cn } from '@/lib/utils';

interface FormFieldsetProps {
  legend?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormFieldset({
  legend,
  children,
  className,
}: FormFieldsetProps) {
  return (
    <fieldset className={cn('space-y-4', className)}>
      {legend && (
        <legend className="text-sm font-medium text-gray-700">
          {legend}
        </legend>
      )}
      {children}
    </fieldset>
  );
} 