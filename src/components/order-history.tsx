'use client';

import { useState } from 'react';
import { Package, Truck, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  total: number;
  shippingAddress: string;
  trackingNumber?: string;
}

const mockOrders: Order[] = [
  {
    id: '12345',
    date: '2024-03-20T10:30:00',
    status: 'processing',
    items: [
      {
        id: '1',
        name: 'Kit de Construção LEGO Star Wars',
        price: 299.99,
        quantity: 1,
        image: '/images/products/lego-star-wars.jpg',
      },
      {
        id: '2',
        name: 'Jogo de Tabuleiro Monopoly',
        price: 89.99,
        quantity: 2,
        image: '/images/products/monopoly.jpg',
      },
    ],
    total: 479.97,
    shippingAddress: 'Rua das Flores, 123 - Centro, São Paulo - SP',
  },
  {
    id: '12344',
    date: '2024-03-15T14:20:00',
    status: 'delivered',
    items: [
      {
        id: '3',
        name: 'Boneca Barbie',
        price: 79.99,
        quantity: 1,
        image: '/images/products/barbie.jpg',
      },
    ],
    total: 79.99,
    shippingAddress: 'Avenida Principal, 456 - Jardim América, Rio de Janeiro - RJ',
    trackingNumber: 'BR123456789',
  },
];

const getStatusIcon = (status: Order['status']) => {
  switch (status) {
    case 'pending':
      return <Clock className="h-4 w-4" />;
    case 'processing':
      return <Package className="h-4 w-4" />;
    case 'shipped':
      return <Truck className="h-4 w-4" />;
    case 'delivered':
      return <CheckCircle2 className="h-4 w-4" />;
    case 'cancelled':
      return <AlertCircle className="h-4 w-4" />;
    default:
      return <Package className="h-4 w-4" />;
  }
};

const getStatusText = (status: Order['status']) => {
  switch (status) {
    case 'pending':
      return 'Pendente';
    case 'processing':
      return 'Processando';
    case 'shipped':
      return 'Enviado';
    case 'delivered':
      return 'Entregue';
    case 'cancelled':
      return 'Cancelado';
    default:
      return 'Processando';
  }
};

const getStatusColor = (status: Order['status']) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-500';
    case 'processing':
      return 'bg-blue-500';
    case 'shipped':
      return 'bg-purple-500';
    case 'delivered':
      return 'bg-green-500';
    case 'cancelled':
      return 'bg-red-500';
    default:
      return 'bg-blue-500';
  }
};

export function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Order['status'] | 'all'>('all');

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.id.includes(searchTerm);
    const matchesStatus =
      statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Histórico de Pedidos</h2>
        <div className="flex items-center gap-4">
          <Input
            placeholder="Buscar por número do pedido..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value as Order['status'] | 'all')}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Status</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
              <SelectItem value="processing">Processando</SelectItem>
              <SelectItem value="shipped">Enviado</SelectItem>
              <SelectItem value="delivered">Entregue</SelectItem>
              <SelectItem value="cancelled">Cancelado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <ScrollArea className="h-[600px]">
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">Pedido #{order.id}</h3>
                    <Badge
                      className={`${getStatusColor(order.status)} text-white`}
                    >
                      {getStatusIcon(order.status)}
                      {getStatusText(order.status)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {new Date(order.date).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <p className="text-lg font-bold">
                  R$ {order.total.toFixed(2)}
                </p>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Itens do Pedido</h4>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 py-2 border-b last:border-0"
                      >
                        <div className="relative h-16 w-16">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="object-cover rounded-md"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Quantidade: {item.quantity}
                          </p>
                        </div>
                        <p className="font-medium">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Endereço de Entrega</h4>
                  <p className="text-sm text-muted-foreground">
                    {order.shippingAddress}
                  </p>
                </div>

                {order.trackingNumber && (
                  <div>
                    <h4 className="font-medium mb-2">Número de Rastreio</h4>
                    <p className="text-sm text-muted-foreground">
                      {order.trackingNumber}
                    </p>
                  </div>
                )}

                {order.status === 'delivered' && (
                  <Button variant="outline" className="w-full">
                    Comprar Novamente
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
} 