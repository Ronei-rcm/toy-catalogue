import React, { useState, useEffect } from 'react';
import { products } from '@/data/mockData';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProductCard from '@/components/ui/ProductCard';
import { ChevronDown, Filter, Gift, Info, Search, ShoppingBag, Star, Calendar, Tag, X } from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const NewReleasesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(8);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sortBy, setSortBy] = useState('recent');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);
  
  const allNewReleases = [...products].slice(0, 16);
  
  const filteredReleases = allNewReleases.filter(product => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const nameMatch = product.name.toLowerCase().includes(query);
      const descMatch = product.description.toLowerCase().includes(query);
      const tagsMatch = product.tags.some(tag => tag.toLowerCase().includes(query));
      
      if (!nameMatch && !descMatch && !tagsMatch) return false;
    }
    
    if (activeCategory && product.categoryId !== activeCategory) {
      return false;
    }
    
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    
    if (filter === 'exclusive' && !product.tags.includes('exclusivo')) {
      return false;
    }
    if (filter === 'limited' && !product.tags.includes('edição limitada')) {
      return false;
    }
    
    return true;
  });
  
  const sortedReleases = [...filteredReleases].sort((a, b) => {
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
  
  const featuredProducts = allNewReleases.slice(0, 3);
  
  const loadMore = () => {
    setDisplayCount(prev => Math.min(prev + 8, filteredReleases.length));
  };
  
  const clearFilters = () => {
    setFilter('all');
    setSearchQuery('');
    setPriceRange([0, 200]);
    setSortBy('recent');
    setActiveCategory(null);
    setFilterSheetOpen(false);
  };

  const currentDate = new Date();
  const upcomingReleases = [
    {
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 5),
      products: allNewReleases.slice(0, 2)
    },
    {
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 12),
      products: allNewReleases.slice(2, 4)
    },
    {
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 19),
      products: allNewReleases.slice(4, 5)
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Lançamentos</h1>
      
      <Tabs defaultValue="products" className="mb-12">
        <TabsList className="mb-6">
          <TabsTrigger value="products" className="flex items-center gap-1">
            <ShoppingBag className="h-4 w-4" />
            <span>Produtos Lançados</span>
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Calendário de Lançamentos</span>
          </TabsTrigger>
          <TabsTrigger value="exclusive" className="flex items-center gap-1">
            <Star className="h-4 w-4" />
            <span>Exclusivos</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="products" className="space-y-8 animate-fade-in">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="text"
                placeholder="Buscar lançamentos..."
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Mais recentes</SelectItem>
                <SelectItem value="price-asc">Menor preço</SelectItem>
                <SelectItem value="price-desc">Maior preço</SelectItem>
                <SelectItem value="name-asc">A-Z</SelectItem>
                <SelectItem value="name-desc">Z-A</SelectItem>
              </SelectContent>
            </Select>
            
            <Sheet open={filterSheetOpen} onOpenChange={setFilterSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter size={16} />
                  <span>Filtros</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Filtrar Lançamentos</SheetTitle>
                  <SheetDescription>
                    Refine sua busca de novos produtos
                  </SheetDescription>
                </SheetHeader>
                
                <div className="py-6 space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Tipo de Lançamento</h3>
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        variant={filter === 'all' ? 'default' : 'outline'} 
                        size="sm"
                        onClick={() => setFilter('all')}
                      >
                        Todos
                      </Button>
                      <Button 
                        variant={filter === 'exclusive' ? 'default' : 'outline'} 
                        size="sm"
                        onClick={() => setFilter('exclusive')}
                      >
                        Exclusivos
                      </Button>
                      <Button 
                        variant={filter === 'limited' ? 'default' : 'outline'} 
                        size="sm"
                        onClick={() => setFilter('limited')}
                      >
                        Edição Limitada
                      </Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" onClick={clearFilters} className="flex-1">
                      Limpar
                    </Button>
                    <Button onClick={() => setFilterSheetOpen(false)} className="flex-1">
                      Aplicar
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          {(filter !== 'all' || searchQuery || activeCategory) && (
            <div className="flex flex-wrap gap-2">
              {filter !== 'all' && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <span>Tipo: {filter === 'exclusive' ? 'Exclusivos' : 'Edição Limitada'}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-4 w-4 ml-1 p-0" 
                    onClick={() => setFilter('all')}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              
              {searchQuery && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <span>Busca: {searchQuery}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-4 w-4 ml-1 p-0" 
                    onClick={() => setSearchQuery('')}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              
              {activeCategory && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <span>Categoria: {activeCategory}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-4 w-4 ml-1 p-0" 
                    onClick={() => setActiveCategory(null)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              
              <Button variant="ghost" size="sm" className="h-7" onClick={clearFilters}>
                Limpar todos
              </Button>
            </div>
          )}
          
          <div className="bg-gradient-to-r from-primary/20 to-primary/5 rounded-xl p-6 mb-8">
            <div className="flex items-center mb-4">
              <Star className="text-primary mr-2" />
              <h2 className="text-2xl font-bold">Destaques da Semana</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredProducts.map(product => (
                <div key={product.id} className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all">
                  <div className="aspect-square bg-muted relative">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Novidade
                    </div>
                    {product.tags.includes('exclusivo') && (
                      <div className="absolute top-2 right-2 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Exclusivo
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-1">{product.name}</h3>
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-end">
                      <p className="text-primary font-bold">R$ {product.price.toFixed(2)}</p>
                      <Badge variant="outline" className="text-xs">Novo</Badge>
                    </div>
                    <Button variant="outline" className="w-full mt-3">Ver detalhes</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Todos os Lançamentos</h2>
              <div className="text-sm text-muted-foreground">
                {sortedReleases.length} produtos encontrados
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
            ) : sortedReleases.length === 0 ? (
              <Card className="text-center p-8">
                <div className="flex flex-col items-center gap-4">
                  <Search size={48} className="text-muted-foreground/40" />
                  <h3 className="text-xl font-semibold">Nenhum lançamento encontrado</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Não encontramos produtos que correspondam aos seus critérios de busca.
                    Tente diferentes termos ou remova alguns filtros.
                  </p>
                  <Button onClick={clearFilters}>Limpar filtros</Button>
                </div>
              </Card>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {sortedReleases.slice(0, displayCount).map(product => (
                    <div key={product.id} className="relative">
                      <div className="absolute top-2 left-2 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold z-10">
                        Novidade
                      </div>
                      {product.tags.includes('exclusivo') && (
                        <div className="absolute top-2 right-2 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold z-10">
                          Exclusivo
                        </div>
                      )}
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
                
                {displayCount < sortedReleases.length && (
                  <div className="flex justify-center mt-8">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      onClick={loadMore}
                      className="flex items-center gap-2"
                    >
                      Carregar mais <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="calendar" className="animate-fade-in">
          <div className="bg-muted/30 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6">Calendário de Lançamentos</h2>
            
            <div className="space-y-8">
              {upcomingReleases.map((release, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary/10 text-primary font-semibold p-2 rounded-lg text-center min-w-16">
                      <div className="text-sm">{release.date.toLocaleDateString('pt-BR', {month: 'short'})}</div>
                      <div className="text-2xl">{release.date.getDate()}</div>
                    </div>
                    <div>
                      <h3 className="font-semibold">Novos Lançamentos</h3>
                      <p className="text-sm text-muted-foreground">
                        {release.date.toLocaleDateString('pt-BR', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {release.products.map(product => (
                      <div key={product.id} className="flex items-center gap-3 p-3 rounded-lg border border-muted">
                        <div className="w-16 h-16 bg-muted rounded flex-shrink-0 overflow-hidden">
                          <img 
                            src={product.imageUrl} 
                            alt={product.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-medium line-clamp-1">{product.name}</h4>
                          <p className="text-primary font-semibold">R$ {product.price.toFixed(2)}</p>
                        </div>
                        <Button size="sm" variant="outline">Lembrar</Button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="exclusive" className="animate-fade-in">
          <div className="bg-gradient-to-r from-amber-500/20 to-amber-400/5 rounded-xl p-6 mb-8">
            <div className="flex items-center mb-6">
              <Gift className="text-amber-500 mr-2" />
              <h2 className="text-2xl font-bold">Lançamentos Exclusivos</h2>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 mb-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="md:w-1/2">
                  <Badge className="mb-3 bg-amber-500">Exclusivo</Badge>
                  <h3 className="text-2xl font-bold mb-2">Produtos Exclusivos da Nossa Loja</h3>
                  <p className="text-muted-foreground mb-4">
                    Descubra brinquedos que só podem ser encontrados em nossa loja. 
                    Peças únicas, colecionáveis e edições limitadas que farão a alegria 
                    dos pequenos e dos colecionadores.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Info className="h-4 w-4" />
                    <span>Produtos exclusivos disponíveis apenas enquanto durarem os estoques</span>
                  </div>
                  <Button>Ver todos exclusivos</Button>
                </div>
                <div className="md:w-1/2">
                  <img 
                    src="https://via.placeholder.com/600x400" 
                    alt="Produtos exclusivos" 
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {allNewReleases.slice(0, 3).map(product => (
                <div key={product.id} className="bg-white/80 backdrop-blur-sm rounded-lg shadow overflow-hidden">
                  <div className="aspect-square relative">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Exclusivo
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{product.name}</h3>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-primary font-bold">R$ {product.price.toFixed(2)}</p>
                      <Badge variant="outline" className="bg-amber-500/10 text-amber-700 border-amber-200">
                        <Tag className="h-3 w-3 mr-1" /> Edição Limitada
                      </Badge>
                    </div>
                    <Button variant="outline" className="w-full">Ver detalhes</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-16 bg-muted/50 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Receba Novidades Primeiro</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Inscreva-se na nossa newsletter para ser o primeiro a saber sobre lançamentos, promoções exclusivas e dicas para presentear.
        </p>
        <div className="flex max-w-md mx-auto gap-2">
          <input 
            type="email" 
            placeholder="Seu melhor e-mail" 
            className="flex-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none"
          />
          <Button>Inscrever</Button>
        </div>
      </div>
    </div>
  );
};

export default NewReleasesPage;
