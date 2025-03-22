
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types';
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2,
  ArrowUpDown
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

// Mock para simular produtos
const mockProducts: Product[] = [
  {
    id: 'prod_1',
    name: 'Quebra-cabeça Infantil',
    description: 'Quebra-cabeça de 48 peças com temas infantis',
    price: 29.90,
    categoryId: 'cat_1',
    image: '/placeholder.svg',
    imageUrl: '/placeholder.svg',
    stock: 25,
    sku: 'QCI-001',
    manufacturer: 'Brinquedos Educativos',
    supplier: 'Fornecedor ABC',
    dimensions: { height: 30, width: 20, depth: 5 },
    recommendedAge: '3-5 anos',
    recommendedGender: 'Unisex',
    material: 'Papelão e papel',
    safety: {
      certifications: ['INMETRO', 'CE'],
      warnings: ['Peças pequenas', 'Não recomendado para menores de 3 anos']
    },
    tags: ['Educativo', 'Quebra-cabeça', 'Infantil'],
    barcode: '7890123456789',
    weight: 0.3,
    status: 'active'
  },
  {
    id: 'prod_2',
    name: 'Boneca de Pano',
    description: 'Boneca de pano artesanal com roupas removíveis',
    price: 59.90,
    categoryId: 'cat_2',
    image: '/placeholder.svg',
    imageUrl: '/placeholder.svg',
    stock: 15,
    sku: 'BP-002',
    manufacturer: 'Artesanatos Maria',
    supplier: 'Fornecedor XYZ',
    dimensions: { height: 35, width: 15, depth: 10 },
    recommendedAge: '2+ anos',
    recommendedGender: 'Girls',
    material: 'Tecido, algodão',
    safety: {
      certifications: ['INMETRO'],
      warnings: ['Lavar à mão']
    },
    tags: ['Boneca', 'Tecido', 'Artesanal'],
    barcode: '7890123456790',
    weight: 0.2,
    status: 'active'
  },
  {
    id: 'prod_3',
    name: 'Carrinho de Controle Remoto',
    description: 'Carrinho de controle remoto com bateria recarregável',
    price: 149.90,
    categoryId: 'cat_3',
    image: '/placeholder.svg',
    imageUrl: '/placeholder.svg',
    stock: 8,
    sku: 'CCR-003',
    manufacturer: 'TechToys',
    supplier: 'Importadora FastToys',
    dimensions: { height: 10, width: 20, depth: 15 },
    recommendedAge: '6+ anos',
    recommendedGender: 'Boys',
    material: 'Plástico e metal',
    safety: {
      certifications: ['INMETRO', 'CE', 'FCC'],
      warnings: ['Bateria não substituível', 'Usar sob supervisão de um adulto']
    },
    tags: ['Eletrônico', 'Controle Remoto', 'Carro'],
    barcode: '7890123456791',
    weight: 0.5,
    status: 'inactive'
  }
];

// Mock para simular uma função que busca produtos
const fetchProducts = async (): Promise<Product[]> => {
  // Simulação de delay de rede
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockProducts;
};

// Mock para simular a exclusão de um produto
const deleteProduct = async (id: string): Promise<void> => {
  // Simulação de delay de rede
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log(`Produto ${id} excluído`);
};

const ProductsListPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Product>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  const { data: products = [], isLoading, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });
  
  // Filtragem de produtos baseado no termo de busca
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Ordenação de produtos
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortField === 'price' || sortField === 'stock') {
      return sortDirection === 'asc' 
        ? a[sortField] - b[sortField]
        : b[sortField] - a[sortField];
    }
    
    return sortDirection === 'asc'
      ? String(a[sortField]).localeCompare(String(b[sortField]))
      : String(b[sortField]).localeCompare(String(a[sortField]));
  });
  
  const handleSort = (field: keyof Product) => {
    if (field === sortField) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      refetch();
      toast({
        title: 'Produto excluído',
        description: 'O produto foi removido com sucesso',
      });
    } catch (error) {
      toast({
        title: 'Erro ao excluir',
        description: 'Não foi possível excluir o produto',
        variant: 'destructive',
      });
    }
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/admin')}
            className="mr-4"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">Produtos</h1>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button onClick={() => navigate('/admin/produtos/novo')}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Produto
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Lista de Produtos</CardTitle>
          <CardDescription>Gerencie o catálogo de produtos da loja.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <p>Carregando produtos...</p>
            </div>
          ) : sortedProducts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Nenhum produto encontrado.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => navigate('/admin/produtos/novo')}
              >
                Adicionar Produto
              </Button>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">Imagem</TableHead>
                      <TableHead>
                        <div 
                          className="flex items-center cursor-pointer"
                          onClick={() => handleSort('name')}
                        >
                          Nome
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>
                        <div 
                          className="flex items-center cursor-pointer"
                          onClick={() => handleSort('price')}
                        >
                          Preço
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>
                        <div 
                          className="flex items-center cursor-pointer"
                          onClick={() => handleSort('stock')}
                        >
                          Estoque
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="w-10 h-10 rounded overflow-hidden border border-border">
                            <img
                              src={product.imageUrl || '/placeholder.svg'}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{formatCurrency(product.price)}</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell>{product.sku}</TableCell>
                        <TableCell>
                          <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                            {product.status === 'active' ? 'Ativo' : 'Inativo'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => navigate(`/catalogo/${product.id}`)}>
                                <Eye className="mr-2 h-4 w-4" />
                                Visualizar
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => navigate(`/admin/produtos/editar/${product.id}`)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-destructive"
                                onClick={() => handleDelete(product.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
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
              
              <Pagination className="mt-4">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
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
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductsListPage;
