import { useState } from 'react';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { categories } from '@/data/mockData';
import { toast } from '@/components/ui/use-toast';
import ImageUpload from './ImageUpload';

interface ProductFormProps {
  product?: Product;
  onSubmit: (product: Partial<Product>) => void;
  isLoading?: boolean;
}

const defaultProduct: Partial<Product> = {
  name: '',
  description: '',
  price: 0,
  imageUrl: '',
  categoryId: '',
  stock: 0,
  supplier: '',
  dimensions: {
    height: 0,
    width: 0,
    depth: 0,
  },
  recommendedAge: '',
  recommendedGender: 'Unisex',
  material: '',
  safety: {
    certifications: [],
    warnings: [],
  },
  tags: [],
  barcode: '',
  sku: '',
  weight: 0,
  status: 'active',
};

const ProductForm: React.FC<ProductFormProps> = ({ 
  product, 
  onSubmit,
  isLoading = false
}) => {
  const [formData, setFormData] = useState<Partial<Product>>(
    product ? product : defaultProduct
  );
  const [tagInput, setTagInput] = useState('');
  const [certificationInput, setCertificationInput] = useState('');
  const [warningInput, setWarningInput] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const handleDimensionChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      dimensions: {
        ...prev.dimensions!,
        [name]: parseFloat(value) || 0,
      },
    }));
  };

  const handleStatusChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      status: checked ? 'active' : 'inactive',
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...(prev.tags || []), tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags?.filter((t) => t !== tag),
    }));
  };

  const handleAddCertification = () => {
    if (
      certificationInput.trim() && 
      !formData.safety?.certifications.includes(certificationInput.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        safety: {
          ...prev.safety!,
          certifications: [...(prev.safety?.certifications || []), certificationInput.trim()],
        },
      }));
      setCertificationInput('');
    }
  };

  const handleRemoveCertification = (cert: string) => {
    setFormData((prev) => ({
      ...prev,
      safety: {
        ...prev.safety!,
        certifications: prev.safety?.certifications.filter((c) => c !== cert),
      },
    }));
  };

  const handleAddWarning = () => {
    if (
      warningInput.trim() && 
      !formData.safety?.warnings.includes(warningInput.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        safety: {
          ...prev.safety!,
          warnings: [...(prev.safety?.warnings || []), warningInput.trim()],
        },
      }));
      setWarningInput('');
    }
  };

  const handleRemoveWarning = (warning: string) => {
    setFormData((prev) => ({
      ...prev,
      safety: {
        ...prev.safety!,
        warnings: prev.safety?.warnings.filter((w) => w !== warning),
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.description || !formData.categoryId) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Informações Básicas</CardTitle>
          <CardDescription>
            Insira os detalhes básicos do produto.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Produto *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sku">SKU *</Label>
              <Input
                id="sku"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descrição *</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="price">Preço *</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleNumberChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Estoque *</Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                min="0"
                value={formData.stock}
                onChange={handleNumberChange}
                required
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="categoryId">Categoria *</Label>
              <Select
                value={formData.categoryId}
                onValueChange={(value) => handleSelectChange('categoryId', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a categoria" />
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
              <Label htmlFor="supplier">Fornecedor *</Label>
              <Input
                id="supplier"
                name="supplier"
                value={formData.supplier}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <ImageUpload 
              imageUrl={formData.imageUrl || ''} 
              onChange={(url) => {
                setFormData(prev => ({
                  ...prev,
                  imageUrl: url,
                  image: url,
                }));
              }}
              label="Imagem do Produto *"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="status"
              checked={formData.status === 'active'}
              onCheckedChange={handleStatusChange}
            />
            <Label htmlFor="status">Produto está ativo</Label>
          </div>
        </CardContent>
      </Card>

      {/* Product Details */}
      <Card>
        <CardHeader>
          <CardTitle>Detalhes do Produto</CardTitle>
          <CardDescription>
            Adicione detalhes adicionais sobre o produto.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="height">Altura (cm)</Label>
              <Input
                id="height"
                name="height"
                type="number"
                min="0"
                step="0.1"
                value={formData.dimensions?.height}
                onChange={handleDimensionChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="width">Largura (cm)</Label>
              <Input
                id="width"
                name="width"
                type="number"
                min="0"
                step="0.1"
                value={formData.dimensions?.width}
                onChange={handleDimensionChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="depth">Profundidade (cm)</Label>
              <Input
                id="depth"
                name="depth"
                type="number"
                min="0"
                step="0.1"
                value={formData.dimensions?.depth}
                onChange={handleDimensionChange}
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="weight">Peso (kg)</Label>
              <Input
                id="weight"
                name="weight"
                type="number"
                min="0"
                step="0.1"
                value={formData.weight}
                onChange={handleNumberChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="barcode">Código de Barras</Label>
              <Input
                id="barcode"
                name="barcode"
                value={formData.barcode}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="material">Material</Label>
              <Input
                id="material"
                name="material"
                value={formData.material}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="recommendedAge">Idade Recomendada</Label>
              <Input
                id="recommendedAge"
                name="recommendedAge"
                value={formData.recommendedAge}
                onChange={handleChange}
                placeholder="e.g. 3-5 anos"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="recommendedGender">Gênero Recomendado</Label>
              <Select
                value={formData.recommendedGender}
                onValueChange={(value) => 
                  handleSelectChange('recommendedGender', value as 'Unisex' | 'Boys' | 'Girls')
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o gênero" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Unisex">Unisex</SelectItem>
                  <SelectItem value="Boys">Boys</SelectItem>
                  <SelectItem value="Girls">Girls</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tags and Safety */}
      <Card>
        <CardHeader>
          <CardTitle>Tags e Segurança</CardTitle>
          <CardDescription>
            Adicione tags e informações de segurança para o produto.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Tags */}
          <div className="space-y-4">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2">
              {formData.tags?.map((tag) => (
                <div 
                  key={tag} 
                  className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full flex items-center text-sm"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 text-muted-foreground hover:text-foreground"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
            <div className="flex space-x-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Adicione uma tag"
              />
              <Button 
                type="button" 
                variant="secondary"
                onClick={handleAddTag}
              >
                Adicionar
              </Button>
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-4">
            <Label>Segurança Certificações</Label>
            <div className="flex flex-wrap gap-2">
              {formData.safety?.certifications.map((cert) => (
                <div 
                  key={cert} 
                  className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full flex items-center text-sm"
                >
                  <span>{cert}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveCertification(cert)}
                    className="ml-2 text-muted-foreground hover:text-foreground"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
            <div className="flex space-x-2">
              <Input
                value={certificationInput}
                onChange={(e) => setCertificationInput(e.target.value)}
                placeholder="Adicione uma certificação"
              />
              <Button 
                type="button" 
                variant="secondary"
                onClick={handleAddCertification}
              >
                Adicionar
              </Button>
            </div>
          </div>

          {/* Warnings */}
          <div className="space-y-4">
            <Label>Segurança Avisos</Label>
            <div className="flex flex-wrap gap-2">
              {formData.safety?.warnings.map((warning) => (
                <div 
                  key={warning} 
                  className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full flex items-center text-sm"
                >
                  <span>{warning}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveWarning(warning)}
                    className="ml-2 text-muted-foreground hover:text-foreground"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
            <div className="flex space-x-2">
              <Input
                value={warningInput}
                onChange={(e) => setWarningInput(e.target.value)}
                placeholder="Adicione um aviso"
              />
              <Button 
                type="button" 
                variant="secondary"
                onClick={handleAddWarning}
              >
                Adicionar
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-4">
          <Button variant="outline" type="button">
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Salvando...' : product ? 'Atualizar Produto' : 'Criar Produto'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default ProductForm;
