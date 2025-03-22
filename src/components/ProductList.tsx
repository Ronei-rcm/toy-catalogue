'use client';

import React from 'react';
import Image from 'next/image';
import { formatPrice } from '@/utils/format';
import { Product } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/cart-context';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Search, SlidersHorizontal } from 'lucide-react';

interface ProductListProps {
  products: Product[];
  className?: string;
}

export function ProductList({ products, className = '' }: ProductListProps) {
  const { addItem } = useCart();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [priceRange, setPriceRange] = React.useState([0, 1000]);
  const [showInStock, setShowInStock] = React.useState(false);
  const [sortBy, setSortBy] = React.useState('name');
  const [showFilters, setShowFilters] = React.useState(false);

  const filteredProducts = React.useMemo(() => {
    return products
      .filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
        const matchesStock = showInStock ? product.stock > 0 : true;
        
        return matchesSearch && matchesPrice && matchesStock;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'name':
            return a.name.localeCompare(b.name);
          default:
            return 0;
        }
      });
  }, [products, searchQuery, priceRange, showInStock, sortBy]);

  const maxPrice = Math.max(...products.map(p => p.price));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Buscar produtos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 rounded-md border hover:bg-gray-50"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filtros
        </button>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-gray-50 rounded-lg">
          <div className="space-y-2">
            <label className="text-sm font-medium">Faixa de Preço</label>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={maxPrice}
              step={10}
              className="mt-2"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>{formatPrice(priceRange[0])}</span>
              <span>{formatPrice(priceRange[1])}</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Ordenar por</label>
            <Select
              value={sortBy}
              onValueChange={setSortBy}
            >
              <option value="name">Nome</option>
              <option value="price-asc">Menor Preço</option>
              <option value="price-desc">Maior Preço</option>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Switch
              checked={showInStock}
              onCheckedChange={setShowInStock}
            />
            <label className="text-sm font-medium">Mostrar apenas em estoque</label>
          </div>
        </div>
      )}

      {filteredProducts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          Nenhum produto encontrado
        </div>
      ) : (
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="relative h-48 w-full">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <Badge variant={product.stock > 10 ? "default" : "secondary"}>
                    {product.stock} em estoque
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
                <Badge variant="outline">{product.category}</Badge>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <span className="text-lg font-bold">
                  {formatPrice(product.price)}
                </span>
                <button
                  onClick={() => addItem(product)}
                  disabled={product.stock === 0}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {product.stock === 0 ? 'Indisponível' : 'Adicionar ao Carrinho'}
                </button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 