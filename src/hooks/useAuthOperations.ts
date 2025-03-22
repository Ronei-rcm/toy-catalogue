
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { User } from '@/types/user';
import { Customer } from '@/types/user';
import { users, customers } from '@/data/mockData';
import { useAuthStorage } from './useAuthStorage';

export const useAuthOperations = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { storeUser, clearStoredUser } = useAuthStorage();

  const login = (email: string, password: string, rememberMe: boolean = false): boolean => {
    setIsLoading(true);
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      setUser(foundUser);
      storeUser(foundUser, rememberMe);
      
      // Redirecionar baseado no tipo de usuário
      setTimeout(() => {
        if (foundUser.role === 'admin') {
          console.log("Redirecionando para área de admin");
          navigate('/admin');
        } else {
          navigate('/perfil');
          toast({
            title: "Bem-vindo de volta!",
            description: `Olá, ${foundUser.name}! Bom te ver novamente.`,
          });
        }
        setIsLoading(false);
      }, 100);
      
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    clearStoredUser();
    navigate('/login');
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
  };
  
  const register = async (userData: Omit<User, 'id' | 'role' | 'status'>): Promise<boolean> => {
    // Verificar se email já existe
    const emailExists = users.some(u => u.email === userData.email);
    
    if (emailExists) {
      toast({
        title: "Erro no cadastro",
        description: "Este e-mail já está sendo utilizado.",
        variant: "destructive",
      });
      return false;
    }
    
    // Em um ambiente real, isso seria uma chamada à API
    // Aqui apenas simulamos o cadastro
    const newUser: User = {
      id: `${users.length + 1}`,
      ...userData,
      role: 'customer',
      status: 'active',
      createdAt: new Date().toISOString()
    };
    
    // Adicionar à lista de usuários (simulação)
    users.push(newUser);
    
    // Criar também um cliente associado
    const newCustomer: Customer = {
      id: `${customers.length + 1}`,
      name: userData.name,
      email: userData.email,
      password: userData.password,
      phone: userData.phone || '',
      birthDate: new Date().toISOString(),
      addresses: [],
      preferences: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'active'
    };
    
    // Adicionar à lista de clientes (simulação)
    customers.push(newCustomer);
    
    toast({
      title: "Cadastro realizado com sucesso",
      description: "Sua conta foi criada. Você já pode fazer login.",
    });
    
    return true;
  };
  
  const updateProfile = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      
      // Atualizar no storage apropriado
      if (localStorage.getItem('user')) {
        localStorage.setItem('user', JSON.stringify(updatedUser));
      } else if (sessionStorage.getItem('user')) {
        sessionStorage.setItem('user', JSON.stringify(updatedUser));
      }
      
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso.",
      });
    }
  };

  return {
    user,
    setUser,
    isLoading,
    setIsLoading,
    login,
    logout,
    register,
    updateProfile
  };
};
