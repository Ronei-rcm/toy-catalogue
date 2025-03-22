'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useCart } from '@/contexts/cart-context';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { Pagination } from '@/components/ui/pagination';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  ageRange: string;
  brand: string;
  rating: number;
  reviews: number;
  stock: number;
  description: string;
  isNew?: boolean;
  discount?: number;
}

interface ProductListProps {
  searchTerm: string;
  sortBy: string;
  priceRange: number[];
  showInStock: boolean;
  showDiscount: boolean;
  selectedCategory: string;
  selectedAge: string;
  selectedBrands: string[];
  viewMode: 'grid' | 'list';
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Kit de Construção LEGO Star Wars',
    price: 399.99,
    originalPrice: 499.99,
    image: '/images/products/lego-star-wars.jpg',
    category: 'building',
    ageRange: '9-11',
    brand: 'LEGO',
    rating: 4.8,
    reviews: 128,
    stock: 15,
    description: 'Kit de construção LEGO Star Wars com 1000 peças',
    isNew: true,
    discount: 20,
  },
  {
    id: '2',
    name: 'Boneca Barbie Profissões',
    price: 99.99,
    image: '/images/products/barbie.jpg',
    category: 'dolls',
    ageRange: '3-5',
    brand: 'Mattel',
    rating: 4.5,
    reviews: 85,
    stock: 30,
    description: 'Boneca Barbie com diferentes acessórios profissionais',
  },
  {
    id: '3',
    name: 'Jogo de Tabuleiro Monopoly',
    price: 129.99,
    originalPrice: 149.99,
    image: '/images/products/monopoly.jpg',
    category: 'games',
    ageRange: '6-8',
    brand: 'Hasbro',
    rating: 4.7,
    reviews: 95,
    stock: 0,
    description: 'Clássico jogo de tabuleiro para toda a família',
    discount: 15,
  },
  // Adicione mais produtos mock aqui...
];

export function ProductList({
  searchTerm,
  sortBy,
  priceRange,
  showInStock,
  showDiscount,
  selectedCategory,
  selectedAge,
  selectedBrands,
  viewMode,
}: ProductListProps) {
  const { addItem } = useCart();
  const { toast } = useToast();
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const handleAddToCart = (product: Product) => {
    addItem(product);
    toast({
      title: 'Produto adicionado',
      description: 'O item foi adicionado ao seu carrinho.',
    });
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
    toast({
      title: wishlist.includes(productId) ? 'Removido dos favoritos' : 'Adicionado aos favoritos',
      description: wishlist.includes(productId)
        ? 'O item foi removido da sua lista de desejos.'
        : 'O item foi adicionado à sua lista de desejos.',
    });
  };

  const filteredProducts = mockProducts
    .filter((product) => {
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.brand.toLowerCase().includes(searchLower)
        );
      }
      return true;
    })
    .filter((product) => {
      if (showInStock) {
        return product.stock > 0;
      }
      return true;
    })
    .filter((product) => {
      if (showDiscount) {
        return product.discount && product.discount > 0;
      }
      return true;
    })
    .filter((product) => {
      if (selectedCategory !== 'all') {
        return product.category === selectedCategory;
      }
      return true;
    })
    .filter((product) => {
      if (selectedAge !== 'all') {
        return product.ageRange === selectedAge;
      }
      return true;
    })
    .filter((product) => {
      if (selectedBrands.length > 0) {
        return selectedBrands.includes(product.brand);
      }
      return true;
    })
    .filter((product) => {
      return (
        product.price >= priceRange[0] && product.price <= priceRange[1]
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'discount':
          return (b.discount || 0) - (a.discount || 0);
        case 'newest':
          return a.isNew ? -1 : 1;
        default:
          return 0;
      }
    });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    if (filteredProducts.length === 0) {
      return (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">Nenhum produto encontrado</h3>
          <p className="text-muted-foreground">
            Tente ajustar seus filtros para encontrar o que procura.
          </p>
        </div>
      );
    }

    if (viewMode === 'grid') {
      return (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedProducts.map((product) => (
              <Card key={product.id} className="group overflow-hidden">
                <Link href={`/produtos/${product.id}`}>
                  <div className="relative aspect-square">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    {product.discount && (
                      <Badge className="absolute top-2 right-2 bg-red-500">
                        -{product.discount}%
                      </Badge>
                    )}
                    {product.isNew && (
                      <Badge className="absolute top-2 left-2">
                        Novo
                      </Badge>
                    )}
                  </div>
                </Link>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link href={`/produtos/${product.id}`} className="hover:underline">
                        <h3 className="font-semibold line-clamp-2">{product.name}</h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">
                        {product.brand}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleWishlist(product.id)}
                      className={wishlist.includes(product.id) ? 'text-red-500' : ''}
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span className="ml-1 text-sm font-medium">{product.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({product.reviews} avaliações)
                      </span>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold">
                        R$ {product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          R$ {product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {product.stock > 0
                        ? `${product.stock} unidades em estoque`
                        : 'Fora de estoque'}
                    </p>
                  </div>

                  <div className="mt-4">
                    <Button
                      className="w-full"
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {product.stock > 0 ? 'Adicionar ao Carrinho' : 'Indisponível'}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      );
    }

    return (
      <div className="space-y-8">
        <div className="space-y-4">
          {paginatedProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="flex gap-6 p-4">
                <Link href={`/produtos/${product.id}`} className="relative w-48 aspect-square">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover rounded-md"
                  />
                  {product.discount && (
                    <Badge className="absolute top-2 right-2 bg-red-500">
                      -{product.discount}%
                    </Badge>
                  )}
                  {product.isNew && (
                    <Badge className="absolute top-2 left-2">
                      Novo
                    </Badge>
                  )}
                </Link>

                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link href={`/produtos/${product.id}`} className="hover:underline">
                        <h3 className="text-xl font-semibold">{product.name}</h3>
                      </Link>
                      <p className="text-muted-foreground mt-1">
                        {product.brand} • {product.category}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleWishlist(product.id)}
                      className={wishlist.includes(product.id) ? 'text-red-500' : ''}
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>

                  <p className="text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 font-medium">{product.rating}</span>
                      <span className="ml-1 text-muted-foreground">
                        ({product.reviews} avaliações)
                      </span>
                    </div>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">
                      {product.stock > 0
                        ? `${product.stock} unidades em estoque`
                        : 'Fora de estoque'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold">
                        R$ {product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-lg text-muted-foreground line-through">
                          R$ {product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <Button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {product.stock > 0 ? 'Adicionar ao Carrinho' : 'Indisponível'}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">
          {filteredProducts.length} produtos encontrados
        </p>
        {totalPages > 1 && (
          <p className="text-sm text-muted-foreground">
            Página {currentPage} de {totalPages}
          </p>
        )}
      </div>

      {renderContent()}
    </div>
  );
} 