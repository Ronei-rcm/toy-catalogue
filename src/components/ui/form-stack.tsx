import React from 'react';
import { cn } from '@/lib/utils';

interface FormStackProps {
  children: React.ReactNode;
  spacing?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function FormStack({
  children,
  spacing = 'md',
  className,
}: FormStackProps) {
  const spacingClasses = {
    sm: 'space-y-2',
    md: 'space-y-4',
    lg: 'space-y-6',
  };

  return (
    <div className={cn(spacingClasses[spacing], className)}>
      {children}
    </div>
  );
} 