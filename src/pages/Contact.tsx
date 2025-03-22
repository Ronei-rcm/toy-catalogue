
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação simples
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Erro no formulário",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    // Simula envio do formulário
    setSubmitted(true);
    toast({
      title: "Mensagem enviada!",
      description: "Agradecemos seu contato. Responderemos em breve!",
    });

    // Reseta o formulário após 3 segundos
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Entre em Contato</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Fale Conosco</CardTitle>
            <CardDescription>
              Preencha o formulário abaixo para enviar sua mensagem. 
              Responderemos o mais breve possível.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <CheckCircle2 className="text-green-500 mb-4" size={64} />
                <h3 className="text-xl font-semibold mb-2">Mensagem Enviada!</h3>
                <p className="text-muted-foreground max-w-sm">
                  Agradecemos seu contato. Nossa equipe analisará sua mensagem e 
                  retornará em breve.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Nome *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-1">
                      Assunto
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none"
                    >
                      <option value="">Selecione um assunto</option>
                      <option value="duvida">Dúvida sobre produto</option>
                      <option value="compra">Informações de compra</option>
                      <option value="suporte">Suporte técnico</option>
                      <option value="reclamacao">Reclamação</option>
                      <option value="outro">Outro assunto</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none"
                    required
                  ></textarea>
                </div>
                
                <Button type="submit" className="w-full">
                  <Send className="mr-2" size={16} />
                  Enviar Mensagem
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações de Contato</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Phone className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-medium">Telefones</h3>
                  <p className="text-muted-foreground">(11) 9999-9999</p>
                  <p className="text-muted-foreground">(11) 8888-8888</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Mail className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-medium">E-mail</h3>
                  <p className="text-muted-foreground">contato@brinquedos.com</p>
                  <p className="text-muted-foreground">suporte@brinquedos.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <MapPin className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-medium">Endereço</h3>
                  <p className="text-muted-foreground">
                    Av. Paulista, 1000 - Bela Vista
                  </p>
                  <p className="text-muted-foreground">
                    São Paulo - SP, 01310-100
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Horário de Atendimento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Segunda a Sexta:</span>
                  <span>08:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sábado:</span>
                  <span>09:00 - 14:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Domingo e Feriados:</span>
                  <span>Fechado</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
