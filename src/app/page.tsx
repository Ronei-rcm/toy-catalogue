import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';

async function getHomeData() {
  const categories = await prisma.category.findMany({
    take: 6,
    orderBy: {
      createdAt: 'desc'
    }
  });

  const products = await prisma.product.findMany({
    take: 8,
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      category: true,
      brand: true
    }
  });

  const brands = await prisma.brand.findMany({
    take: 6,
    orderBy: {
      createdAt: 'desc'
    }
  });

  return { categories, products, brands };
}

export default async function HomePage() {
  const { categories, products, brands } = await getHomeData();

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Seção de Categorias */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Categorias</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              href={`/categorias/${category.slug}`}
              className="block group"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src={category.imageUrl || '/placeholder.jpg'}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{category.name}</h3>
                  {category.description && (
                    <p className="text-gray-600 mt-1 text-sm">{category.description}</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Seção de Produtos */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Produtos em Destaque</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link 
              key={product.id} 
              href={`/produtos/${product.slug}`}
              className="block group"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src={product.imageUrl || '/placeholder.jpg'}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                      {product.category.name}
                    </span>
                    {product.brand && (
                      <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                        {product.brand.name}
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="font-bold">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        }).format(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Seção de Marcas */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Nossas Marcas</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {brands.map((brand) => (
            <Link 
              key={brand.id} 
              href={`/marcas/${brand.slug}`}
              className="block group"
            >
              <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
                <div className="relative h-24 w-full mb-4">
                  <Image
                    src={brand.logoUrl || '/placeholder.jpg'}
                    alt={brand.name}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <h3 className="font-semibold text-center">{brand.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
} 