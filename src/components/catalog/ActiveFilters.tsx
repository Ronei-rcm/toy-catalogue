
import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Category, Subcategory } from '@/types';

interface ActiveFiltersProps {
  activeCategory: string | null;
  activeSubcategory: string | null;
  searchQuery: string;
  priceRange: number[];
  ageFilters: string[];
  categories: Category[];
  subcategories: Subcategory[];
  setActiveCategory: (categoryId: string | null) => void;
  setActiveSubcategory: (subcategoryId: string | null) => void;
  setSearchQuery: (query: string) => void;
  setPriceRange: (range: number[]) => void;
  setAgeFilters: (filters: string[]) => void;
  clearFilters: () => void;
}

const ageOptions = [
  { id: '0-2', label: '0-2 anos' },
  { id: '3-5', label: '3-5 anos' },
  { id: '6-8', label: '6-8 anos' },
  { id: '9-12', label: '9-12 anos' },
  { id: '12+', label: '12+ anos' }
];

const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  activeCategory,
  activeSubcategory,
  searchQuery,
  priceRange,
  ageFilters,
  categories,
  subcategories,
  setActiveCategory,
  setActiveSubcategory,
  setSearchQuery,
  setPriceRange,
  setAgeFilters,
  clearFilters
}) => {
  const hasActiveFilters = 
    activeCategory || 
    activeSubcategory || 
    searchQuery || 
    priceRange[0] > 0 || 
    priceRange[1] < 200 || 
    ageFilters.length > 0;
  
  if (!hasActiveFilters) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {activeCategory && (
        <div className="inline-flex items-center bg-primary/10 rounded-full px-3 py-1 text-sm">
          <span>Categoria: {categories.find(c => c.id === activeCategory)?.name}</span>
          <Button variant="ghost" size="icon" className="h-5 w-5 ml-1 p-0" onClick={() => setActiveCategory(null)}>
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}
      {activeSubcategory && (
        <div className="inline-flex items-center bg-primary/10 rounded-full px-3 py-1 text-sm">
          <span>Subcategoria: {subcategories.find(s => s.id === activeSubcategory)?.name}</span>
          <Button variant="ghost" size="icon" className="h-5 w-5 ml-1 p-0" onClick={() => setActiveSubcategory(null)}>
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}
      {searchQuery && (
        <div className="inline-flex items-center bg-primary/10 rounded-full px-3 py-1 text-sm">
          <span>Busca: "{searchQuery}"</span>
          <Button variant="ghost" size="icon" className="h-5 w-5 ml-1 p-0" onClick={() => setSearchQuery('')}>
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}
      {(priceRange[0] > 0 || priceRange[1] < 200) && (
        <div className="inline-flex items-center bg-primary/10 rounded-full px-3 py-1 text-sm">
          <span>Preço: R${priceRange[0]} - R${priceRange[1]}</span>
          <Button variant="ghost" size="icon" className="h-5 w-5 ml-1 p-0" onClick={() => setPriceRange([0, 200])}>
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}
      {ageFilters.length > 0 && (
        <div className="inline-flex items-center bg-primary/10 rounded-full px-3 py-1 text-sm">
          <span>Idades: {ageFilters.map(age => 
            ageOptions.find(opt => opt.id === age)?.label
          ).join(', ')}</span>
          <Button variant="ghost" size="icon" className="h-5 w-5 ml-1 p-0" onClick={() => setAgeFilters([])}>
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}
      {hasActiveFilters && (
        <Button variant="ghost" size="sm" className="text-sm h-7" onClick={clearFilters}>
          Limpar todos os filtros
        </Button>
      )}
    </div>
  );
};

export default ActiveFilters;
