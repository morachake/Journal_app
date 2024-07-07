import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContextType, User } from '../types/types';



const BASE_URL = 'http://localhost:8000/api';

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
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      const storedToken = await AsyncStorage.getItem('access');
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };
    checkUser();
  }, []);

  const login = async (username: string, password: string) => {
    const response = await fetch(`${BASE_URL}/journal/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();

    if (response.ok) {
      const { access, refresh } = data;
      setUser({ username, email: '' }); 
      setIsAuthenticated(true);
      await AsyncStorage.setItem('user', JSON.stringify({ username, email: '' }));
      await AsyncStorage.setItem('access_token', access);
      await AsyncStorage.setItem('refresh_token', refresh);
    } else {
      throw new Error('Login failed');
    }
  };

  const logout = async () => {
    setUser(null);
    setIsAuthenticated(false);
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('access_token');
    await AsyncStorage.removeItem('refresh_token');
  };

  const signup = async (username: string, email: string, password: string) => {
    const response = await fetch(`${BASE_URL}/journal/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await response.json();

    if (response.ok) {
      const { access, refresh } = data;
      setUser({ username, email });
      setIsAuthenticated(true);
      await AsyncStorage.setItem('user', JSON.stringify({ username, email }));
      await AsyncStorage.setItem('access_token', access);
      await AsyncStorage.setItem('refresh_token', refresh);
    } else {
      throw new Error('Signup failed');
    }
  };

  const editProfile = async (username?: string, email?: string, password?: string) => {
    const token = await AsyncStorage.getItem('access_token');
    const body: any = {};
    if (username) body.username = username;
    if (email) body.email = email;
    if (password) body.password = password;
  
    const response = await fetch(`${BASE_URL}/journal/profile/`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body),
    });
  
    if (response.ok) {
      const data = await response.json();
      setUser({ username: data.username, email: data.email });
      await AsyncStorage.setItem('user', JSON.stringify({ username: data.username, email: data.email }));
    } else {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Edit profile failed');
    }
  };
  

  const getAccessToken = async () => {
    return await AsyncStorage.getItem('access_token');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout, signup, editProfile, getAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};
