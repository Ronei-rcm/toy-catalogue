import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Package, Users, ShoppingBag, BarChart, Tag, Settings, Truck, Eye, Edit, 
  Trash2, Search, Home, LogOut, PlusCircle, Boxes, Filter, 
  AlertTriangle, CheckCircle2, XCircle, Download, DollarSign, TrendingUp,
  ShoppingCart, UserPlus, PackagePlus, PackageCheck, PackageX
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from '@/context/AuthContext';

import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";

// Mock data
const mockProducts = [
  { id: 1, name: 'Boneca Barbie', category: 'Bonecas', price: 'R$ 89,90', stock: 15, status: 'active' },
  { id: 2, name: 'Carrinho de Controle', category: 'Veículos', price: 'R$ 199,90', stock: 8, status: 'active' },
  { id: 3, name: 'Kit de Blocos', category: 'Construção', price: 'R$ 129,90', stock: 0, status: 'inactive' },
];

const mockOrders = [
  { id: '#ORD-123456', customer: 'João Silva', date: '15/05/2023', status: 'Entregue', total: 'R$ 149,90' },
  { id: '#ORD-123455', customer: 'Maria Santos', date: '02/04/2023', status: 'Em Processamento', total: 'R$ 89,90' },
  { id: '#ORD-123454', customer: 'Pedro Oliveira', date: '18/03/2023', status: 'Pendente', total: 'R$ 209,50' },
];

const mockCustomers = [
  { id: 1, name: 'João Silva', email: 'joao@email.com', phone: '(11) 99999-9999', status: 'active' },
  { id: 2, name: 'Maria Santos', email: 'maria@email.com', phone: '(11) 98888-8888', status: 'active' },
  { id: 3, name: 'Pedro Oliveira', email: 'pedro@email.com', phone: '(11) 97777-7777', status: 'inactive' },
];

const AdminSidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <Sidebar>
      <SidebarHeader className="px-3 py-2">
        <div className="flex items-center gap-2">
          <img 
            src="https://php2.re9suainternet.com.br/img/logo.png" 
            alt="Logo" 
            className="h-8"
          />
          <h2 className="font-semibold text-xl">Admin</h2>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => navigate('/admin')} tooltip="Dashboard">
                  <Home className="h-4 w-4" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => navigate('/admin/produtos')} tooltip="Produtos">
                  <Package className="h-4 w-4" />
                  <span>Produtos</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Categorias">
                  <Tag className="h-4 w-4" />
                  <span>Categorias</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Pedidos">
                  <ShoppingBag className="h-4 w-4" />
                  <span>Pedidos</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Clientes">
                  <Users className="h-4 w-4" />
                  <span>Clientes</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Financeiro</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Vendas">
                  <DollarSign className="h-4 w-4" />
                  <span>Vendas</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Relatórios">
                  <BarChart className="h-4 w-4" />
                  <span>Relatórios</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Configurações</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Configurações">
                  <Settings className="h-4 w-4" />
                  <span>Configurações</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <Button variant="ghost" className="w-full justify-start" onClick={logout}>
          <LogOut className="h-4 w-4 mr-2" />
          Sair
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

