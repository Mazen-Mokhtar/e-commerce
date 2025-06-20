'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Category } from '@/lib/categories';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft, Package } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const { t } = useLanguage();

  return (
    <Link href={`/categories/${category._id}`}>
      <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 h-full flex flex-col transform hover:-translate-y-2 cursor-pointer">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={category.logo.secure_url}
            alt={category.name}
            fill
            className={`object-cover transition-transform duration-300 group-hover:scale-110 ${
              isImageLoading ? 'blur-sm' : 'blur-0'
            }`}
            onLoad={() => setIsImageLoading(false)}
            priority={false}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          
          {/* Loading Overlay */}
          {isImageLoading && (
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-200">
              <Package className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Category Name */}
          <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-center">
            {category.name}
          </h3>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-1 text-center">
            {t('allProductsInCategory')} {category.name}
          </p>

          {/* Action Button */}
          <div className="flex items-center justify-center mt-auto">
            <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
              <span className="ml-2">{t('viewProducts')}</span>
              <ArrowLeft className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-200" />
            </div>
          </div>
        </div>

        {/* Bottom Border Animation */}
        <div className="h-1 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
      </div>
    </Link>
  );
}