'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface MapaProps extends React.MapHTMLAttributes<HTMLMapElement> {
  nome: string;
}

const Mapa = forwardRef<HTMLMapElement, MapaProps>(
  ({ className, nome, children, ...props }, ref) => {
    return (
      <map
        ref={ref}
        name={nome}
        className={cn(className)}
        {...props}
      >
        {children}
      </map>
    );
  }
);

Mapa.displayName = 'Mapa';

export { Mapa }; 