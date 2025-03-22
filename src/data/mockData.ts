import { Product, Category, Order, User } from '../types';
import { Customer } from '../types/user';

export const categories: Category[] = [
  {
    id: 1,
    name: 'Brinquedos Educativos',
    slug: 'brinquedos-educativos',
    description: 'Brinquedos que estimulam o aprendizado',
    imageUrl: 'https://source.unsplash.com/random/800x600/?educational,toys',
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: 2,
    name: 'Jogos de Tabuleiro',
    slug: 'jogos-de-tabuleiro',
    description: 'Jogos para toda a família',
    imageUrl: 'https://source.unsplash.com/random/800x600/?board,game',
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: 3,
    name: 'Bonecas e Bonecos',
    slug: 'bonecas-e-bonecos',
    description: 'Diversos personagens e estilos',
    imageUrl: 'https://source.unsplash.com/random/800x600/?doll,toy',
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  }
];

export const products: Product[] = [
  {
    id: 1,
    name: 'Kit de Blocos de Montar',
    description: 'Kit educativo com 100 peças coloridas',
    price: 129.90,
    categoryId: 1,
    imageUrl: 'https://source.unsplash.com/random/800x600/?toys,blocks',
    stock: 50,
    sku: 'BLO-001',
    manufacturer: 'ToyEdu',
    supplier: 'Fornecedor ABC',
    dimensions: {
      length: 40,
      width: 30,
      height: 10,
      unit: 'cm'
    },
    recommendedAge: '3+',
    recommendedGender: "Unisex",
    material: 'Plástico ABS',
    safety: {
      minimumAge: 3,
      warnings: ['Não recomendado para menores de 3 anos devido a peças pequenas'],
      certification: ['Certificado INMETRO']
    },
    tags: ['educativo', 'montagem', 'criativo'],
    barcode: '789123456789',
    weight: 0.8,
    status: 'active',
    slug: 'kit-de-blocos-de-montar',
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: 2,
    name: 'Jogo da Memória Animais',
    description: 'Jogo da memória com temas de animais',
    price: 45.90,
    categoryId: 2,
    imageUrl: 'https://source.unsplash.com/random/800x600/?memory,game',
    stock: 30,
    sku: 'JOG-001',
    manufacturer: 'GameKids',
    supplier: 'Fornecedor XYZ',
    dimensions: {
      length: 15,
      width: 20,
      height: 5,
      unit: 'cm'
    },
    recommendedAge: '4+',
    recommendedGender: "Unisex",
    material: 'Papel Cartão',
    safety: {
      minimumAge: 4,
      warnings: [],
      certification: ['Certificado INMETRO']
    },
    tags: ['memória', 'educativo', 'animais'],
    barcode: '789123456790',
    weight: 0.3,
    status: 'active',
    slug: 'jogo-da-memoria-animais',
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: 3,
    name: 'Boneca Laura',
    description: 'Boneca articulada com acessórios',
    price: 89.90,
    categoryId: 3,
    imageUrl: 'https://source.unsplash.com/random/800x600/?doll,toy',
    stock: 25,
    sku: 'BON-001',
    manufacturer: 'DollMaker',
    supplier: 'Fornecedor QWE',
    dimensions: {
      length: 15,
      width: 35,
      height: 10,
      unit: 'cm'
    },
    recommendedAge: '5+',
    recommendedGender: "Girls",
    material: 'Plástico e Tecido',
    safety: {
      minimumAge: 5,
      warnings: ['Tecidos antialérgicos'],
      certification: ['Certificado INMETRO']
    },
    tags: ['bonecas', 'brincar', 'articulada'],
    barcode: '789123456791',
    weight: 0.5,
    status: 'active',
    slug: 'boneca-laura',
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  }
];

export const orders: Order[] = [
  {
    id: 1,
    userId: 1,
    status: "processing",
    totalAmount: 305.70,
    paymentMethod: 'credit_card',
    shippingAddress: {
      street: 'Rua das Flores, 123, Apto 101',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567',
      country: 'Brasil'
    },
    items: [
      {
        id: 1,
        orderId: 1,
        productId: 1,
        quantity: 2,
        price: 129.90,
        createdAt: "2024-02-20T00:00:00Z",
        updatedAt: "2024-02-20T00:00:00Z"
      },
      {
        id: 2,
        orderId: 1,
        productId: 2,
        quantity: 1,
        price: 45.90,
        createdAt: "2024-02-20T00:00:00Z",
        updatedAt: "2024-02-20T00:00:00Z"
      }
    ],
    createdAt: "2024-02-20T00:00:00Z",
    updatedAt: "2024-02-20T00:00:00Z"
  }
];

export const customers: Customer[] = [
  {
    id: "1",
    name: 'João Silva',
    email: 'joao@email.com',
    password: 'hashed_password',
    phone: '11999887766',
    birthDate: "1990-01-01T00:00:00Z",
    addresses: [
      {
        street: 'Rua das Flores, 123, Apto 101',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567',
        country: 'Brasil'
      }
    ],
    preferences: ['Educativos', 'Tabuleiro'],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    status: 'active'
  }
];

export const users: User[] = [
  {
    id: 1,
    name: 'Admin',
    email: 'admin@brinquedos.com',
    role: 'admin',
    status: 'active',
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: 2,
    name: 'João Silva',
    email: 'joao@email.com',
    role: 'customer',
    status: 'active',
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  }
];
