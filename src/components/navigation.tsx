'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, LogIn } from 'lucide-react';

const menuItems = [
  { name: 'Início', href: '/' },
  { name: 'Produtos', href: '/produtos' },
  { name: 'Categorias', href: '/categorias' },
  { name: 'Ofertas', href: '/ofertas' },
  { name: 'Sobre', href: '/sobre' },
  { name: 'Contato', href: '/contato' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Menu para desktop */}
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/login"
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              <LogIn className="h-4 w-4" />
              Entrar
            </Link>
          </div>

          {/* Botão do menu mobile */}
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="md:hidden flex items-center gap-2 text-primary-600 hover:text-primary-700"
            >
              <LogIn className="h-5 w-5" />
            </Link>
            <button
              className="md:hidden p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {isOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/login"
                className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <LogIn className="h-4 w-4" />
                Entrar
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 