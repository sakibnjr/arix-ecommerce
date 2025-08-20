'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AiFillStar, AiOutlineEye } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import { formatCategoryLabel } from '../utils/categoryFormatter';

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const { addToCart } = useCart();

  const {
    _id,
    id,
    name,
    price,
    originalPrice,
    images,
    anime,
    category,
    isNew = false,
    discount = null
  } = product;

  // Extract images for display (front as main, back as hover)
  const frontImage = images?.front;
  const backImage = images?.back;

  // Use _id from MongoDB or fallback to id for compatibility
  const productId = _id || id;

  // Don't render if no valid product ID
  if (!productId) {
    console.warn('ProductCard: Missing product ID', product);
    return null;
  }

  const unitPrice = Number(price) || 0;
  const originalPriceNum = typeof originalPrice === 'number' ? originalPrice : Number(originalPrice) || 0;
  const discountPercentage = originalPriceNum && unitPrice 
    ? Math.round(((originalPriceNum - unitPrice) / originalPriceNum) * 100)
    : (typeof discount === 'number' ? discount : Number(discount) || 0);
  const hasDiscount = Number(discountPercentage) > 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-300 overflow-hidden flex flex-col h-full w-full min-h-0 focus-within:ring-2 focus-within:ring-black/10"
    >
      {/* Clickable Link Area */}
      <Link href={`/product/${productId}`} className="block flex-1 w-full">
        {/* Image Container */}
        <div 
          className="relative aspect-square overflow-hidden bg-gray-100 w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Image */}
          <div className="relative w-full h-full">
            {frontImage ? (
              <img
                src={frontImage}
                alt={name}
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <AiFillStar className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2" />
                  <p className="text-xs sm:text-sm font-medium">{name}</p>
                </div>
              </div>
            )}
          </div>

          {/* Hover Image (back view if available) */}
          {backImage && (
            <div className={`absolute inset-0 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}>
              <img
                src={backImage}
                alt={`${name} - back view`}
                loading="lazy"
                className="w-full h-full object-cover object-center"
              />
            </div>
          )}

          {/* Badges */}
          {(isNew || hasDiscount) && (
            <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex items-center gap-2">
              {isNew && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-black text-white">
                  New
                </span>
              )}
              {hasDiscount && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-gray-900 text-white">
                  Sale
                </span>
              )}
            </div>
          )}

          {/* Quick Actions */}
          <div className={`absolute top-2 sm:top-3 right-2 sm:right-3 flex flex-col gap-1 sm:gap-2 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
          }`}>
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                router.push(`/product/${productId}`);
              }}
              className="bg-white p-1.5 sm:p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-black/20"
              title="Quick View"
              aria-label={`Open ${name}`}
            >
              <AiOutlineEye className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-3 sm:p-4">
          {/* Categories */}
          <div className="flex items-center gap-1 sm:gap-2 mb-2">
            <span className="text-[10px] sm:text-xs bg-black text-white px-2 py-1 rounded">
              {anime}
            </span>
            <span className="text-[10px] sm:text-xs bg-gray-200 text-black px-2 py-1 rounded">
              {formatCategoryLabel(category)}
            </span>
          </div>

          {/* Product Name */}
          <h3 className="font-display text-base sm:text-lg md:text-xl text-gray-900 mb-2 sm:mb-3 group-hover:text-black transition-colors duration-300 leading-tight line-clamp-2" title={name}>
            {name}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <span className="text-base sm:text-lg font-extrabold text-gray-900 tracking-wide">
              ৳{unitPrice.toFixed(2)}
            </span>
            {originalPriceNum > 0 && (
              <span className="text-xs sm:text-sm text-gray-500 line-through">
                ৳{originalPriceNum.toFixed(2)}
              </span>
            )}
            {hasDiscount && (
              <span className="ml-1 inline-flex items-center px-1.5 py-0.5 rounded bg-gray-100 text-gray-800 text-[10px] font-semibold">
                -{discountPercentage}%
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Interactive Elements (Outside Link) */}
      <div className="px-4 sm:px-6 pb-4 sm:pb-6 mt-auto">
        {/* Add to Cart Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            const defaultSize = (product.sizes && product.sizes[0]) || 'M';
            addToCart(product, defaultSize, 1);
            toast.success(`Added 1 × ${name} (${defaultSize}) to cart`);
          }}
          aria-label={`Add ${name} to cart`}
          className="w-full bg-black text-white py-2.5 sm:py-3 px-4 sm:px-5 rounded-xl font-medium hover:bg-gray-800 transition-all duration-200 tracking-wide text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-black/20"
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}