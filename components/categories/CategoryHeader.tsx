'use client';

import React from 'react';
import Image from 'next/image';
import { Category } from '@/lib/categories';
import { Tag, Package } from 'lucide-react';

interface CategoryHeaderProps {
  category: Category;
  productCount?: number;
}

export function CategoryHeader({ category, productCount }: CategoryHeaderProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 mb-8">
      <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
        {/* Category Image */}
        <div className="relative w-32 h-32 flex-shrink-0">
          <Image
            src={category.logo.secure_url}
            alt={category.name}
            fill
            className="object-cover rounded-2xl shadow-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
        </div>
        
        {/* Category Info */}
        <div className="flex-1 text-center md:text-right">
          <div className="flex items-center justify-center md:justify-start mb-3">
            <Tag className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
              فئة المنتجات
            </span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {category.name}
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            استكشف جميع المنتجات المتاحة في فئة {category.name} واعثر على ما تحتاجه
          </p>
          
          {/* Stats */}
          <div className="flex items-center justify-center md:justify-start space-x-6">
            <div className="flex items-center space-x-2">
              <Package className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {productCount !== undefined ? `${productCount} منتج` : 'جاري التحميل...'}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                متاح الآن
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}