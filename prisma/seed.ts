import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Criar usuário admin
  const adminPassword = await hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@exemplo.com' },
    update: {},
    create: {
      email: 'admin@exemplo.com',
      name: 'Administrador',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  // Criar categorias
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'lego' },
      update: {},
      create: {
        name: 'LEGO',
        slug: 'lego',
        description: 'Brinquedos de montar LEGO',
        imageUrl: '/images/categories/lego.jpg',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'pelucia' },
      update: {},
      create: {
        name: 'Pelúcias',
        slug: 'pelucia',
        description: 'Pelúcias e bichos de pelúcia',
        imageUrl: '/images/categories/pelucia.jpg',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'jogos' },
      update: {},
      create: {
        name: 'Jogos',
        slug: 'jogos',
        description: 'Jogos de tabuleiro e cartas',
        imageUrl: '/images/categories/jogos.jpg',
      },
    }),
  ]);

  // Criar marcas
  const brands = await Promise.all([
    prisma.brand.upsert({
      where: { slug: 'lego' },
      update: {},
      create: {
        name: 'LEGO',
        slug: 'lego',
        description: 'Fabricante dinamarquesa de brinquedos',
        logoUrl: '/images/brands/lego.png',
      },
    }),
    prisma.brand.upsert({
      where: { slug: 'disney' },
      update: {},
      create: {
        name: 'Disney',
        slug: 'disney',
        description: 'Brinquedos licenciados Disney',
        logoUrl: '/images/brands/disney.png',
      },
    }),
    prisma.brand.upsert({
      where: { slug: 'estrela' },
      update: {},
      create: {
        name: 'Estrela',
        slug: 'estrela',
        description: 'Brinquedos Estrela',
        logoUrl: '/images/brands/estrela.png',
      },
    }),
  ]);

  // Criar produtos
  const products = await Promise.all([
    prisma.product.upsert({
      where: { slug: 'lego-millennium-falcon' },
      update: {},
      create: {
        name: 'LEGO Star Wars Millennium Falcon',
        slug: 'lego-millennium-falcon',
        description: 'O lendário Millennium Falcon em formato LEGO',
        price: 1299.99,
        originalPrice: 1499.99,
        categoryId: categories[0].id,
        brandId: brands[0].id,
        imageUrl: '/images/products/lego-millennium-falcon.jpg',
        images: [
          '/images/products/lego-millennium-falcon-1.jpg',
          '/images/products/lego-millennium-falcon-2.jpg',
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
        categoryId: categories[1].id,
        brandId: brands[1].id,
        imageUrl: '/images/products/ursinho-pooh.jpg',
        images: [
          '/images/products/ursinho-pooh-1.jpg',
          '/images/products/ursinho-pooh-2.jpg',
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
        categoryId: categories[2].id,
        imageUrl: '/images/products/monopoly.jpg',
        images: [
          '/images/products/monopoly-1.jpg',
          '/images/products/monopoly-2.jpg',
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