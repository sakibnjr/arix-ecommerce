'use client';

import { useState } from 'react';
import { sampleProducts } from '../data/sampleProducts';
import Header from './Header';
import Footer from './Footer';
import ProductCard from './ProductCard';
import Link from 'next/link';
import { HiChevronRight, HiAdjustments } from 'react-icons/hi';

export default function AnimeCategoryPage({ 
  animeName, 
  animeDisplayName, 
  description, 
  gradientColor = 'from-black to-gray-800',
  heroStats = {}
}) {
  const [sortBy, setSortBy] = useState('featured');
  const [filterBy, setFilterBy] = useState('all');

  // Filter products by anime name
  const animeProducts = sampleProducts.filter(product => 
    product.anime.toLowerCase() === animeName.toLowerCase()
  );

  // Apply additional filters
  let filteredProducts = animeProducts;
  if (filterBy === 'normal') {
    filteredProducts = animeProducts.filter(product => product.category === 'Normal T-Shirt');
  } else if (filterBy === 'drop-shoulder') {
    filteredProducts = animeProducts.filter(product => product.category === 'Drop Shoulder');
  }

  // Apply sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const defaultStats = {
    products: animeProducts.length,
    series: '1',
    status: 'Popular'
  };

  const stats = { ...defaultStats, ...heroStats };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link href="/" className="text-gray-500 hover:text-black transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <HiChevronRight className="w-5 h-5 text-gray-300" />
              </li>
              <li>
                <span className="text-gray-500">Anime</span>
              </li>
              <li>
                <HiChevronRight className="w-5 h-5 text-gray-300" />
              </li>
              <li>
                <span className="text-gray-900 font-medium">{animeDisplayName}</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className={`bg-gradient-to-r ${gradientColor} text-white py-12`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">{animeDisplayName}</h1>
        </div>
      </div>

      {/* Filters and Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <HiAdjustments className="w-5 h-5 text-gray-500" />
            <div className="flex items-center gap-2">
              <label htmlFor="filter" className="text-sm font-medium text-gray-700">Filter:</label>
              <select 
                id="filter"
                value={filterBy} 
                onChange={(e) => setFilterBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black bg-white text-gray-900"
              >
                <option value="all">All Products</option>
                <option value="normal">Normal T-Shirts</option>
                <option value="drop-shoulder">Drop Shoulder</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm font-medium text-gray-700">Sort by:</label>
            <select 
              id="sort"
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black bg-white text-gray-900"
            >
              <option value="featured">Featured</option>
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {sortedProducts.length} of {animeProducts.length} products
          </p>
        </div>

        {/* Products Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-500 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-6m-10 0H4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your filters to see more products.</p>
          </div>
        )}

        {/* Back to Categories */}
        <div className="mt-16 text-center">
          <Link 
            href="/" 
            className="inline-flex items-center bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            <HiChevronRight className="w-5 h-5 mr-2 rotate-180" />
            Explore More Anime
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
