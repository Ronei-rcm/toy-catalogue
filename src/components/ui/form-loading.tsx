import React from 'react';
import { cn } from '@/lib/utils';
import { LoadingSpinner } from './loading-spinner';

interface FormLoadingProps {
  message?: string;
  className?: string;
}

export function FormLoading({
  message = 'Carregando...',
  className,
}: FormLoadingProps) {
  return (
    <div className={cn('flex items-center justify-center p-4', className)}>
      <div className="flex items-center space-x-2">
        <LoadingSpinner size="sm" />
        <span className="text-sm text-gray-500">{message}</span>
      </div>
    </div>
  );
} 