'use client';

import { useState } from 'react';
import { ProductList } from '@/components/product-list';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const categories = [
  {
    id: 'educativos',
    name: 'Educativos',
    description: 'Brinquedos que estimulam o aprendizado e desenvolvimento',
    image: '/images/categories/educational.jpg',
    productCount: 12
  },
  {
    id: 'jogos',
    name: 'Jogos',
    description: 'Jogos de tabuleiro e cartas para toda família',
    image: '/images/categories/games.jpg',
    productCount: 8
  },
  {
    id: 'bebes',
    name: 'Bebês',
    description: 'Brinquedos seguros e adequados para bebês',
    image: '/images/categories/babies.jpg',
    productCount: 15
  },
  {
    id: 'montar',
    name: 'Montar',
    description: 'Kits de montagem e construção',
    image: '/images/categories/building.jpg',
    productCount: 10
  },
  {
    id: 'veiculos',
    name: 'Veículos',
    description: 'Carrinhos, aviões e outros veículos',
    image: '/images/categories/vehicles.jpg',
    productCount: 6
  },
  {
    id: 'esportes',
    name: 'Esportes',
    description: 'Brinquedos para atividades físicas',
    image: '/images/categories/sports.jpg',
    productCount: 9
  }
];

const sortOptions = [
  { value: 'name-asc', label: 'Nome (A-Z)' },
  { value: 'name-desc', label: 'Nome (Z-A)' },
  { value: 'count-asc', label: 'Menos Produtos' },
  { value: 'count-desc', label: 'Mais Produtos' }
];

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name-asc');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredCategories = categories
    .filter(category => 
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'count-asc':
          return a.productCount - b.productCount;
        case 'count-desc':
          return b.productCount - a.productCount;
        default:
          return 0;
      }
    });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Lista de Categorias */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Categorias</h2>
            <div className="flex items-center gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category) => (
              <Link
                key={category.id}
                href={`/categorias/${category.id}`}
                className="group relative bg-background rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-lg"
              >
                <div className="relative aspect-square">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {category.description}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {category.productCount} produtos
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Filtros */}
        <div className="md:w-64 space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Filtros</h3>
            
            {/* Busca */}
            <div className="space-y-2">
              <Label htmlFor="search">Buscar</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="search"
                  placeholder="Buscar categorias..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 