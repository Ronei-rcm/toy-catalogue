'use client';

import { useAuth } from '@/hooks/use-auth';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  Settings,
  LogOut,
} from 'lucide-react';
import { signOut } from 'next-auth/react';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Produtos', href: '/admin/products', icon: Package },
  { name: 'Clientes', href: '/admin/customers', icon: Users },
  { name: 'Pedidos', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Configurações', href: '/admin/settings', icon: Settings },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { requireAdmin } = useAuth();
  const pathname = usePathname();

  // Verifica se o usuário é admin
  requireAdmin();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
          <div className="flex h-16 items-center justify-center border-b">
            <h1 className="text-xl font-bold">Painel Admin</h1>
          </div>
          <nav className="mt-5 px-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'group flex items-center rounded-md px-2 py-2 text-sm font-medium',
                    isActive
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <item.icon
                    className={cn(
                      'mr-3 h-5 w-5 flex-shrink-0',
                      isActive
                        ? 'text-gray-500'
                        : 'text-gray-400 group-hover:text-gray-500'
                    )}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="absolute bottom-0 w-full border-t p-4">
            <button
              onClick={() => signOut()}
              className="flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <LogOut className="mr-3 h-5 w-5 text-gray-400" />
              Sair
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="ml-64 flex-1">
          <main className="p-6">{children}</main>
        </div>
      </div>
    </div>
  );
} 