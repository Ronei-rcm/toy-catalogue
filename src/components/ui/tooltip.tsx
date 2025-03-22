'use client';

import { forwardRef, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  content: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  delay?: number;
}

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ className, content, side = 'top', align = 'center', delay = 200, children, ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const triggerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout>();

    const showTooltip = () => {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
        updatePosition();
      }, delay);
    };

    const hideTooltip = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsVisible(false);
    };

    const updatePosition = () => {
      if (!triggerRef.current || !tooltipRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;

      let top = 0;
      let left = 0;

      switch (side) {
        case 'top':
          top = triggerRect.top + scrollY - tooltipRect.height - 8;
          break;
        case 'right':
          top = triggerRect.top + scrollY + (triggerRect.height - tooltipRect.height) / 2;
          left = triggerRect.right + scrollX + 8;
          break;
        case 'bottom':
          top = triggerRect.bottom + scrollY + 8;
          break;
        case 'left':
          top = triggerRect.top + scrollY + (triggerRect.height - tooltipRect.height) / 2;
          left = triggerRect.left + scrollX - tooltipRect.width - 8;
          break;
      }

      switch (align) {
        case 'start':
          left = triggerRect.left + scrollX;
          break;
        case 'center':
          left = triggerRect.left + scrollX + (triggerRect.width - tooltipRect.width) / 2;
          break;
        case 'end':
          left = triggerRect.right + scrollX - tooltipRect.width;
          break;
      }

      setPosition({ top, left });
    };

    useEffect(() => {
      if (isVisible) {
        window.addEventListener('scroll', updatePosition);
        window.addEventListener('resize', updatePosition);
      }

      return () => {
        window.removeEventListener('scroll', updatePosition);
        window.removeEventListener('resize', updatePosition);
      };
    }, [isVisible]);

    return (
      <div
        ref={triggerRef}
        className="inline-block"
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
      >
        {children}
        {isVisible && (
          <div
            ref={tooltipRef}
            className={cn(
              'absolute z-50 rounded-md bg-popover px-2 py-1 text-sm text-popover-foreground shadow-md',
              className
            )}
            style={{
              top: position.top,
              left: position.left,
            }}
            {...props}
          >
            {content}
          </div>
        )}
      </div>
    );
  }
);

Tooltip.displayName = 'Tooltip';

export { Tooltip };
