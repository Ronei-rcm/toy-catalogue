
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/types';
import ProductForm from '@/components/admin/ProductForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { productDB } from '@/utils/db';

// Function to add product to MySQL database
const addProduct = async (product: Partial<Product>): Promise<Product> => {
  try {
    return await productDB.create(product);
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

// Function to check if SKU exists
const checkSkuExists = async (sku: string): Promise<boolean> => {
  try {
    // In a real implementation, this would query the database
    console.log("Verificando se SKU existe:", sku);
    
    // Simulate a delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // For demonstration, always return false
    return false;
  } catch (error) {
    console.error("Error checking SKU:", error);
    throw error;
  }
};

const AddProductPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSkuChecking, setIsSkuChecking] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const mutation = useMutation({
    mutationFn: addProduct,
    onSuccess: (newProduct) => {
      // Invalidar queries para forçar nova busca de dados
      queryClient.invalidateQueries({ queryKey: ['products'] });
      
      toast({
        title: 'Produto adicionado com sucesso',
        description: `O produto ${newProduct.name} foi cadastrado no sistema com o ID ${newProduct.id}`,
      });
      navigate('/admin/produtos');
    },
    onError: (error) => {
      toast({
        title: 'Erro ao adicionar produto',
        description: `Ocorreu um erro: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
        variant: 'destructive',
      });
      setIsSubmitting(false);
    },
  });

  const handleSubmit = async (productData: Partial<Product>) => {
    setIsSubmitting(true);
    
    // Verificar se o SKU já existe
    if (productData.sku) {
      setIsSkuChecking(true);
      try {
        const skuExists = await checkSkuExists(productData.sku);
        if (skuExists) {
          toast({
            title: 'SKU duplicado',
            description: 'Já existe um produto com este SKU no sistema',
            variant: 'destructive',
          });
          setIsSubmitting(false);
          setIsSkuChecking(false);
          return;
        }
        setIsSkuChecking(false);
      } catch (error) {
        console.error("Erro ao verificar SKU:", error);
        setIsSkuChecking(false);
      }
    }
    
    // Verificar se temos uma imagem válida
    if (!productData.imageUrl) {
      console.log("Produto enviado sem imagem");
      toast({
        title: 'Atenção',
        description: 'Produto está sendo cadastrado sem imagem',
      });
    } else {
      // Limitar o log para evitar output muito grande
      const previewUrl = productData.imageUrl.substring(0, 50) + 
        (productData.imageUrl.length > 50 ? "..." : "");
      console.log("Produto enviado com imagem:", previewUrl);
    }
    
    mutation.mutate(productData);
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate('/admin')}
          className="mr-4"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold">Adicionar Novo Produto</h1>
      </div>
      
      <ProductForm 
        onSubmit={handleSubmit}
        isLoading={isSubmitting || mutation.isPending || isSkuChecking}
      />
    </div>
  );
};

export default AddProductPage;
