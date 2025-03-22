'use client';

import { useState } from 'react';
import { CheckCircle2, Package, CreditCard, Truck } from 'lucide-react';
import { ShippingAddress } from '@/components/shipping-address';
import { OrderSummary } from '@/components/order-summary';
import { PaymentForm } from '@/components/payment-form';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

type CheckoutStep = 'shipping' | 'payment' | 'confirmation';

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const { toast } = useToast();

  const handleNextStep = () => {
    if (currentStep === 'shipping') {
      setCurrentStep('payment');
    } else if (currentStep === 'payment') {
      setCurrentStep('confirmation');
      toast({
        title: 'Pedido Confirmado!',
        description: 'Seu pedido foi processado com sucesso.',
      });
    }
  };

  const handleBackStep = () => {
    if (currentStep === 'payment') {
      setCurrentStep('shipping');
    } else if (currentStep === 'confirmation') {
      setCurrentStep('payment');
    }
  };

  const steps = [
    {
      id: 'shipping',
      title: 'Entrega',
      icon: Truck,
      description: 'Escolha o endereço de entrega',
    },
    {
      id: 'payment',
      title: 'Pagamento',
      icon: CreditCard,
      description: 'Escolha a forma de pagamento',
    },
    {
      id: 'confirmation',
      title: 'Confirmação',
      icon: CheckCircle2,
      description: 'Revise e confirme seu pedido',
    },
  ];

  return (
    <div className="container py-8">
      {/* Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = steps.findIndex((s) => s.id === currentStep) > index;

            return (
              <div key={step.id} className="flex-1">
                <div className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      isActive || isCompleted
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-muted-foreground text-muted-foreground'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-2 ${
                        isCompleted ? 'bg-primary' : 'bg-muted-foreground'
                      }`}
                    />
                  )}
                </div>
                <div className="mt-2 text-center">
                  <p
                    className={`text-sm font-medium ${
                      isActive || isCompleted ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          {currentStep === 'shipping' && <ShippingAddress />}
          {currentStep === 'payment' && <PaymentForm />}
          {currentStep === 'confirmation' && (
            <Card className="p-6">
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Pedido Confirmado!</h2>
                <p className="text-muted-foreground">
                  Obrigado por comprar na MuhlStore. Seu pedido foi processado com
                  sucesso e você receberá um e-mail com os detalhes.
                </p>
                <div className="pt-4">
                  <Button asChild>
                    <a href="/pedidos">Ver Meus Pedidos</a>
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
        <div>
          <OrderSummary />
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex justify-between">
        {currentStep !== 'shipping' && (
          <Button variant="outline" onClick={handleBackStep}>
            Voltar
          </Button>
        )}
        {currentStep !== 'confirmation' && (
          <Button
            className="ml-auto"
            onClick={handleNextStep}
          >
            {currentStep === 'shipping' ? 'Continuar para Pagamento' : 'Finalizar Pedido'}
          </Button>
        )}
      </div>
    </div>
  );
} 