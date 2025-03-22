'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/cart-context';

export function Header() {
  const { data: session } = useSession();
  const { items } = useCart();

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            Catálogo de Brinquedos
          </Link>

          <nav className="flex items-center gap-6">
            <Link href="/produtos" className="hover:text-primary">
              Produtos
            </Link>
            <Link href="/categorias" className="hover:text-primary">
              Categorias
            </Link>
            {session ? (
              <Link href="/perfil" className="hover:text-primary">
                Perfil
              </Link>
            ) : (
              <Link href="/login" className="hover:text-primary">
                Login
              </Link>
            )}
            <Link href="/carrinho" className="relative">
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {itemCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
} 