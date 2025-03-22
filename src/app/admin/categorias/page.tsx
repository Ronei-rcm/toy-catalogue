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
  Plus,
  FileText
} from 'lucide-react';

// Dados simulados
const categories = [
  {
    id: '1',
    name: 'Bonecas',
    description: 'Bonecas e acessórios',
    products: 25,
    status: 'Ativo',
    image: '/categories/dolls.jpg',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Carrinhos',
    description: 'Carrinhos e veículos',
    products: 30,
    status: 'Ativo',
    image: '/categories/cars.jpg',
    createdAt: '2024-01-15'
  },
  {
    id: '3',
    name: 'Jogos de Tabuleiro',
    description: 'Jogos de tabuleiro e cartas',
    products: 15,
    status: 'Ativo',
    image: '/categories/board-games.jpg',
    createdAt: '2024-01-15'
  },
  {
    id: '4',
    name: 'Pelúcias',
    description: 'Bichos de pelúcia',
    products: 20,
    status: 'Ativo',
    image: '/categories/plush.jpg',
    createdAt: '2024-01-15'
  },
  {
    id: '5',
    name: 'Quebra-cabeças',
    description: 'Quebra-cabeças e jogos de montar',
    products: 10,
    status: 'Inativo',
    image: '/categories/puzzles.jpg',
    createdAt: '2024-01-15'
  }
];

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar lógica de busca
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Categorias</h1>
          <p className="mt-2 text-gray-500">Gerencie as categorias de produtos</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nova Categoria
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
                placeholder="Buscar categorias..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </form>
          <div className="flex gap-2">
            <Button variant="outline">
              Todas
            </Button>
            <Button variant="outline">
              Ativas
            </Button>
            <Button variant="outline">
              Inativas
            </Button>
          </div>
        </div>
      </Card>

      {/* Grid de Categorias */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.id} className="overflow-hidden">
            <div className="relative h-48">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="bg-white/90 hover:bg-white">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="flex items-center">
                      <Eye className="h-4 w-4 mr-2" />
                      Visualizar
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
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold">{category.name}</h3>
              <p className="mt-2 text-sm text-gray-500">{category.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-500">{category.products} produtos</span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  category.status === 'Ativo' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {category.status}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Paginação */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Mostrando 1-5 de 5 categorias
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Anterior
          </Button>
          <Button variant="outline" size="sm" disabled>
            Próxima
          </Button>
        </div>
      </div>
    </div>
  );
} 