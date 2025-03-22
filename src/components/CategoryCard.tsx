'use client';

import React from 'react';
import Image from 'next/image';
import type { Category } from '@/types/category';
import { ChevronRight } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
  onClick?: () => void;
  isSelected?: boolean;
}

export function CategoryCard({ category, onClick, isSelected }: CategoryCardProps) {
  return (
    <button
      onClick={onClick}
      className={`relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }`}
    >
      <div className="relative h-32 w-full">
        <Image
          src={category.imageUrl || 'https://source.unsplash.com/random/800x600/?toy,category'}
          alt={category.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent group-hover:from-black/70 group-hover:via-black/50 group-hover:to-transparent transition-colors duration-300" />
      </div>
      <div className="absolute inset-0 flex items-center justify-between px-4">
        <h3 className="text-xl font-bold text-white">
          {category.name}
        </h3>
        <ChevronRight className="h-5 w-5 text-white transform translate-x-0 group-hover:translate-x-1 transition-transform duration-200" />
      </div>
      {category.description && (
        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-black/60">
          <p className="text-sm text-white/90">{category.description}</p>
        </div>
      )}
    </button>
  );
} 