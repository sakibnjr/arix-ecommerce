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

  const discountPercentage = originalPrice && price 
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : discount;
  const hasDiscount = Number(discountPercentage) > 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col h-full w-full min-h-0"
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
                className="w-full h-full object-cover object-center"
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
                className="w-full h-full object-cover object-center"
              />
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-col gap-1 sm:gap-2">
            {isNew && (
              <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                NEW
              </span>
            )}
            {hasDiscount && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                SALE
              </span>
            )}
          </div>

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
              className="bg-white p-1.5 sm:p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors"
              title="Quick View"
            >
              <AiOutlineEye className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-3 sm:p-4">
          {/* Categories */}
          <div className="flex items-center gap-1 sm:gap-2 mb-2">
            <span className="text-xs bg-black text-white px-2 py-1 rounded">
              {anime}
            </span>
            <span className="text-xs bg-gray-200 text-black px-2 py-1 rounded">
              {formatCategoryLabel(category)}
            </span>
          </div>

          {/* Product Name */}
          <h3 className="font-display text-sm sm:text-heading-md text-gray-900 mb-2 sm:mb-3 group-hover:text-black transition-colors duration-300 leading-tight">
            {name}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <span className="text-sm sm:text-body-lg font-bold text-gray-900 tracking-wide">
              ৳{price.toFixed(2)}
            </span>
            {originalPrice && (
              <span className="text-xs sm:text-body-sm text-gray-500 line-through">
                ৳{originalPrice.toFixed(2)}
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
          className="w-full bg-black text-white py-2.5 sm:py-3 px-4 sm:px-5 rounded-xl font-medium hover:bg-gray-800 transition-all duration-300 tracking-wide text-sm sm:text-body-sm"
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}