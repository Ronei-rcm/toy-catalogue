import React from 'react';
import { cn } from '@/lib/utils';

interface FormRowProps {
  children: React.ReactNode;
  className?: string;
}

export function FormRow({
  children,
  className,
}: FormRowProps) {
  return (
    <div className={cn('grid grid-cols-1 gap-4 sm:grid-cols-2', className)}>
      {children}
    </div>
  );
} 