'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  orientation?: 'horizontal' | 'vertical';
}

export interface RadioGroupItemProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
}

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, value, onValueChange, defaultValue, orientation = 'vertical', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'grid gap-2',
          orientation === 'horizontal' ? 'grid-flow-col' : 'grid-flow-row',
          className
        )}
        role="radiogroup"
        aria-orientation={orientation}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              checked: value === child.props.value,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                onValueChange?.(e.target.value);
              },
            });
          }
          return child;
        })}
      </div>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

const RadioGroupItem = forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ className, label, description, ...props }, ref) => {
    return (
      <div className="flex items-center space-x-2">
        <input
          ref={ref}
          type="radio"
          className={cn(
            'h-4 w-4 rounded-full border border-input text-primary ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          {...props}
        />
        {(label || description) && (
          <div className="space-y-0.5">
            {label && (
              <label
                htmlFor={props.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

RadioGroupItem.displayName = 'RadioGroupItem';

export { RadioGroup, RadioGroupItem };
