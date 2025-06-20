'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { categoriesAPI } from '@/lib/categories';
import { CategoriesGrid } from '@/components/categories/CategoriesGrid';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tag, Sparkles } from 'lucide-react';

export default function CategoriesPage() {
  const { t } = useLanguage();
  
  const { data: categoriesData, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoriesAPI.getCategories(),
    staleTime: 15 * 60 * 1000, // 15 minutes
    cacheTime: 60 * 60 * 1000, // 1 hour
  });

  // تحديث للتوافق مع structure الـ backend
  const categories = categoriesData?.data || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <Tag className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('categories')}</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {t('exploreCategories')}
              </p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-gray-600 dark:text-gray-400">{t('showing')}:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {isLoading ? t('loading') : `${categories.length} ${t('category')}`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-red-200 dark:border-red-800 p-6 max-w-md mx-auto">
              <h3 className="text-lg font-bold text-red-600 dark:text-red-400 mb-2">{t('error')}</h3>
              <p className="text-red-600 dark:text-red-400 mb-4">{t('error')}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                {t('retry')}
              </button>
            </div>
          </div>
        )}

        {/* Categories Grid */}
        {!error && (
          <CategoriesGrid categories={categories} isLoading={isLoading} />
        )}
      </div>
    </div>
  );
}