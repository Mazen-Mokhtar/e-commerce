'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { productsAPI } from '@/lib/products';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Button } from '@/components/ui/Button';
import { ProductImageGallery } from '@/components/products/ProductImageGallery';
import { ProductInfo } from '@/components/products/ProductInfo';
import { ProductActions } from '@/components/products/ProductActions';
import { RelatedProducts } from '@/components/products/RelatedProducts';
import { ArrowLeft, Share2, Heart, ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.productId as string;
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Fetch product details
  const { data: productData, isLoading, error } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => productsAPI.getProduct(productId),
    enabled: !!productId,
  });

  const product = productData?.data;

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error(t('loginRequired'));
      return;
    }

    if (product.stock <= 0) {
      toast.error(t('outOfStock'));
      return;
    }

    if (selectedQuantity > product.stock) {
      toast.error(`Only ${product.stock} items available`);
      return;
    }

    addToCart({
      productId: product._id,
      quantity: selectedQuantity,
    });
    
    toast.success(t('itemAddedToCart'));
  };

  const handleWishlist = () => {
    if (!isAuthenticated) {
      toast.error(t('loginRequired'));
      return;
    }
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="h-10 w-10 text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Product Not Found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => router.push('/products')}>
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  const discountPercentage = product.discountPrecent;
  const hasDiscount = discountPercentage > 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back Button */}
        <Button 
          onClick={() => router.back()} 
          variant="outline" 
          className="mb-6 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>

        {/* Product Details */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
            {/* Product Images */}
            <div className="space-y-4">
              <ProductImageGallery 
                mainImage={product.image}
                gallery={product.gallery || []}
                productName={product.name}
              />
            </div>

            {/* Product Information */}
            <div className="space-y-6">
              {/* Header Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {hasDiscount && (
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      -{discountPercentage}% OFF
                    </span>
                  )}
                  {product.stock <= 0 && (
                    <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Out of Stock
                    </span>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleWishlist}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Heart 
                      className={`h-5 w-5 ${
                        isWishlisted 
                          ? 'text-red-500 fill-red-500' 
                          : 'text-gray-400 dark:text-gray-500'
                      }`} 
                    />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Share2 className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <ProductInfo 
                product={product}
                selectedColor={selectedColor}
                selectedSize={selectedSize}
                onColorChange={setSelectedColor}
                onSizeChange={setSelectedSize}
              />

              {/* Product Actions */}
              <ProductActions
                product={product}
                selectedQuantity={selectedQuantity}
                onQuantityChange={setSelectedQuantity}
                onAddToCart={handleAddToCart}
                isAuthenticated={isAuthenticated}
              />

              {/* Additional Info */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">SKU:</span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">
                      {product._id.slice(-8).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Stock:</span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">
                      {product.stock} units
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Category:</span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">
                      {product.categoryId?.name || 'Uncategorized'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Added:</span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <RelatedProducts 
            categoryId={product.categoryId?._id || product.categoryId}
            currentProductId={product._id}
          />
        </div>
      </div>
    </div>
  );
}