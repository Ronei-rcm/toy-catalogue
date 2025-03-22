import { Product } from '@/types';

export interface ProductFilter {
  categoryId?: number;
  subcategoryId?: number;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: string;
}

export interface CreateProductInput {
  name: string;
  description: string;
  price: number;
  stock: number;
  sku: string;
  imageUrl?: string;
  categoryId: number;
  subcategoryId?: number;
  manufacturer?: string;
  supplier?: string;
  recommendedAge?: string;
  recommendedGender?: string;
  material?: string;
  barcode?: string;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: string;
  };
  safety?: {
    minimumAge: number;
    warnings: string[];
    certification: string[];
  };
  tags?: string[];
  status?: string;
}

export interface UpdateProductInput extends Partial<CreateProductInput> {}

const products: Product[] = [
  {
    id: 1,
    name: 'Blocos de Montar Educativos',
    description: 'Conjunto de blocos coloridos para montar e criar diferentes formas',
    price: 49.90,
    stock: 15,
    sku: 'BM001',
    imageUrl: '/images/products/blocks.jpg',
    categoryId: 1,
    manufacturer: 'ToyCo',
    recommendedAge: '3-8 anos',
    material: 'Plástico',
    dimensions: {
      length: 30,
      width: 20,
      height: 10,
      unit: 'cm',
    },
    safety: {
      minimumAge: 3,
      warnings: ['Contém peças pequenas'],
      certification: ['INMETRO'],
    },
    tags: ['educativo', 'montar', 'criatividade'],
    status: 'active',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 2,
    name: 'Boneca de Pano Bebê',
    description: 'Boneca de pano macia e segura para bebês',
    price: 39.90,
    stock: 20,
    sku: 'BP001',
    imageUrl: '/images/products/doll.jpg',
    categoryId: 2,
    manufacturer: 'BabyToys',
    recommendedAge: '0-2 anos',
    material: 'Algodão',
    dimensions: {
      length: 25,
      width: 15,
      height: 8,
      unit: 'cm',
    },
    safety: {
      minimumAge: 0,
      warnings: [],
      certification: ['INMETRO'],
    },
    tags: ['bebê', 'boneca', 'macio'],
    status: 'active',
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
  },
  {
    id: 3,
    name: 'Jogo de Tabuleiro Família',
    description: 'Jogo de tabuleiro divertido para toda a família',
    price: 79.90,
    stock: 10,
    sku: 'JT001',
    imageUrl: '/images/products/board-game.jpg',
    categoryId: 3,
    manufacturer: 'GameCo',
    recommendedAge: '6+ anos',
    material: 'Papel e Plástico',
    dimensions: {
      length: 40,
      width: 40,
      height: 5,
      unit: 'cm',
    },
    safety: {
      minimumAge: 6,
      warnings: ['Contém peças pequenas'],
      certification: ['INMETRO'],
    },
    tags: ['jogo', 'família', 'diversão'],
    status: 'active',
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03'),
  },
];

export const productService = {
  findAll: async (filter?: {
    categoryId?: number;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
  }): Promise<Product[]> => {
    // Simulando uma chamada à API
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredProducts = [...products];

        if (filter?.categoryId) {
          filteredProducts = filteredProducts.filter(
            (product) => product.categoryId === filter.categoryId
          );
        }

        if (filter?.search) {
          const search = filter.search.toLowerCase();
          filteredProducts = filteredProducts.filter(
            (product) =>
              product.name.toLowerCase().includes(search) ||
              product.description.toLowerCase().includes(search)
          );
        }

        if (filter?.minPrice !== undefined) {
          filteredProducts = filteredProducts.filter(
            (product) => product.price >= filter.minPrice!
          );
        }

        if (filter?.maxPrice !== undefined) {
          filteredProducts = filteredProducts.filter(
            (product) => product.price <= filter.maxPrice!
          );
        }

        if (filter?.inStock) {
          filteredProducts = filteredProducts.filter(
            (product) => product.stock > 0
          );
        }

        resolve(filteredProducts);
      }, 500);
    });
  },

  findById: async (id: number): Promise<Product | undefined> => {
    // Simulando uma chamada à API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(products.find((product) => product.id === id));
      }, 500);
    });
  },

  create: async (data: CreateProductInput): Promise<Product> => {
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Erro ao criar produto');
    }

    return response.json();
  },

  update: async (id: number, data: UpdateProductInput): Promise<Product> => {
    const response = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Erro ao atualizar produto');
    }

    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Erro ao excluir produto');
    }
  },
}; 