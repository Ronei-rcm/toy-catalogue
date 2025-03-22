import React from 'react';
import { cn } from '@/lib/utils';

interface FormDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function FormDescription({
  children,
  className,
}: FormDescriptionProps) {
  return (
    <p className={cn('text-sm text-gray-500', className)}>
      {children}
    </p>
  );
} 