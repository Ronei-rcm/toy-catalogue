import React from 'react';
import { cn } from '@/lib/utils';

interface FormDividerProps {
  label?: string;
  className?: string;
}

export function FormDivider({
  label,
  className,
}: FormDividerProps) {
  return (
    <div className={cn('relative', className)}>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300" />
      </div>
      {label && (
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">{label}</span>
        </div>
      )}
    </div>
  );
} 