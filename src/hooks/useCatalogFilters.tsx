
import { useState, useEffect } from 'react';
import { Product } from '@/types';

export const useCatalogFilters = (products: Product[]) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sortBy, setSortBy] = useState<string>('recommended');
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [ageFilters, setAgeFilters] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulando carregamento inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const clearFilters = () => {
    setActiveCategory(null);
    setActiveSubcategory(null);
    setSearchQuery('');
    setPriceRange([0, 200]);
    setSortBy('recommended');
    setAgeFilters([]);
  };

  const toggleAgeFilter = (ageId: string) => {
    setAgeFilters(
      ageFilters.includes(ageId)
        ? ageFilters.filter(id => id !== ageId)
        : [...ageFilters, ageId]
    );
  };

  // Filtragem de produtos
  const filteredProducts = products.filter(product => {
    if (activeCategory && product.categoryId !== activeCategory) {
      return false;
    }
    
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return true;
  });

  // Ordenação de produtos
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  return {
    activeCategory,
    setActiveCategory,
    activeSubcategory,
    setActiveSubcategory,
    searchQuery,
    setSearchQuery,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    filterSheetOpen,
    setFilterSheetOpen,
    ageFilters,
    setAgeFilters,
    toggleAgeFilter,
    isLoading,
    clearFilters,
    filteredProducts,
    sortedProducts
  };
};
