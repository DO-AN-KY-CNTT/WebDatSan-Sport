import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, ApiResponse } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<User>;
  register: (data: { email: string; password: string; fullName: string; phone: string }) => Promise<User>;
  logout: () => void;
  updateProfile: (data: { fullName?: string; phone?: string; avatar?: string }) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('sportbooking_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('sportbooking_token');
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshUser = async () => {
    if (!token) {
      setIsLoading(false);
      return;
    }
    try {
      const res = await api.get<ApiResponse<User>>('/auth/me');
      if (res.data.success) {
        setUser(res.data.data);
        localStorage.setItem('sportbooking_user', JSON.stringify(res.data.data));
      }
    } catch {
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (email: string, pass: string): Promise<User> => {
    const res = await api.post<ApiResponse<{ user: User; token: string }>>('/auth/login', {
      email,
      password: pass,
    });
    const { user: loggedInUser, token: receivedToken } = res.data.data;
    setUser(loggedInUser);
    setToken(receivedToken);
    localStorage.setItem('sportbooking_token', receivedToken);
    localStorage.setItem('sportbooking_user', JSON.stringify(loggedInUser));
    return loggedInUser;
  };

  const register = async (data: {
    email: string;
    password: string;
    fullName: string;
    phone: string;
  }): Promise<User> => {
    const res = await api.post<ApiResponse<{ user: User; token: string }>>('/auth/register', data);
    const { user: registeredUser, token: receivedToken } = res.data.data;
    setUser(registeredUser);
    setToken(receivedToken);
    localStorage.setItem('sportbooking_token', receivedToken);
    localStorage.setItem('sportbooking_user', JSON.stringify(registeredUser));
    return registeredUser;
  };

  const logout = () => {
    api.post('/auth/logout').catch(() => {});
    setUser(null);
    setToken(null);
    localStorage.removeItem('sportbooking_token');
    localStorage.removeItem('sportbooking_user');
  };

  const updateProfile = async (data: { fullName?: string; phone?: string; avatar?: string }) => {
    const res = await api.put<ApiResponse<User>>('/auth/profile', data);
    if (res.data.success) {
      setUser(res.data.data);
      localStorage.setItem('sportbooking_user', JSON.stringify(res.data.data));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
