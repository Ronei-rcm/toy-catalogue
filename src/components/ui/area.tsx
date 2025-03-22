'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface AreaProps extends React.AreaHTMLAttributes<HTMLAreaElement> {
  textoAlternativo: string;
  coordenadas: string;
  forma: 'retangulo' | 'circulo' | 'poligono' | 'padrao';
  link?: string;
}

const Area = forwardRef<HTMLAreaElement, AreaProps>(
  ({ className, textoAlternativo, coordenadas, forma, link, ...props }, ref) => {
    const shapeMap = {
      'retangulo': 'rect',
      'circulo': 'circle',
      'poligono': 'poly',
      'padrao': 'default'
    };

    return (
      <area
        ref={ref}
        alt={textoAlternativo}
        coords={coordenadas}
        shape={shapeMap[forma]}
        href={link}
        className={cn(className)}
        {...props}
      />
    );
  }
);

Area.displayName = 'Area';

export { Area }; 