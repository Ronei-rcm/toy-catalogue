import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Limpar o banco de dados na ordem correta
  console.log('Limpando banco de dados...');
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // Criar categorias
  console.log('Criando categorias...');
  await Promise.all([
    prisma.category.create({
      data: {
        name: 'Brinquedos Educativos',
        slug: 'brinquedos-educativos',
        description: 'Brinquedos que ajudam no desenvolvimento cognitivo e motor',
        imageUrl: '/images/categories/educational.jpg',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Brinquedos para Bebês',
        slug: 'brinquedos-para-bebes',
        description: 'Brinquedos seguros e estimulantes para os primeiros anos de vida',
        imageUrl: '/images/categories/babies.jpg',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Jogos de Mesa',
        slug: 'jogos-de-mesa',
        description: 'Jogos para diversão em família e amigos',
        imageUrl: '/images/categories/board-games.jpg',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Brinquedos ao Ar Livre',
        slug: 'brinquedos-ao-ar-livre',
        description: 'Brinquedos para atividades ao ar livre',
        imageUrl: '/images/categories/outdoor.jpg',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Brinquedos de Montar',
        slug: 'brinquedos-de-montar',
        description: 'Brinquedos que desenvolvem a coordenação motora',
        imageUrl: '/images/categories/building.jpg',
      },
    }),
  ]);

  console.log('✅ Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 