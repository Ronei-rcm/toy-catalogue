'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    description?: string | null;
    price: number;
    originalPrice?: number | null;
    imageUrl?: string | null;
    rating?: number | null;
    category: {
      name: string;
      slug: string;
    };
    brand?: {
      name: string;
      slug: string;
    } | null;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link href={`/produtos/${product.slug}`}>
      <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div className="relative h-48 w-full">
          <Image
            src={product.imageUrl || '/images/placeholder.jpg'}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {discount > 0 && (
            <Badge className="absolute right-2 top-2 bg-red-500">
              -{discount}%
            </Badge>
          )}
        </div>
        <CardHeader className="p-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline">{product.category.name}</Badge>
            {product.brand && (
              <Badge variant="secondary">{product.brand.name}</Badge>
            )}
          </div>
          <h3 className="mt-2 text-lg font-semibold line-clamp-2">{product.name}</h3>
          {product.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.description}
            </p>
          )}
        </CardHeader>
        <CardFooter className="p-4 pt-0">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
} 