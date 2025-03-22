import React from 'react';
import { cn } from '@/lib/utils';

interface FormHintProps {
  children: React.ReactNode;
  className?: string;
}

export function FormHint({
  children,
  className,
}: FormHintProps) {
  return (
    <p className={cn('text-sm text-gray-500', className)}>
      {children}
    </p>
  );
} 