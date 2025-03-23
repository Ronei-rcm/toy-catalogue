'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { FallbackImage } from '@/components/ui/fallback-image';
import { CATEGORY_IMAGES } from '@/lib/constants';

const categories = [
  {
    id: 1,
    name: 'Brinquedos Educativos',
    description: 'Jogos e brinquedos que estimulam o aprendizado',
    image: CATEGORY_IMAGES.educational,
    slug: 'educativos'
  },
  {
    id: 2,
    name: 'Jogos de Tabuleiro',
    description: 'Jogos para toda a família se divertir',
    image: CATEGORY_IMAGES.games,
    slug: 'jogos'
  },
  {
    id: 3,
    name: 'Bebês e Primeira Infância',
    description: 'Brinquedos seguros para os pequenos',
    image: CATEGORY_IMAGES.babies,
    slug: 'bebes'
  },
  {
    id: 4,
    name: 'Blocos de Montar',
    description: 'LEGO e outros blocos de construção',
    image: CATEGORY_IMAGES.building,
    slug: 'blocos'
  },
  {
    id: 5,
    name: 'Veículos e Carrinhos',
    description: 'Carros, aviões e outros veículos',
    image: CATEGORY_IMAGES.vehicles,
    slug: 'veiculos'
  },
  {
    id: 6,
    name: 'Esportes e Ar Livre',
    description: 'Brinquedos para atividades ao ar livre',
    image: CATEGORY_IMAGES.sports,
    slug: 'esportes'
  }
];

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Categorias</h1>
        <p className="text-muted-foreground">
          Explore nossa seleção de brinquedos por categoria
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link key={category.id} href={`/categorias/${category.slug}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative">
                <FallbackImage
                  src={category.image}
                  alt={category.name}
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold">{category.name}</h2>
                <p className="text-muted-foreground mt-2">
                  {category.description}
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
} 