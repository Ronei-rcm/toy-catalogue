import { HeroBanner } from "@/components/hero-banner";
import { FeaturedCategories } from "@/components/featured-categories";
import { FeaturedProducts } from "@/components/featured-products";
import { FeaturedBrands } from "@/components/featured-brands";
import { Newsletter } from "@/components/newsletter";
import { prisma } from "@/lib/prisma";

async function getHomeData() {
  const [categories, products, brands] = await Promise.all([
    prisma.category.findMany({
      take: 6,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.product.findMany({
      take: 8,
      where: {
        rating: {
          gte: 4.5,
        },
      },
      include: {
        brand: true,
      },
      orderBy: {
        rating: "desc",
      },
    }),
    prisma.brand.findMany({
      take: 6,
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);

  return { categories, products, brands };
}

export default async function HomePage() {
  const { categories, products, brands } = await getHomeData();

  return (
    <main>
      <HeroBanner
        title="Brinquedos para Todas as Idades"
        description="Descubra nossa coleção exclusiva de brinquedos educativos, jogos e muito mais para divertir e estimular o desenvolvimento das crianças."
        imageUrl="/images/hero-banner.jpg"
        buttonText="Ver Produtos"
        buttonLink="/produtos"
      />
      <FeaturedCategories categories={categories} />
      <FeaturedProducts products={products} />
      <FeaturedBrands brands={brands} />
      <Newsletter />
    </main>
  );
} 