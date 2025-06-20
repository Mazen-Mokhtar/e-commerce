'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { authAPI, SignupData } from '@/lib/auth';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function SignupPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupData>({
    mode: 'onChange',
  });

  const password = watch('password');
  const watchedValues = watch();
  console.log('Signup form values:', watchedValues);

  const signupMutation = useMutation({
    mutationFn: authAPI.signup,
    onSuccess: (data) => {
      toast.success(t('accountCreated'));
      router.push(`/auth/confirm-email?email=${encodeURIComponent(watch('email'))}`);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Signup failed');
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const onSubmit = (data: SignupData) => {
    console.log('Signup form submitted with data:', data);
    setIsLoading(true);
    signupMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            {t('createAccount')}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            {t('signInToExisting')}{' '}
            <Link href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
              {t('login')}
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              label={t('fullName')}
              type="text"
              autoComplete="name"
              {...register('name', {
                required: t('nameRequired'),
                minLength: {
                  value: 2,
                  message: t('nameMinLength'),
                },
                maxLength: {
                  value: 30,
                  message: t('nameMaxLength'),
                },
              })}
              error={errors.name?.message}
            />

            <Input
              label={t('emailAddress')}
              type="email"
              autoComplete="email"
              {...register('email', {
                required: t('emailRequired'),
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: t('invalidEmail'),
                },
              })}
              error={errors.email?.message}
            />

            <Input
              label={t('phoneNumber')}
              type="tel"
              autoComplete="tel"
              {...register('phone', {
                required: t('phoneRequired'),
                pattern: {
                  value: /^(01)[0-2,5]{1}[0-9]{8}$/,
                  message: t('invalidPhoneNumber'),
                },
              })}
              error={errors.phone?.message}
              helperText="Enter Egyptian mobile number (e.g., 01012345678)"
            />

            <Input
              label={t('password')}
              type="password"
              autoComplete="new-password"
              {...register('password', {
                required: t('passwordRequired'),
                minLength: {
                  value: 8,
                  message: t('passwordMinLength'),
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                  message: 'Password must contain uppercase, lowercase, number and special character',
                },
              })}
              error={errors.password?.message}
            />

            <Input
              label={t('confirmPassword')}
              type="password"
              autoComplete="new-password"
              {...register('cPassword', {
                required: 'Please confirm your password',
                validate: (value) =>
                  value === password || t('passwordMismatch'),
              })}
              error={errors.cPassword?.message}
            />
          </div>

          <div className="flex items-center">
            <input
              id="agree-terms"
              name="agree-terms"
              type="checkbox"
              required
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
              {t('agreeToTerms')}{' '}
              <Link href="/terms" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
                {t('termsAndConditions')}
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
                {t('privacyPolicy')}
              </Link>
            </label>
          </div>

          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full"
            size="lg"
          >
            {t('createAccount')}
          </Button>

          {/* Debug info - remove in production */}
          <div className="mt-4 p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs">
            <p>Debug - Form values: {JSON.stringify(watchedValues)}</p>
            <p>Debug - Errors: {JSON.stringify(errors)}</p>
          </div>
        </form>
      </div>
    </div>
  );
}