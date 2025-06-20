'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { categoriesAPI } from '@/lib/categories';
import { ProductFilters as ProductFiltersType } from '@/lib/products';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Filter, X, Search, Tag, DollarSign, SortAsc, RefreshCw } from 'lucide-react';

interface ProductFiltersProps {
  filters: ProductFiltersType;
  onFiltersChange: (filters: ProductFiltersType) => void;
}

export function ProductFilters({ filters, onFiltersChange }: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<ProductFiltersType>(filters);
  const { t, isRTL } = useLanguage();

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoriesAPI.getCategories(),
    staleTime: 30 * 60 * 1000, // 30 minutes
    cacheTime: 60 * 60 * 1000, // 1 hour
  });

  const categories = categoriesData?.data?.documents || [];

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleFilterChange = useCallback((key: keyof ProductFiltersType, value: any) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value || undefined,
    }));
  }, []);

  const applyFilters = useCallback(() => {
    onFiltersChange(localFilters);
    setIsOpen(false);
  }, [localFilters, onFiltersChange]);

  const clearFilters = useCallback(() => {
    const clearedFilters = {};
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  }, [onFiltersChange]);

  const hasActiveFilters = Object.values(filters).some(value => value !== undefined && value !== '');
  const activeFiltersCount = Object.values(filters).filter(v => v !== undefined && v !== '').length;

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
      >
        <Filter className="h-4 w-4" />
        <span>{t('filters')}</span>
        {hasActiveFilters && (
          <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1 font-medium">
            {activeFiltersCount}
          </span>
        )}
      </Button>

      {isOpen && (
        <>
          {/* Overlay with blur */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40 transition-opacity duration-300"
            onClick={() => setIsOpen(false)}
          />
          {/* Sidebar Drawer */}
          <div className={`fixed top-0 bottom-0 h-full w-[20rem] max-w-full bg-white dark:bg-gray-800 shadow-2xl border border-gray-200 dark:border-gray-700 p-6 z-50 overflow-y-auto flex flex-col transition-transform duration-300 ${isRTL ? 'right-0 rounded-l-lg' : 'left-0 rounded-r-lg'} animate-slide-in`}> 
            {/* Floating Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-full p-2 shadow-md transition-colors`}
              style={{ zIndex: 60 }}
              aria-label={t('close')}
            >
              <X className="h-5 w-5" />
            </button>
            {/* Header */}
            <div className="flex items-center gap-2 mb-6 mt-2">
              <Filter className="h-5 w-5 text-blue-600" />
              <h3 className="font-bold text-xl text-gray-900 dark:text-white">{t('filters')}</h3>
            </div>

            <div className="space-y-4">
              {/* Search */}
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Search className="h-4 w-4 text-blue-600" />
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('searchProducts')}
                  </label>
                </div>
                <Input
                  placeholder={t('enterProductName')}
                  value={localFilters.name || ''}
                  onChange={(e) => handleFilterChange('name', e.target.value)}
                  className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                />
              </div>

              {/* Category */}
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Tag className="h-4 w-4 text-green-600" />
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('category')}
                  </label>
                </div>
                <select
                  value={localFilters.categoryId || ''}
                  onChange={(e) => handleFilterChange('categoryId', e.target.value)}
                  className="block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white"
                >
                  <option value="">{t('allCategories')}</option>
                  {categories.map((category: any) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price range */}
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSign className="h-4 w-4 text-yellow-600" />
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('priceRange')}
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    type="number"
                    placeholder={t('minPrice')}
                    value={localFilters.minPrice || ''}
                    onChange={(e) => handleFilterChange('minPrice', parseInt(e.target.value) || undefined)}
                    className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  />
                  <Input
                    type="number"
                    placeholder={t('maxPrice')}
                    value={localFilters.maxPrice || ''}
                    onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value) || undefined)}
                    className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  />
                </div>
              </div>

              {/* Sort */}
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <SortAsc className="h-4 w-4 text-purple-600" />
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('sortBy')}
                  </label>
                </div>
                <select
                  value={localFilters.sort || ''}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                  className="block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white"
                >
                  <option value="">{t('default')}</option>
                  <option value="name">{t('nameAZ')}</option>
                  <option value="-name">{t('nameZA')}</option>
                  <option value="finalPrice">{t('priceLowHigh')}</option>
                  <option value="-finalPrice">{t('priceHighLow')}</option>
                  <option value="-createdAt">{t('newestFirst')}</option>
                  <option value="createdAt">{t('oldestFirst')}</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 mt-6">
              <Button 
                onClick={applyFilters} 
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                {t('applyFilters')}
              </Button>
              <Button 
                variant="outline" 
                onClick={clearFilters}
                className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>

            {/* Active Filters Summary */}
            {hasActiveFilters && (
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-800 dark:text-blue-200 font-medium mb-2">
                  {t('activeFilters')} ({activeFiltersCount}):
                </p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(filters).map(([key, value]) => {
                    if (value === undefined || value === '') return null;
                    
                    let displayValue = value;
                    if (key === 'categoryId') {
                      const category = categories.find((c: any) => c._id === value);
                      displayValue = category?.name || value;
                    }
                    
                    return (
                      <span 
                        key={key}
                        className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full"
                      >
                        {key === 'name' ? t('searchProducts') : 
                         key === 'categoryId' ? t('category') : 
                         key === 'minPrice' ? t('minPrice') :
                         key === 'maxPrice' ? t('maxPrice') :
                         key === 'sort' ? t('sortBy') : key}: {displayValue}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}