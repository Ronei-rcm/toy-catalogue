import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

interface BrandCardProps {
  brand: {
    id: string;
    name: string;
    slug: string;
    description?: string | null;
    logoUrl?: string | null;
    website?: string | null;
  };
}

export function BrandCard({ brand }: BrandCardProps) {
  return (
    <Link href={`/marcas/${brand.slug}`}>
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
        <CardContent className="p-4 flex flex-col items-center justify-center">
          <div className="relative h-24 w-full mb-4">
            <Image
              src={brand.logoUrl || '/images/placeholder.jpg'}
              alt={brand.name}
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <h3 className="text-center font-semibold">{brand.name}</h3>
          {brand.description && (
            <p className="text-sm text-center text-muted-foreground mt-2 line-clamp-2">
              {brand.description}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
} 