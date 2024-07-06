import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (username: string, email: string, password: string) => Promise<void>;
  editProfile: (username: string, email: string, password: string) => Promise<void>;
}

const BASE_URL = 'http://127.0.0.1:8000/api/journal/';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
    };
    checkUser();
  }, []);

  const login = async (username: string, password: string) => {
    const response = await fetch(`${BASE_URL}/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    setUser(data.user);
    setIsAuthenticated(true);
    await AsyncStorage.setItem('user', JSON.stringify(data.user));
  };

  const logout = async () => {
    setUser(null);
    setIsAuthenticated(false);
    await AsyncStorage.removeItem('user');
  };

  const signup = async (username: string, email: string, password: string) => {
    const response = await fetch(`${BASE_URL}/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await response.json();
    setUser(data.user);
    setIsAuthenticated(true);
    await AsyncStorage.setItem('user', JSON.stringify(data.user));
  };

  const editProfile = async (username: string, email: string, password: string) => {
    const response = await fetch(`${BASE_URL}/profile/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await response.json();
    setUser(data.user);
    await AsyncStorage.setItem('user', JSON.stringify(data.user));
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, signup, editProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
