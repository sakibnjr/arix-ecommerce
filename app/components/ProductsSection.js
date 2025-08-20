'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { HiArrowRight } from 'react-icons/hi';
import { motion } from 'framer-motion';

export default function ProductsSection() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/products`);
        const data = await res.json();
        
        if (active) {
          const products = data.items || [];
          setItems(products.slice(0, 4));
        }
      } catch (err) {
        if (active) {
          setItems([]);
        }
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  return (
    <section className="relative py-8 sm:py-12 lg:py-16 bg-white overflow-hidden">
      {/* Sophisticated Background Elements */}
      <div className="absolute inset-0">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-50/30" />
        
        {/* Geometric accent elements */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-br from-black/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-black/5 to-transparent rounded-full blur-3xl" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          {/* Subtle accent line */}
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="w-6 h-px bg-black/20" />
            <span className="text-xs font-medium text-black/60 tracking-widest uppercase">Featured</span>
            <div className="w-6 h-px bg-black/20" />
          </div>
          
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 leading-tight">
            Curated Collection
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Handpicked pieces that blend contemporary style with timeless appeal
          </p>
        </motion.div>

        {/* Enhanced Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-8 mb-12">
          {loading ? (
            // Enhanced Skeleton Loaders
            Array.from({ length: 4 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 h-72 sm:h-80 shadow-sm border border-gray-100">
                  {/* Animated shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                  
                  {/* Placeholder content */}
                  <div className="absolute inset-0 flex flex-col justify-between p-5">
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-200 rounded-full w-3/4" />
                      <div className="h-3 bg-gray-200 rounded-full w-1/2" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-6 bg-gray-200 rounded-lg w-1/3" />
                      <div className="h-4 bg-gray-200 rounded-full w-1/2" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : items.length > 0 ? (
            // Enhanced Product Cards
            items.map((product, index) => (
              <motion.div
                key={product._id || product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <ProductCard product={product} />
              </motion.div>
            ))
          ) : (
            // Enhanced Empty State
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="col-span-full text-center py-12"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gray-100 rounded-full mb-4">
                <svg className="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Products Available</h3>
              <p className="text-gray-600 max-w-md mx-auto text-sm">
                We're currently updating our collection. Check back soon for new arrivals.
              </p>
            </motion.div>
          )}
        </div>

        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          {/* Decorative elements */}
          <div className="relative inline-flex items-center">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent w-full h-px" />
            
            <Link
              href="/products"
              className="relative bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-gray-900 transition-all duration-300 inline-flex items-center tracking-wide text-base shadow-lg hover:shadow-xl hover:scale-105 transform group"
            >
              <span className="mr-2">Explore Collection</span>
              <HiArrowRight className="w-4 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          
        </motion.div>
      </div>

      {/* Custom CSS for shimmer animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}