const AdminDashboard = () => {
  const [productFilter, setProductFilter] = useState('');
  const [orderFilter, setOrderFilter] = useState('');
  const [customerFilter, setCustomerFilter] = useState('');
  const [selectedTab, setSelectedTab] = useState('overview');

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(productFilter.toLowerCase())
  );

  const filteredOrders = mockOrders.filter(order =>
    order.id.toLowerCase().includes(orderFilter.toLowerCase()) ||
    order.customer.toLowerCase().includes(orderFilter.toLowerCase())
  );

  const filteredCustomers = mockCustomers.filter(customer =>
    customer.name.toLowerCase().includes(customerFilter.toLowerCase()) ||
    customer.email.toLowerCase().includes(customerFilter.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Bem-vindo ao painel administrativo
            </p>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Vendas Totais</p>
                    <h3 className="text-2xl font-bold">R$ 45.231,89</h3>
                    <p className="text-xs text-green-500 mt-1">+20.1% em relação ao mês anterior</p>
                  </div>
                  <div className="rounded-full bg-green-100 p-3">
                    <DollarSign className="h-6 w-6 text-green-700" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pedidos</p>
                    <h3 className="text-2xl font-bold">1.234</h3>
                    <p className="text-xs text-green-500 mt-1">+12.5% em relação ao mês anterior</p>
                  </div>
                  <div className="rounded-full bg-blue-100 p-3">
                    <ShoppingCart className="h-6 w-6 text-blue-700" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Clientes</p>
                    <h3 className="text-2xl font-bold">540</h3>
                    <p className="text-xs text-green-500 mt-1">+8.2% em relação ao mês anterior</p>
                  </div>
                  <div className="rounded-full bg-purple-100 p-3">
                    <UserPlus className="h-6 w-6 text-purple-700" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Produtos</p>
                    <h3 className="text-2xl font-bold">1.234</h3>
                    <p className="text-xs text-red-500 mt-1">-2.1% em relação ao mês anterior</p>
                  </div>
                  <div className="rounded-full bg-orange-100 p-3">
                    <PackagePlus className="h-6 w-6 text-orange-700" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="mb-8 w-full border-b">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart className="h-4 w-4" />
                <span>Visão Geral</span>
              </TabsTrigger>
              <TabsTrigger value="produtos" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                <span>Produtos</span>
              </TabsTrigger>
              <TabsTrigger value="pedidos" className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                <span>Pedidos</span>
              </TabsTrigger>
              <TabsTrigger value="clientes" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Clientes</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Vendas por Categoria</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Bonecas</span>
                          <span className="text-sm text-muted-foreground">45%</span>
                        </div>
                        <Progress value={45} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Veículos</span>
                          <span className="text-sm text-muted-foreground">30%</span>
                        </div>
                        <Progress value={30} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Jogos</span>
                          <span className="text-sm text-muted-foreground">25%</span>
                        </div>
                        <Progress value={25} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Status dos Pedidos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Entregues</span>
                          <span className="text-sm text-muted-foreground">65%</span>
                        </div>
                        <Progress value={65} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Em Processamento</span>
                          <span className="text-sm text-muted-foreground">25%</span>
                        </div>
                        <Progress value={25} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Pendentes</span>
                          <span className="text-sm text-muted-foreground">10%</span>
                        </div>
                        <Progress value={10} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="produtos">
              <Card>
                <CardHeader className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
                  <div>
                    <CardTitle>Lista de Produtos</CardTitle>
                    <CardDescription>Gerencie seus produtos cadastrados</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative w-full md:w-72">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar produtos..."
                        className="pl-8"
                        value={productFilter}
                        onChange={(e) => setProductFilter(e.target.value)}
                      />
                    </div>
                    <Button>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Novo Produto
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Produto</TableHead>
                          <TableHead>Categoria</TableHead>
                          <TableHead>Preço</TableHead>
                          <TableHead>Estoque</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredProducts.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>{product.stock}</TableCell>
                            <TableCell>
                              <Badge variant={product.status === 'active' ? 'success' : 'destructive'}>
                                {product.status === 'active' ? 'Ativo' : 'Inativo'}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="icon">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
                <CardFooter>
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">2</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="pedidos">
              <Card>
                <CardHeader className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
                  <div>
                    <CardTitle>Pedidos</CardTitle>
                    <CardDescription>Visualize e gerencie os pedidos realizados</CardDescription>
                  </div>
                  <div className="relative w-full md:w-72">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar pedidos..."
                      className="pl-8"
                      value={orderFilter}
                      onChange={(e) => setOrderFilter(e.target.value)}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Pedido</TableHead>
                          <TableHead>Cliente</TableHead>
                          <TableHead>Data</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredOrders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>{order.customer}</TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>
                              <Badge variant={
                                order.status === 'Entregue' ? 'success' :
                                order.status === 'Em Processamento' ? 'warning' :
                                'destructive'
                              }>
                                {order.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">{order.total}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
                <CardFooter>
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">2</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="clientes">
              <Card>
                <CardHeader className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
                  <div>
                    <CardTitle>Lista de Clientes</CardTitle>
                    <CardDescription>Visualize e gerencie os dados dos clientes</CardDescription>
                  </div>
                  <div className="relative w-full md:w-72">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar clientes..."
                      className="pl-8"
                      value={customerFilter}
                      onChange={(e) => setCustomerFilter(e.target.value)}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Telefone</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCustomers.map((customer) => (
                          <TableRow key={customer.id}>
                            <TableCell className="font-medium">{customer.name}</TableCell>
                            <TableCell>{customer.email}</TableCell>
                            <TableCell>{customer.phone}</TableCell>
                            <TableCell>
                              <Badge variant={customer.status === 'active' ? 'success' : 'destructive'}>
                                {customer.status === 'active' ? 'Ativo' : 'Inativo'}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="icon">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
                <CardFooter>
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">2</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
