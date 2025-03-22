'use client';

import { useState } from 'react';
import { Package, Truck, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const mockItems: OrderItem[] = [
  {
    id: '1',
    name: 'LEGO Star Wars Millennium Falcon',
    price: 799.99,
    quantity: 1,
    image: '/images/products/lego-millennium-falcon.jpg',
  },
  {
    id: '2',
    name: 'Monopoly',
    price: 149.99,
    quantity: 2,
    image: '/images/products/monopoly.jpg',
  },
];

const shippingOptions = [
  {
    id: 'standard',
    name: 'Entrega Padrão',
    price: 15.99,
    estimatedDays: '3-5 dias úteis',
    icon: Truck,
  },
  {
    id: 'express',
    name: 'Entrega Expressa',
    price: 29.99,
    estimatedDays: '1-2 dias úteis',
    icon: Package,
  },
];

export function OrderSummary() {
  const [items] = useState<OrderItem[]>(mockItems);
  const [selectedShipping, setSelectedShipping] = useState('standard');
  const [discountCode, setDiscountCode] = useState('');
  const { toast } = useToast();

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shipping = shippingOptions.find(
    (option) => option.id === selectedShipping
  )?.price || 0;

  const total = subtotal + shipping;

  const handleApplyDiscount = () => {
    if (!discountCode) {
      toast({
        title: 'Erro',
        description: 'Por favor, insira um código de desconto.',
        variant: 'destructive',
      });
      return;
    }

    // Simular validação do código
    if (discountCode === 'DESCONTO10') {
      toast({
        title: 'Desconto aplicado!',
        description: '10% de desconto aplicado ao seu pedido.',
      });
    } else {
      toast({
        title: 'Código inválido',
        description: 'O código de desconto informado não é válido.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Resumo do Pedido</h2>
        <p className="text-muted-foreground">
          Revise seus itens e escolha a forma de entrega
        </p>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Quantidade: {item.quantity}
                </p>
                <p className="text-sm font-medium">
                  R$ {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t mt-6 pt-6 space-y-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">R$ {subtotal.toFixed(2)}</span>
          </div>

          <div className="space-y-2">
            <Label>Forma de Entrega</Label>
            <RadioGroup
              value={selectedShipping}
              onValueChange={setSelectedShipping}
              className="grid gap-4"
            >
              {shippingOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <div key={option.id}>
                    <RadioGroupItem
                      value={option.id}
                      id={option.id}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={option.id}
                      className="flex items-center justify-between p-4 border rounded-lg cursor-pointer peer-data-[state=checked]:border-primary"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5" />
                        <div>
                          <p className="font-medium">{option.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {option.estimatedDays}
                          </p>
                        </div>
                      </div>
                      <span className="font-medium">
                        R$ {option.price.toFixed(2)}
                      </span>
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Código de Desconto</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Digite seu código"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
              />
              <Button
                variant="outline"
                onClick={handleApplyDiscount}
              >
                Aplicar
              </Button>
            </div>
          </div>

          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>

          <Button className="w-full" size="lg">
            <CreditCard className="mr-2 h-5 w-5" />
            Finalizar Compra
          </Button>
        </div>
      </Card>
    </div>
  );
} 