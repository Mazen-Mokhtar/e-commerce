'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, getStoredUser, getStoredToken, clearAuthData } from '@/lib/auth';
import { useLanguage } from '@/contexts/LanguageContext';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasShownWelcome, setHasShownWelcome] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = getStoredUser();
        const storedToken = getStoredToken();
        
        if (storedUser && storedToken) {
          setUser(storedUser);
          setToken(storedToken);
          
          // Show welcome message only if not already shown
          if (storedUser.name && !hasShownWelcome) {
            const lastWelcomeTime = localStorage.getItem('lastWelcomeTime');
            const currentTime = Date.now();
            
            // Show welcome message only if it's been more than 30 minutes since last welcome
            if (!lastWelcomeTime || (currentTime - parseInt(lastWelcomeTime)) > 1800000) {
              toast.success(`${t('welcomeBack')}، ${storedUser.name}!`, {
                duration: 3000,
                icon: '👋',
              });
              localStorage.setItem('lastWelcomeTime', currentTime.toString());
              setHasShownWelcome(true);
            }
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        // Clear invalid data
        clearAuthData();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [hasShownWelcome, t]);

  const login = (newToken: string, newUser: User) => {
    try {
      setToken(newToken);
      setUser(newUser);
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      // Show welcome message
      toast.success(`${t('welcome')} ${newUser.name}! ${t('loginSuccess')}`, {
        duration: 3000,
        icon: '🎉',
      });
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('حدث خطأ أثناء تسجيل الدخول');
    }
  };

  const logout = () => {
    try {
      const userName = user?.name || t('welcome');
      setToken(null);
      setUser(null);
      clearAuthData();
      
      // Show logout message
      toast.success(`${t('logoutSuccess')}. ${t('seeYouSoon')} ${userName}!`, {
        duration: 3000,
        icon: '👋',
      });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      toast.success(t('profileUpdated'), {
        duration: 2000,
        icon: '✅',
      });
    }
  };

  const value = {
    user,
    token,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user && !!token,
    isAdmin: user?.role === 'admin',
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}