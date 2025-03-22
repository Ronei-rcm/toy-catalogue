'use client';

import { useState } from 'react';
import { CreditCard, Wallet, Barcode, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/components/ui/use-toast';

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'credit-card',
    name: 'Cartão de Crédito',
    icon: <CreditCard className="h-5 w-5" />,
    description: 'Pague com cartão de crédito em até 12x',
  },
  {
    id: 'pix',
    name: 'PIX',
    icon: <Wallet className="h-5 w-5" />,
    description: '10% de desconto no pagamento via PIX',
  },
  {
    id: 'boleto',
    name: 'Boleto Bancário',
    icon: <Barcode className="h-5 w-5" />,
    description: 'Pague com boleto bancário',
  },
];

export function PaymentForm() {
  const [selectedMethod, setSelectedMethod] = useState<string>('credit-card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [installments, setInstallments] = useState('1');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Pagamento processado',
      description: 'Seu pagamento foi processado com sucesso!',
    });
  };

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{4})/g, '$1 ')
      .trim();
  };

  const formatExpiry = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .slice(0, 5);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Pagamento</h2>
        <p className="text-muted-foreground">
          Escolha o método de pagamento e preencha os dados necessários
        </p>
      </div>

      <RadioGroup
        value={selectedMethod}
        onValueChange={setSelectedMethod}
        className="grid gap-4"
      >
        {paymentMethods.map((method) => (
          <div key={method.id}>
            <RadioGroupItem
              value={method.id}
              id={method.id}
              className="peer sr-only"
            />
            <Label
              htmlFor={method.id}
              className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-muted/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
            >
              <div className="flex items-center gap-3">
                {method.icon}
                <div>
                  <p className="font-medium">{method.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {method.description}
                  </p>
                </div>
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>

      {selectedMethod === 'credit-card' && (
        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Número do Cartão</Label>
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              maxLength={19}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardName">Nome no Cartão</Label>
            <Input
              id="cardName"
              placeholder="Como está escrito no cartão"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="expiry">Validade</Label>
              <Input
                id="expiry"
                placeholder="MM/AA"
                value={expiry}
                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                maxLength={5}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                placeholder="123"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                maxLength={4}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="installments">Parcelas</Label>
            <select
              id="installments"
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              value={installments}
              onChange={(e) => setInstallments(e.target.value)}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                <option key={num} value={num}>
                  {num}x de R$ {(1000 / num).toFixed(2)}
                </option>
              ))}
            </select>
          </div>
        </Card>
      )}

      {selectedMethod === 'pix' && (
        <Card className="p-6">
          <div className="text-center space-y-4">
            <div className="mx-auto w-48 h-48 bg-muted rounded-lg flex items-center justify-center">
              <Barcode className="h-32 w-32" />
            </div>
            <p className="text-sm text-muted-foreground">
              Escaneie o código QR para pagar com PIX
            </p>
            <Button variant="outline" className="w-full">
              Copiar código PIX
            </Button>
          </div>
        </Card>
      )}

      {selectedMethod === 'boleto' && (
        <Card className="p-6">
          <div className="text-center space-y-4">
            <div className="mx-auto w-48 h-48 bg-muted rounded-lg flex items-center justify-center">
              <Barcode className="h-32 w-32" />
            </div>
            <p className="text-sm text-muted-foreground">
              O boleto será enviado para seu e-mail
            </p>
            <Button variant="outline" className="w-full">
              Gerar boleto
            </Button>
          </div>
        </Card>
      )}

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Lock className="h-4 w-4" />
        <p>Seus dados estão protegidos com criptografia SSL</p>
      </div>

      <Button type="submit" className="w-full">
        Finalizar Pagamento
      </Button>
    </form>
  );
} 