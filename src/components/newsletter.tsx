'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Aqui você pode implementar a lógica para salvar o email
      // Por exemplo, enviar para uma API ou salvar no banco de dados
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulação

      toast({
        title: "Inscrição realizada!",
        description: "Obrigado por se inscrever em nossa newsletter.",
      });
      setEmail("");
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível realizar sua inscrição. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Receba Novidades e Ofertas
          </h2>
          <p className="text-gray-600 mb-8">
            Cadastre-se em nossa newsletter para receber as últimas novidades,
            ofertas especiais e dicas sobre brinquedos.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-4">
            <Input
              type="email"
              placeholder="Seu melhor e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Enviando..." : "Inscrever-se"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
} 