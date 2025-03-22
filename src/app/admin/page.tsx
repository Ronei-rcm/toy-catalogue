'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { Product, Category, Brand, Role } from '@prisma/client';

interface ProductWithRelations extends Product {
  category: Category;
  brand: Brand | null;
}

interface Session {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: Role;
  };
}

export default function AdminPage() {
  const { data: session, status } = useSession() as { data: Session | null; status: string };
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState<ProductWithRelations[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    product: {
      name: '',
      price: '',
      categoryId: '',
      brandId: '',
      stock: '',
      description: '',
      imageUrl: '',
    },
    category: {
      name: '',
      description: '',
      imageUrl: '',
    },
    brand: {
      name: '',
      description: '',
      logoUrl: '',
      website: '',
    },
  });

  // Adicionar estados para edição
  const [editingProduct, setEditingProduct] = useState<ProductWithRelations | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);
  const [deleteCategoryId, setDeleteCategoryId] = useState<string | null>(null);
  const [deleteBrandId, setDeleteBrandId] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (status === 'unauthenticated' || session?.user?.role !== Role.ADMIN) {
      window.location.href = '/login';
    }
  }, [status, session]);

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes, brandsRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/categories'),
        fetch('/api/brands'),
      ]);

      const [productsData, categoriesData, brandsData] = await Promise.all([
        productsRes.json(),
        categoriesRes.json(),
        brandsRes.json(),
      ]);

      setProducts(productsData);
      setCategories(categoriesData);
      setBrands(brandsData);
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao carregar dados.',
        variant: 'destructive',
      });
    }
  };

  // Loading state
  if (status === 'loading') {
    return <div>Carregando...</div>;
  }

  // Product management functions
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.product.name,
          price: parseFloat(formData.product.price),
          categoryId: formData.product.categoryId,
          brandId: formData.product.brandId,
          stock: parseInt(formData.product.stock),
          description: formData.product.description,
          imageUrl: formData.product.imageUrl,
        }),
      });

      if (!response.ok) throw new Error('Erro ao adicionar produto');

      toast({
        title: 'Sucesso!',
        description: 'Produto adicionado com sucesso.',
      });

      setFormData(prev => ({
        ...prev,
        product: {
          name: '',
          price: '',
          categoryId: '',
          brandId: '',
          stock: '',
          description: '',
          imageUrl: '',
        },
      }));

      fetchData();
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao adicionar produto.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Erro ao remover produto');

      toast({
        title: 'Sucesso!',
        description: 'Produto removido com sucesso.',
      });

      fetchData();
      setDeleteProductId(null);
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao remover produto.',
        variant: 'destructive',
      });
    }
  };

  // Category management functions
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData.category),
      });

      if (!response.ok) throw new Error('Erro ao adicionar categoria');

      toast({
        title: 'Sucesso!',
        description: 'Categoria adicionada com sucesso.',
      });

      setFormData(prev => ({
        ...prev,
        category: {
          name: '',
          description: '',
          imageUrl: '',
        },
      }));

      fetchData();
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao adicionar categoria.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Erro ao remover categoria');

      toast({
        title: 'Sucesso!',
        description: 'Categoria removida com sucesso.',
      });

      fetchData();
      setDeleteCategoryId(null);
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao remover categoria.',
        variant: 'destructive',
      });
    }
  };

  // Brand management functions
  const handleAddBrand = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/brands', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData.brand),
      });

      if (!response.ok) throw new Error('Erro ao adicionar marca');

      toast({
        title: 'Sucesso!',
        description: 'Marca adicionada com sucesso.',
      });

      setFormData(prev => ({
        ...prev,
        brand: {
          name: '',
          description: '',
          logoUrl: '',
          website: '',
        },
      }));

      fetchData();
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao adicionar marca.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBrand = async (id: string) => {
    try {
      const response = await fetch(`/api/brands/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Erro ao remover marca');

      toast({
        title: 'Sucesso!',
        description: 'Marca removida com sucesso.',
      });

      fetchData();
      setDeleteBrandId(null);
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao remover marca.',
        variant: 'destructive',
      });
    }
  };

  const handleInputChange = (section: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }));
  };

  // Função para editar produto
  const handleEditProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.product.name,
          price: parseFloat(formData.product.price),
          categoryId: formData.product.categoryId,
          brandId: formData.product.brandId,
          stock: parseInt(formData.product.stock),
          description: formData.product.description,
          imageUrl: formData.product.imageUrl,
        }),
      });

      if (!response.ok) throw new Error('Erro ao atualizar produto');

      toast({
        title: 'Sucesso!',
        description: 'Produto atualizado com sucesso.',
      });

      setIsEditDialogOpen(false);
      setEditingProduct(null);
      setFormData(prev => ({
        ...prev,
        product: {
          name: '',
          price: '',
          categoryId: '',
          brandId: '',
          stock: '',
          description: '',
          imageUrl: '',
        },
      }));

      fetchData();
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao atualizar produto.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Função para editar categoria
  const handleEditCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/categories/${editingCategory.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData.category),
      });

      if (!response.ok) throw new Error('Erro ao atualizar categoria');

      toast({
        title: 'Sucesso!',
        description: 'Categoria atualizada com sucesso.',
      });

      setEditingCategory(null);
      setFormData(prev => ({
        ...prev,
        category: {
          name: '',
          description: '',
          imageUrl: '',
        },
      }));

      fetchData();
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao atualizar categoria.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Função para editar marca
  const handleEditBrand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBrand) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/brands/${editingBrand.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData.brand),
      });

      if (!response.ok) throw new Error('Erro ao atualizar marca');

      toast({
        title: 'Sucesso!',
        description: 'Marca atualizada com sucesso.',
      });

      setEditingBrand(null);
      setFormData(prev => ({
        ...prev,
        brand: {
          name: '',
          description: '',
          logoUrl: '',
          website: '',
        },
      }));

      fetchData();
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao atualizar marca.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Função para abrir diálogo de edição
  const openEditDialog = (type: 'product' | 'category' | 'brand', item: any) => {
    switch (type) {
      case 'product':
        setEditingProduct(item);
        setFormData(prev => ({
          ...prev,
          product: {
            name: item.name,
            price: item.price.toString(),
            categoryId: item.category.id,
            brandId: item.brand?.id || '',
            stock: item.stock.toString(),
            description: item.description || '',
            imageUrl: item.imageUrl || '',
          },
        }));
        setIsEditDialogOpen(true);
        break;
      case 'category':
        setEditingCategory(item);
        setFormData(prev => ({
          ...prev,
          category: {
            name: item.name,
            description: item.description || '',
            imageUrl: item.imageUrl || '',
          },
        }));
        break;
      case 'brand':
        setEditingBrand(item);
        setFormData(prev => ({
          ...prev,
          brand: {
            name: item.name,
            description: item.description || '',
            logoUrl: item.logoUrl || '',
            website: item.website || '',
          },
        }));
        break;
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Painel Administrativo</h1>
      
      <Tabs defaultValue="products" className="space-y-4">
        <TabsList>
          <TabsTrigger value="products">Produtos</TabsTrigger>
          <TabsTrigger value="categories">Categorias</TabsTrigger>
          <TabsTrigger value="brands">Marcas</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Produtos</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Produto
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {editingProduct ? 'Editar Produto' : 'Novo Produto'}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={editingProduct ? handleEditProduct : handleAddProduct} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome do Produto</Label>
                        <Input 
                          id="name" 
                          required 
                          value={formData.product.name}
                          onChange={(e) => handleInputChange('product', 'name', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="price">Preço</Label>
                        <Input 
                          id="price" 
                          type="number" 
                          step="0.01" 
                          required 
                          value={formData.product.price}
                          onChange={(e) => handleInputChange('product', 'price', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Categoria</Label>
                        <Select
                          value={formData.product.categoryId}
                          onValueChange={(value) => handleInputChange('product', 'categoryId', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma categoria" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="brand">Marca</Label>
                        <Select
                          value={formData.product.brandId}
                          onValueChange={(value) => handleInputChange('product', 'brandId', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma marca" />
                          </SelectTrigger>
                          <SelectContent>
                            {brands.map((brand) => (
                              <SelectItem key={brand.id} value={brand.id}>
                                {brand.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stock">Estoque</Label>
                      <Input 
                        id="stock" 
                        type="number" 
                        required 
                        value={formData.product.stock}
                        onChange={(e) => handleInputChange('product', 'stock', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Descrição</Label>
                      <Textarea 
                        id="description" 
                        required 
                        value={formData.product.description}
                        onChange={(e) => handleInputChange('product', 'description', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="imageUrl">URL da Imagem</Label>
                      <Input 
                        id="imageUrl" 
                        value={formData.product.imageUrl}
                        onChange={(e) => handleInputChange('product', 'imageUrl', e.target.value)}
                      />
                    </div>
                    <Button type="submit" disabled={loading}>
                      {loading ? 'Salvando...' : editingProduct ? 'Atualizar Produto' : 'Adicionar Produto'}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Marca</TableHead>
                    <TableHead>Estoque</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>R$ {product.price.toFixed(2)}</TableCell>
                      <TableCell>{product.category.name}</TableCell>
                      <TableCell>{product.brand?.name || '-'}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Pencil className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Editar Produto</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleEditProduct} className="space-y-4">
                              {/* Campos do formulário de edição */}
                            </form>
                          </DialogContent>
                        </Dialog>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteProduct(product.id)}>
                                Confirmar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Adicionar Nova Categoria</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddCategory} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="categoryName">Nome da Categoria</Label>
                  <Input 
                    id="categoryName" 
                    required 
                    value={formData.category.name}
                    onChange={(e) => handleInputChange('category', 'name', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="categoryDescription">Descrição</Label>
                  <Textarea 
                    id="categoryDescription" 
                    required 
                    value={formData.category.description}
                    onChange={(e) => handleInputChange('category', 'description', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="categoryImageUrl">URL da Imagem</Label>
                  <Input 
                    id="categoryImageUrl" 
                    value={formData.category.imageUrl}
                    onChange={(e) => handleInputChange('category', 'imageUrl', e.target.value)}
                  />
                </div>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Adicionando...' : 'Adicionar Categoria'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="brands" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Adicionar Nova Marca</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddBrand} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="brandName">Nome da Marca</Label>
                  <Input 
                    id="brandName" 
                    required 
                    value={formData.brand.name}
                    onChange={(e) => handleInputChange('brand', 'name', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brandDescription">Descrição</Label>
                  <Textarea 
                    id="brandDescription" 
                    required 
                    value={formData.brand.description}
                    onChange={(e) => handleInputChange('brand', 'description', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brandLogoUrl">URL do Logo</Label>
                  <Input 
                    id="brandLogoUrl" 
                    value={formData.brand.logoUrl}
                    onChange={(e) => handleInputChange('brand', 'logoUrl', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brandWebsite">Website</Label>
                  <Input 
                    id="brandWebsite" 
                    value={formData.brand.website}
                    onChange={(e) => handleInputChange('brand', 'website', e.target.value)}
                  />
                </div>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Adicionando...' : 'Adicionar Marca'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 