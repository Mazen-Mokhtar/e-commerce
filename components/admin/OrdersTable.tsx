'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { OrderStatusBadge } from '@/components/ui/OrderStatusBadge';
import { useLanguage } from '@/contexts/LanguageContext';
import { Eye, Edit } from 'lucide-react';
import Link from 'next/link';

interface Order {
  _id: string;
  orderId: string;
  createdBy: {
    name: string;
    email: string;
  };
  finalPrice: number;
  status: string;
  paymentMethod: string;
  createdAt: string;
  products: Array<{
    name: string;
    quantity: number;
  }>;
}

interface OrdersTableProps {
  orders: Order[];
  onStatusUpdate: (orderId: string, status: string, rejectedReason?: string) => void;
  isUpdating?: boolean;
}

export function OrdersTable({ orders, onStatusUpdate, isUpdating }: OrdersTableProps) {
  const { language, isRTL } = useLanguage();
  const [editingOrder, setEditingOrder] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState('');
  const [rejectedReason, setRejectedReason] = useState('');

  const handleStatusUpdate = (orderId: string) => {
    if (newStatus) {
      onStatusUpdate(orderId, newStatus, rejectedReason || undefined);
      setEditingOrder(null);
      setNewStatus('');
      setRejectedReason('');
    }
  };

  const statusOptions = [
    { value: 'pending', label: language === 'ar' ? 'قيد الانتظار' : 'Pending' },
    { value: 'placed', label: language === 'ar' ? 'تم التأكيد' : 'Placed' },
    { value: 'shipped', label: language === 'ar' ? 'تم الشحن' : 'Shipped' },
    { value: 'delivered', label: language === 'ar' ? 'تم التسليم' : 'Delivered' },
    { value: 'canceled', label: language === 'ar' ? 'ملغي' : 'Canceled' },
  ];

  if (orders.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
        <p className="text-gray-500 dark:text-gray-400">
          {language === 'ar' ? 'لا توجد طلبات' : 'No orders found'}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className={`px-6 py-3 ${isRTL ? 'text-right' : 'text-left'} text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>
                {language === 'ar' ? 'الطلب' : 'Order'}
              </th>
              <th className={`px-6 py-3 ${isRTL ? 'text-right' : 'text-left'} text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>
                {language === 'ar' ? 'العميل' : 'Customer'}
              </th>
              <th className={`px-6 py-3 ${isRTL ? 'text-right' : 'text-left'} text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>
                {language === 'ar' ? 'العناصر' : 'Items'}
              </th>
              <th className={`px-6 py-3 ${isRTL ? 'text-right' : 'text-left'} text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>
                {language === 'ar' ? 'الإجمالي' : 'Total'}
              </th>
              <th className={`px-6 py-3 ${isRTL ? 'text-right' : 'text-left'} text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>
                {language === 'ar' ? 'الحالة' : 'Status'}
              </th>
              <th className={`px-6 py-3 ${isRTL ? 'text-right' : 'text-left'} text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>
                {language === 'ar' ? 'الدفع' : 'Payment'}
              </th>
              <th className={`px-6 py-3 ${isRTL ? 'text-left' : 'text-right'} text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>
                {language === 'ar' ? 'الإجراءات' : 'Actions'}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      #{order.orderId || order._id.slice(-8)}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US')}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {order.createdBy?.name || (language === 'ar' ? 'غير معروف' : 'Unknown')}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {order.createdBy?.email || (language === 'ar' ? 'لا يوجد بريد إلكتروني' : 'No email')}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">
                    {order.products?.length || 0} {language === 'ar' ? 'عنصر' : 'items'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    ${order.finalPrice?.toFixed(2) || '0.00'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingOrder === order._id ? (
                    <div className="space-y-2">
                      <select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="">{language === 'ar' ? 'اختر الحالة' : 'Select Status'}</option>
                        {statusOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {newStatus === 'canceled' && (
                        <input
                          type="text"
                          placeholder={language === 'ar' ? 'سبب الإلغاء' : 'Rejection reason'}
                          value={rejectedReason}
                          onChange={(e) => setRejectedReason(e.target.value)}
                          className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white w-full"
                        />
                      )}
                      <div className={`flex ${isRTL ? 'space-x-reverse' : ''} space-x-1`}>
                        <Button
                          size="sm"
                          onClick={() => handleStatusUpdate(order._id)}
                          disabled={!newStatus || isUpdating}
                        >
                          {language === 'ar' ? 'حفظ' : 'Save'}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingOrder(null);
                            setNewStatus('');
                            setRejectedReason('');
                          }}
                        >
                          {language === 'ar' ? 'إلغاء' : 'Cancel'}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <OrderStatusBadge status={order.status as any} size="sm" />
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    order.paymentMethod === 'card'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  }`}>
                    {order.paymentMethod === 'card' 
                      ? (language === 'ar' ? 'بطاقة' : 'Card')
                      : (language === 'ar' ? 'نقدي' : 'Cash')
                    }
                  </span>
                </td>
                <td className={`px-6 py-4 whitespace-nowrap ${isRTL ? 'text-left' : 'text-right'} text-sm font-medium`}>
                  <div className={`flex items-center justify-end ${isRTL ? 'space-x-reverse' : ''} space-x-2`}>
                    <Link href={`/admin/orders/${order._id}`}>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditingOrder(order._id);
                        setNewStatus(order.status);
                      }}
                      disabled={editingOrder === order._id}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}