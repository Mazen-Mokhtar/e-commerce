'use client';

import React from 'react';
import { Product } from '@/lib/products';
import { Button } from '@/components/ui/Button';
import { ShoppingCart, Minus, Plus } from 'lucide-react';

interface ProductActionsProps {
  product: Product;
  selectedQuantity: number;
  onQuantityChange: (quantity: number) => void;
  onAddToCart: () => void;
  isAuthenticated: boolean;
}

export function ProductActions({ 
  product, 
  selectedQuantity, 
  onQuantityChange, 
  onAddToCart,
  isAuthenticated 
}: ProductActionsProps) {
  const isOutOfStock = product.stock <= 0;
  const maxQuantity = Math.min(product.stock, 10); // Limit to 10 or stock, whichever is lower

  const decreaseQuantity = () => {
    if (selectedQuantity > 1) {
      onQuantityChange(selectedQuantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (selectedQuantity < maxQuantity) {
      onQuantityChange(selectedQuantity + 1);
    }
  };

  return (
    <div className="space-y-4">
      {/* Stock Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">Availability:</span>
          <span className={`text-sm font-medium ${
            isOutOfStock 
              ? 'text-red-600 dark:text-red-400' 
              : product.stock <= 5 
                ? 'text-orange-600 dark:text-orange-400'
                : 'text-green-600 dark:text-green-400'
          }`}>
            {isOutOfStock 
              ? 'Out of Stock' 
              : product.stock <= 5 
                ? `Only ${product.stock} left!`
                : 'In Stock'
            }
          </span>
        </div>
      </div>

      {/* Quantity Selector */}
      {!isOutOfStock && (
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Quantity:</span>
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
            <button
              onClick={decreaseQuantity}
              disabled={selectedQuantity <= 1}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="px-4 py-2 font-medium text-gray-900 dark:text-white min-w-[3rem] text-center">
              {selectedQuantity}
            </span>
            <button
              onClick={increaseQuantity}
              disabled={selectedQuantity >= maxQuantity}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            (Max: {maxQuantity})
          </span>
        </div>
      )}

      {/* Add to Cart Button */}
      <div className="space-y-3">
        <Button
          onClick={onAddToCart}
          disabled={isOutOfStock || !isAuthenticated}
          className={`w-full py-4 text-lg font-semibold rounded-xl transition-all duration-200 ${
            isOutOfStock || !isAuthenticated
              ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg transform hover:scale-105'
          }`}
          size="lg"
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          {isOutOfStock 
            ? 'Out of Stock' 
            : !isAuthenticated 
              ? 'Login to Add to Cart'
              : `Add to Cart - $${(product.finalPrice * selectedQuantity).toFixed(2)}`
          }
        </Button>

        {!isAuthenticated && (
          <p className="text-sm text-center text-gray-500 dark:text-gray-400">
            Please <a href="/auth/login" className="text-blue-600 dark:text-blue-400 hover:underline">login</a> to add items to your cart
          </p>
        )}
      </div>

      {/* Quick Info */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500 dark:text-gray-400">Total Price:</span>
            <span className="ml-2 font-bold text-lg text-gray-900 dark:text-white">
              ${(product.finalPrice * selectedQuantity).toFixed(2)}
            </span>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Per Item:</span>
            <span className="ml-2 font-medium text-gray-900 dark:text-white">
              ${product.finalPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}