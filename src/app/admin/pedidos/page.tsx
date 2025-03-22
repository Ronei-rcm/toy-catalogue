'use client';

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Search, 
  MoreVertical, 
  Eye, 
  Truck, 
  Package,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText
} from 'lucide-react';

// Dados simulados
const orders = [
  {
    id: '#12345',
    customer: 'João Silva',
    date: '2024-03-20',
    total: 'R$ 299,90',
    status: 'Entregue',
    items: [
      { name: 'Boneca Interativa', quantity: 1, price: 'R$ 129,90' },
      { name: 'Carrinho de Controle', quantity: 1, price: 'R$ 170,00' }
    ],
    payment: 'Cartão de Crédito',
    shipping: 'Sedex'
  },
  {
    id: '#12346',
    customer: 'Maria Santos',
    date: '2024-03-19',
    total: 'R$ 149,90',
    status: 'Em trânsito',
    items: [
      { name: 'Quebra-cabeça', quantity: 1, price: 'R$ 89,90' },
      { name: 'Jogo de Cartas', quantity: 2, price: 'R$ 30,00' }
    ],
    payment: 'PIX',
    shipping: 'PAC'
  },
  {
    id: '#12347',
    customer: 'Pedro Costa',
    date: '2024-03-18',
    total: 'R$ 499,90',
    status: 'Processando',
    items: [
      { name: 'Pista Hot Wheels', quantity: 1, price: 'R$ 499,90' }
    ],
    payment: 'Boleto',
    shipping: 'Sedex'
  },
  {
    id: '#12348',
    customer: 'Ana Oliveira',
    date: '2024-03-17',
    total: 'R$ 89,90',
    status: 'Cancelado',
    items: [
      { name: 'Boneco de Ação', quantity: 1, price: 'R$ 89,90' }
    ],
    payment: 'Cartão de Crédito',
    shipping: 'PAC'
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Entregue':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'Em trânsito':
      return <Truck className="h-4 w-4 text-blue-500" />;
    case 'Processando':
      return <Clock className="h-4 w-4 text-yellow-500" />;
    case 'Cancelado':
      return <XCircle className="h-4 w-4 text-red-500" />;
    default:
      return <AlertCircle className="h-4 w-4 text-gray-500" />;
  }
};

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'Entregue':
      return 'bg-green-100 text-green-700';
    case 'Em trânsito':
      return 'bg-blue-100 text-blue-700';
    case 'Processando':
      return 'bg-yellow-100 text-yellow-700';
    case 'Cancelado':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar lógica de busca
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Pedidos</h1>
          <p className="mt-2 text-gray-500">Gerencie os pedidos da loja</p>
        </div>
        <Button variant="outline">
          <FileText className="h-4 w-4 mr-2" />
          Exportar Relatório
        </Button>
      </div>

      {/* Filtros e Busca */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="Buscar pedidos por ID, cliente ou produto..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </form>
          <div className="flex gap-2">
            <Button variant="outline">
              Todos
            </Button>
            <Button variant="outline">
              Processando
            </Button>
            <Button variant="outline">
              Em trânsito
            </Button>
            <Button variant="outline">
              Entregue
            </Button>
          </div>
        </div>
      </Card>

      {/* Lista de Pedidos */}
      <Card className="p-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pedido</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Pagamento</TableHead>
                <TableHead className="w-[100px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow 
                  key={order.id}
                  className={selectedOrder === order.id ? 'bg-gray-50' : ''}
                  onClick={() => setSelectedOrder(order.id)}
                >
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{new Date(order.date).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(order.status)}
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusStyle(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{order.payment}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="flex items-center">
                          <Eye className="h-4 w-4 mr-2" />
                          Detalhes
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center">
                          <Package className="h-4 w-4 mr-2" />
                          Atualizar Status
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center">
                          <FileText className="h-4 w-4 mr-2" />
                          Nota Fiscal
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <div>Mostrando 1-4 de 4 pedidos</div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Anterior
            </Button>
            <Button variant="outline" size="sm" disabled>
              Próxima
            </Button>
          </div>
        </div>
      </Card>

      {/* Detalhes do Pedido */}
      {selectedOrder && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Detalhes do Pedido {selectedOrder}</h2>
          <div className="space-y-6">
            {orders.find(o => o.id === selectedOrder)?.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center border-b pb-4">
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">Quantidade: {item.quantity}</p>
                </div>
                <p className="font-medium">{item.price}</p>
              </div>
            ))}
            <div className="flex justify-between items-center pt-4">
              <span className="font-medium">Total do Pedido</span>
              <span className="font-bold text-lg">
                {orders.find(o => o.id === selectedOrder)?.total}
              </span>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
} 