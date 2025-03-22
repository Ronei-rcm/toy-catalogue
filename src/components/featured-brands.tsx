'use client';

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Brand } from "@/types/brand";

interface FeaturedBrandsProps {
  brands: Brand[];
}

export function FeaturedBrands({ brands }: FeaturedBrandsProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Marcas em Destaque</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands.map((brand) => (
            <Link key={brand.id} href={`/marcas/${brand.slug}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-video">
                  {brand.logoUrl ? (
                    <Image
                      src={brand.logoUrl}
                      alt={brand.name}
                      fill
                      className="object-contain p-4"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">Sem logo</span>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg">{brand.name}</h3>
                  {brand.description && (
                    <p className="text-gray-600 mt-2">{brand.description}</p>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
} 