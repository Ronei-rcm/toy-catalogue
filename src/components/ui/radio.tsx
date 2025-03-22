import React from 'react';
import { cn } from '@/lib/utils';

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Radio({
  className,
  label,
  error,
  disabled,
  ...props
}: RadioProps) {
  return (
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <input
          type="radio"
          className={cn(
            'h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-red-500 focus:ring-red-500',
            className
          )}
          disabled={disabled}
          {...props}
        />
      </div>
      {label && (
        <div className="ml-3">
          <label
            htmlFor={props.id}
            className={cn(
              'text-sm font-medium text-gray-700',
              disabled && 'text-gray-500'
            )}
          >
            {label}
          </label>
          {error && (
            <p className="mt-1 text-sm text-red-600">{error}</p>
          )}
        </div>
      )}
    </div>
  );
} 