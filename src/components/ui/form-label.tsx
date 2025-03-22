import React from 'react';
import { cn } from '@/lib/utils';

interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export function FormLabel({
  className,
  required,
  children,
  ...props
}: FormLabelProps) {
  return (
    <label
      className={cn(
        'block text-sm font-medium text-gray-700',
        className
      )}
      {...props}
    >
      {children}
      {required && (
        <span className="ml-1 text-red-500">*</span>
      )}
    </label>
  );
} 