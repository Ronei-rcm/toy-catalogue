'use client';

import { Card } from '@/components/ui/card';
import {
  Package,
  Tags,
  BadgeCheck,
  Users,
  TrendingUp,
  ShoppingCart
} from 'lucide-react';

const stats = [
  {
    title: 'Total de Produtos',
    value: '120',
    change: '+12%',
    icon: Package,
    trend: 'up'
  },
  {
    title: 'Categorias',
    value: '24',
    change: '+2',
    icon: Tags,
    trend: 'up'
  },
  {
    title: 'Marcas',
    value: '18',
    change: '+3',
    icon: BadgeCheck,
    trend: 'up'
  },
  {
    title: 'Usuários',
    value: '1.2k',
    change: '+10%',
    icon: Users,
    trend: 'up'
  }
];

const recentActivity = [
  {
    id: 1,
    action: 'Novo produto adicionado',
    item: 'Boneca Barbie Profissões',
    time: 'Há 5 minutos'
  },
  {
    id: 2,
    action: 'Categoria atualizada',
    item: 'Brinquedos Educativos',
    time: 'Há 1 hora'
  },
  {
    id: 3,
    action: 'Nova marca cadastrada',
    item: 'LEGO',
    time: 'Há 2 horas'
  }
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Bem-vindo ao Painel</h2>
        <p className="text-muted-foreground">
          Aqui está um resumo da sua loja de brinquedos
        </p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <span className="text-sm text-green-500">{stat.change}</span>
                  </div>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Atividades Recentes */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Atividades Recentes</h3>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
            >
              <div>
                <p className="font-medium">{activity.action}</p>
                <p className="text-sm text-muted-foreground">{activity.item}</p>
              </div>
              <span className="text-sm text-muted-foreground">
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Ações Rápidas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Package className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Adicionar Produto</h3>
              <p className="text-sm text-muted-foreground">
                Cadastre um novo produto no catálogo
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Tags className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Nova Categoria</h3>
              <p className="text-sm text-muted-foreground">
                Crie uma nova categoria de produtos
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <BadgeCheck className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Cadastrar Marca</h3>
              <p className="text-sm text-muted-foreground">
                Adicione uma nova marca ao catálogo
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 