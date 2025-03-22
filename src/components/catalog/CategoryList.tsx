
import React from 'react';
import { Category } from '@/types';
import { Button } from '@/components/ui/button';
import CategoryCard from '@/components/ui/CategoryCard';

interface CategoryListProps {
  categories: Category[];
  activeCategory: string | null;
  setActiveCategory: (categoryId: string | null) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ 
  categories, 
  activeCategory, 
  setActiveCategory 
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Categorias</h2>
        <Button variant="ghost" onClick={() => setActiveCategory(null)}>
          Ver todas
        </Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <div 
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`cursor-pointer transition-all ${activeCategory === category.id ? 'ring-2 ring-primary scale-105' : ''}`}
          >
            <CategoryCard category={category} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
