'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const team = [
  {
    name: 'João Silva',
    role: 'CEO & Fundador',
    image: '/images/team/joao.jpg',
    bio: 'Com mais de 15 anos de experiência no mercado de brinquedos, João fundou nossa empresa com a missão de trazer alegria e desenvolvimento para as crianças.'
  },
  {
    name: 'Maria Santos',
    role: 'Diretora de Produtos',
    image: '/images/team/maria.jpg',
    bio: 'Maria é responsável por selecionar e desenvolver nossa linha de produtos, garantindo qualidade e segurança em cada item.'
  },
  {
    name: 'Pedro Oliveira',
    role: 'Gerente de Operações',
    image: '/images/team/pedro.jpg',
    bio: 'Pedro gerencia nossa cadeia de suprimentos e operações logísticas, garantindo entregas eficientes para nossos clientes.'
  }
];

const stats = [
  { label: 'Produtos Vendidos', value: '50K+' },
  { label: 'Clientes Satisfeitos', value: '10K+' },
  { label: 'Categorias', value: '6' },
  { label: 'Anos no Mercado', value: '5' }
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Sobre Nós</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Somos uma empresa dedicada a trazer alegria e desenvolvimento para as crianças através de brinquedos educativos e divertidos.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mission Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">Nossa Missão</h2>
          <p className="text-muted-foreground mb-4">
            Nossa missão é proporcionar brinquedos de alta qualidade que não apenas entretêm, mas também contribuem para o desenvolvimento das crianças.
          </p>
          <p className="text-muted-foreground">
            Acreditamos que brincar é uma parte essencial do desenvolvimento infantil, e nossos produtos são cuidadosamente selecionados para promover aprendizado, criatividade e diversão.
          </p>
        </div>
        <div className="relative aspect-video rounded-lg overflow-hidden">
          <Image
            src="/images/about/mission.jpg"
            alt="Nossa Missão"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Nossa Equipe</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member) => (
            <Card key={member.name}>
              <CardContent className="pt-6">
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-center mb-1">{member.name}</h3>
                <p className="text-sm text-muted-foreground text-center mb-4">{member.role}</p>
                <p className="text-sm text-muted-foreground text-center">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Entre em Contato</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <span>contato@toycatalogue.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <span>(11) 9999-9999</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <span>São Paulo, SP</span>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Redes Sociais</h2>
          <div className="flex gap-4">
            <Button variant="outline" size="icon">
              <Facebook className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Instagram className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Twitter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Linkedin className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 