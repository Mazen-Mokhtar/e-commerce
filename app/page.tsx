'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { productsAPI } from '@/lib/products';
import { categoriesAPI } from '@/lib/categories';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  const { t } = useLanguage();

  // Fetch featured products
  const { data: productsData, isLoading: productsLoading } = useQuery({
    queryKey: ['products', { page: 1 }],
    queryFn: () => productsAPI.getProducts({ page: 1 }),
  });

  // Fetch categories
  const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoriesAPI.getCategories(),
  });

  const products = productsData?.data?.documents || [];
  const categories = categoriesData?.data?.documents || [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('welcomeToShopHub')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              {t('amazingProductsUnbeatablePrices')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" variant="secondary">
                  {t('shopNow')}
                </Button>
              </Link>
              <Link href="/categories">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                  {t('browseCategories')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('shopByCategory')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('exploreWideRange')}
            </p>
          </div>

          {categoriesLoading ? (
            <LoadingSpinner size="lg" />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {categories.slice(0, 6).map((category: any) => (
                <Link
                  key={category._id}
                  href={`/products?categoryId=${category._id}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center">
                    <div className="relative w-16 h-16 mx-auto mb-4">
                      <Image
                        src={category.logo.secure_url}
                        alt={category.name}
                        fill
                        className="object-cover rounded-full group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Link href="/categories">
              <Button variant="outline">{t('viewAllCategories')}</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('featuredProducts')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('latestPopularItems')}
            </p>
          </div>

          <ProductGrid products={products.slice(0, 8)} isLoading={productsLoading} />

          <div className="text-center mt-8">
            <Link href="/products">
              <Button>{t('viewAllProducts')}</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('freeShipping')}</h3>
              <p className="text-gray-600">{t('freeShippingOver50')}</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('qualityGuarantee')}</h3>
              <p className="text-gray-600">{t('moneyBackGuarantee')}</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('support24')}</h3>
              <p className="text-gray-600">{t('roundClockSupport')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}