'use client';

import { forwardRef, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export interface PopoverProps extends React.HTMLAttributes<HTMLDivElement> {
  trigger: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'right' | 'bottom' | 'left';
  sideOffset?: number;
}

const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  ({ className, trigger, isOpen: controlledIsOpen, onOpenChange, align = 'center', side = 'bottom', sideOffset = 4, children, ...props }, ref) => {
    const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);
    const triggerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const isOpen = controlledIsOpen ?? uncontrolledIsOpen;
    const setIsOpen = (open: boolean) => {
      if (controlledIsOpen === undefined) {
        setUncontrolledIsOpen(open);
      }
      onOpenChange?.(open);
    };

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          isOpen &&
          contentRef.current &&
          triggerRef.current &&
          !contentRef.current.contains(event.target as Node) &&
          !triggerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const getPosition = () => {
      const triggerRect = triggerRef.current?.getBoundingClientRect();
      const contentRect = contentRef.current?.getBoundingClientRect();
      if (!triggerRect || !contentRect) return {};

      const position: Record<string, number> = {};

      switch (side) {
        case 'top':
          position.bottom = triggerRect.height + sideOffset;
          break;
        case 'right':
          position.left = triggerRect.width + sideOffset;
          break;
        case 'bottom':
          position.top = triggerRect.height + sideOffset;
          break;
        case 'left':
          position.right = triggerRect.width + sideOffset;
          break;
      }

      switch (align) {
        case 'start':
          position.left = 0;
          break;
        case 'center':
          position.left = (triggerRect.width - contentRect.width) / 2;
          break;
        case 'end':
          position.right = 0;
          break;
      }

      return position;
    };

    return (
      <div className="relative inline-block" ref={triggerRef}>
        <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
        {isOpen && (
          <div
            ref={contentRef}
            className={cn(
              'absolute z-50 min-w-[8rem] rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none',
              className
            )}
            style={getPosition()}
            {...props}
          >
            {children}
          </div>
        )}
      </div>
    );
  }
);

Popover.displayName = 'Popover';

export { Popover };
