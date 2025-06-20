'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { productsAPI } from '@/lib/products';
import { ProductCard } from './ProductCard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface RelatedProductsProps {
  categoryId: string;
  currentProductId: string;
}

export function RelatedProducts({ categoryId, currentProductId }: RelatedProductsProps) {
  const { data: productsData, isLoading } = useQuery({
    queryKey: ['related-products', categoryId],
    queryFn: () => productsAPI.getProducts({ 
      categoryId, 
      page: 1 
    }),
    enabled: !!categoryId,
  });

  const products = productsData?.data?.documents || [];
  const relatedProducts = products
    .filter(product => product._id !== currentProductId)
    .slice(0, 4);

  if (!categoryId || relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 lg:p-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Related Products
      </h2>
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}