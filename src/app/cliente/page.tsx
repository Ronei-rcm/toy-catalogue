'use client';

import { Card } from '@/components/ui/card';
import { 
  Package, 
  Heart, 
  ShoppingCart,
  Clock
} from 'lucide-react';

export default function ClienteDashboard() {
  // TODO: Fetch these values from the API
  const stats = [
    { name: 'Pedidos Realizados', value: '12', icon: Package },
    { name: 'Itens Favoritos', value: '8', icon: Heart },
    { name: 'Carrinho Atual', value: '3', icon: ShoppingCart },
    { name: 'Último Pedido', value: '2 dias atrás', icon: Clock },
  ];

  const recentOrders = [
    {
      id: '1',
      date: '20/03/2024',
      status: 'Entregue',
      total: 'R$ 299,90',
      items: 3,
    },
    {
      id: '2',
      date: '15/03/2024',
      status: 'Em trânsito',
      total: 'R$ 149,90',
      items: 1,
    },
    {
      id: '3',
      date: '10/03/2024',
      status: 'Entregue',
      total: 'R$ 499,90',
      items: 5,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Bem-vindo de volta!
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Aqui está um resumo da sua atividade recente
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name} className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-900">{stat.name}</h3>
                  <p className="mt-1 text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Pedidos Recentes
          </h3>
        </div>
        <div className="divide-y divide-gray-200">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="px-6 py-4 flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Package className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">
                    Pedido #{order.id}
                  </div>
                  <div className="text-sm text-gray-500">{order.date}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-500">
                  {order.items} {order.items === 1 ? 'item' : 'itens'}
                </div>
                <div className="text-sm font-medium text-gray-900">
                  {order.total}
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    order.status === 'Entregue'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
} 