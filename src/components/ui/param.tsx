'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ParamProps extends React.ParamHTMLAttributes<HTMLParamElement> {
  name: string;
  value: string;
}

const Param = forwardRef<HTMLParamElement, ParamProps>(
  ({ className, name, value, ...props }, ref) => {
    return (
      <param
        ref={ref}
        name={name}
        value={value}
        className={cn(className)}
        {...props}
      />
    );
  }
);

Param.displayName = 'Param';

export { Param }; 