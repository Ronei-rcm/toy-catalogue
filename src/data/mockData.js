export const categories = [
  {
    id: "1",
    name: 'Brinquedos Educativos',
    slug: 'brinquedos-educativos',
    description: 'Brinquedos que estimulam o aprendizado',
    image: 'https://source.unsplash.com/random/800x600/?educational,toys',
    imageUrl: 'https://source.unsplash.com/random/800x600/?educational,toys'
  },
  {
    id: "2",
    name: 'Jogos de Tabuleiro',
    slug: 'jogos-de-tabuleiro',
    description: 'Jogos para toda a família',
    image: 'https://source.unsplash.com/random/800x600/?board,game',
    imageUrl: 'https://source.unsplash.com/random/800x600/?board,game'
  },
  {
    id: "3",
    name: 'Bonecas e Bonecos',
    slug: 'bonecas-e-bonecos',
    description: 'Diversos personagens e estilos',
    image: 'https://source.unsplash.com/random/800x600/?doll,toy',
    imageUrl: 'https://source.unsplash.com/random/800x600/?doll,toy'
  }
];

export const products = [
  {
    id: "1",
    name: 'Kit de Blocos de Montar',
    description: 'Kit educativo com 100 peças coloridas',
    price: 129.90,
    categoryId: "1",
    image: 'https://source.unsplash.com/random/800x600/?toys,blocks',
    imageUrl: 'https://source.unsplash.com/random/800x600/?toys,blocks',
    stock: 50,
    sku: 'BLO-001',
    manufacturer: 'ToyEdu',
    supplier: 'Fornecedor ABC',
    dimensions: {
      height: 30,
      width: 40,
      depth: 10
    },
    recommendedAge: '3+',
    recommendedGender: "Unisex",
    material: 'Plástico ABS',
    safety: {
      certifications: ['Certificado INMETRO'],
      warnings: ['Não recomendado para menores de 3 anos devido a peças pequenas']
    },
    tags: ['educativo', 'montagem', 'criativo'],
    barcode: '789123456789',
    weight: 0.8,
    status: 'active'
  },
  {
    id: "2",
    name: 'Jogo da Memória Animais',
    description: 'Jogo da memória com temas de animais',
    price: 45.90,
    categoryId: "2",
    image: 'https://source.unsplash.com/random/800x600/?memory,game',
    imageUrl: 'https://source.unsplash.com/random/800x600/?memory,game',
    stock: 30,
    sku: 'JOG-001',
    manufacturer: 'GameKids',
    supplier: 'Fornecedor XYZ',
    dimensions: {
      height: 20,
      width: 15,
      depth: 5
    },
    recommendedAge: '4+',
    recommendedGender: "Unisex",
    material: 'Papel Cartão',
    safety: {
      certifications: ['Certificado INMETRO'],
      warnings: []
    },
    tags: ['memória', 'educativo', 'animais'],
    barcode: '789123456790',
    weight: 0.3,
    status: 'active'
  },
  {
    id: "3",
    name: 'Boneca Laura',
    description: 'Boneca articulada com acessórios',
    price: 89.90,
    categoryId: "3",
    image: 'https://source.unsplash.com/random/800x600/?doll,toy',
    imageUrl: 'https://source.unsplash.com/random/800x600/?doll,toy',
    stock: 25,
    sku: 'BON-001',
    manufacturer: 'DollMaker',
    supplier: 'Fornecedor QWE',
    dimensions: {
      height: 35,
      width: 15,
      depth: 10
    },
    recommendedAge: '5+',
    recommendedGender: "Girls",
    material: 'Plástico e Tecido',
    safety: {
      certifications: ['Certificado INMETRO'],
      warnings: ['Tecidos antialérgicos']
    },
    tags: ['bonecas', 'brincar', 'articulada'],
    barcode: '789123456791',
    weight: 0.5,
    status: 'active'
  }
];

export const orders = [
  {
    id: "1",
    customerId: "1",
    products: [
      { productId: "1", quantity: 2, price: 129.90 },
      { productId: "2", quantity: 1, price: 45.90 }
    ],
    status: "processing",
    totalAmount: 305.70,
    createdAt: "2024-02-20T00:00:00Z",
    updatedAt: "2024-02-20T00:00:00Z",
    shippingAddress: {
      street: 'Rua das Flores, 123, Apto 101',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567',
      country: 'Brasil'
    },
    paymentMethod: 'credit_card'
  }
];

export const customers = [
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

export const users = [
  {
    id: "1",
    name: 'Admin',
    email: 'admin@brinquedos.com',
    password: 'admin123',
    role: 'admin',
    status: 'active'
  },
  {
    id: "2",
    name: 'João Silva',
    email: 'joao@email.com',
    password: 'senha123',
    role: 'customer',
    status: 'active'
  }
]; 