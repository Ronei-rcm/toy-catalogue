'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ObjectProps extends React.ObjectHTMLAttributes<HTMLObjectElement> {
  aspectRatio?: '16:9' | '4:3' | '1:1';
  type?: string;
  data?: string;
}

const aspectRatioClasses = {
  '16:9': 'aspect-video',
  '4:3': 'aspect-[4/3]',
  '1:1': 'aspect-square',
};

const Object = forwardRef<HTMLObjectElement, ObjectProps>(
  ({ className, aspectRatio = '16:9', type, data, ...props }, ref) => {
    return (
      <div className={cn('relative overflow-hidden rounded-lg', aspectRatioClasses[aspectRatio])}>
        <object
          ref={ref}
          type={type}
          data={data}
          className={cn('absolute inset-0 h-full w-full border-0', className)}
          {...props}
        />
      </div>
    );
  }
);

Object.displayName = 'Object';

export { Object }; 