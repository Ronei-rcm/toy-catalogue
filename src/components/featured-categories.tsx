'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Brain, Gamepad2, Baby, Blocks, Car, Activity } from 'lucide-react';
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Category } from "@/types/category";

interface FeaturedCategoriesProps {
  categories: Category[];
}

export function FeaturedCategories({ categories }: FeaturedCategoriesProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Categorias em Destaque</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/categorias/${category.slug}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-video">
                  {category.imageUrl ? (
                    <Image
                      src={category.imageUrl}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">Sem imagem</span>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg">{category.name}</h3>
                  {category.description && (
                    <p className="text-gray-600 mt-2">{category.description}</p>
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