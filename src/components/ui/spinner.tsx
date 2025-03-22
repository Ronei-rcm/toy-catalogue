'use client';

import { cn } from '@/lib/utils';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
}

const Spinner = ({ className, size = 'md', ...props }: SpinnerProps) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  return (
    <div
      className={cn('animate-spin rounded-full border-2 border-current border-t-transparent', sizes[size], className)}
      {...props}
    />
  );
};

export { Spinner }; 