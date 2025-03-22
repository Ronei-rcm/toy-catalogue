
import React from 'react';
import { categories, products } from '@/data/mockData';
import { subcategories } from '@/data/subcategoriesMock';
import { useCatalogFilters } from '@/hooks/useCatalogFilters';
import CategoryList from '@/components/catalog/CategoryList';
import SubcategoryList from '@/components/catalog/SubcategoryList';
import SearchAndFilter from '@/components/catalog/SearchAndFilter';
import ActiveFilters from '@/components/catalog/ActiveFilters';
import ProductGrid from '@/components/catalog/ProductGrid';

const CatalogPage = () => {
  const {
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
    sortedProducts
  } = useCatalogFilters(products);

  const filteredSubcategories = subcategories.filter(
    subcategory => !activeCategory || subcategory.categoryId === activeCategory
  );

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">Catálogo de Brinquedos</h1>
      
      <SearchAndFilter 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        ageFilters={ageFilters}
        toggleAgeFilter={toggleAgeFilter}
        clearFilters={clearFilters}
        filterSheetOpen={filterSheetOpen}
        setFilterSheetOpen={setFilterSheetOpen}
      />
      
      <ActiveFilters 
        activeCategory={activeCategory}
        activeSubcategory={activeSubcategory}
        searchQuery={searchQuery}
        priceRange={priceRange}
        ageFilters={ageFilters}
        categories={categories}
        subcategories={subcategories}
        setActiveCategory={setActiveCategory}
        setActiveSubcategory={setActiveSubcategory}
        setSearchQuery={setSearchQuery}
        setPriceRange={setPriceRange}
        setAgeFilters={setAgeFilters}
        clearFilters={clearFilters}
      />
      
      <CategoryList 
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      
      {activeCategory && filteredSubcategories.length > 0 && (
        <SubcategoryList 
          subcategories={filteredSubcategories}
          activeSubcategory={activeSubcategory}
          setActiveSubcategory={setActiveSubcategory}
        />
      )}
      
      <ProductGrid 
        products={sortedProducts}
        isLoading={isLoading}
        activeCategory={activeCategory}
        activeSubcategory={activeSubcategory}
        searchQuery={searchQuery}
        categories={categories}
        subcategories={subcategories}
        clearFilters={clearFilters}
      />
    </div>
  );
};

export default CatalogPage;
