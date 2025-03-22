'use client';

import { useState, useEffect } from 'react';
import { Star, Heart, Share2, Truck, Shield, ArrowLeft, ShoppingCart } from 'lucide-react';
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
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  sales: number;
  description: string;
  features: string[];
  specifications: {
    [key: string]: string;
  };
  relatedProducts: {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    rating: number;
  }[];
  stock: number;
}

// Dados mockados para exemplo
const mockProduct: Product = {
  id: '1',
  name: 'Kit de Construção LEGO Star Wars Millennium Falcon',
  price: 399.99,
  originalPrice: 499.99,
  image: '/images/products/lego-star-wars.jpg',
  category: 'Brinquedos de Montar',
  rating: 4.8,
  reviews: 128,
  sales: 256,
  description: 'Construa o icônico Millennium Falcon da saga Star Wars com este kit LEGO detalhado. Inclui minifiguras dos personagens principais e peças de alta qualidade para uma experiência de montagem incrível.',
  features: [
    '7.541 peças para montagem detalhada',
    'Inclui 8 minifiguras dos personagens principais',
    'Cockpit removível para acesso ao interior',
    'Canhões e armas funcionais',
    'Manual de instruções ilustrado',
  ],
  specifications: {
    'Idade Recomendada': '16+ anos',
    'Número de Peças': '7.541',
    'Dimensões': '84 x 56 x 22 cm',
    'Peso': '8.2 kg',
    'Material': 'Plástico ABS',
  },
  relatedProducts: [
    {
      id: '2',
      name: 'LEGO Star Wars X-Wing Fighter',
      price: 199.99,
      image: '/images/products/lego-x-wing.jpg',
      category: 'Brinquedos de Montar',
      rating: 4.6,
    },
    {
      id: '3',
      name: 'LEGO Star Wars Death Star',
      price: 299.99,
      image: '/images/products/lego-death-star.jpg',
      category: 'Brinquedos de Montar',
      rating: 4.7,
    },
  ],
  stock: 15,
};

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addItem } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    // Simular carregamento do produto
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        // Aqui você faria a chamada real à API
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProduct(mockProduct);
      } catch (err) {
        setError('Erro ao carregar o produto');
        toast({
          variant: 'destructive',
          title: 'Erro',
          description: 'Não foi possível carregar os detalhes do produto.',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [params.id, toast]);

  const handleAddToCart = () => {
    if (!product) return;
    
    if (quantity > product.stock) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Quantidade não disponível em estoque.',
      });
      return;
    }

    addItem({ ...product, quantity });
    toast({
      title: 'Item adicionado',
      description: 'O produto foi adicionado ao seu carrinho.',
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Erro ao carregar o produto</h2>
          <p className="text-gray-500 mb-4">{error || 'Produto não encontrado'}</p>
          <Link
            href="/produtos"
            className="inline-flex items-center text-primary hover:text-primary/80"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para produtos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/produtos"
        className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-8"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar para produtos
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Imagem do produto */}
        <div className="relative h-[400px] md:h-[600px]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>

        {/* Informações do produto */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="ml-1">{product.rating}</span>
              <span className="text-gray-500 ml-2">({product.reviews} avaliações)</span>
            </div>
            <span className="text-gray-500">•</span>
            <span className="text-gray-500">{product.category}</span>
          </div>

          <p className="text-gray-600 mb-6">{product.description}</p>

          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-3xl font-bold">
              R$ {product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-gray-500 line-through">
                R$ {product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 mb-8">
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="px-4 py-2 border rounded-md"
              disabled={product.stock === 0}
            >
              {[...Array(Math.min(10, product.stock))].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="h-5 w-5" />
              {product.stock === 0 ? 'Fora de Estoque' : 'Adicionar ao Carrinho'}
            </button>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-primary" />
              <span>Frete grátis para compras acima de R$ 299,90</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span>Garantia de 30 dias</span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Características</h2>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="text-primary">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Especificações</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key}>
                  <span className="text-gray-500 capitalize">{key}:</span>
                  <span className="ml-2">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {product.relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Produtos Relacionados</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {product.relatedProducts.map((relatedProduct) => (
              <Card key={relatedProduct.id} className="overflow-hidden">
                <div className="relative aspect-square">
                  <Image
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{relatedProduct.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {relatedProduct.category}
                      </p>
                    </div>
                    <Badge variant="secondary">{relatedProduct.rating} ★</Badge>
                  </div>
                  <div className="mt-4">
                    <p className="text-lg font-bold">
                      R$ {relatedProduct.price.toFixed(2)}
                    </p>
                  </div>
                  <Button className="w-full mt-4" variant="outline" asChild>
                    <Link href={`/produtos/${relatedProduct.id}`}>
                      Ver Detalhes
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 