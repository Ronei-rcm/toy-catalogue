'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Package,
  Tags,
  ShoppingCart,
  Users,
  FileBarChart,
  Settings,
  LogOut,
  Menu,
  X,
  ShoppingBag,
  BarChart,
  User,
  Bell,
  Search,
  Plus,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth-context';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useToast } from '@/components/ui/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const navigation = [
  {
    name: 'Painel',
    href: '/admin',
    icon: LayoutDashboard
  },
  {
    name: 'Produtos',
    href: '/admin/produtos',
    icon: Package
  },
  {
    name: 'Categorias',
    href: '/admin/categorias',
    icon: Tags
  },
  {
    name: 'Pedidos',
    href: '/admin/pedidos',
    icon: ShoppingCart
  },
  {
    name: 'Clientes',
    href: '/admin/clientes',
    icon: Users
  },
  {
    name: 'Relatórios',
    href: '/admin/relatorios',
    icon: FileBarChart
  },
  {
    name: 'Configurações',
    href: '/admin/configuracoes',
    icon: Settings
  }
];

const quickActions = [
  { name: 'Novo Produto', href: '/admin/produtos/novo', icon: Package },
  { name: 'Nova Categoria', href: '/admin/categorias/nova', icon: Tags },
  { name: 'Novo Cliente', href: '/admin/clientes/novo', icon: Users },
];

const mockNotifications = [
  { id: 1, title: 'Novo Pedido', description: 'Pedido #1234 foi realizado', time: '5 min' },
  { id: 2, title: 'Estoque Baixo', description: 'Produto X está com estoque baixo', time: '1h' },
  { id: 3, title: 'Nova Avaliação', description: 'Produto Y recebeu uma nova avaliação', time: '2h' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAdmin, isLoading, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      toast({
        variant: "destructive",
        title: "Acesso Negado",
        description: "Você não tem permissão para acessar esta área.",
      });
      router.push('/login');
    }
  }, [isLoading, isAdmin, router, toast]);

  const getBreadcrumbs = () => {
    if (!pathname) return [];
    const paths = pathname.split('/').filter(Boolean);
    return paths.map((path, index) => {
      const href = '/' + paths.slice(0, index + 1).join('/');
      return {
        name: path.charAt(0).toUpperCase() + path.slice(1),
        href,
      };
    });
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao sair",
        description: "Não foi possível realizar o logout. Tente novamente.",
      });
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "Pesquisando...",
        description: `Buscando por "${searchQuery}"`,
      });
      // Implementar lógica de pesquisa aqui
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-white shadow-sm lg:pl-64">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-0 h-10 w-10 lg:hidden"
            >
              {isSidebarOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
            
            {/* Breadcrumbs */}
            <nav className="hidden sm:flex items-center space-x-2">
              {getBreadcrumbs().map((item, index) => (
                <div key={item.href} className="flex items-center">
                  {index > 0 && <span className="mx-2 text-gray-400">/</span>}
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Pesquisar..."
                  className="pl-8 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>

            {/* Quick Actions */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Ações Rápidas
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {quickActions.map((action) => (
                  <DropdownMenuItem key={action.href} asChild>
                    <Link href={action.href} className="flex items-center">
                      <action.icon className="h-4 w-4 mr-2" />
                      {action.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                    {mockNotifications.length}
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                {mockNotifications.map((notification) => (
                  <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3">
                    <div className="flex items-center justify-between w-full">
                      <span className="font-medium">{notification.title}</span>
                      <span className="text-xs text-gray-400">{notification.time}</span>
                    </div>
                    <span className="text-sm text-gray-500">{notification.description}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Help */}
            <Button variant="ghost" size="sm">
              <HelpCircle className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-30 w-64 bg-gray-900 shadow-lg transform transition-transform duration-200 ease-in-out lg:translate-x-0',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="h-full flex flex-col">
          <div className="flex-1 py-6 overflow-y-auto">
            <div className="px-4 mb-6 space-y-4">
              <h2 className="text-2xl font-bold text-white">Administração</h2>
              <div className="flex items-center space-x-3 text-gray-300">
                <User className="h-5 w-5" />
                <span className="text-sm">{user?.name}</span>
              </div>
            </div>
            <nav className="space-y-1 px-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'group flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors duration-150',
                      isActive
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    )}
                  >
                    <item.icon
                      className={cn(
                        'mr-4 h-6 w-6',
                        isActive
                          ? 'text-white'
                          : 'text-gray-400 group-hover:text-gray-300'
                      )}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="p-4 border-t border-gray-700">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700"
              onClick={handleLogout}
            >
              <LogOut className="mr-4 h-6 w-6" />
              Sair
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={cn(
        'lg:pl-64 flex flex-col min-h-screen pt-16',
        isSidebarOpen ? 'blur-sm lg:blur-none' : ''
      )}>
        <main className="flex-1">
          <div className="py-6 lg:py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>

      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
} 