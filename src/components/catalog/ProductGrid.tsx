
import React from 'react';
import { Product, Category, Subcategory } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  activeCategory: string | null;
  activeSubcategory: string | null;
  searchQuery: string;
  categories: Category[];
  subcategories: Subcategory[];
  clearFilters: () => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isLoading,
  activeCategory,
  activeSubcategory,
  searchQuery,
  categories,
  subcategories,
  clearFilters
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">
          {activeCategory
            ? `${categories.find(c => c.id === activeCategory)?.name || 'Produtos'}`
            : 'Todos os Produtos'}
          {activeSubcategory && ` > ${subcategories.find(s => s.id === activeSubcategory)?.name}`}
          {searchQuery && ` - Resultados para "${searchQuery}"`}
        </h2>
        <div className="text-sm text-muted-foreground">
          {products.length} produtos encontrados
        </div>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="aspect-square bg-muted animate-pulse" />
              <CardContent className="p-4 space-y-3">
                <div className="h-4 bg-muted rounded animate-pulse" />
                <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
                <div className="h-4 bg-muted rounded w-1/3 animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : products.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <Search size={48} className="text-muted-foreground/40" />
              <h3 className="text-xl font-semibold">Nenhum produto encontrado</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Não encontramos produtos que correspondam aos seus critérios de busca.
                Tente termos diferentes ou remova alguns filtros.
              </p>
              <Button onClick={clearFilters}>
                Limpar filtros
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
