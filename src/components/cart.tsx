'use client';

import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCart } from '@/contexts/cart-context';
import { useToast } from '@/components/ui/use-toast';
import { ShoppingCart, Minus, Plus, X, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function Cart() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    itemCount,
    total,
    subtotal,
    shipping,
    discount,
    hasItems,
  } = useCart();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId: string) => {
    removeItem(productId);
    toast({
      title: 'Item removido',
      description: 'O produto foi removido do carrinho.',
    });
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: 'Carrinho limpo',
      description: 'Todos os produtos foram removidos do carrinho.',
    });
  };

  const handleApplyCoupon = () => {
    // Aqui você implementaria a lógica de validação do cupom
    toast({
      title: 'Cupom inválido',
      description: 'O código informado não é válido.',
      variant: 'destructive',
    });
    setCouponCode('');
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-4 w-4" />
          {itemCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center"
            >
              {itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Carrinho de Compras</SheetTitle>
        </SheetHeader>

        {hasItems ? (
          <div className="flex flex-col h-full">
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4 py-4">
                {items.map((item) => (
                  <Card key={item.id} className="flex p-4">
                    <div className="relative h-16 w-16 rounded overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="ml-4 flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <Link
                            href={`/produtos/${item.id}`}
                            className="font-medium hover:underline"
                            onClick={() => setIsOpen(false)}
                          >
                            {item.name}
                          </Link>
                          <p className="text-sm text-muted-foreground">
                            R$ {item.price.toFixed(2)}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="mt-2 flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.stock}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <span className="ml-auto font-medium">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>

            <div className="space-y-4 pt-4">
              <Separator />

              <div className="flex items-center">
                <Input
                  placeholder="Código do cupom"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <Button
                  variant="outline"
                  className="ml-2"
                  onClick={handleApplyCoupon}
                >
                  Aplicar
                </Button>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Frete</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-600">Grátis</span>
                    ) : (
                      `R$ ${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Desconto</span>
                    <span>- R$ {discount.toFixed(2)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button className="w-full" asChild>
                  <Link href="/checkout">Finalizar Compra</Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleClearCart}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Limpar Carrinho
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <ShoppingCart className="h-12 w-12 text-muted-foreground" />
            <div className="text-center">
              <p className="text-lg font-medium mb-2">Seu carrinho está vazio</p>
              <p className="text-sm text-muted-foreground">
                Adicione produtos para começar suas compras
              </p>
            </div>
            <Button asChild onClick={() => setIsOpen(false)}>
              <Link href="/produtos">Ver Produtos</Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
} 