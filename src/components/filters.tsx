'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { formatPrice } from '@/lib/utils';

interface FiltersProps {
  onSearchChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onPriceRangeChange: (value: number[]) => void;
  onStockChange: (value: boolean) => void;
  maxPrice: number;
}

export function Filters({
  onSearchChange,
  onSortChange,
  onPriceRangeChange,
  onStockChange,
  maxPrice,
}: FiltersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, maxPrice]);
  const [showInStock, setShowInStock] = useState(false);
  const [sortValue, setSortValue] = useState('name-asc');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange(value);
  };

  const handleSortChange = (value: string) => {
    setSortValue(value);
    onSortChange(value);
  };

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value);
    onPriceRangeChange(value);
  };

  const handleStockChange = (checked: boolean) => {
    setShowInStock(checked);
    onStockChange(checked);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="search">Buscar produtos</Label>
        <Input
          id="search"
          type="search"
          placeholder="Buscar por nome ou descrição..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="space-y-2">
        <Label>Ordenar por</Label>
        <Select value={sortValue} onValueChange={handleSortChange}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma opção" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name-asc">Nome (A-Z)</SelectItem>
            <SelectItem value="name-desc">Nome (Z-A)</SelectItem>
            <SelectItem value="price-asc">Preço (menor para maior)</SelectItem>
            <SelectItem value="price-desc">Preço (maior para menor)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Faixa de preço</Label>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={handlePriceRangeChange}
            max={maxPrice}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{formatPrice(priceRange[0])}</span>
            <span>{formatPrice(priceRange[1])}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="stock"
          checked={showInStock}
          onCheckedChange={handleStockChange}
        />
        <Label htmlFor="stock">Mostrar apenas produtos em estoque</Label>
      </div>
    </div>
  );
} 