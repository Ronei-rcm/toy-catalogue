import React from 'react';
import { cn } from '@/lib/utils';

interface FormActionsProps {
  children: React.ReactNode;
  className?: string;
}

export function FormActions({
  children,
  className,
}: FormActionsProps) {
  return (
    <div className={cn('flex items-center justify-end space-x-4', className)}>
      {children}
    </div>
  );
} 