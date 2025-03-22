'use client';

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, LogOut } from "lucide-react";
import { useCart } from "@/contexts/cart-context";

export function Navbar() {
  const { data: session } = useSession();
  const { items } = useCart();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold">
            ToyCatalogue
          </Link>

          <nav className="flex items-center gap-6">
            <Link href="/produtos" className="text-gray-600 hover:text-gray-900">
              Produtos
            </Link>
            <Link href="/categorias" className="text-gray-600 hover:text-gray-900">
              Categorias
            </Link>
            <Link href="/marcas" className="text-gray-600 hover:text-gray-900">
              Marcas
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/carrinho" className="relative">
              <ShoppingCart className="h-6 w-6" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>

            {session ? (
              <div className="flex items-center gap-2">
                <Link href="/perfil">
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => signOut()}
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button>Entrar</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 