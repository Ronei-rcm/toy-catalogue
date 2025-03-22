'use client';

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Store, 
  Truck, 
  CreditCard, 
  Mail, 
  Bell, 
  Palette,
  Save
} from 'lucide-react';

// Dados simulados
const storeSettings = {
  name: 'Toy Store',
  email: 'contato@toystore.com',
  phone: '(11) 1234-5678',
  address: 'Rua das Flores, 123',
  city: 'São Paulo',
  state: 'SP',
  zipCode: '01234-567',
  logo: '/logo.png',
  currency: 'BRL',
  timezone: 'America/Sao_Paulo',
  shipping: {
    freeShippingThreshold: 299.90,
    defaultShippingPrice: 19.90,
    carriers: ['Sedex', 'PAC']
  },
  payment: {
    methods: ['Cartão de Crédito', 'PIX', 'Boleto'],
    installments: 6
  },
  notifications: {
    orderConfirmation: true,
    orderShipped: true,
    orderDelivered: true,
    lowStock: true,
    newsletter: true
  }
};

export default function SettingsPage() {
  const [settings, setSettings] = useState(storeSettings);

  const handleSave = () => {
    // Implementar lógica de salvamento
    console.log('Saving settings:', settings);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Configurações</h1>
          <p className="mt-2 text-gray-500">Gerencie as configurações da loja</p>
        </div>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Salvar Alterações
        </Button>
      </div>

      <Tabs defaultValue="store" className="space-y-6">
        <TabsList>
          <TabsTrigger value="store" className="flex items-center">
            <Store className="h-4 w-4 mr-2" />
            Loja
          </TabsTrigger>
          <TabsTrigger value="shipping" className="flex items-center">
            <Truck className="h-4 w-4 mr-2" />
            Entrega
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center">
            <CreditCard className="h-4 w-4 mr-2" />
            Pagamento
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="h-4 w-4 mr-2" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center">
            <Palette className="h-4 w-4 mr-2" />
            Aparência
          </TabsTrigger>
        </TabsList>

        <TabsContent value="store">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="storeName">Nome da Loja</Label>
                  <Input
                    id="storeName"
                    value={settings.name}
                    onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeEmail">Email</Label>
                  <Input
                    id="storeEmail"
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storePhone">Telefone</Label>
                  <Input
                    id="storePhone"
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeAddress">Endereço</Label>
                  <Input
                    id="storeAddress"
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeCity">Cidade</Label>
                  <Input
                    id="storeCity"
                    value={settings.city}
                    onChange={(e) => setSettings({ ...settings, city: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeState">Estado</Label>
                  <Input
                    id="storeState"
                    value={settings.state}
                    onChange={(e) => setSettings({ ...settings, state: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeZipCode">CEP</Label>
                  <Input
                    id="storeZipCode"
                    value={settings.zipCode}
                    onChange={(e) => setSettings({ ...settings, zipCode: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeCurrency">Moeda</Label>
                  <Select
                    value={settings.currency}
                    onValueChange={(value) => setSettings({ ...settings, currency: value })}
                  >
                    <SelectTrigger id="storeCurrency">
                      <SelectValue placeholder="Selecione a moeda" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BRL">Real (BRL)</SelectItem>
                      <SelectItem value="USD">Dólar (USD)</SelectItem>
                      <SelectItem value="EUR">Euro (EUR)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="shipping">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="freeShippingThreshold">Valor Mínimo para Frete Grátis</Label>
                  <Input
                    id="freeShippingThreshold"
                    type="number"
                    value={settings.shipping.freeShippingThreshold}
                    onChange={(e) => setSettings({
                      ...settings,
                      shipping: {
                        ...settings.shipping,
                        freeShippingThreshold: parseFloat(e.target.value)
                      }
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="defaultShippingPrice">Valor Padrão do Frete</Label>
                  <Input
                    id="defaultShippingPrice"
                    type="number"
                    value={settings.shipping.defaultShippingPrice}
                    onChange={(e) => setSettings({
                      ...settings,
                      shipping: {
                        ...settings.shipping,
                        defaultShippingPrice: parseFloat(e.target.value)
                      }
                    })}
                  />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="payment">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="maxInstallments">Número Máximo de Parcelas</Label>
                  <Select
                    value={settings.payment.installments.toString()}
                    onValueChange={(value) => setSettings({
                      ...settings,
                      payment: {
                        ...settings.payment,
                        installments: parseInt(value)
                      }
                    })}
                  >
                    <SelectTrigger id="maxInstallments">
                      <SelectValue placeholder="Selecione o número de parcelas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1x</SelectItem>
                      <SelectItem value="3">3x</SelectItem>
                      <SelectItem value="6">6x</SelectItem>
                      <SelectItem value="12">12x</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Métodos de Pagamento</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="creditCard"
                      checked={settings.payment.methods.includes('Cartão de Crédito')}
                      onCheckedChange={(checked) => {
                        const methods = checked
                          ? [...settings.payment.methods, 'Cartão de Crédito']
                          : settings.payment.methods.filter(m => m !== 'Cartão de Crédito');
                        setSettings({
                          ...settings,
                          payment: { ...settings.payment, methods }
                        });
                      }}
                    />
                    <Label htmlFor="creditCard">Cartão de Crédito</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="pix"
                      checked={settings.payment.methods.includes('PIX')}
                      onCheckedChange={(checked) => {
                        const methods = checked
                          ? [...settings.payment.methods, 'PIX']
                          : settings.payment.methods.filter(m => m !== 'PIX');
                        setSettings({
                          ...settings,
                          payment: { ...settings.payment, methods }
                        });
                      }}
                    />
                    <Label htmlFor="pix">PIX</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="boleto"
                      checked={settings.payment.methods.includes('Boleto')}
                      onCheckedChange={(checked) => {
                        const methods = checked
                          ? [...settings.payment.methods, 'Boleto']
                          : settings.payment.methods.filter(m => m !== 'Boleto');
                        setSettings({
                          ...settings,
                          payment: { ...settings.payment, methods }
                        });
                      }}
                    />
                    <Label htmlFor="boleto">Boleto</Label>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="orderConfirmation"
                    checked={settings.notifications.orderConfirmation}
                    onCheckedChange={(checked) => setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        orderConfirmation: checked
                      }
                    })}
                  />
                  <Label htmlFor="orderConfirmation">Confirmação de Pedido</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="orderShipped"
                    checked={settings.notifications.orderShipped}
                    onCheckedChange={(checked) => setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        orderShipped: checked
                      }
                    })}
                  />
                  <Label htmlFor="orderShipped">Pedido Enviado</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="orderDelivered"
                    checked={settings.notifications.orderDelivered}
                    onCheckedChange={(checked) => setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        orderDelivered: checked
                      }
                    })}
                  />
                  <Label htmlFor="orderDelivered">Pedido Entregue</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="lowStock"
                    checked={settings.notifications.lowStock}
                    onCheckedChange={(checked) => setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        lowStock: checked
                      }
                    })}
                  />
                  <Label htmlFor="lowStock">Estoque Baixo</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="newsletter"
                    checked={settings.notifications.newsletter}
                    onCheckedChange={(checked) => setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        newsletter: checked
                      }
                    })}
                  />
                  <Label htmlFor="newsletter">Newsletter</Label>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="storeLogo">Logo da Loja</Label>
                  <div className="flex items-center gap-4">
                    <img
                      src={settings.logo}
                      alt="Logo"
                      className="h-12 w-12 object-contain"
                    />
                    <Button variant="outline">
                      Alterar Logo
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 