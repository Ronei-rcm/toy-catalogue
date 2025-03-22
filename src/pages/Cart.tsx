
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Trash2, MinusCircle, PlusCircle, ArrowLeft, Tag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CartPage = () => {
  const { items, updateQuantity, removeItem, clearCart, total } = useCart();
  const { toast } = useToast();

  const handleCheckout = () => {
    if (items.length === 0) {
      toast({
        title: "Carrinho vazio",
        description: "Adicione produtos ao carrinho antes de finalizar a compra",
        variant: "destructive",
      });
      return;
    }

    // Implementação futura da finalização da compra
    toast({
      title: "Pedido realizado!",
      description: "Seu pedido foi recebido e está sendo processado",
    });
    clearCart();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Meu Carrinho</h1>
        <div className="flex gap-2">
          <Link to="/catalogo">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Continuar Comprando
            </Button>
          </Link>
          {items.length > 0 && (
            <Button 
              variant="outline" 
              className="flex items-center gap-2 text-destructive hover:text-destructive" 
              onClick={clearCart}
            >
              <Trash2 size={16} />
              Limpar Carrinho
            </Button>
          )}
        </div>
      </div>

      {items.length === 0 ? (
        <Card className="text-center py-16 bg-white/50 backdrop-blur-sm">
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <ShoppingCart size={64} className="text-muted-foreground/40" />
              <h2 className="text-2xl font-semibold">Seu carrinho está vazio</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Parece que você ainda não adicionou nenhum produto ao seu carrinho. 
                Explore nosso catálogo e encontre brinquedos incríveis!
              </p>
              <Link to="/catalogo">
                <Button className="mt-4">Ver Catálogo</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Produtos ({items.length})</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {items.map((item) => (
                    <div key={item.product.id} className="p-4 flex flex-col sm:flex-row gap-4">
                      <div className="w-24 h-24 bg-muted/30 rounded flex-shrink-0 flex items-center justify-center overflow-hidden">
                        {item.product.imageUrl ? (
                          <img 
                            src={item.product.imageUrl} 
                            alt={item.product.name} 
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="text-muted-foreground/30">Sem imagem</div>
                        )}
                      </div>
                      
                      <div className="flex-grow">
                        <h3 className="font-medium mb-1 line-clamp-2">{item.product.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
                          {item.product.description}
                        </p>
                        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-3">
                          <span className="bg-muted px-2 py-1 rounded-full">
                            {item.product.recommendedAge}
                          </span>
                          <span className="bg-muted px-2 py-1 rounded-full">
                            {item.product.material}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 border rounded-md">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 rounded-none"
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <MinusCircle size={16} />
                            </Button>
                            <span className="w-10 text-center">{item.quantity}</span>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 rounded-none"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              disabled={item.quantity >= item.product.stock}
                            >
                              <PlusCircle size={16} />
                            </Button>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="font-medium">
                                R$ {(item.product.price * item.quantity).toFixed(2)}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {item.quantity} x R$ {item.product.price.toFixed(2)}
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-destructive hover:text-destructive"
                              onClick={() => removeItem(item.product.id)}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center border rounded-md p-2">
                    <div className="flex-grow">
                      <div className="flex items-center gap-2">
                        <Tag size={16} />
                        <span>Cupom de desconto</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Aplicar</Button>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>R$ {total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Desconto</span>
                      <span>R$ 0,00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Frete</span>
                      <span>A calcular</span>
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>R$ {total.toFixed(2)}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        ou em até 10x de R$ {(total / 10).toFixed(2)} sem juros
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Button className="w-full" onClick={handleCheckout}>
                  Finalizar Compra
                </Button>
                <Link to="/catalogo" className="w-full">
                  <Button variant="outline" className="w-full">
                    Escolher mais produtos
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
