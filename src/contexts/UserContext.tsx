import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../models/User';
import { UserRole } from '../enums/UserRole';
import axiosInstance from '../services/AxiosInstance';

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
  const [user, setUser] = useState<User>({ _id: '', username: '', role: UserRole.None });

  const login = () => {
    fetchUserData();
  };

  const logout = () => {
    fetchLogout();
  };

  const fetchUserData = async () => {
    try {
      const response = await axiosInstance.get('/auth/user');

      if (response.status === 206) { // User not logged in yet
        return;
      }
      const userData = await response.data;
      setUser(userData);
    } catch (error: any) {
      console.error('Error fetching user data:', error.response.data);
    }
  };

  const fetchLogout = async () => {
    try {
      await axiosInstance.get('/auth/logout');
      console.log('Logout successful');
      setUser({ _id: '', username: '', role: UserRole.None });
    } catch (error: any) {
      console.error('Error during logout:', error.response.data);
    }
  }

  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (user.username !== '' && error.response && error.response.status === 401) {
          logout();
          setUser({ _id: '', username: '', role: UserRole.None });
        }
        return Promise.reject(error);
      }
    );


    fetchUserData();
  }, []);

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