import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSubcategories } from '@/hooks/useSubcategories';
import { Subcategory } from '@/types';

interface SubcategoryListProps {
  categoryId?: string | number;
  className?: string;
}

export function SubcategoryList({ categoryId, className = '' }: SubcategoryListProps) {
  const { subcategories, isLoading, error } = useSubcategories({ categoryId });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-4">
        Erro ao carregar subcategorias
      </div>
    );
  }

  if (!subcategories.length) {
    return (
      <div className="text-center text-gray-500 py-4">
        Nenhuma subcategoria encontrada
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${className}`}>
      {subcategories.map((subcategory: Subcategory) => (
        <Link
          key={subcategory.id}
          href={`/subcategories/${subcategory.slug}`}
          className="group"
        >
          <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:scale-105">
            <div className="relative h-48">
              {subcategory.imageUrl ? (
                <Image
                  src={subcategory.imageUrl}
                  alt={subcategory.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">Sem imagem</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-primary">
                {subcategory.name}
              </h3>
              {subcategory.description && (
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                  {subcategory.description}
                </p>
              )}
              <div className="mt-2 text-sm text-gray-500">
                {subcategory.products?.length || 0} produtos
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
} 