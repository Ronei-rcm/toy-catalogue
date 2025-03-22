'use client';

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  FileText,
  TrendingUp,
  Users,
  ShoppingBag,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Calendar
} from 'lucide-react';

// Dados simulados
const salesData = {
  totalSales: 'R$ 25.999,90',
  totalOrders: 150,
  averageTicket: 'R$ 173,33',
  totalCustomers: 89,
  salesGrowth: '+15%',
  ordersGrowth: '+12%',
  customersGrowth: '+8%',
  ticketGrowth: '+3%',
  recentSales: [
    { date: '2024-03-20', value: 1299.90 },
    { date: '2024-03-19', value: 899.90 },
    { date: '2024-03-18', value: 1499.90 },
    { date: '2024-03-17', value: 799.90 },
    { date: '2024-03-16', value: 999.90 },
  ],
  topProducts: [
    { name: 'Boneca Interativa', sales: 25, revenue: 'R$ 3.247,50' },
    { name: 'Carrinho de Controle', sales: 20, revenue: 'R$ 3.400,00' },
    { name: 'Pista Hot Wheels', sales: 15, revenue: 'R$ 7.498,50' },
    { name: 'Quebra-cabeça', sales: 30, revenue: 'R$ 2.697,00' },
    { name: 'Jogo de Cartas', sales: 40, revenue: 'R$ 1.200,00' },
  ],
  salesByCategory: [
    { name: 'Bonecas', value: 35 },
    { name: 'Carrinhos', value: 25 },
    { name: 'Jogos', value: 20 },
    { name: 'Quebra-cabeças', value: 15 },
    { name: 'Outros', value: 5 },
  ]
};

export default function ReportsPage() {
  const [period, setPeriod] = useState('7d');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Relatórios</h1>
          <p className="mt-2 text-gray-500">Análise de vendas e desempenho da loja</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Últimos 7 dias</SelectItem>
              <SelectItem value="30d">Últimos 30 dias</SelectItem>
              <SelectItem value="90d">Últimos 90 dias</SelectItem>
              <SelectItem value="12m">Últimos 12 meses</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Exportar Relatório
          </Button>
        </div>
      </div>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Vendas Totais</p>
              <h3 className="text-2xl font-bold mt-2">{salesData.totalSales}</h3>
            </div>
            <div className="bg-green-100 p-2 rounded-full">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">{salesData.salesGrowth}</span>
            <span className="text-gray-500 ml-1">vs. período anterior</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total de Pedidos</p>
              <h3 className="text-2xl font-bold mt-2">{salesData.totalOrders}</h3>
            </div>
            <div className="bg-blue-100 p-2 rounded-full">
              <ShoppingBag className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">{salesData.ordersGrowth}</span>
            <span className="text-gray-500 ml-1">vs. período anterior</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Ticket Médio</p>
              <h3 className="text-2xl font-bold mt-2">{salesData.averageTicket}</h3>
            </div>
            <div className="bg-purple-100 p-2 rounded-full">
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">{salesData.ticketGrowth}</span>
            <span className="text-gray-500 ml-1">vs. período anterior</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total de Clientes</p>
              <h3 className="text-2xl font-bold mt-2">{salesData.totalCustomers}</h3>
            </div>
            <div className="bg-orange-100 p-2 rounded-full">
              <Users className="h-5 w-5 text-orange-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">{salesData.customersGrowth}</span>
            <span className="text-gray-500 ml-1">vs. período anterior</span>
          </div>
        </Card>
      </div>

      {/* Gráficos e Tabelas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6">Vendas por Categoria</h3>
          <div className="space-y-4">
            {salesData.salesByCategory.map((category) => (
              <div key={category.name} className="flex items-center">
                <div className="w-32 font-medium">{category.name}</div>
                <div className="flex-1">
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${category.value}%` }}
                    />
                  </div>
                </div>
                <div className="w-16 text-right text-sm text-gray-500">{category.value}%</div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6">Produtos Mais Vendidos</h3>
          <div className="space-y-4">
            {salesData.topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center">
                <div className="w-8 text-gray-500">{index + 1}</div>
                <div className="flex-1">
                  <div className="font-medium">{product.name}</div>
                  <div className="text-sm text-gray-500">{product.sales} vendas</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{product.revenue}</div>
                  <div className="text-sm text-gray-500">Receita</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Vendas Recentes */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-6">Vendas Recentes</h3>
        <div className="space-y-4">
          {salesData.recentSales.map((sale) => (
            <div key={sale.date} className="flex items-center justify-between border-b pb-4">
              <div>
                <div className="font-medium">
                  {new Date(sale.date).toLocaleDateString('pt-BR')}
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(sale.date).toLocaleTimeString('pt-BR')}
                </div>
              </div>
              <div className="font-medium">
                R$ {sale.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
} 