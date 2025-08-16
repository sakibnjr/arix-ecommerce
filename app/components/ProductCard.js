'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AiFillStar, AiOutlineEye } from 'react-icons/ai';
import { motion } from 'framer-motion';

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);

  const {
    id,
    name,
    price,
    originalPrice,
    image,
    hoverImage,
    anime,
    category,
    isNew = false,
    discount = null
  } = product;

  const discountPercentage = originalPrice && price 
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : discount;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col h-full"
    >
      {/* Clickable Link Area */}
      <Link href={`/product/${id}`} className="block flex-1">
        {/* Image Container */}
        <div 
          className="relative aspect-square overflow-hidden bg-gray-100"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Image */}
          <div className="relative w-full h-full">
            <div className="w-full h-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <AiFillStar className="w-16 h-16 mx-auto mb-2" />
                <p className="text-sm font-medium">{name}</p>
              </div>
            </div>
          </div>

          {/* Hover Image (if available) */}
          {hoverImage && (
            <div className={`absolute inset-0 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-purple-100 flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <AiFillStar className="w-16 h-16 mx-auto mb-2" />
                  <p className="text-sm font-medium">Back View</p>
                </div>
              </div>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isNew && (
              <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                NEW
              </span>
            )}
            {discountPercentage && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                SALE
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
          }`}>
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Quick view logic - could open product details in modal
                window.location.href = `/product/${id}`;
              }}
              className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors"
              title="Quick View"
            >
              <AiOutlineEye className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Categories */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs bg-black text-white px-2 py-1 rounded">
              {anime}
            </span>
            <span className="text-xs bg-gray-200 text-black px-2 py-1 rounded">
              {category}
            </span>
          </div>

          {/* Product Name */}
          <h3 className="font-display text-heading-md text-gray-900 mb-3 group-hover:text-black transition-colors duration-300 leading-tight">
            {name}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-body-lg font-bold text-gray-900 tracking-wide">
              ৳{price.toFixed(2)}
            </span>
            {originalPrice && (
              <span className="text-body-sm text-gray-500 line-through">
                ৳{originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Interactive Elements (Outside Link) */}
      <div className="px-6 pb-6 mt-auto">
        {/* Add to Cart Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // Redirect to product detail page for size selection
            window.location.href = `/product/${id}`;
          }}
          className="w-full bg-black text-white py-3 px-5 rounded-xl font-medium hover:bg-gray-800 transition-all duration-300 tracking-wide text-body-sm"
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}