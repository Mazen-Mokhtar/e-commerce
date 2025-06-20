'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { productsAPI, ProductFilters } from '@/lib/products';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductFilters as ProductFiltersComponent } from '@/components/products/ProductFilters';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { ShoppingBag, Sparkles, Grid, List } from 'lucide-react';

export default function ProductsPage() {
  const [filters, setFilters] = useState<ProductFilters>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { t } = useLanguage();

  const { data, isLoading, error } = useQuery({
    queryKey: ['products', filters, currentPage],
    queryFn: () => productsAPI.getProducts({ ...filters, page: currentPage }),
    staleTime: 15 * 60 * 1000, // 15 minutes
    cacheTime: 60 * 60 * 1000, // 1 hour
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const products = data?.data?.documents || [];
  const totalPages = data?.data?.pages || 1;
  const currentPageData = data?.data?.page || 1;

  // Memoize expensive calculations
  const hasActiveFilters = useMemo(() =>
    Object.values(filters).some(value => value !== undefined && value !== ''),
    [filters]
  );

  // Show welcome message for newly logged in users
  useEffect(() => {
    if (isAuthenticated && user) {
      const lastLoginTime = localStorage.getItem('lastLoginTime');
      const currentTime = Date.now();

      if (!lastLoginTime || (currentTime - parseInt(lastLoginTime)) > 300000) {
        setShowWelcomeMessage(true);
        localStorage.setItem('lastLoginTime', currentTime.toString());

        setTimeout(() => {
          setShowWelcomeMessage(false);
        }, 3000);
      }
    }
  }, [isAuthenticated, user]);

  const handleFiltersChange = useCallback((newFilters: ProductFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Welcome Message */}
        {showWelcomeMessage && isAuthenticated && (
          <div className="mb-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-center">
              <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-3" />
              <span className="text-sm text-blue-800 dark:text-blue-200">
                {t('welcome')} {user?.name ? String(user.name) : t('welcome')}! {t('enjoyBrowsing')}
              </span>
              <button
                onClick={() => setShowWelcomeMessage(false)}
                className="ml-auto text-blue-600 dark:text-blue-400 hover:text-blue-800 p-1 rounded hover:bg-blue-100 dark:hover:bg-blue-900/20"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <ShoppingBag className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('products')}</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {t('discoverProducts')}
              </p>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex lg:items-center lg:justify-between gap-4">
              {/* Stats */}
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600 dark:text-gray-400">{t('showing')}:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {data?.data?.documents ? `${products.length} ${t('product')}` : t('loading')}
                  </span>
                </div>
                {totalPages > 1 && (
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600 dark:text-gray-400">{t('page')}:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {currentPageData} {t('of')} {totalPages}
                    </span>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="flex items-center space-x-4">
                {/* Filters */}
                <ProductFiltersComponent filters={filters} onFiltersChange={handleFiltersChange} />
              </div>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-red-200 dark:border-red-800 p-6 max-w-md mx-auto">
              <h3 className="text-lg font-bold text-red-600 dark:text-red-400 mb-2">{t('error')}</h3>
              <div className="flex gap-2 justify-center">
                <Button
                  onClick={() => window.location.reload()}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  {t('retry')}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {!error && (
          <div className='space-y-6'>
            <ProductGrid products={products} isLoading={isLoading} />
          </div>
        )}

        {/* Pagination */}
        {!error && totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-12">
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPageData - 1)}
              disabled={currentPageData <= 1}
              size="sm"
              className="border-gray-300 dark:border-gray-600"
            >
              {t('previous')}
            </Button>

            <div className="flex space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNumber;
                if (totalPages <= 5) {
                  pageNumber = i + 1;
                } else if (currentPageData <= 3) {
                  pageNumber = i + 1;
                } else if (currentPageData >= totalPages - 2) {
                  pageNumber = totalPages - 4 + i;
                } else {
                  pageNumber = currentPageData - 2 + i;
                }

                return (
                  <Button
                    key={pageNumber}
                    variant={currentPageData === pageNumber ? 'primary' : 'outline'}
                    onClick={() => handlePageChange(pageNumber)}
                    size="sm"
                    className={currentPageData === pageNumber
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'border-gray-300 dark:border-gray-600'
                    }
                  >
                    {pageNumber}
                  </Button>
                );
              })}
            </div>

            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPageData + 1)}
              disabled={currentPageData >= totalPages}
              size="sm"
              className="border-gray-300 dark:border-gray-600"
            >
              {t('next')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}