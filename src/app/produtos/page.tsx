'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/contexts/cart-context';
import { ShoppingCart } from 'lucide-react';

// Dados mockados para exemplo
const products = [
  {
    id: '1',
    name: 'LEGO Star Wars Millennium Falcon',
    price: 1299.99,
    image: '/images/products/lego-millennium-falcon.jpg',
    description: 'O lendário Millennium Falcon em formato LEGO',
    category: 'LEGO',
  },
  {
    id: '2',
    name: 'Pelúcia Ursinho Pooh',
    price: 89.99,
    image: '/images/products/ursinho-pooh.jpg',
    description: 'Pelúcia fofinha do Ursinho Pooh',
    category: 'Pelúcias',
  },
  {
    id: '3',
    name: 'Jogo de Tabuleiro Monopoly',
    price: 149.99,
    image: '/images/products/monopoly.jpg',
    description: 'O clássico jogo de tabuleiro Monopoly',
    category: 'Jogos',
  },
  // Adicione mais produtos conforme necessário
];

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { addItem } = useCart();

  const categories = Array.from(new Set(products.map(product => product.category)));

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Produtos</h1>

      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Buscar produtos..."
            className="flex-1 px-4 py-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="px-4 py-2 border rounded-md"
            value={selectedCategory || ''}
            onChange={(e) => setSelectedCategory(e.target.value || null)}
          >
            <option value="">Todas as categorias</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white shadow rounded-lg overflow-hidden">
            <div className="relative h-48">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-lg mb-2">{product.name}</h3>
              <p className="text-gray-500 text-sm mb-4">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-lg">
                  R$ {product.price.toFixed(2)}
                </span>
                <button
                  onClick={() => addItem({ ...product, quantity: 1 })}
                  className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 flex items-center gap-2"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            Nenhum produto encontrado com os filtros selecionados.
          </p>
        </div>
      )}
    </div>
  );
} 