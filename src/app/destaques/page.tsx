'use client';

import { useState } from 'react';
import { Star, TrendingUp, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { useCart } from '@/contexts/cart-context';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  sales: number;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Kit de Construção LEGO Star Wars',
    price: 399.99,
    image: '/images/products/lego-star-wars.jpg',
    category: 'Brinquedos de Montar',
    rating: 4.8,
    reviews: 128,
    sales: 256,
  },
  {
    id: '2',
    name: 'Jogo de Tabuleiro Monopoly',
    price: 129.99,
    image: '/images/products/monopoly.jpg',
    category: 'Jogos de Tabuleiro',
    rating: 4.5,
    reviews: 95,
    sales: 180,
  },
  {
    id: '3',
    name: 'Boneca Barbie',
    price: 99.99,
    image: '/images/products/barbie.jpg',
    category: 'Bonecas',
    rating: 4.2,
    reviews: 75,
    sales: 150,
  },
  {
    id: '4',
    name: 'Kit de Arte e Criatividade',
    price: 79.99,
    image: '/images/products/art-kit.jpg',
    category: 'Artes e Criatividade',
    rating: 4.6,
    reviews: 85,
    sales: 160,
  },
  {
    id: '5',
    name: 'Bicicleta Infantil',
    price: 299.99,
    image: '/images/products/bike.jpg',
    category: 'Veículos',
    rating: 4.7,
    reviews: 65,
    sales: 120,
  },
  {
    id: '6',
    name: 'Bola de Futebol',
    price: 49.99,
    image: '/images/products/soccer-ball.jpg',
    category: 'Esportes',
    rating: 4.4,
    reviews: 45,
    sales: 90,
  },
];

export default function FeaturedPage() {
  const [products] = useState<Product[]>(mockProducts);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      title: 'Item adicionado',
      description: 'O produto foi adicionado ao seu carrinho.',
    });
  };

  const renderProductCard = (product: Product) => (
    <Card key={product.id} className="overflow-hidden">
      <div className="relative aspect-square">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-sm text-muted-foreground">{product.category}</p>
          </div>
          <Badge variant="secondary">{product.rating} ★</Badge>
        </div>
        <div className="mt-4 space-y-2">
          <p className="text-lg font-bold">
            R$ {product.price.toFixed(2)}
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{product.reviews} avaliações</span>
            <span>{product.sales} vendas</span>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Button
            className="flex-1"
            onClick={() => handleAddToCart(product)}
          >
            Adicionar ao Carrinho
          </Button>
          <Button variant="outline" size="icon" asChild>
            <Link href={`/produtos/${product.id}`}>
              <Star className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Produtos em Destaque</h1>
        <p className="text-muted-foreground mt-2">
          Confira os produtos mais populares e bem avaliados
        </p>
      </div>

      <Tabs defaultValue="popular" className="space-y-6">
        <TabsList>
          <TabsTrigger value="popular" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Mais Populares
          </TabsTrigger>
          <TabsTrigger value="best-rated" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            Melhor Avaliados
          </TabsTrigger>
          <TabsTrigger value="award-winning" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            Premiados
          </TabsTrigger>
        </TabsList>

        <TabsContent value="popular" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products
            .sort((a, b) => b.sales - a.sales)
            .slice(0, 6)
            .map(renderProductCard)}
        </TabsContent>

        <TabsContent value="best-rated" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 6)
            .map(renderProductCard)}
        </TabsContent>

        <TabsContent value="award-winning" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products
            .filter((product) => product.rating >= 4.7)
            .slice(0, 6)
            .map(renderProductCard)}
        </TabsContent>
      </Tabs>
    </div>
  );
} 