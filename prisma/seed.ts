import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcryptjs';
import { CATEGORY_IMAGES } from '../src/lib/constants';

const prisma = new PrismaClient();

async function main() {
  // Criar categorias
  const categories = await prisma.category.createMany({
    data: [
      {
        name: 'Brinquedos Educativos',
        description: 'Jogos e brinquedos que estimulam o aprendizado',
        imageUrl: CATEGORY_IMAGES.educational,
        slug: 'educativos'
      },
      {
        name: 'Jogos de Tabuleiro',
        description: 'Jogos para toda a família se divertir',
        imageUrl: CATEGORY_IMAGES.games,
        slug: 'jogos'
      },
      {
        name: 'Bebês e Primeira Infância',
        description: 'Brinquedos seguros para os pequenos',
        imageUrl: CATEGORY_IMAGES.babies,
        slug: 'bebes'
      },
      {
        name: 'Blocos de Montar',
        description: 'LEGO e outros blocos de construção',
        imageUrl: CATEGORY_IMAGES.building,
        slug: 'blocos'
      },
      {
        name: 'Veículos e Carrinhos',
        description: 'Carros, aviões e outros veículos',
        imageUrl: CATEGORY_IMAGES.vehicles,
        slug: 'veiculos'
      },
      {
        name: 'Esportes e Ar Livre',
        description: 'Brinquedos para atividades ao ar livre',
        imageUrl: CATEGORY_IMAGES.sports,
        slug: 'esportes'
      }
    ],
    skipDuplicates: true
  });

  // Criar usuário admin
  const hashedPassword = await hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@toycatalogue.com' },
    update: {},
    create: {
      name: 'Administrador',
      email: 'admin@toycatalogue.com',
      password: hashedPassword,
      role: Role.ADMIN
    }
  });

  // Criar marcas
  const brands = await Promise.all([
    prisma.brand.upsert({
      where: { slug: 'lego' },
      update: {},
      create: {
        name: 'LEGO',
        slug: 'lego',
        description: 'Fabricante dinamarquesa de brinquedos',
        imageUrl: 'https://placehold.co/200x200/f59e0b/ffffff?text=LEGO',
      },
    }),
    prisma.brand.upsert({
      where: { slug: 'disney' },
      update: {},
      create: {
        name: 'Disney',
        slug: 'disney',
        description: 'Brinquedos licenciados Disney',
        imageUrl: 'https://placehold.co/200x200/3b82f6/ffffff?text=Disney',
      },
    }),
    prisma.brand.upsert({
      where: { slug: 'estrela' },
      update: {},
      create: {
        name: 'Estrela',
        slug: 'estrela',
        description: 'Brinquedos Estrela',
        imageUrl: 'https://placehold.co/200x200/ef4444/ffffff?text=Estrela',
      },
    }),
  ]);

  // Buscar categorias criadas
  const allCategories = await prisma.category.findMany();

  // Criar produtos
  await Promise.all([
    prisma.product.upsert({
      where: { slug: 'lego-millennium-falcon' },
      update: {},
      create: {
        name: 'LEGO Star Wars Millennium Falcon',
        slug: 'lego-millennium-falcon',
        description: 'O lendário Millennium Falcon em formato LEGO',
        price: 1299.99,
        originalPrice: 1499.99,
        categoryId: allCategories[3].id, // Blocos de Montar
        brandId: brands[0].id, // LEGO
        imageUrl: 'https://placehold.co/600x400/f59e0b/ffffff?text=LEGO+Millennium+Falcon',
        images: [
          'https://placehold.co/600x400/f59e0b/ffffff?text=LEGO+Millennium+Falcon+1',
          'https://placehold.co/600x400/f59e0b/ffffff?text=LEGO+Millennium+Falcon+2',
        ],
        stock: 10,
        rating: 4.8,
      },
    }),
    prisma.product.upsert({
      where: { slug: 'ursinho-pooh' },
      update: {},
      create: {
        name: 'Pelúcia Ursinho Pooh',
        slug: 'ursinho-pooh',
        description: 'Pelúcia fofinha do Ursinho Pooh',
        price: 89.99,
        categoryId: allCategories[2].id, // Bebês e Primeira Infância
        brandId: brands[1].id, // Disney
        imageUrl: 'https://placehold.co/600x400/3b82f6/ffffff?text=Ursinho+Pooh',
        images: [
          'https://placehold.co/600x400/3b82f6/ffffff?text=Ursinho+Pooh+1',
          'https://placehold.co/600x400/3b82f6/ffffff?text=Ursinho+Pooh+2',
        ],
        stock: 20,
        rating: 4.5,
      },
    }),
    prisma.product.upsert({
      where: { slug: 'monopoly' },
      update: {},
      create: {
        name: 'Jogo de Tabuleiro Monopoly',
        slug: 'monopoly',
        description: 'O clássico jogo de tabuleiro Monopoly',
        price: 149.99,
        categoryId: allCategories[1].id, // Jogos de Tabuleiro
        brandId: brands[2].id, // Estrela
        imageUrl: 'https://placehold.co/600x400/ef4444/ffffff?text=Monopoly',
        images: [
          'https://placehold.co/600x400/ef4444/ffffff?text=Monopoly+1',
          'https://placehold.co/600x400/ef4444/ffffff?text=Monopoly+2',
        ],
        stock: 15,
        rating: 4.7,
      },
    }),
  ]);

  // Criar endereço para o admin
  await prisma.address.upsert({
    where: { id: 'admin-address' },
    update: {},
    create: {
      id: 'admin-address',
      userId: admin.id,
      street: 'Rua Exemplo',
      number: '123',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01001-000',
      isDefault: true,
    },
  });

  console.log('Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 