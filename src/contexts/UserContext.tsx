import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../models/User';
import { UserRole } from '../enums/UserRole';

interface UserProviderProps {
  children: ReactNode;
}

interface UserContextProps {
  user: User;
  login: () => void;
  logout: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({ name: '', role: UserRole.None });
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  const login = () => {
    fetchUserData();
  };

  const logout = () => {
    fetchLogout();
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch(apiUrl + '/auth/user', {credentials: 'include',}); // replace with your actual API endpoint
      const userData = await response.json();

      setUser(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchLogout = async () => {
    try {
      const response = await fetch(apiUrl + '/auth/logout', {credentials: 'include',});
      if (response.ok || response.status === 304) {
        console.log('Logout successful');
        setUser({ name: '', role: UserRole.None });
      } else {
        console.error('Logout failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []); // Empty dependency array means this effect runs only once on mount

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};