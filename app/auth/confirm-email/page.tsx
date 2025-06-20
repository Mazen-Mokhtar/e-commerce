'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { authAPI, ConfirmEmailData } from '@/lib/auth';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function ConfirmEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ConfirmEmailData>({
    mode: 'onChange',
  });

  const watchedValues = watch();
  console.log('Confirm email form values:', watchedValues);

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
      setValue('email', emailParam);
    }
  }, [searchParams, setValue]);

  const confirmEmailMutation = useMutation({
    mutationFn: authAPI.confirmEmail,
    onSuccess: (data) => {
      toast.success(t('emailConfirmedSuccessfully'));
      router.push('/auth/login');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Email confirmation failed');
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const onSubmit = (data: ConfirmEmailData) => {
    console.log('Confirm email form submitted with data:', data);
    setIsLoading(true);
    confirmEmailMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Confirm your email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            {t('checkEmailVerification')}
            {email && (
              <span className="block font-medium text-gray-900 dark:text-white mt-1">
                {email}
              </span>
            )}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              label={t('emailAddress')}
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setValue('email', e.target.value);
              }}
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
              label="Verification Code"
              type="text"
              placeholder="Enter 6-digit code"
              maxLength={6}
              {...register('code', {
                required: t('verificationCodeRequired'),
                pattern: {
                  value: /^\d{6}$/,
                  message: t('codeDigits'),
                },
              })}
              error={errors.code?.message}
            />
          </div>

          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full"
            size="lg"
          >
            Confirm Email
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Didn't receive the code?{' '}
              <button
                type="button"
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
                onClick={() => {
                  // You might want to implement resend functionality
                  toast.info('Resend functionality not implemented yet');
                }}
              >
                Resend code
              </button>
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              <Link href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                {t('back')} {t('login')}
              </Link>
            </p>
          </div>

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