'use client';

import React from 'react';
import { OrderStatusBadge } from '@/components/ui/OrderStatusBadge';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Eye, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

interface RecentOrdersProps {
  orders?: Array<{
    _id: string;
    orderId: string;
    createdBy: {
      name: string;
      email: string;
    };
    finalPrice: number;
    status: string;
    createdAt: string;
    products: Array<{
      name: string;
      quantity: number;
    }>;
  }>;
  isLoading?: boolean;
}

export function RecentOrders({ orders, isLoading }: RecentOrdersProps) {
  const { t, isRTL } = useLanguage();

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">{t('recentOrders')}</h3>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-4`}>
                <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const recentOrders = orders?.slice(0, 5) || [];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('recentOrders')}</h3>
        <Link href="/admin/orders">
          <Button variant="outline" size="sm">
            {t('viewAll')}
          </Button>
        </Link>
      </div>

      {recentOrders.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">{t('noResults')}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div
              key={order._id}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <div className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-4`}>
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    #{order.orderId || order._id.slice(-4)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {order.createdBy?.name || t('customer')}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {order.products?.length || 0} {t('items')} • ${order.finalPrice?.toFixed(2) || '0.00'}
                  </p>
                </div>
              </div>

              <div className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-3`}>
                <OrderStatusBadge status={order.status as any} size="sm" />
                <Link href={`/admin/orders/${order._id}`}>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}