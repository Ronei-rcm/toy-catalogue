
import { User } from './user';

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, rememberMe?: boolean) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  updateProfile: (userData: Partial<User>) => void;
  register: (userData: Omit<User, 'id' | 'role' | 'status'>) => Promise<boolean>;
  isLoading: boolean;
  lastActive: Date | null;
}
