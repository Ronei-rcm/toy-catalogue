
import React, { useState, useEffect } from 'react';
import { products } from '@/data/mockData';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/ui/ProductCard';
import { Clock, Percent, Tag, Timer } from 'lucide-react';

const PromotionsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 12,
    minutes: 45,
    seconds: 30
  });
  
  // Simular tempo de carregamento
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);
  
  // Simulação de contagem regressiva
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Simulação de produtos em promoção (50% dos produtos)
  const saleProducts = products.map(product => ({
    ...product,
    originalPrice: product.price * 1.3, // Preço original simulado (30% mais caro)
    discountPercentage: Math.floor(Math.random() * 20) + 10 // Desconto entre 10% e 30%
  })).slice(0, products.length / 2);
  
  // Categorias de promoção
  const promotionCategories = [
    { id: 'all', name: 'Todas as Promoções' },
    { id: 'flash', name: 'Ofertas Relâmpago' },
    { id: 'clearance', name: 'Liquidação' },
    { id: 'bundle', name: 'Pacotes com Desconto' },
    { id: 'season', name: 'Promoção Sazonal' }
  ];
  
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Promoções</h1>
      
      {/* Banner de promoção especial */}
      <div className="bg-gradient-to-r from-primary to-purple-400 text-white rounded-xl p-8 mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <Badge variant="outline" className="bg-white/20 border-white/40 text-white mb-3">
                Oferta por tempo limitado
              </Badge>
              <h2 className="text-3xl font-bold mb-3">Super Promoção de Inverno</h2>
              <p className="text-white/90 mb-4">
                Aproveite descontos especiais em brinquedos selecionados. Válido enquanto durarem os estoques.
              </p>
              <Button variant="outline" className="bg-white text-primary hover:bg-white/90">
                Ver Ofertas
              </Button>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-center text-white/90 mb-4">Termina em:</h3>
              <div className="flex gap-4 text-center">
                <div className="bg-white/20 rounded-lg p-3 w-20">
                  <div className="text-2xl font-bold">{timeLeft.days}</div>
                  <div className="text-xs text-white/80">Dias</div>
                </div>
                <div className="bg-white/20 rounded-lg p-3 w-20">
                  <div className="text-2xl font-bold">{timeLeft.hours}</div>
                  <div className="text-xs text-white/80">Horas</div>
                </div>
                <div className="bg-white/20 rounded-lg p-3 w-20">
                  <div className="text-2xl font-bold">{timeLeft.minutes}</div>
                  <div className="text-xs text-white/80">Min</div>
                </div>
                <div className="bg-white/20 rounded-lg p-3 w-20">
                  <div className="text-2xl font-bold">{timeLeft.seconds}</div>
                  <div className="text-xs text-white/80">Seg</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Categorias de promoção */}
      <div className="flex overflow-x-auto gap-2 mb-8 pb-2 hide-scrollbar">
        {promotionCategories.map(category => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(category.id)}
            className="whitespace-nowrap"
          >
            {category.name}
          </Button>
        ))}
      </div>
      
      {/* Lista de produtos em promoção */}
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
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {saleProducts.map(product => (
            <div key={product.id} className="relative group">
              <div className="absolute top-2 left-2 z-10">
                <Badge className="bg-red-500 text-white border-none">
                  {product.discountPercentage}% OFF
                </Badge>
              </div>
              
              <div className="relative overflow-hidden">
                <ProductCard product={product} />
                
                <div className="absolute bottom-0 left-0 right-0 bg-primary p-2 text-white text-center transform translate-y-full group-hover:translate-y-0 transition-transform">
                  <div className="flex justify-between items-center">
                    <span className="line-through text-white/70">
                      R$ {product.originalPrice.toFixed(2)}
                    </span>
                    <Percent className="h-4 w-4" />
                    <span className="font-bold">
                      R$ {product.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Destaque de ofertas relâmpago */}
      <div className="mt-16">
        <div className="flex items-center mb-6">
          <Timer className="text-red-500 mr-2" />
          <h2 className="text-2xl font-bold">Ofertas Relâmpago</h2>
          <Badge className="ml-2 bg-red-100 text-red-500 border-red-200">
            Só hoje!
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {saleProducts.slice(0, 4).map(product => (
            <div key={product.id} className="bg-red-50 rounded-lg p-4 border border-red-100">
              <div className="aspect-square bg-white rounded-md mb-4 p-2">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="font-semibold line-clamp-1 mb-2">{product.name}</h3>
              <div className="flex justify-between items-center mb-2">
                <span className="line-through text-muted-foreground">
                  R$ {product.originalPrice.toFixed(2)}
                </span>
                <span className="font-bold text-lg text-red-500">
                  R$ {product.price.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center text-sm text-red-600 mb-4">
                <Clock className="h-3 w-3 mr-1" />
                <span>Termina em {Math.floor(Math.random() * 12) + 1}h</span>
              </div>
              <Button className="w-full bg-red-500 hover:bg-red-600">
                Comprar agora
              </Button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Regras da promoção */}
      <div className="mt-16 bg-muted/30 rounded-lg p-6">
        <h3 className="font-bold text-lg mb-4">Regras da Promoção</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start">
            <Tag className="h-4 w-4 mr-2 mt-1 text-primary" />
            <span>Preços válidos enquanto durarem os estoques.</span>
          </li>
          <li className="flex items-start">
            <Tag className="h-4 w-4 mr-2 mt-1 text-primary" />
            <span>Descontos não cumulativos com outras promoções.</span>
          </li>
          <li className="flex items-start">
            <Tag className="h-4 w-4 mr-2 mt-1 text-primary" />
            <span>Em caso de divergência de preços, o valor válido é o do carrinho de compras.</span>
          </li>
          <li className="flex items-start">
            <Tag className="h-4 w-4 mr-2 mt-1 text-primary" />
            <span>Imagens meramente ilustrativas.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PromotionsPage;
