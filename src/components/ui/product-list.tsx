'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import type { Product } from '@/types/product';
import { useFavorites } from '@/hooks/useFavorites';
import { useCart } from '@/hooks/useCart';
import { Toast } from './toast';

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToCart } = useCart();
  const [toast, setToast] = React.useState<{
    message: string;
    type: 'success' | 'error' | 'info';
  } | null>(null);

  const handleAddToCart = (product: Product) => {
    if (product.stock === 0) {
      setToast({
        message: 'Produto fora de estoque',
        type: 'error',
      });
      return;
    }

    addToCart(product);
    setToast({
      message: 'Produto adicionado ao carrinho',
      type: 'success',
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <Link href={`/produtos/${product.id}`}>
              <div className="relative aspect-square">
                <Image
                  src={product.imageUrl || '/images/placeholder.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/placeholder.jpg';
                  }}
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(product.id);
                    }}
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        isFavorite(product.id)
                          ? 'fill-red-500 text-red-500'
                          : 'text-gray-600'
                      }`}
                    />
                  </button>
                  <button
                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart(product);
                    }}
                  >
                    <ShoppingCart className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </Link>

            <div className="p-4">
              <Link href={`/produtos/${product.id}`}>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors duration-200">
                  {product.name}
                </h3>
              </Link>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-blue-600">
                    R$ {product.price.toFixed(2)}
                  </span>
                  {product.stock > 0 ? (
                    <span className="ml-2 text-sm text-green-600">Em estoque</span>
                  ) : (
                    <span className="ml-2 text-sm text-red-600">Fora de estoque</span>
                  )}
                </div>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={product.stock === 0}
                  onClick={() => handleAddToCart(product)}
                >
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
} 