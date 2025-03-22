'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'error' | 'info';
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'bg-muted text-muted-foreground',
      success: 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      error: 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400',
      info: 'bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
    };

    const icons = {
      default: AlertCircle,
      success: CheckCircle,
      error: XCircle,
      info: Info,
    };

    const Icon = icons[variant];

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          'relative w-full rounded-lg border p-4',
          variants[variant],
          className
        )}
        {...props}
      >
        <Icon className="h-4 w-4" />
        <div className="ml-4">{children}</div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';

const AlertTitle = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => {
    return (
      <h5
        ref={ref}
        className={cn('mb-1 font-medium leading-none tracking-tight', className)}
        {...props}
      />
    );
  }
);

AlertTitle.displayName = 'AlertTitle';

const AlertDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('text-sm [&_p]:leading-relaxed', className)}
        {...props}
      />
    );
  }
);

AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };
