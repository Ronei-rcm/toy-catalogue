import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = await prisma.category.findUnique({
    where: { slug: params.slug }
  });

  if (!category) {
    return {
      title: 'Categoria não encontrada',
      description: 'A categoria que você procura não foi encontrada.'
    };
  }

  return {
    title: category.name,
    description: category.description || `Produtos da categoria ${category.name}`
  };
} 