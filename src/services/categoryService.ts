import { Category } from '@/types';
import { CATEGORY_IMAGES } from '@/lib/constants';

export const categories: Category[] = [
  {
    id: 1,
    name: 'Brinquedos Educativos',
    description: 'Jogos e brinquedos que estimulam o aprendizado',
    imageUrl: CATEGORY_IMAGES.educational,
    slug: 'educativos',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 2,
    name: 'Jogos de Tabuleiro',
    description: 'Jogos para toda a família se divertir',
    imageUrl: CATEGORY_IMAGES.games,
    slug: 'jogos',
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
  },
  {
    id: 3,
    name: 'Bebês e Primeira Infância',
    description: 'Brinquedos seguros para os pequenos',
    imageUrl: CATEGORY_IMAGES.babies,
    slug: 'bebes',
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03'),
  },
  {
    id: 4,
    name: 'Blocos de Montar',
    description: 'LEGO e outros blocos de construção',
    imageUrl: CATEGORY_IMAGES.building,
    slug: 'blocos',
    createdAt: new Date('2024-01-04'),
    updatedAt: new Date('2024-01-04'),
  },
  {
    id: 5,
    name: 'Veículos e Carrinhos',
    description: 'Carros, aviões e outros veículos',
    imageUrl: CATEGORY_IMAGES.vehicles,
    slug: 'veiculos',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
  },
  {
    id: 6,
    name: 'Esportes e Ar Livre',
    description: 'Brinquedos para atividades ao ar livre',
    imageUrl: CATEGORY_IMAGES.sports,
    slug: 'esportes',
    createdAt: new Date('2024-01-06'),
    updatedAt: new Date('2024-01-06'),
  },
];

export const categoryService = {
  findAll: async (): Promise<Category[]> => {
    // Simulando uma chamada à API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(categories);
      }, 500);
    });
  },

  findById: async (id: number): Promise<Category | undefined> => {
    // Simulando uma chamada à API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(categories.find((category) => category.id === id));
      }, 500);
    });
  },
}; 