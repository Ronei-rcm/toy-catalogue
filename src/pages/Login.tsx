import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, User, KeyRound, LogIn, AlertCircle } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, isAdmin } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTime, setLockoutTime] = useState<number | null>(null);
  
  // Verificar se o usuário já está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/perfil');
      }
    }
  }, [isAuthenticated, isAdmin, navigate]);

  // Verificar tempo de bloqueio
  useEffect(() => {
    if (lockoutTime) {
      const timer = setInterval(() => {
        const now = Date.now();
        if (now >= lockoutTime) {
          setIsLocked(false);
          setLockoutTime(null);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [lockoutTime]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLocked) {
      const remainingTime = Math.ceil((lockoutTime! - Date.now()) / 1000);
      setError(`Tente novamente em ${remainingTime} segundos`);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const success = await login(formData.email, formData.password, rememberMe);
      
      if (success) {
        toast({
          title: "Login realizado com sucesso",
          description: "Bem-vindo de volta à nossa loja!",
        });
      } else {
        setAttempts(prev => {
          const newAttempts = prev + 1;
          if (newAttempts >= 3) {
            setIsLocked(true);
            setLockoutTime(Date.now() + 30000); // 30 segundos de bloqueio
            return 0;
          }
          return newAttempts;
        });
        
        setError("E-mail ou senha incorretos. Tente novamente.");
        toast({
          title: "Falha no login",
          description: "E-mail ou senha incorretos. Tente novamente.",
          variant: "destructive",
        });
      }
    } catch (err) {
      setError("Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.");
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const adminCredentials = {
    email: 'admin@brinquedos.com',
    password: 'admin123'
  };
  
  const customerCredentials = {
    email: 'cliente@exemplo.com',
    password: 'senha123'
  };
  
  const fillAdminCredentials = () => {
    setFormData(adminCredentials);
  };
  
  const fillCustomerCredentials = () => {
    setFormData(customerCredentials);
  };
  
  return (
    <div className="container mx-auto px-4 py-16 flex justify-center">
      <Card className="w-full max-w-md glass-card">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl text-center">Acesso à Conta</CardTitle>
          <CardDescription className="text-center">
            Entre com suas credenciais para acessar sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu-email@exemplo.com"
                  className="pl-10"
                  required
                  disabled={isLocked}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <Button variant="link" className="px-0 h-auto text-xs">
                  Esqueceu a senha?
                </Button>
              </div>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="pl-10 pr-10"
                  required
                  disabled={isLocked}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </Button>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="remember-me" 
                checked={rememberMe} 
                onCheckedChange={(checked) => setRememberMe(checked === true)}
                disabled={isLocked}
              />
              <Label
                htmlFor="remember-me"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Lembrar meus dados
              </Label>
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || isLocked}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Entrando...
                </div>
              ) : (
                <>
                  <LogIn className="mr-2" size={18} />
                  Entrar
                </>
              )}
            </Button>
          </form>
          
          <div className="relative flex items-center justify-center mt-6 mb-4">
            <div className="absolute w-full border-t"></div>
            <div className="relative px-4 bg-card text-xs text-muted-foreground">
              Ou entre com
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" type="button" onClick={fillAdminCredentials}>
              Conta Admin
            </Button>
            <Button variant="outline" type="button" onClick={fillCustomerCredentials}>
              Conta Cliente
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-4">
          <div className="text-sm text-center">
            Não tem uma conta?{" "}
            <Button 
              variant="link" 
              className="p-0 h-auto font-medium" 
              onClick={() => navigate('/cadastro')}
            >
              Cadastre-se
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
