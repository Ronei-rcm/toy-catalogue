'use client';

import Image from 'next/image';
import { useState } from 'react';

interface FallbackImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export function FallbackImage({
  src,
  alt,
  width = 300,
  height = 200,
  className = '',
}: FallbackImageProps) {
  const [error, setError] = useState(false);

  const fallbackSrc = 'https://placehold.co/600x400/e2e8f0/64748b?text=Imagem+não+encontrada';

  return (
    <Image
      src={error ? fallbackSrc : src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setError(true)}
      priority={true}
    />
  );
} 