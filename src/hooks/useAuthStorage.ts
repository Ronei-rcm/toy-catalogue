
import { User } from '@/types/user';

export const useAuthStorage = () => {
  const getStoredUser = (): User | null => {
    const storedUser = localStorage.getItem('user');
    const sessionUser = sessionStorage.getItem('user');
    
    if (storedUser) {
      return JSON.parse(storedUser);
    } else if (sessionUser) {
      return JSON.parse(sessionUser);
    }
    
    return null;
  };

  const storeUser = (user: User, rememberMe: boolean = false): void => {
    if (rememberMe) {
      localStorage.setItem('user', JSON.stringify(user));
      sessionStorage.removeItem('user');
    } else {
      sessionStorage.setItem('user', JSON.stringify(user));
      localStorage.removeItem('user');
    }
  };

  const clearStoredUser = (): void => {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
  };

  return {
    getStoredUser,
    storeUser,
    clearStoredUser
  };
};
