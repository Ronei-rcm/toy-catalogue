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
  FileText,
  Filter
} from 'lucide-react';

// Dados simulados
const products = [
  {
    id: '1',
    name: 'Boneca Interativa',
    category: 'Bonecas',
    price: 'R$ 129,90',
    stock: 15,
    status: 'Em estoque',
    image: '/products/doll.jpg',
    createdAt: '2024-03-15',
    description: 'Boneca interativa com sons e movimentos',
    sku: 'BON-001',
    brand: 'ToyKids'
  },
  {
    id: '2',
    name: 'Carrinho de Controle',
    category: 'Carrinhos',
    price: 'R$ 169,90',
    stock: 8,
    status: 'Baixo estoque',
    image: '/products/car.jpg',
    createdAt: '2024-03-14',
    description: 'Carrinho de controle remoto 4x4',
    sku: 'CAR-001',
    brand: 'SpeedToys'
  },
  {
    id: '3',
    name: 'Pista Hot Wheels',
    category: 'Carrinhos',
    price: 'R$ 499,90',
    stock: 5,
    status: 'Baixo estoque',
    image: '/products/track.jpg',
    createdAt: '2024-03-13',
    description: 'Pista Hot Wheels com looping duplo',
    sku: 'PIS-001',
    brand: 'Hot Wheels'
  },
  {
    id: '4',
    name: 'Quebra-cabeça 1000 peças',
    category: 'Quebra-cabeças',
    price: 'R$ 89,90',
    stock: 20,
    status: 'Em estoque',
    image: '/products/puzzle.jpg',
    createdAt: '2024-03-12',
    description: 'Quebra-cabeça 1000 peças paisagem',
    sku: 'QUE-001',
    brand: 'PuzzleArt'
  },
  {
    id: '5',
    name: 'Jogo de Cartas UNO',
    category: 'Jogos',
    price: 'R$ 29,90',
    stock: 0,
    status: 'Sem estoque',
    image: '/products/uno.jpg',
    createdAt: '2024-03-11',
    description: 'Jogo de cartas UNO clássico',
    sku: 'JOG-001',
    brand: 'Mattel'
  }
];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar lógica de busca
    console.log('Searching for:', searchQuery);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Em estoque':
        return 'bg-green-100 text-green-700';
      case 'Baixo estoque':
        return 'bg-yellow-100 text-yellow-700';
      case 'Sem estoque':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Produtos</h1>
          <p className="mt-2 text-gray-500">Gerencie os produtos da loja</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Novo Produto
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
                placeholder="Buscar produtos por nome, SKU ou categoria..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </form>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>
        </div>
      </Card>

      {/* Lista de Produtos */}
      <Card className="p-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Estoque</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow 
                  key={product.id}
                  className={selectedProduct === product.id ? 'bg-gray-50' : ''}
                  onClick={() => setSelectedProduct(product.id)}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-10 w-10 rounded object-cover"
                      />
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.brand}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.sku}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusStyle(product.status)}`}>
                      {product.status}
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <div>Mostrando 1-5 de 5 produtos</div>
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

      {/* Detalhes do Produto */}
      {selectedProduct && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Detalhes do Produto</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                src={products.find(p => p.id === selectedProduct)?.image}
                alt={products.find(p => p.id === selectedProduct)?.name}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Informações Básicas</h3>
                <div className="mt-2 space-y-2">
                  <div>
                    <span className="text-sm text-gray-500">Nome:</span>
                    <span className="ml-2">{products.find(p => p.id === selectedProduct)?.name}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">SKU:</span>
                    <span className="ml-2">{products.find(p => p.id === selectedProduct)?.sku}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Marca:</span>
                    <span className="ml-2">{products.find(p => p.id === selectedProduct)?.brand}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Categoria:</span>
                    <span className="ml-2">{products.find(p => p.id === selectedProduct)?.category}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Preço e Estoque</h3>
                <div className="mt-2 space-y-2">
                  <div>
                    <span className="text-sm text-gray-500">Preço:</span>
                    <span className="ml-2">{products.find(p => p.id === selectedProduct)?.price}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Estoque:</span>
                    <span className="ml-2">{products.find(p => p.id === selectedProduct)?.stock} unidades</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Status:</span>
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                      getStatusStyle(products.find(p => p.id === selectedProduct)?.status || '')
                    }`}>
                      {products.find(p => p.id === selectedProduct)?.status}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Descrição</h3>
                <p className="mt-2 text-sm">
                  {products.find(p => p.id === selectedProduct)?.description}
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
} 