"use client"

import { forwardRef, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export interface SliderProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  onValueChange?: (value: number) => void;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  showValue?: boolean;
}

const Slider = forwardRef<HTMLDivElement, SliderProps>(
  ({ className, value: controlledValue, onValueChange, defaultValue = 0, min = 0, max = 100, step = 1, showValue = false, ...props }, ref) => {
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
    const [isDragging, setIsDragging] = useState(false);
    const sliderRef = useRef<HTMLDivElement>(null);

    const value = controlledValue ?? uncontrolledValue;
    const setValue = (newValue: number) => {
      const clampedValue = Math.min(max, Math.max(min, newValue));
      if (controlledValue === undefined) {
        setUncontrolledValue(clampedValue);
      }
      onValueChange?.(clampedValue);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
      setIsDragging(true);
      updateValue(e);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      updateValue(e);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const updateValue = (e: MouseEvent | React.MouseEvent) => {
      if (!sliderRef.current) return;

      const rect = sliderRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = x / rect.width;
      const newValue = min + (max - min) * percentage;
      setValue(Math.round(newValue / step) * step);
    };

    useEffect(() => {
      if (isDragging) {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
      }

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }, [isDragging]);

    const percentage = ((value - min) / (max - min)) * 100;

    return (
      <div
        ref={ref}
        className={cn('relative flex w-full items-center', className)}
        {...props}
      >
        <div
          ref={sliderRef}
          className="relative h-2 w-full rounded-full bg-muted"
        >
          <div
            className="absolute h-full rounded-full bg-primary"
            style={{ width: `${percentage}%` }}
          />
          <button
            className={cn(
              'absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
              isDragging && 'cursor-grabbing'
            )}
            style={{ left: `${percentage}%` }}
            onMouseDown={handleMouseDown}
          />
        </div>
        {showValue && (
          <div className="ml-4 min-w-[3rem] text-sm">
            {value}
          </div>
        )}
      </div>
    );
  }
);

Slider.displayName = 'Slider';

export { Slider };
