'use client';

import { useState } from 'react';
import { User, Mail, Phone, MapPin, CreditCard, Bell, Lock, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  address: string;
  preferences: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    newsletter: boolean;
  };
}

const mockProfile: UserProfile = {
  name: 'João Silva',
  email: 'joao.silva@email.com',
  phone: '(11) 98765-4321',
  avatar: '/images/team/joao.jpg',
  address: 'Rua das Flores, 123 - Centro, São Paulo - SP',
  preferences: {
    emailNotifications: true,
    smsNotifications: false,
    newsletter: true,
  },
};

export function UserProfile() {
  const [profile, setProfile] = useState<UserProfile>(mockProfile);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: 'Perfil atualizado',
      description: 'Suas informações foram salvas com sucesso!',
    });
  };

  const handleLogout = () => {
    // Implementar lógica de logout
    toast({
      title: 'Logout realizado',
      description: 'Você foi desconectado com sucesso.',
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Meu Perfil</h2>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                Cancelar
              </Button>
              <Button onClick={handleSave}>Salvar Alterações</Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Editar Perfil</Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList>
          <TabsTrigger value="personal">Informações Pessoais</TabsTrigger>
          <TabsTrigger value="preferences">Preferências</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-6 mb-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profile.avatar} />
                <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">{profile.name}</h3>
                <p className="text-sm text-muted-foreground">{profile.email}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Endereço</Label>
                  <Input
                    id="address"
                    value={profile.address}
                    onChange={(e) =>
                      setProfile({ ...profile, address: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Preferências de Notificação</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificações por E-mail</Label>
                  <p className="text-sm text-muted-foreground">
                    Receber atualizações sobre pedidos e ofertas
                  </p>
                </div>
                <Switch
                  checked={profile.preferences.emailNotifications}
                  onCheckedChange={(checked) =>
                    setProfile({
                      ...profile,
                      preferences: {
                        ...profile.preferences,
                        emailNotifications: checked,
                      },
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificações por SMS</Label>
                  <p className="text-sm text-muted-foreground">
                    Receber alertas sobre status de entrega
                  </p>
                </div>
                <Switch
                  checked={profile.preferences.smsNotifications}
                  onCheckedChange={(checked) =>
                    setProfile({
                      ...profile,
                      preferences: {
                        ...profile.preferences,
                        smsNotifications: checked,
                      },
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Newsletter</Label>
                  <p className="text-sm text-muted-foreground">
                    Receber novidades e promoções
                  </p>
                </div>
                <Switch
                  checked={profile.preferences.newsletter}
                  onCheckedChange={(checked) =>
                    setProfile({
                      ...profile,
                      preferences: {
                        ...profile.preferences,
                        newsletter: checked,
                      },
                    })
                  }
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Segurança da Conta</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Senha Atual</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">Nova Senha</Label>
                <Input
                  id="newPassword"
                  type="password"
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  disabled={!isEditing}
                />
              </div>

              <Button
                variant="destructive"
                className="w-full"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sair da Conta
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 