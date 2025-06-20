'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminAPI } from '@/lib/admin';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Button } from '@/components/ui/Button';
import { OrderTimeline } from '@/components/ui/OrderTimeline';
import { OrderStatusBadge } from '@/components/ui/OrderStatusBadge';
import { ArrowLeft, Package, User, MapPin, CreditCard, FileText } from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';

export default function AdminOrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const orderId = params.orderId as string;
  const { isAuthenticated, isAdmin } = useAuth();

  // Redirect if not admin
  React.useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      router.push('/');
    }
  }, [isAuthenticated, isAdmin, router]);

  const { data: orderData, isLoading, error } = useQuery({
    queryKey: ['admin-order', orderId],
    queryFn: () => adminAPI.getOrder(orderId),
    enabled: !!orderId && isAuthenticated && isAdmin,
  });

  // Update order status mutation
  const updateOrderMutation = useMutation({
    mutationFn: ({ status, rejectedReason }: { status: string; rejectedReason?: string }) =>
      adminAPI.updateOrderStatus(orderId, { status, rejectedReason }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-order', orderId] });
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
      toast.success('Order status updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update order status');
    },
  });

  const handleStatusUpdate = (status: string, rejectedReason?: string) => {
    updateOrderMutation.mutate({ status, rejectedReason });
  };

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !orderData?.data) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Order Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">The order you're looking for doesn't exist.</p>
          <Button onClick={() => router.push('/admin/orders')}>
            Back to Orders
          </Button>
        </div>
      </div>
    );
  }

  const order = orderData.data;

  if (!order) {
    return <div>Order not found or loading...</div>;
  }

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'placed', label: 'Placed' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'canceled', label: 'Canceled' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            onClick={() => router.push('/admin/orders')} 
            variant="outline" 
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Order #{order?.orderId || order?._id?.slice(-8) || ""}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Placed on {order ? new Date(order.createdAt).toLocaleDateString() : ""}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {order && <OrderStatusBadge status={order.status} size="lg" />}
              
              {/* Status Update Dropdown */}
              <div className="flex items-center space-x-2">
                {order && (
                  <select
                    onChange={(e) => {
                      const newStatus = e.target.value;
                      if (newStatus && newStatus !== order.status) {
                        if (newStatus === 'canceled') {
                          const reason = prompt('Please provide a reason for cancellation:');
                          if (reason) {
                            handleStatusUpdate(newStatus, reason);
                          }
                        } else {
                          handleStatusUpdate(newStatus);
                        }
                      }
                    }}
                    value=""
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    disabled={updateOrderMutation.isPending}
                  >
                    <option value="">Update Status</option>
                    {statusOptions
                      .filter(option => option.value !== order.status)
                      .map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                  </select>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Timeline */}
            <OrderTimeline 
              status={order.status}
              createdAt={order.createdAt}
              updatedAt={order.updatedAt}
            />

            {/* Order Items */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center mb-6">
                <Package className="h-6 w-6 text-gray-600 dark:text-gray-400 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Order Items</h3>
              </div>
              
              <div className="space-y-4">
                {order.products?.map((item: any, index: number) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                      <Package className="h-8 w-8 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{item.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Quantity: {item.quantity} × ${item.unitPrice?.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        ${item.finalPrice?.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span className="text-gray-900 dark:text-white">Total Amount</span>
                  <span className="text-gray-900 dark:text-white">${order.finalPrice?.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Customer Information */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center mb-4">
                <User className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Customer</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {order.createdBy?.name || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {order.createdBy?.email || 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center mb-4">
                <MapPin className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Shipping Address</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {order.address || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {order.phone || 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center mb-4">
                <CreditCard className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Payment</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Method</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {order.paymentMethod === 'card' ? 'Credit/Debit Card' : 'Cash on Delivery'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    ${order.finalPrice?.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {/* Order Notes */}
            {order.note && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center mb-4">
                  <FileText className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Order Notes</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{order.note}</p>
              </div>
            )}

            {/* Rejection Reason */}
            {order.rejectedReason && (
              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800 p-6">
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-400 mb-2">
                  Cancellation Reason
                </h3>
                <p className="text-red-700 dark:text-red-300">{order.rejectedReason}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}