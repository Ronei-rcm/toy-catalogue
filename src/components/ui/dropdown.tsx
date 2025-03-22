'use client';

import { forwardRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  trigger: React.ReactNode;
  items: {
    label: string;
    onClick?: () => void;
    disabled?: boolean;
    icon?: React.ReactNode;
  }[];
  align?: 'start' | 'center' | 'end';
}

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ className, trigger, items, align = 'start', ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div
        ref={ref}
        className="relative inline-block"
        {...props}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          {trigger}
          <ChevronDown className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')} />
        </button>
        {isOpen && (
          <div
            className={cn(
              'absolute z-50 mt-1 min-w-[8rem] rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
              {
                'left-0': align === 'start',
                'left-1/2 -translate-x-1/2': align === 'center',
                'right-0': align === 'end',
              },
              className
            )}
          >
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.onClick?.();
                  setIsOpen(false);
                }}
                disabled={item.disabled}
                className={cn(
                  'relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50',
                  item.icon && 'pl-8'
                )}
              >
                {item.icon && (
                  <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                    {item.icon}
                  </span>
                )}
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
);

Dropdown.displayName = 'Dropdown';

export { Dropdown }; 