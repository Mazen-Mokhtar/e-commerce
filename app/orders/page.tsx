'use client';

import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import api from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Button } from '@/components/ui/Button';
import { OrderCard } from '@/components/ui/OrderCard';
import { OrderStats } from '@/components/ui/OrderStats';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface IOrderProduct {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  finalPrice: number;
}

interface IOrder {
  _id: string;
  createdBy: string;
  products: IOrderProduct[];
  sub_Total: number;
  finalPrice: number;
  status: 'pending' | 'placed' | 'shipped' | 'delivered' | 'canceled';
  paymentMethod: 'cash' | 'card';
  createdAt: string;
  updatedAt: string;
  discountAmount?: number;
  intent?: string;
}

// API Functions
const fetchOrders = async () => {
  const response = await api.get('/order');
  return Array.isArray(response.data) ? response.data : response.data.data || [];
};

const checkoutOrder = async (orderId: string) => {
  const response = await api.post(`/order/${orderId}`);
  return response.data;
};

// Status configuration
const statusConfig = {
  pending: {
    label: 'Pending',
    color: 'bg-amber-50 text-amber-700 border-amber-200',
    icon: '⏳',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-700'
  },
  placed: {
    label: 'Placed',
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    icon: '📦',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700'
  },
  shipped: {
    label: 'Shipped',
    color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    icon: '🚚',
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-700'
  },
  delivered: {
    label: 'Delivered',
    color: 'bg-green-50 text-green-700 border-green-200',
    icon: '✅',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700'
  },
  canceled: {
    label: 'Canceled',
    color: 'bg-red-50 text-red-700 border-red-200',
    icon: '❌',
    bgColor: 'bg-red-50',
    textColor: 'text-red-700'
  }
};

export default function OrdersPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

  const { data: orders = [], isLoading, error } = useQuery<IOrder[]>({
    queryKey: ['orders'],
    queryFn: fetchOrders,
    enabled: isAuthenticated,
  });

  const checkoutMutation = useMutation({
    mutationFn: checkoutOrder,
    onSuccess: (data) => {
      if (data?.data?.url) {
        window.open(data.data.url, '_blank');
      }
    },
  });

  const handleCheckout = (orderId: string) => {
    checkoutMutation.mutate(orderId);
  };

  const handleViewDetails = (orderId: string) => {
    router.push(`/orders/${orderId}`);
  };

  // Calculate statistics
  const totalOrders = orders.length;
  const deliveredOrders = orders.filter(o => o.status === 'delivered').length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const totalSpent = orders.reduce((sum, order) => sum + order.finalPrice, 0);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h1>
          <p className="text-gray-600 mb-8">Please log in to view your orders and track your purchases.</p>
          <Button 
            onClick={() => router.push('/auth/login')}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105"
          >
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-gray-600 font-medium">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong</h1>
          <p className="text-gray-600 mb-8">We couldn't load your orders. Please try again later.</p>
          <Button 
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
              <p className="text-gray-600">Track and manage your purchases</p>
            </div>
          </div>
          
          {orders.length > 0 && (
            <div className="mb-6">
              <OrderStats 
                totalOrders={totalOrders}
                deliveredOrders={deliveredOrders}
                pendingOrders={pendingOrders}
                totalSpent={totalSpent}
              />
            </div>
          )}
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-12 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">No Orders Yet</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start your shopping journey! Your orders will appear here once you make your first purchase.
            </p>
            <Button 
              onClick={() => router.push('/products')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-105"
            >
              Start Shopping
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                onViewDetails={() => handleViewDetails(order._id)}
                onCompletePayment={() => handleCheckout(order._id)}
                isProcessingPayment={checkoutMutation.isPending}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
