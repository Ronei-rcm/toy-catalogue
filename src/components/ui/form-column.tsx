import React from 'react';
import { cn } from '@/lib/utils';

interface FormColumnProps {
  children: React.ReactNode;
  className?: string;
}

export function FormColumn({
  children,
  className,
}: FormColumnProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {children}
    </div>
  );
} 