'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Truck, CreditCard, Shield, Headset } from 'lucide-react';
import { siteConfig } from '@/config/site';

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Sobre Nós</h3>
            <p className="text-muted-foreground">
              Catálogo de Brinquedos é sua loja especializada em brinquedos de qualidade.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Úteis</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/sobre" className="text-muted-foreground hover:text-primary">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-muted-foreground hover:text-primary">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/politica-privacidade" className="text-muted-foreground hover:text-primary">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos-uso" className="text-muted-foreground hover:text-primary">
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Categorias</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/categorias/lego" className="text-muted-foreground hover:text-primary">
                  LEGO
                </Link>
              </li>
              <li>
                <Link href="/categorias/pelucia" className="text-muted-foreground hover:text-primary">
                  Pelúcias
                </Link>
              </li>
              <li>
                <Link href="/categorias/jogos" className="text-muted-foreground hover:text-primary">
                  Jogos
                </Link>
              </li>
              <li>
                <Link href="/categorias/brinquedos" className="text-muted-foreground hover:text-primary">
                  Brinquedos
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Email: contato@catalogobrinquedos.com</li>
              <li>Telefone: (11) 1234-5678</li>
              <li>Endereço: Rua dos Brinquedos, 123</li>
              <li>São Paulo - SP</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Catálogo de Brinquedos. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
} 