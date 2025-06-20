'use client';

import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminAPI } from '@/lib/admin';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  coupon?: any;
}

export function CouponModal({ isOpen, onClose, coupon }: CouponModalProps) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    type: 'percentage',
    value: '',
    minOrderAmount: '',
    maxDiscount: '',
    validFrom: '',
    validTo: '',
    usageLimit: '',
    isActive: true,
  });

  // Create/Update coupon mutation
  const couponMutation = useMutation({
    mutationFn: (data: any) => {
      if (coupon) {
        return adminAPI.updateCoupon(coupon._id, data);
      } else {
        return adminAPI.createCoupon(data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-coupons'] });
      toast.success(coupon ? 'Coupon updated successfully' : 'Coupon created successfully');
      onClose();
      resetForm();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to save coupon');
    },
  });

  useEffect(() => {
    if (coupon) {
      setFormData({
        code: coupon.code || '',
        name: coupon.name || '',
        type: coupon.type || 'percentage',
        value: coupon.value?.toString() || '',
        minOrderAmount: coupon.minOrderAmount?.toString() || '',
        maxDiscount: coupon.maxDiscount?.toString() || '',
        validFrom: coupon.validFrom ? new Date(coupon.validFrom).toISOString().split('T')[0] : '',
        validTo: coupon.validTo ? new Date(coupon.validTo).toISOString().split('T')[0] : '',
        usageLimit: coupon.usageLimit?.toString() || '',
        isActive: coupon.isActive ?? true,
      });
    } else {
      resetForm();
    }
  }, [coupon]);

  const resetForm = () => {
    setFormData({
      code: '',
      name: '',
      type: 'percentage',
      value: '',
      minOrderAmount: '',
      maxDiscount: '',
      validFrom: '',
      validTo: '',
      usageLimit: '',
      isActive: true,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitData = {
      ...formData,
      value: parseFloat(formData.value),
      minOrderAmount: parseFloat(formData.minOrderAmount),
      maxDiscount: parseFloat(formData.maxDiscount),
      usageLimit: parseInt(formData.usageLimit) || -1,
    };

    couponMutation.mutate(submitData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {coupon ? 'Edit Coupon' : 'Add New Coupon'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Coupon Code"
              name="code"
              value={formData.code}
              onChange={handleInputChange}
              required
              placeholder="SAVE20"
            />

            <Input
              label="Coupon Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="20% Off Discount"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Discount Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
              </select>
            </div>

            <Input
              label={formData.type === 'percentage' ? 'Percentage (%)' : 'Fixed Amount ($)'}
              name="value"
              type="number"
              step="0.01"
              value={formData.value}
              onChange={handleInputChange}
              required
            />

            <Input
              label="Minimum Order Amount ($)"
              name="minOrderAmount"
              type="number"
              step="0.01"
              value={formData.minOrderAmount}
              onChange={handleInputChange}
              required
            />

            <Input
              label="Maximum Discount ($)"
              name="maxDiscount"
              type="number"
              step="0.01"
              value={formData.maxDiscount}
              onChange={handleInputChange}
              required
            />

            <Input
              label="Valid From"
              name="validFrom"
              type="date"
              value={formData.validFrom}
              onChange={handleInputChange}
              required
            />

            <Input
              label="Valid To"
              name="validTo"
              type="date"
              value={formData.validTo}
              onChange={handleInputChange}
              required
            />

            <Input
              label="Usage Limit (-1 for unlimited)"
              name="usageLimit"
              type="number"
              value={formData.usageLimit}
              onChange={handleInputChange}
              placeholder="-1"
            />

            <div className="flex items-center">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900 dark:text-white">
                Active
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={couponMutation.isPending}
              className="bg-orange-600 hover:bg-orange-700"
            >
              {coupon ? 'Update Coupon' : 'Create Coupon'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}