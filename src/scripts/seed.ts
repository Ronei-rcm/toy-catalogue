import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = await hash('admin123', 12);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@toycatalogue.com' },
    update: {},
    create: {
      email: 'admin@toycatalogue.com',
      name: 'Administrador',
      password,
      role: 'ADMIN'
    }
  });

  console.log({ admin });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 