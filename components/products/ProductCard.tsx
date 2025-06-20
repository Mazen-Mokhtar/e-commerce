'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/products';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/Button';
import { ShoppingCart, Heart, Eye, Star } from 'lucide-react';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = useCallback(() => {
    if (!isAuthenticated) {
      toast.error(t('loginRequired'));
      return;
    }

    if (product.stock <= 0) {
      toast.error(t('outOfStock'));
      return;
    }

    addToCart({
      productId: product._id,
      quantity: 1,
    });
    
    toast.success(t('itemAddedToCart'));
  }, [isAuthenticated, product.stock, product._id, addToCart, t]);

  const handleWishlist = useCallback(() => {
    if (!isAuthenticated) {
      toast.error(t('loginRequired'));
      return;
    }
    setIsWishlisted(!isWishlisted);
  }, [isAuthenticated, isWishlisted, t]);

  const discountPercentage = product.discountPrecent;
  const hasDiscount = discountPercentage > 0;

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 h-full flex flex-col transform hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image.secure_url}
          alt={product.name}
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

        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            -{discountPercentage}%
          </div>
        )}

        {/* Stock Badge */}
        {product.stock <= 0 && (
          <div className="absolute top-3 right-3 bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
            {t('outOfStock')}
          </div>
        )}

        {/* Action Buttons Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex space-x-2">
            <button
              onClick={handleWishlist}
              className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
            >
              <Heart 
                className={`h-4 w-4 ${
                  isWishlisted 
                    ? 'text-red-500 fill-red-500' 
                    : 'text-gray-600 dark:text-gray-300'
                }`} 
              />
            </button>
            <Link href={`/products/${product._id}`}>
              <button className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200">
                <Eye className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              </button>
            </Link>
          </div>
        </div>

        {/* Out of Stock Overlay */}
        {product.stock <= 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <span className="text-white font-bold text-lg">{t('outOfStock')}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Product Name */}
        <Link href={`/products/${product._id}`}>
          <h3 className="font-bold text-gray-900 dark:text-white mb-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2 text-base min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 flex-1">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">(4.0)</span>
        </div>

        {/* Price and Stock */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              ${product.finalPrice.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                ${product.orginalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
            product.stock > 10 
              ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20' 
              : product.stock > 0 
                ? 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20'
                : 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20'
          }`}>
            {product.stock > 10 ? t('available') : product.stock > 0 ? `${product.stock}` : t('outOfStock')}
          </span>
        </div>

        {/* Colors and Sizes */}
        {(product.colors?.length > 0 || product.size?.length > 0) && (
          <div className="mb-4 space-y-2">
            {product.colors?.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">{t('colors')}:</span>
                <div className="flex space-x-1">
                  {product.colors.slice(0, 3).map((color, index) => (
                    <div
                      key={index}
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                  {product.colors.length > 3 && (
                    <span className="text-xs text-gray-500">+{product.colors.length - 3}</span>
                  )}
                </div>
              </div>
            )}
            
            {product.size?.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">{t('sizes')}:</span>
                <div className="flex space-x-1">
                  {product.size.slice(0, 3).map((size, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded"
                    >
                      {size.toUpperCase()}
                    </span>
                  ))}
                  {product.size.length > 3 && (
                    <span className="text-xs text-gray-500">+{product.size.length - 3}</span>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          className={`w-full font-semibold py-3 rounded-lg transition-all duration-200 mt-auto ${
            product.stock <= 0
              ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg transform hover:scale-105'
          }`}
          size="sm"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {product.stock <= 0 ? t('outOfStock') : t('addToCart')}
        </Button>
      </div>
    </div>
  );
}