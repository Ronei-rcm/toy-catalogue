'use client';

import { useEffect, useState } from 'react';
import { ProductList } from '@/components/ProductList';
import { SubcategoryList } from '@/components/SubcategoryList';
import { Breadcrumb } from '@/components/Breadcrumb';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [category, setCategory] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);

  useEffect(() => {
    // Aqui você faria a chamada à API para buscar os dados da categoria
    // Por enquanto, vamos usar dados mockados
    setCategory({
      id: 1,
      name: 'Brinquedos Educativos',
      slug: 'brinquedos-educativos',
    });
    setProducts([
      // ... seus produtos mockados aqui
    ]);
    setSubcategories([
      // ... suas subcategorias mockadas aqui
    ]);
  }, [params.slug]);

  if (!category) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container py-8">
      <Breadcrumb
        items={[
          {
            label: 'Categorias',
            href: '/categories',
          },
          {
            label: category.name,
            href: `/categories/${category.slug}`,
          },
        ]}
      />
      <h1 className="text-3xl font-bold mt-6 mb-8">{category.name}</h1>
      
      {subcategories.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Subcategorias</h2>
          <SubcategoryList subcategories={subcategories} />
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold mb-4">Produtos</h2>
        <ProductList products={products} />
      </div>
    </div>
  );
} 