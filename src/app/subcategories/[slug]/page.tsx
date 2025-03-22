import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { ProductList } from '@/components/ProductList';
import { Breadcrumb } from '@/components/Breadcrumb';

interface SubcategoryPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: SubcategoryPageProps): Promise<Metadata> {
  const subcategory = await prisma.subcategory.findUnique({
    where: { slug: params.slug },
    include: { category: true }
  });

  if (!subcategory) {
    return {
      title: 'Subcategoria não encontrada',
      description: 'A subcategoria que você procura não foi encontrada.'
    };
  }

  return {
    title: `${subcategory.name} - ${subcategory.category?.name}`,
    description: subcategory.description || `Produtos da subcategoria ${subcategory.name}`
  };
}

export default async function SubcategoryPage({ params }: SubcategoryPageProps) {
  const subcategory = await prisma.subcategory.findUnique({
    where: { slug: params.slug },
    include: {
      category: true,
      products: {
        select: {
          id: true
        }
      }
    }
  });

  if (!subcategory) {
    notFound();
  }

  const breadcrumbItems = [
    { label: 'Início', href: '/' },
    { label: 'Categorias', href: '/categories' },
    { label: subcategory.category?.name || '', href: `/categories/${subcategory.category?.slug}` },
    { label: subcategory.name, href: `/subcategories/${subcategory.slug}` }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{subcategory.name}</h1>
        {subcategory.description && (
          <p className="text-gray-600 mb-6">{subcategory.description}</p>
        )}
        <p className="text-sm text-gray-500">
          Categoria: {subcategory.category?.name}
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Produtos ({subcategory.products.length})
        </h2>
        <ProductList subcategoryId={subcategory.id} />
      </div>
    </div>
  );
} 