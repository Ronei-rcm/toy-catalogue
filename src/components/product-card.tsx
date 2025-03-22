'use client';

import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  stock: number;
  rating: number;
  discount?: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(
      isFavorite ? 'Produto removido dos favoritos' : 'Produto adicionado aos favoritos'
    );
  };

  return (
    <div
      className="group relative bg-background rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Discount Badge */}
      {product.discount && (
        <div className="absolute top-4 left-4 z-10 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
          -{product.discount}%
        </div>
      )}

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={`object-cover transition-transform duration-300 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">{product.category}</span>
          <div className="flex items-center">
            <span className="text-sm text-yellow-500 mr-1">★</span>
            <span className="text-sm">{product.rating}</span>
          </div>
        </div>

        <h3 className="font-semibold mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between">
          <div>
            {product.discount ? (
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-red-500">
                  R$ {discountedPrice.toFixed(2)}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  R$ {product.price.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold">
                R$ {product.price.toFixed(2)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={toggleFavorite}
            >
              <Heart
                className={`h-4 w-4 transition-colors ${
                  isFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
                }`}
              />
            </Button>
            <Button
              variant="default"
              size="icon"
              className="h-8 w-8"
              onClick={() => {
                onAddToCart();
                toast.success('Produto adicionado ao carrinho');
              }}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {product.stock === 0 && (
          <p className="text-sm text-red-500 mt-2">Fora de estoque</p>
        )}
      </div>
    </div>
  );
} 