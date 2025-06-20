'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { ordersAPI, CreateOrderData } from '@/lib/orders';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import Image from 'next/image';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getCartTotal, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateOrderData>({
    defaultValues: {
      paymentMethod: 'cash',
    },
  });

  const paymentMethod = watch('paymentMethod');

  const createOrderMutation = useMutation({
    mutationFn: ordersAPI.createOrder,
    onSuccess: async (data) => {
      const order = data.data;
      toast.success(t('orderCreatedSuccessfully'));
      
      if (paymentMethod === 'card') {
        // Redirect to Stripe checkout
        try {
          const checkoutData = await ordersAPI.checkout(order._id);
          window.location.href = checkoutData.data.url;
        } catch (error) {
          toast.error('Failed to redirect to payment');
        }
      } else {
        // Cash payment - clear cart and redirect to success
        clearCart();
        router.push(`/orders/${order._id}?success=true`);
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create order');
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{t('pleaseLogin')}</h1>
        <p className="text-gray-600 mb-8">{t('loginRequired')}</p>
        <Button onClick={() => router.push('/auth/login')}>{t('login')}</Button>
      </div>
    );
  }

  if (!cart?.products?.length) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{t('cartEmpty')}</h1>
        <p className="text-gray-600 mb-8">{t('addSomeProducts')}</p>
        <Button onClick={() => router.push('/products')}>{t('continueShopping')}</Button>
      </div>
    );
  }

  const onSubmit = (data: CreateOrderData) => {
    setIsLoading(true);
    createOrderMutation.mutate(data);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('checkout')}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Shipping Information */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('shippingInformation')}</h2>
              
              <div className="space-y-4">
                <Input
                  label={t('fullAddress')}
                  placeholder={t('enterCompleteAddress')}
                  {...register('address', {
                    required: t('addressRequired'),
                    minLength: {
                      value: 10,
                      message: t('addressMinLength'),
                    },
                    maxLength: {
                      value: 1000,
                      message: 'Address must be less than 1000 characters',
                    },
                  })}
                  error={errors.address?.message}
                />

                <Input
                  label={t('phoneNumber')}
                  type="tel"
                  placeholder="01012345678"
                  {...register('phone', {
                    required: t('phoneRequired'),
                    pattern: {
                      value: /^(01)[0-2,5]{1}[0-9]{8}$/,
                      message: t('invalidPhoneNumber'),
                    },
                  })}
                  error={errors.phone?.message}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('orderNotes')}
                  </label>
                  <textarea
                    {...register('note')}
                    rows={3}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder={t('specialInstructions')}
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('paymentMethod')}</h2>
              
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="cash"
                    {...register('paymentMethod')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-900">
                    {t('cashOnDelivery')}
                  </span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="card"
                    {...register('paymentMethod')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-900">
                    {t('creditDebitCard')}
                  </span>
                </label>
              </div>
            </div>

            {/* Coupon Code */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('coupon')}</h2>
              <Input
                label={t('couponCode')}
                placeholder={t('enterCouponCode')}
                {...register('couponCode', {
                  maxLength: {
                    value: 20,
                    message: t('couponCodeMaxLength') || 'Coupon code too long',
                  },
                  pattern: {
                    value: /^[A-Za-z0-9_-]*$/,
                    message: t('invalidCouponCode') || 'Invalid coupon code',
                  },
                })}
                error={errors.couponCode?.message}
              />
            </div>

            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full"
              size="lg"
            >
              {paymentMethod === 'card' ? t('proceedToPayment') : t('placeOrder')}
            </Button>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('orderSummary')}</h2>
            
            {/* Order Items */}
            <div className="space-y-4 mb-6">
              {cart.products.map((item) => (
                <div key={item.productId._id} className="flex items-center space-x-3">
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <Image
                      src={item.productId.image.secure_url}
                      alt={item.productId.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.productId.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {t('quantity')}: {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    ${(item.productId.finalPrice * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-3 border-t pt-4">
              <div className="flex justify-between">
                <span className="text-gray-600">{t('subtotal')}</span>
                <span className="font-medium">${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t('shipping')}</span>
                <span className="font-medium">{t('free')}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold">
                <span>{t('total')}</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}