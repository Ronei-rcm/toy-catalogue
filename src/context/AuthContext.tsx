
import React, { createContext, useContext, useEffect } from 'react';
import { AuthContextType } from '@/types/auth';
import { useAuthOperations } from '@/hooks/useAuthOperations';
import { useAuthStorage } from '@/hooks/useAuthStorage';
import { useUserActivity } from '@/hooks/useUserActivity';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { 
    user, 
    setUser, 
    isLoading, 
    setIsLoading, 
    login, 
    logout, 
    register, 
    updateProfile 
  } = useAuthOperations();
  
  const { getStoredUser } = useAuthStorage();
  const { lastActive } = useUserActivity(user);
  
  // Verificar se existe usuário no localStorage ao iniciar
  useEffect(() => {
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const isAuthenticated = !!user;
  const isAdmin = !!user && user.role === 'admin';

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated, 
      isAdmin, 
      updateProfile,
      register,
      isLoading,
      lastActive
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export default AuthContext;
