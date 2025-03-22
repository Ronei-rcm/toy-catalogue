
import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { RefreshCcw } from 'lucide-react';

interface SearchAndFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  ageFilters: string[];
  toggleAgeFilter: (ageId: string) => void;
  clearFilters: () => void;
  filterSheetOpen: boolean;
  setFilterSheetOpen: (open: boolean) => void;
}

const ageOptions = [
  { id: '0-2', label: '0-2 anos' },
  { id: '3-5', label: '3-5 anos' },
  { id: '6-8', label: '6-8 anos' },
  { id: '9-12', label: '9-12 anos' },
  { id: '12+', label: '12+ anos' }
];

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  priceRange,
  setPriceRange,
  ageFilters,
  toggleAgeFilter,
  clearFilters,
  filterSheetOpen,
  setFilterSheetOpen
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
        <input
          type="text"
          placeholder="Buscar brinquedos..."
          className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none glass-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <Select 
        value={sortBy} 
        onValueChange={setSortBy}
      >
        <SelectTrigger className="w-full md:w-[200px]">
          <SelectValue placeholder="Ordenar por" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="recommended">Recomendados</SelectItem>
          <SelectItem value="price-asc">Menor preço</SelectItem>
          <SelectItem value="price-desc">Maior preço</SelectItem>
          <SelectItem value="name-asc">A-Z</SelectItem>
          <SelectItem value="name-desc">Z-A</SelectItem>
        </SelectContent>
      </Select>
      
      <Sheet open={filterSheetOpen} onOpenChange={setFilterSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <SlidersHorizontal size={18} />
            <span className="hidden md:inline">Filtros Avançados</span>
            <span className="md:hidden">Filtros</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[300px] sm:w-[450px] overflow-y-auto">
          <SheetHeader className="mb-5">
            <SheetTitle>Filtros</SheetTitle>
            <SheetDescription>
              Refine sua busca para encontrar o brinquedo ideal
            </SheetDescription>
          </SheetHeader>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-3">Faixa de Preço</h3>
              <div className="px-2">
                <Slider 
                  value={priceRange}
                  min={0}
                  max={200}
                  step={5}
                  onValueChange={setPriceRange}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>R$ {priceRange[0]}</span>
                  <span>R$ {priceRange[1]}</span>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium mb-3">Faixa Etária</h3>
              <div className="space-y-2">
                {ageOptions.map(age => (
                  <div key={age.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`age-${age.id}`} 
                      checked={ageFilters.includes(age.id)}
                      onCheckedChange={() => toggleAgeFilter(age.id)}
                    />
                    <label htmlFor={`age-${age.id}`} className="text-sm">
                      {age.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1" 
                onClick={clearFilters}
              >
                <RefreshCcw className="mr-2 h-4 w-4" />
                Limpar Filtros
              </Button>
              <Button 
                className="flex-1"
                onClick={() => setFilterSheetOpen(false)}
              >
                Aplicar Filtros
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SearchAndFilter;
