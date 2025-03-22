import React from 'react';
import { cn } from '@/lib/utils';

interface FormErrorProps {
  message: string;
  className?: string;
}

export function FormError({
  message,
  className,
}: FormErrorProps) {
  return (
    <p className={cn('text-sm text-red-600', className)}>
      {message}
    </p>
  );
} 