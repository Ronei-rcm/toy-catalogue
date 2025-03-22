'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Category } from '@/types/category';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/categorias/${category.slug}`}>
      <div className="group relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl">
        <div className="aspect-w-16 aspect-h-9">
          <Image
            src={category.imageUrl || '/images/placeholder.jpg'}
            alt={category.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-xl font-semibold text-white">{category.name}</h3>
            {category.description && (
              <p className="mt-2 text-sm text-white/90 line-clamp-2">
                {category.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
} 