'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { authAPI, LoginData } from '@/lib/auth';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    mode: 'onChange',
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginData) => {
      try {
        const response = await authAPI.login(data);
        return response;
      } catch (error: any) {
        console.error('Login error:', error.response?.data);
        throw error;
      }
    },
    onSuccess: async (data) => {
      try {
        console.log('Login API response:', data);
        const { accessToken, refreshToken } = data;
        console.log('accessToken:', accessToken);
        const role = accessToken?.split(' ')[0];
        const token = accessToken?.split(' ')[1];
        console.log('role:', role, 'token:', token);

        // Test saving a static value
        localStorage.setItem('token', 'test-token');
        console.log('Test token saved:', localStorage.getItem('token'));

        // Save the actual token if available
        if (role && token) {
          localStorage.setItem('token', `${role} ${token}`);
          console.log('Actual token saved:', localStorage.getItem('token'));
        } else {
          console.error('Token or role is missing!');
        }

        // Call getProfile after saving token
        console.log('Calling getProfile...');
        const profileData = await authAPI.getProfile();
        console.log('Profile data received:', profileData);

        login(`${role} ${token}`, profileData);
        console.log('User logged in, role:', role);

        // Redirect based on role after successful login
        if (role === 'admin') {
          console.log('Redirecting to /admin');
          router.push('/admin');
        } else {
          console.log('Redirecting to /products');
          router.push('/products');
        }
      } catch (profileError: any) {
        console.error('Profile fetch error:', profileError);
        if (profileError.response?.status === 401) {
          toast.error('انتهت صلاحية الجلسة، سجل الدخول مجددًا');
          router.push('/auth/login');
        } else {
          toast.error('فشل في جلب بيانات الحساب. حاول مرة أخرى.');
        }
        setIsLoading(false);
        return;
      }
    },
    onError: (error: any) => {
      console.error('Login error:', error.response?.data);
      const errorMessage = error.response?.data?.message || error.message || 'فشل في تسجيل الدخول';
      toast.error(errorMessage, {
        duration: 4000,
        icon: '❌',
      });
    },
    // onSettled: () => {
    //   setIsLoading(false);
    // },
  });

  const onSubmit = (data: LoginData) => {
    // setIsLoading(true);
    loginMutation.mutate(data);
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <p className="text-gray-700 dark:text-gray-300">
            {t('redirecting')}...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
            {t('login')}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t('signInToExisting')}{' '}
            <Link href="/auth/signup" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 transition-colors hover:underline">
              {t('createAccount')}
            </Link>
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="relative">
                <Input
                  label={t('emailAddress')}
                  type="email"
                  autoComplete="email"
                  placeholder={t('emailAddress')}
                  className="pl-10"
                  {...register('email', {
                    required: t('emailRequired'),
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: t('invalidEmail'),
                    },
                  })}
                  error={errors.email?.message}
                />
                <Mail className="absolute left-3 top-10 h-5 w-5 text-gray-400" />
              </div>

              <div className="relative">
                <Input
                  label={t('password')}
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder={t('password')}
                  className="pl-10 pr-10"
                  {...register('password', {
                    required: t('passwordRequired'),
                    minLength: {
                      value: 8,
                      message: t('passwordMinLength'),
                    },
                  })}
                  error={errors.password?.message}
                />
                <Lock className="absolute left-3 top-10 h-5 w-5 text-gray-400" />
                <button
                  type="button"
                  className="absolute right-3 top-10 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                  {t('rememberMe')}
                </label>
              </div>

              <div className="text-sm">
                <Link href="/auth/forgot-password" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 transition-colors hover:underline">
                  {t('forgotPassword')}
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:ring-blue-500 text-white font-medium py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
              size="lg"
            >
              {isLoading ? t('loading') : t('login')}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}