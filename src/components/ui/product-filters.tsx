'use client';

import React from 'react';
import { SlidersHorizontal, X } from 'lucide-react';

interface ProductFiltersProps {
  priceRange: {
    min: number;
    max: number;
  };
  onPriceRangeChange: (range: { min: number; max: number }) => void;
  inStock: boolean;
  onStockChange: (value: boolean) => void;
  sort: string;
  onSortChange: (value: string) => void;
}

export function ProductFilters({
  priceRange,
  onPriceRangeChange,
  inStock,
  onStockChange,
  sort,
  onSortChange,
}: ProductFiltersProps) {
  const handleReset = () => {
    onPriceRangeChange({ min: 0, max: 1000 });
    onStockChange(false);
    onSortChange('featured');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
        <button
          onClick={handleReset}
          className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
        >
          <X className="h-4 w-4" />
          Limpar
        </button>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Faixa de Preço</h4>
        <div className="flex items-center gap-4">
          <input
            type="number"
            min="0"
            max={priceRange.max}
            value={priceRange.min}
            onChange={(e) =>
              onPriceRangeChange({
                ...priceRange,
                min: Math.max(0, Number(e.target.value)),
              })
            }
            className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Min"
          />
          <span className="text-gray-500">-</span>
          <input
            type="number"
            min={priceRange.min}
            value={priceRange.max}
            onChange={(e) =>
              onPriceRangeChange({
                ...priceRange,
                max: Math.max(priceRange.min, Number(e.target.value)),
              })
            }
            className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Max"
          />
        </div>
      </div>

      {/* Stock Status */}
      <div className="mb-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => onStockChange(e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-sm text-gray-900">Apenas em estoque</span>
        </label>
      </div>

      {/* Sort Options */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-3">Ordenar por</h4>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="featured">Mais relevantes</option>
          <option value="price-asc">Menor preço</option>
          <option value="price-desc">Maior preço</option>
          <option value="name-asc">Nome (A-Z)</option>
          <option value="name-desc">Nome (Z-A)</option>
        </select>
      </div>
    </div>
  );
} 