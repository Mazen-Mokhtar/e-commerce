'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminAPI } from '@/lib/admin';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Button } from '@/components/ui/Button';
import { CouponsTable } from '@/components/admin/CouponsTable';
import { CouponModal } from '@/components/admin/CouponModal';
import { 
  Ticket, 
  Plus, 
  Search, 
  Filter
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminCouponsPage() {
  const { isAuthenticated, isAdmin } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Redirect if not admin
  React.useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      router.push('/');
    }
  }, [isAuthenticated, isAdmin, router]);

  // Fetch coupons
  const { data: couponsData, isLoading } = useQuery({
    queryKey: ['admin-coupons', currentPage, searchTerm, typeFilter],
    queryFn: () => adminAPI.getCoupons({ 
      page: currentPage, 
      code: searchTerm || undefined,
      type: typeFilter || undefined
    }),
    enabled: isAuthenticated && isAdmin,
  });

  // Delete coupon mutation
  const deleteCouponMutation = useMutation({
    mutationFn: adminAPI.deleteCoupon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-coupons'] });
      toast.success('Coupon deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete coupon');
    },
  });

  const handleEdit = (coupon: any) => {
    setEditingCoupon(coupon);
    setIsModalOpen(true);
  };

  const handleDelete = async (couponId: string) => {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      deleteCouponMutation.mutate(couponId);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingCoupon(null);
  };

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  const coupons = couponsData?.data?.documents || [];
  const totalPages = couponsData?.data?.pages || 1;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg flex items-center justify-center">
                <Ticket className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Coupons Management
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Create and manage discount coupons
                </p>
              </div>
            </div>
            
            <Button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700"
            >
              <Plus className="h-4 w-4" />
              <span>Add Coupon</span>
            </Button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search coupons..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">All Types</option>
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
              </select>
            </div>
            
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing {coupons.length} coupons
            </div>
          </div>
        </div>

        {/* Coupons Table */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <CouponsTable
            coupons={coupons}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isDeleting={deleteCouponMutation.isPending}
          />
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage <= 1}
            >
              Previous
            </Button>
            
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Page {currentPage} of {totalPages}
            </span>
            
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage >= totalPages}
            >
              Next
            </Button>
          </div>
        )}

        {/* Coupon Modal */}
        <CouponModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          coupon={editingCoupon}
        />
      </div>
    </div>
  );
}