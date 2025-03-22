import { useState, useEffect } from 'react';
import type { Product } from '@/types/product';

interface CartItem {
  product: Product;
  quantity: number;
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        setItems(Array.isArray(parsedCart) ? parsedCart : []);
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
        setItems([]);
      }
    }
  }, []);

  const addToCart = (product: Product, quantity: number = 1) => {
    setItems((prev) => {
      const existingItem = prev.find((item) => item.product.id === product.id);
      let newItems: CartItem[];

      if (existingItem) {
        newItems = prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...prev, { product, quantity }];
      }

      localStorage.setItem('cart', JSON.stringify(newItems));
      return newItems;
    });
  };

  const removeFromCart = (productId: number) => {
    setItems((prev) => {
      const newItems = prev.filter((item) => item.product.id !== productId);
      localStorage.setItem('cart', JSON.stringify(newItems));
      return newItems;
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) return;

    setItems((prev) => {
      const newItems = prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );
      localStorage.setItem('cart', JSON.stringify(newItems));
      return newItems;
    });
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('cart');
  };

  const getTotal = () => {
    if (!Array.isArray(items)) return 0;
    return items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const getItemCount = () => {
    if (!Array.isArray(items)) return 0;
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotal,
    getItemCount,
  };
} 