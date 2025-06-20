'use client';

import React from 'react';
import { Product } from '@/lib/products';
import { Star, Shield, Truck, RotateCcw } from 'lucide-react';

interface ProductInfoProps {
  product: Product;
  selectedColor: string;
  selectedSize: string;
  onColorChange: (color: string) => void;
  onSizeChange: (size: string) => void;
}

export function ProductInfo({ 
  product, 
  selectedColor, 
  selectedSize, 
  onColorChange, 
  onSizeChange 
}: ProductInfoProps) {
  const hasDiscount = product.discountPrecent > 0;

  return (
    <div className="space-y-6">
      {/* Product Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {product.name}
        </h1>
        
        {/* Rating */}
        <div className="flex items-center space-x-2">
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
          <span className="text-sm text-gray-500 dark:text-gray-400">(4.0) • 24 reviews</span>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-center space-x-3">
        <span className="text-3xl font-bold text-gray-900 dark:text-white">
          ${product.finalPrice.toFixed(2)}
        </span>
        {hasDiscount && (
          <>
            <span className="text-xl text-gray-500 dark:text-gray-400 line-through">
              ${product.orginalPrice.toFixed(2)}
            </span>
            <span className="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-2 py-1 rounded-full text-sm font-medium">
              Save ${(product.orginalPrice - product.finalPrice).toFixed(2)}
            </span>
          </>
        )}
      </div>

      {/* Description */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Description</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Colors */}
      {product.colors && product.colors.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Colors</h3>
          <div className="flex space-x-3">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => onColorChange(color)}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  selectedColor === color
                    ? 'border-blue-500 scale-110'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                }`}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
          {selectedColor && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Selected: {selectedColor}
            </p>
          )}
        </div>
      )}

      {/* Sizes */}
      {product.size && product.size.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Size</h3>
          <div className="flex space-x-2">
            {product.size.map((size) => (
              <button
                key={size}
                onClick={() => onSizeChange(size)}
                className={`px-4 py-2 border rounded-lg font-medium transition-colors ${
                  selectedSize === size
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500'
                }`}
              >
                {size.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Features */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
              <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Quality Guarantee</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">30-day warranty</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
              <Truck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Free Shipping</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">On orders over $50</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
              <RotateCcw className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Easy Returns</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">14-day return policy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}