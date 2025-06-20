'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cartAPI, Cart, CartItem } from '@/lib/cart';
import { useAuth } from './AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import toast from 'react-hot-toast';

interface CartContextType {
  cart: Cart | null;
  isLoading: boolean;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productIds: string[]) => void;
  clearCart: () => void;
  getCartItemCount: () => number;
  getCartTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const queryClient = useQueryClient();

  // Fetch cart data
  const { data: cart, isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: () => cartAPI.getCart().then(res => res.data),
    enabled: isAuthenticated,
  });

  // Add to cart mutation
  const addToCartMutation = useMutation({
    mutationFn: cartAPI.addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to add item to cart');
    },
  });

  // Remove from cart mutation
  const removeFromCartMutation = useMutation({
    mutationFn: cartAPI.removeFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success(t('itemRemovedFromCart'));
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to remove item from cart');
    },
  });

  // Clear cart mutation
  const clearCartMutation = useMutation({
    mutationFn: cartAPI.clearCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success(t('cartCleared'));
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to clear cart');
    },
  });

  const addToCart = (item: CartItem) => {
    addToCartMutation.mutate(item);
  };

  const removeFromCart = (productIds: string[]) => {
    removeFromCartMutation.mutate(productIds);
  };

  const clearCart = () => {
    clearCartMutation.mutate();
  };

  const getCartItemCount = () => {
    if (!cart?.products) return 0;
    return cart.products.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    if (!cart?.products) return 0;
    return cart.products.reduce(
      (total, item) => total + item.productId.finalPrice * item.quantity,
      0
    );
  };

  const value = {
    cart,
    isLoading,
    addToCart,
    removeFromCart,
    clearCart,
    getCartItemCount,
    getCartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}