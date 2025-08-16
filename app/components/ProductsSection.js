'use client';

import Link from 'next/link';
import ProductCard from './ProductCard';
import { featuredProducts } from '../data/sampleProducts';
import { HiArrowRight, HiCheckCircle, HiClipboardList, HiTruck } from 'react-icons/hi';

export default function ProductsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-display-md md:text-display-lg text-gray-900 mb-6 leading-tight">
            Featured Products
          </h2>
        </div>

        {/* Featured Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link 
            href="/products" 
            className="bg-black text-white px-10 py-4 rounded-xl font-medium hover:bg-gray-800 transition-all duration-300 inline-flex items-center tracking-wide text-body-lg"
          >
            View All Products
            <HiArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>


      </div>
    </section>
  );
}
