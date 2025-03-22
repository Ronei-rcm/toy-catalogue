
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  Menu, 
  User, 
  Search, 
  Heart,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  const { items } = useCart();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-primary">
            MuhlStore BrinquedoKIDS
          </Link>

          {/* Menu de navegação (Desktop) */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/catalogo" className="px-3 py-2 hover:text-primary transition-colors">
                  Catálogo
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="px-3 py-2 hover:text-primary transition-colors bg-transparent">
                  Categorias
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white p-4 rounded-md shadow-md min-w-[600px]">
                  <div className="grid grid-cols-2 gap-3 p-4">
                    <Link 
                      to="/categorias" 
                      className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors"
                    >
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <ChevronDown className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">Todas as Categorias</div>
                        <div className="text-sm text-muted-foreground">Explore todas nossas opções</div>
                      </div>
                    </Link>
                    <Link 
                      to="/lancamentos" 
                      className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors"
                    >
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <ChevronDown className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">Lançamentos</div>
                        <div className="text-sm text-muted-foreground">Novidades da semana</div>
                      </div>
                    </Link>
                    <Link 
                      to="/promocoes" 
                      className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors"
                    >
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <ChevronDown className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">Promoções</div>
                        <div className="text-sm text-muted-foreground">Descontos especiais</div>
                      </div>
                    </Link>
                    <Link 
                      to="/contato" 
                      className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors"
                    >
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <ChevronDown className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">Contato</div>
                        <div className="text-sm text-muted-foreground">Fale conosco</div>
                      </div>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/lancamentos" className="px-3 py-2 hover:text-primary transition-colors">
                  Lançamentos
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/promocoes" className="px-3 py-2 hover:text-primary transition-colors">
                  Promoções
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/contato" className="px-3 py-2 hover:text-primary transition-colors">
                  Contato
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Ícones de ação */}
          <div className="flex items-center space-x-4">
            {/* Busca */}
            <button className="p-1 hover:text-primary transition-colors">
              <Search size={20} />
            </button>
            
            {/* Lista de desejos */}
            <Link to="/lista-desejos" className="p-1 hover:text-primary transition-colors">
              <Heart size={20} />
            </Link>

            {/* Carrinho de compras */}
            <Link to="/carrinho" className="p-1 hover:text-primary transition-colors relative">
              <ShoppingCart size={20} />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>

            {/* Autenticação / Perfil */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-1 hover:text-primary transition-colors">
                    <User size={20} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="font-medium">
                    Olá, {user?.name}
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem>
                      <Link to="/admin/dashboard" className="w-full">
                        Painel Admin
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem>
                    <Link to="/perfil" className="w-full">
                      Meu Perfil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/pedidos" className="w-full">
                      Meus Pedidos
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    <LogOut size={16} className="mr-2" /> Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login" className="p-1 hover:text-primary transition-colors">
                <User size={20} />
              </Link>
            )}

            {/* Menu mobile */}
            <button className="md:hidden p-1 hover:text-primary transition-colors" onClick={toggleMenu}>
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 space-y-3 border-t mt-3">
            <Link to="/catalogo" className="block hover:text-primary transition-colors">
              Catálogo
            </Link>
            <Link to="/categorias" className="block hover:text-primary transition-colors">
              Categorias
            </Link>
            <Link to="/lancamentos" className="block hover:text-primary transition-colors">
              Lançamentos
            </Link>
            <Link to="/promocoes" className="block hover:text-primary transition-colors">
              Promoções
            </Link>
            <Link to="/contato" className="block hover:text-primary transition-colors">
              Contato
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
