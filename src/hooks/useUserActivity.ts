
import { useState, useEffect } from 'react';
import { User } from '@/types/user';

export const useUserActivity = (user: User | null) => {
  const [lastActive, setLastActive] = useState<Date | null>(null);
  
  useEffect(() => {
    if (user) {
      const now = new Date();
      setLastActive(now);
      
      // Atualizar a cada minuto enquanto estiver ativo
      const interval = setInterval(() => {
        setLastActive(new Date());
      }, 60000);
      
      return () => clearInterval(interval);
    }
  }, [user]);

  return { lastActive };
};
