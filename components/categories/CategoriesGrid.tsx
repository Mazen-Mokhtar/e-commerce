'use client';

import React from 'react';
import { Category } from '@/lib/categories';
import { CategoryCard } from './CategoryCard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tag } from 'lucide-react';

interface CategoriesGridProps {
  categories: Category[];
  isLoading?: boolean;
}

export function CategoriesGrid({ categories, isLoading }: CategoriesGridProps) {
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <LoadingSpinner size="lg" />
        <p className="mt-3 text-gray-600 dark:text-gray-400 font-medium">{t('loading')}</p>
      </div>
    );
  }

  if (!categories.length) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <Tag className="h-10 w-10 text-gray-400 dark:text-gray-500" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {t('noCategories')}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
          {t('noCategoriesFound')}
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          {t('retry')}
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
      {categories.map((category) => (
        <CategoryCard key={category._id} category={category} />
      ))}
    </div>
  );
}