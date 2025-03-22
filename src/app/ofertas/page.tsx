'use client';

import { useState, useEffect } from 'react';
import { ProductList } from '@/components/product-list';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Tag, Search, Filter, Timer } from 'lucide-react';

const sortOptions = [
  { value: 'discount', label: 'Maior Desconto' },
  { value: 'price-asc', label: 'Menor Preço' },
  { value: 'price-desc', label: 'Maior Preço' },
  { value: 'newest', label: 'Mais Recentes' }
];

export default function OffersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('discount');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showInStock, setShowInStock] = useState(false);
  const [minDiscount, setMinDiscount] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Simular fim das ofertas em 7 dias
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);

    const timer = setInterval(() => {
      const now = new Date();
      const difference = endDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Banner de Ofertas */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-lg p-8 mb-8 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Ofertas Especiais</h1>
            <p className="text-lg opacity-90">
              Aproveite nossos descontos exclusivos por tempo limitado!
            </p>
          </div>
          <div className="flex items-center gap-4 bg-white/10 rounded-lg p-4">
            <Timer className="h-6 w-6" />
            <div className="text-center">
              <div className="text-2xl font-bold">
                {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
              </div>
              <div className="text-sm opacity-90">Tempo restante</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Lista de Produtos */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Produtos em Oferta</h2>
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
              <Button
                variant="outline"
                size="icon"
                className="md:hidden"
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <ProductList
            searchTerm={searchTerm}
            sortBy={sortBy}
            priceRange={priceRange}
            showInStock={showInStock}
            showDiscounts={true}
          />
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
                  placeholder="Buscar ofertas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            {/* Faixa de preço */}
            <div>
              <Label>Faixa de preço</Label>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                min={0}
                max={1000}
                step={10}
                className="mt-2"
              />
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>R$ {priceRange[0]}</span>
                <span>R$ {priceRange[1]}</span>
              </div>
            </div>

            {/* Desconto Mínimo */}
            <div className="space-y-2">
              <Label>Desconto Mínimo</Label>
              <Select value={minDiscount.toString()} onValueChange={(value) => setMinDiscount(parseInt(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o desconto mínimo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Qualquer desconto</SelectItem>
                  <SelectItem value="10">10% ou mais</SelectItem>
                  <SelectItem value="20">20% ou mais</SelectItem>
                  <SelectItem value="30">30% ou mais</SelectItem>
                  <SelectItem value="40">40% ou mais</SelectItem>
                  <SelectItem value="50">50% ou mais</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="in-stock"
                checked={showInStock}
                onCheckedChange={setShowInStock}
              />
              <Label htmlFor="in-stock">Apenas em estoque</Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 