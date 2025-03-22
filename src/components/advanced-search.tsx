'use client';

import { useState, useEffect } from 'react';
import { Search, X, Filter, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const categories = [
  'Educativos',
  'Jogos de Tabuleiro',
  'Bonecas',
  'Brinquedos de Montar',
  'Veículos',
  'Esportes',
  'Artes e Criatividade',
  'Bebês',
];

const priceRanges = [
  { label: 'Até R$ 50', value: 50 },
  { label: 'R$ 50 - R$ 100', value: 100 },
  { label: 'R$ 100 - R$ 200', value: 200 },
  { label: 'Acima de R$ 200', value: 1000 },
];

const ratings = [
  { label: '4+ estrelas', value: 4 },
  { label: '3+ estrelas', value: 3 },
  { label: '2+ estrelas', value: 2 },
  { label: '1+ estrela', value: 1 },
];

export function AdvancedSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number>(1000);
  const [minRating, setMinRating] = useState<number>(0);
  const [showFilters, setShowFilters] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Simular sugestões baseadas no termo de busca
  useEffect(() => {
    if (searchTerm.length > 2) {
      const mockSuggestions = [
        `${searchTerm} educativos`,
        `${searchTerm} para crianças`,
        `${searchTerm} brinquedos`,
      ];
      setSuggestions(mockSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  const handleSearch = () => {
    // Implementar lógica de busca
    console.log({
      searchTerm,
      selectedCategories,
      priceRange,
      minRating,
    });
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange(1000);
    setMinRating(0);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar produtos..."
          className="w-full pl-9 pr-24"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2"
          onClick={() => setSearchTerm('')}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Sugestões */}
      {suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-lg">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              className="w-full px-4 py-2 text-left hover:bg-muted"
              onClick={() => {
                setSearchTerm(suggestion);
                setSuggestions([]);
              }}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {/* Filtros */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filtros
            <ChevronDown
              className={`ml-2 h-4 w-4 transition-transform ${
                showFilters ? 'rotate-180' : ''
              }`}
            />
          </Button>
          {(selectedCategories.length > 0 || minRating > 0) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-muted-foreground hover:text-primary"
            >
              Limpar Filtros
            </Button>
          )}
        </div>
        <Button onClick={handleSearch}>Buscar</Button>
      </div>

      {/* Painel de Filtros */}
      {showFilters && (
        <div className="mt-4 p-4 border rounded-lg space-y-6">
          {/* Categorias */}
          <div>
            <Label className="mb-2 block">Categorias</Label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategories.includes(category) ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectedCategories((prev) =>
                      prev.includes(category)
                        ? prev.filter((c) => c !== category)
                        : [...prev, category]
                    );
                  }}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {/* Faixa de Preço */}
          <div>
            <Label className="mb-2 block">Faixa de Preço</Label>
            <Select
              value={priceRange.toString()}
              onValueChange={(value) => setPriceRange(Number(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma faixa de preço" />
              </SelectTrigger>
              <SelectContent>
                {priceRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value.toString()}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Avaliação Mínima */}
          <div>
            <Label className="mb-2 block">Avaliação Mínima</Label>
            <Select
              value={minRating.toString()}
              onValueChange={(value) => setMinRating(Number(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma avaliação mínima" />
              </SelectTrigger>
              <SelectContent>
                {ratings.map((rating) => (
                  <SelectItem key={rating.value} value={rating.value.toString()}>
                    {rating.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Disponibilidade */}
          <div className="flex items-center space-x-2">
            <Checkbox id="inStock" />
            <Label htmlFor="inStock">Apenas produtos em estoque</Label>
          </div>
        </div>
      )}
    </div>
  );
} 