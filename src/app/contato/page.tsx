'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Clock, Facebook, Instagram, Twitter, Linkedin, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setProgress(0);

    try {
      // Simulate API call with progress
      for (let i = 0; i <= 100; i += 20) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setProgress(i);
      }
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      toast.success('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    } catch (error) {
      toast.error('Erro ao enviar mensagem. Por favor, tente novamente mais tarde.');
    } finally {
      setIsSubmitting(false);
      setProgress(0);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getCharacterCount = (field: keyof typeof formData) => {
    return formData[field].length;
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Entre em Contato</h1>
          <p className="text-muted-foreground">
            Tem alguma dúvida ou sugestão? Estamos aqui para ajudar!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <Mail className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Email</h3>
                <p className="text-muted-foreground">contato@toycatalogue.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Phone className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Telefone</h3>
                <p className="text-muted-foreground">(11) 1234-5678</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <MapPin className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Endereço</h3>
                <p className="text-muted-foreground">
                  Rua dos Brinquedos, 123<br />
                  São Paulo - SP
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Clock className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Horário de Atendimento</h3>
                <p className="text-muted-foreground">
                  Segunda a Sexta: 9h às 18h<br />
                  Sábado: 9h às 13h
                </p>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-4">
              <h3 className="font-semibold mb-3">Redes Sociais</h3>
              <div className="flex gap-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="h-10 w-10 p-0"
                        asChild
                      >
                        <a 
                          href="https://facebook.com/toycatalogue" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          aria-label="Facebook"
                        >
                          <Facebook className="h-4 w-4" />
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Siga-nos no Facebook</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="h-10 w-10 p-0"
                        asChild
                      >
                        <a 
                          href="https://instagram.com/toycatalogue" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          aria-label="Instagram"
                        >
                          <Instagram className="h-4 w-4" />
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Siga-nos no Instagram</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="h-10 w-10 p-0"
                        asChild
                      >
                        <a 
                          href="https://twitter.com/toycatalogue" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          aria-label="Twitter"
                        >
                          <Twitter className="h-4 w-4" />
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Siga-nos no Twitter</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="h-10 w-10 p-0"
                        asChild
                      >
                        <a 
                          href="https://linkedin.com/company/toycatalogue" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          aria-label="LinkedIn"
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Siga-nos no LinkedIn</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                minLength={3}
                className="mt-2"
                placeholder="Digite seu nome completo"
              />
              <div className="text-sm text-muted-foreground mt-1">
                {getCharacterCount('name')}/3 caracteres mínimos
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                className="mt-2"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <Label htmlFor="subject">Assunto</Label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                minLength={5}
                className="mt-2"
                placeholder="Digite o assunto da sua mensagem"
              />
              <div className="text-sm text-muted-foreground mt-1">
                {getCharacterCount('subject')}/5 caracteres mínimos
              </div>
            </div>

            <div>
              <Label htmlFor="message">Mensagem</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                minLength={10}
                className="mt-2"
                rows={5}
                placeholder="Digite sua mensagem aqui..."
              />
              <div className="text-sm text-muted-foreground mt-1">
                {getCharacterCount('message')}/10 caracteres mínimos
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                'Enviar Mensagem'
              )}
            </Button>

            {isSubmitting && (
              <div className="space-y-2">
                <Progress value={progress} className="h-2" />
                <p className="text-sm text-muted-foreground text-center">
                  Enviando sua mensagem... {progress}%
                </p>
              </div>
            )}
          </form>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Nossa Localização</h2>
          <div className="aspect-video w-full rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.197577494987!2d-46.6522777!3d-23.5505199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1641234567890!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 