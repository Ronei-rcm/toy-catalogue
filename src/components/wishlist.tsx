'use client';

import { useState, useEffect } from 'react';
import { Heart, Trash2, Share2, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useCart } from '@/contexts/cart-context';
import Image from 'next/image';
import Link from 'next/link';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
}

export function Wishlist() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const { addToCart } = useCart();
  const { toast } = useToast();

  // Simular dados da lista de desejos
  useEffect(() => {
    const mockItems: WishlistItem[] = [
      {
        id: '1',
        name: 'Kit de Construção LEGO Star Wars',
        price: 299.99,
        image: '/images/products/lego-star-wars.jpg',
        category: 'Brinquedos de Montar',
        rating: 4.8,
      },
      {
        id: '2',
        name: 'Jogo de Tabuleiro Monopoly',
        price: 89.99,
        image: '/images/products/monopoly.jpg',
        category: 'Jogos de Tabuleiro',
        rating: 4.5,
      },
    ];
    setItems(mockItems);
  }, []);

  const removeFromWishlist = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    toast({
      title: 'Item removido',
      description: 'O item foi removido da sua lista de desejos.',
    });
  };

  const moveToCart = (item: WishlistItem) => {
    addToCart(item);
    removeFromWishlist(item.id);
    toast({
      title: 'Item adicionado ao carrinho',
      description: 'O item foi movido para o seu carrinho de compras.',
    });
  };

  const shareWishlist = async () => {
    try {
      await navigator.share({
        title: 'Minha Lista de Desejos - MuhlStore',
        text: 'Confira minha lista de desejos na MuhlStore!',
        url: window.location.href,
      });
    } catch (error) {
      console.error('Erro ao compartilhar:', error);
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">Sua lista de desejos está vazia</h3>
        <p className="mt-2 text-muted-foreground">
          Adicione produtos que você gostaria de comprar no futuro.
        </p>
        <Button asChild className="mt-4">
          <Link href="/produtos">Explorar Produtos</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Lista de Desejos</h2>
        <Button variant="outline" size="sm" onClick={shareWishlist}>
          <Share2 className="mr-2 h-4 w-4" />
          Compartilhar
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="relative aspect-square">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 right-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.category}</p>
                </div>
                <Badge variant="secondary">{item.rating} ★</Badge>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-lg font-bold">
                  R$ {item.price.toFixed(2)}
                </p>
                <Button
                  size="sm"
                  onClick={() => moveToCart(item)}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Adicionar ao Carrinho
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 