'use client';

import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cart, isLoading, removeFromCart, addToCart, getCartTotal } = useCart();
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{t('pleaseLogin')}</h1>
        <p className="text-gray-600 mb-8">{t('loginRequired')}</p>
        <Link href="/auth/login">
          <Button>{t('login')}</Button>
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!cart?.products?.length) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{t('cartEmpty')}</h1>
        <p className="text-gray-600 mb-8">{t('addSomeProducts')}</p>
        <Link href="/products">
          <Button>{t('continueShopping')}</Button>
        </Link>
      </div>
    );
  }

  const updateQuantity = (productId: string, currentQuantity: number, change: number) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity <= 0) {
      removeFromCart([productId]);
    } else {
      addToCart({ productId, quantity: newQuantity });
    }
  };

  const handleCheckout = () => {
    router.push('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('shoppingCart')}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border">
            {cart.products.map((item) => (
              <div key={item.productId._id} className="p-6 border-b last:border-b-0">
                <div className="flex items-center space-x-4">
                  {/* Product Image */}
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={item.productId.image.secure_url}
                      alt={item.productId.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {item.productId.name}
                    </h3>
                    <p className="text-gray-600">
                      ${item.productId.finalPrice.toFixed(2)} {t('each')}
                    </p>
                    <p className="text-sm text-gray-500">
                      {t('stock')}: {item.productId.stock}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.productId._id, item.quantity, -1)}
                      className="p-1 rounded-md hover:bg-gray-100"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.productId._id, item.quantity, 1)}
                      disabled={item.quantity >= item.productId.stock}
                      className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Item Total */}
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">
                      ${(item.productId.finalPrice * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromCart([item.productId._id])}
                      className="text-red-600 hover:text-red-800 mt-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('orderSummary')}</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">{t('subtotal')}</span>
                <span className="font-medium">${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t('shipping')}</span>
                <span className="font-medium">{t('free')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t('tax')}</span>
                <span className="font-medium">{t('calculatedAtCheckout')}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold">{t('total')}</span>
                  <span className="text-lg font-semibold">${getCartTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Button onClick={handleCheckout} className="w-full" size="lg">
              {t('proceedToCheckout')}
            </Button>

            <Link href="/products" className="block mt-4">
              <Button variant="outline" className="w-full">
                {t('continueShopping')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}