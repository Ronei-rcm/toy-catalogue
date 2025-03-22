import { Category } from '@/types';

const categories: Category[] = [
  {
    id: 1,
    name: 'Brinquedos Educativos',
    description: 'Brinquedos que estimulam o aprendizado e desenvolvimento',
    imageUrl: '/images/categories/educational.jpg',
    slug: 'brinquedos-educativos',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 2,
    name: 'Brinquedos para Bebês',
    description: 'Brinquedos seguros e estimulantes para os primeiros anos',
    imageUrl: '/images/categories/babies.jpg',
    slug: 'brinquedos-para-bebes',
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
  },
  {
    id: 3,
    name: 'Jogos de Mesa',
    description: 'Jogos para diversão em família e amigos',
    imageUrl: '/images/categories/board-games.jpg',
    slug: 'jogos-de-mesa',
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03'),
  },
  {
    id: 4,
    name: 'Brinquedos ao Ar Livre',
    description: 'Brinquedos para atividades ao ar livre',
    imageUrl: '/images/categories/outdoor.jpg',
    slug: 'brinquedos-ao-ar-livre',
    createdAt: new Date('2024-01-04'),
    updatedAt: new Date('2024-01-04'),
  },
  {
    id: 5,
    name: 'Brinquedos de Montar',
    description: 'Brinquedos que desenvolvem coordenação motora',
    imageUrl: '/images/categories/building.jpg',
    slug: 'brinquedos-de-montar',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
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