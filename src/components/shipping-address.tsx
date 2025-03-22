'use client';

import { useState } from 'react';
import { MapPin, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/components/ui/use-toast';

interface Address {
  id: string;
  name: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

const mockAddresses: Address[] = [
  {
    id: '1',
    name: 'Casa',
    street: 'Rua das Flores',
    number: '123',
    complement: 'Apto 45',
    neighborhood: 'Centro',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01001-000',
    isDefault: true,
  },
  {
    id: '2',
    name: 'Trabalho',
    street: 'Avenida Paulista',
    number: '1000',
    neighborhood: 'Bela Vista',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01310-100',
    isDefault: false,
  },
];

export function ShippingAddress() {
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses);
  const [selectedAddress, setSelectedAddress] = useState<string>('1');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newAddress, setNewAddress] = useState<Partial<Address>>({});
  const { toast } = useToast();

  const handleAddAddress = () => {
    if (!newAddress.zipCode || !newAddress.street) {
      toast({
        title: 'Erro',
        description: 'Por favor, preencha o CEP e o endereço.',
        variant: 'destructive',
      });
      return;
    }

    const address: Address = {
      id: Date.now().toString(),
      name: newAddress.name || 'Novo Endereço',
      street: newAddress.street,
      number: newAddress.number || '',
      complement: newAddress.complement,
      neighborhood: newAddress.neighborhood || '',
      city: newAddress.city || '',
      state: newAddress.state || '',
      zipCode: newAddress.zipCode,
      isDefault: addresses.length === 0,
    };

    setAddresses((prev) => [...prev, address]);
    setSelectedAddress(address.id);
    setIsAddingNew(false);
    setNewAddress({});

    toast({
      title: 'Endereço adicionado',
      description: 'O novo endereço foi salvo com sucesso!',
    });
  };

  const handleDeleteAddress = (id: string) => {
    if (addresses.length === 1) {
      toast({
        title: 'Erro',
        description: 'Você precisa ter pelo menos um endereço cadastrado.',
        variant: 'destructive',
      });
      return;
    }

    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
    if (selectedAddress === id) {
      setSelectedAddress(addresses[0].id);
    }

    toast({
      title: 'Endereço removido',
      description: 'O endereço foi removido com sucesso!',
    });
  };

  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  const handleSearchCep = async (cep: string) => {
    if (cep.length !== 8) return;

    try {
      // Simular busca de CEP
      const mockResponse = {
        street: 'Rua das Flores',
        neighborhood: 'Centro',
        city: 'São Paulo',
        state: 'SP',
      };

      setNewAddress((prev) => ({
        ...prev,
        ...mockResponse,
        zipCode: cep,
      }));

      toast({
        title: 'CEP encontrado',
        description: 'O endereço foi preenchido automaticamente.',
      });
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível encontrar o CEP.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Endereço de Entrega</h2>
        <p className="text-muted-foreground">
          Escolha um endereço de entrega ou adicione um novo
        </p>
      </div>

      <RadioGroup
        value={selectedAddress}
        onValueChange={setSelectedAddress}
        className="grid gap-4"
      >
        {addresses.map((address) => (
          <Card key={address.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <RadioGroupItem
                  value={address.id}
                  id={address.id}
                  className="mt-1"
                />
                <div>
                  <Label
                    htmlFor={address.id}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <span className="font-medium">{address.name}</span>
                    {address.isDefault && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        Padrão
                      </span>
                    )}
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {address.street}, {address.number}
                    {address.complement && ` - ${address.complement}`}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {address.neighborhood} - {address.city}/{address.state}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    CEP: {address.zipCode}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!address.isDefault && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSetDefault(address.id)}
                  >
                    Definir como padrão
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteAddress(address.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </RadioGroup>

      {isAddingNew ? (
        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Endereço</Label>
            <Input
              id="name"
              placeholder="Ex: Casa, Trabalho"
              value={newAddress.name || ''}
              onChange={(e) =>
                setNewAddress({ ...newAddress, name: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="zipCode">CEP</Label>
            <Input
              id="zipCode"
              placeholder="00000-000"
              value={newAddress.zipCode || ''}
              onChange={(e) => {
                const cep = e.target.value.replace(/\D/g, '');
                setNewAddress({ ...newAddress, zipCode: cep });
                if (cep.length === 8) {
                  handleSearchCep(cep);
                }
              }}
              maxLength={8}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="street">Endereço</Label>
            <Input
              id="street"
              value={newAddress.street || ''}
              onChange={(e) =>
                setNewAddress({ ...newAddress, street: e.target.value })
              }
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="number">Número</Label>
              <Input
                id="number"
                value={newAddress.number || ''}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, number: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="complement">Complemento</Label>
              <Input
                id="complement"
                value={newAddress.complement || ''}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, complement: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="neighborhood">Bairro</Label>
              <Input
                id="neighborhood"
                value={newAddress.neighborhood || ''}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, neighborhood: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">Cidade</Label>
              <Input
                id="city"
                value={newAddress.city || ''}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, city: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="state">Estado</Label>
              <Input
                id="state"
                value={newAddress.state || ''}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, state: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => {
                setIsAddingNew(false);
                setNewAddress({});
              }}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              className="flex-1"
              onClick={handleAddAddress}
            >
              Salvar Endereço
            </Button>
          </div>
        </Card>
      ) : (
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setIsAddingNew(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Novo Endereço
        </Button>
      )}
    </div>
  );
} 