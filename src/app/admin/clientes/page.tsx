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
  Edit, 
  Trash2,
  UserPlus,
  FileText,
  Mail,
  Phone,
  MapPin,
  ShoppingBag
} from 'lucide-react';

// Dados simulados
const customers = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '(11) 98765-4321',
    address: 'Rua das Flores, 123 - São Paulo, SP',
    totalOrders: 5,
    totalSpent: 'R$ 1.299,90',
    lastPurchase: '2024-03-20',
    status: 'Ativo'
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria.santos@email.com',
    phone: '(11) 98765-4322',
    address: 'Av. Paulista, 1000 - São Paulo, SP',
    totalOrders: 3,
    totalSpent: 'R$ 799,90',
    lastPurchase: '2024-03-15',
    status: 'Ativo'
  },
  {
    id: '3',
    name: 'Pedro Costa',
    email: 'pedro.costa@email.com',
    phone: '(11) 98765-4323',
    address: 'Rua Augusta, 500 - São Paulo, SP',
    totalOrders: 1,
    totalSpent: 'R$ 299,90',
    lastPurchase: '2024-03-10',
    status: 'Inativo'
  }
];

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar lógica de busca
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Clientes</h1>
          <p className="mt-2 text-gray-500">Gerencie os clientes da loja</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Novo Cliente
          </Button>
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Filtros e Busca */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="Buscar clientes por nome, email ou telefone..."
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
              Ativos
            </Button>
            <Button variant="outline">
              Inativos
            </Button>
          </div>
        </div>
      </Card>

      {/* Lista de Clientes */}
      <Card className="p-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Total Pedidos</TableHead>
                <TableHead>Total Gasto</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow 
                  key={customer.id}
                  className={selectedCustomer === customer.id ? 'bg-gray-50' : ''}
                  onClick={() => setSelectedCustomer(customer.id)}
                >
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.totalOrders}</TableCell>
                  <TableCell>{customer.totalSpent}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      customer.status === 'Ativo' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {customer.status}
                    </span>
                  </TableCell>
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
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Excluir
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
          <div>Mostrando 1-3 de 3 clientes</div>
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

      {/* Detalhes do Cliente */}
      {selectedCustomer && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Detalhes do Cliente</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Informações Pessoais</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{customers.find(c => c.id === selectedCustomer)?.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{customers.find(c => c.id === selectedCustomer)?.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{customers.find(c => c.id === selectedCustomer)?.address}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Histórico de Compras</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center">
                    <ShoppingBag className="h-4 w-4 text-gray-400 mr-2" />
                    <span>Última compra em {new Date(customers.find(c => c.id === selectedCustomer)?.lastPurchase || '').toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 text-gray-400 mr-2" />
                    <span>Total de pedidos: {customers.find(c => c.id === selectedCustomer)?.totalOrders}</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 text-gray-400 mr-2" />
                    <span>Total gasto: {customers.find(c => c.id === selectedCustomer)?.totalSpent}</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-4">Últimos Pedidos</h3>
              <div className="space-y-4">
                {/* Aqui você pode adicionar uma lista dos últimos pedidos do cliente */}
                <div className="text-sm text-gray-500">
                  Nenhum pedido recente encontrado.
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
} 