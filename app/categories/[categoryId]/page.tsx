'use client';

import React, { useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { categoriesAPI } from '@/lib/categories';
import { productsAPI, ProductFilters } from '@/lib/products';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductFilters as ProductFiltersComponent } from '@/components/products/ProductFilters';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ArrowLeft, Tag, Package } from 'lucide-react';
import Image from 'next/image';

export default function CategoryProductsPage() {
  const params = useParams();
  const router = useRouter();
  const categoryId = params.categoryId as string;
  
  const [filters, setFilters] = useState<ProductFilters>({
    categoryId: categoryId,
  });
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch category details
  const { data: categoryData, isLoading: categoryLoading, error: categoryError } = useQuery({
    queryKey: ['category', categoryId],
    queryFn: () => categoriesAPI.getCategory(categoryId),
    enabled: !!categoryId,
  });

  // Fetch products for this category
  const { data: productsData, isLoading: productsLoading, error: productsError } = useQuery({
    queryKey: ['products', filters, currentPage],
    queryFn: () => productsAPI.getProducts({ ...filters, page: currentPage }),
    enabled: !!categoryId,
  });

  // تحديث للتوافق مع structure الـ backend
  const category = categoryData?.data;
  const products = productsData?.data?.documents || [];
  const totalPages = productsData?.data?.pages || 1;
  const currentPageData = productsData?.data?.page || 1;

  const handleFiltersChange = useCallback((newFilters: ProductFilters) => {
    setFilters({ ...newFilters, categoryId: categoryId });
    setCurrentPage(1);
  }, [categoryId]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (categoryLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">جاري تحميل الفئة...</p>
        </div>
      </div>
    );
  }

  if (categoryError || !category) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Tag className="h-10 w-10 text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            الفئة غير موجودة
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            لم نتمكن من العثور على الفئة المطلوبة
          </p>
          <Button onClick={() => router.push('/categories')}>
            العودة للفئات
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back Button */}
        <Button 
          onClick={() => router.push('/categories')} 
          variant="outline" 
          className="mb-6 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          العودة للفئات
        </Button>

        {/* Category Header */}
        <div className="mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-6">
              {/* Category Image */}
              <div className="relative w-20 h-20 flex-shrink-0">
                <Image
                  src={category.logo.secure_url}
                  alt={category.name}
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
              
              {/* Category Info */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {category.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  استكشف جميع المنتجات في فئة {category.name}
                </p>
                <div className="flex items-center mt-2 space-x-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    الرمز: {category.slug}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    تاريخ الإنشاء: {new Date(category.createdAt).toLocaleDateString('ar-EG')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <Package className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">المنتجات</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                جميع المنتجات المتاحة في هذه الفئة
              </p>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
            <div className="flex lg:items-center lg:justify-between gap-4">
              {/* Stats */}
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600 dark:text-gray-400">عرض:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {productsLoading ? 'جاري التحميل...' : `${products.length} منتج`}
                  </span>
                </div>
                {totalPages > 1 && (
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600 dark:text-gray-400">الصفحة:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {currentPageData} من {totalPages}
                    </span>
                  </div>
                )}
              </div>

              {/* Filters */}
              <div className="flex items-center space-x-4">
                <ProductFiltersComponent 
                  filters={filters} 
                  onFiltersChange={handleFiltersChange} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Products Error State */}
        {productsError && (
          <div className="text-center py-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-red-200 dark:border-red-800 p-6 max-w-md mx-auto">
              <h3 className="text-lg font-bold text-red-600 dark:text-red-400 mb-2">خطأ</h3>
              <p className="text-red-600 dark:text-red-400 mb-4">حدث خطأ أثناء تحميل المنتجات</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                إعادة المحاولة
              </button>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {!productsError && (
          <div className="space-y-6">
            <ProductGrid products={products} isLoading={productsLoading} />
          </div>
        )}

        {/* Pagination */}
        {!productsLoading && !productsError && totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-12">
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPageData - 1)}
              disabled={currentPageData <= 1}
              size="sm"
              className="border-gray-300 dark:border-gray-600"
            >
              السابق
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
              التالي
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}