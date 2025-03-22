import React, { useState } from 'react';
import Link from 'next/link';
import { useCategories } from '@/hooks/useCategories';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const CategoriesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { categories, isLoading, error } = useCategories();
  
  // Filtrar categorias com base na busca
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertDescription>
            Ocorreu um erro ao carregar as categorias. Por favor, tente novamente mais tarde.
          </AlertDescription>
        </Alert>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Categorias de Brinquedos</h1>
      
      {/* Barra de pesquisa */}
      <div className="mb-8">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            type="text"
            placeholder="Buscar categorias..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {/* Lista de categorias */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {filteredCategories.length === 0 ? (
          <p className="text-center col-span-full text-muted-foreground">
            Nenhuma categoria encontrada com o termo "{searchTerm}".
          </p>
        ) : (
          filteredCategories.map(category => (
            <Card key={category.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-[2/1] bg-muted relative">
                <img 
                  src={category.imageUrl || '/images/placeholder.jpg'} 
                  alt={category.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <h2 className="text-xl font-bold text-white p-4">{category.name}</h2>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {category.description || `Explore nossa coleção de ${category.name.toLowerCase()} para todas as idades.`}
                </p>
                
                <Link href={`/catalogo?categoria=${category.id}`}>
                  <Button className="w-full">
                    Explorar <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      
      {/* Seções por idade */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Brinquedos por Idade</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {['0-2 anos', '3-5 anos', '6-8 anos', '9-12 anos', '12+ anos'].map((age, index) => (
            <div key={index} className="bg-primary/5 rounded-lg p-6 text-center hover:bg-primary/10 transition-colors cursor-pointer">
              <h3 className="font-semibold">{age}</h3>
              <p className="text-xs text-muted-foreground mt-1">Produtos adequados</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Banner promocional */}
      <div className="bg-primary/10 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Descubra Nossas Promoções</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Aproveite descontos especiais em brinquedos de todas as categorias. Atualizamos nossas ofertas semanalmente!
        </p>
        <Link href="/promocoes">
          <Button size="lg">
            Ver Promoções
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CategoriesPage;
