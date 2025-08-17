'use client';

import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import Link from 'next/link';
import { sampleProducts } from '../data/sampleProducts';
import { HiChevronRight, HiFilter, HiX } from 'react-icons/hi';

export default function AllProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAnime, setSelectedAnime] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle URL parameters for direct category access
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const categoryParam = urlParams.get('category');
      const searchParam = urlParams.get('search');
      
      if (categoryParam) {
        setSelectedCategory(categoryParam);
      }
      if (searchParam) {
        setSearchQuery(searchParam);
      }
    }
  }, []);

  // Get unique categories and anime series
  const categories = [...new Set(sampleProducts.map(p => p.category))];
  const animeList = [...new Set(sampleProducts.map(p => p.anime))];

  // Filter products
  const filteredProducts = sampleProducts.filter(product => {
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    const animeMatch = selectedAnime === 'all' || product.anime === selectedAnime;
    const searchMatch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.anime.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && animeMatch && searchMatch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'anime':
        return a.anime.localeCompare(b.anime);
      default:
        return 0;
    }
  });

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedAnime('all');
    setSortBy('name');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-white">
      
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
                <span className="text-gray-900 font-medium">All Products</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Products</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our complete collection of premium anime t-shirts featuring your favorite characters and series.
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 p-4 bg-gray-50 rounded-xl">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg font-medium"
            >
              <HiFilter className="w-4 h-4" />
              Filters
            </button>
          </div>

          {/* Desktop Filters */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search removed: search is available from Header */}
              
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:border-transparent bg-white text-gray-900"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Anime Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Anime Series</label>
                <select
                  value={selectedAnime}
                  onChange={(e) => setSelectedAnime(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:border-transparent bg-white text-gray-900"
                >
                  <option value="all">All Anime</option>
                  {animeList.map(anime => (
                    <option key={anime} value={anime}>{anime}</option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              {(selectedCategory !== 'all' || selectedAnime !== 'all' || searchQuery) && (
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1 text-sm text-gray-500 hover:text-black transition-colors"
                  >
                    <HiX className="w-4 h-4" />
                    Clear
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort by</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:border-transparent bg-white text-gray-900"
            >
              <option value="name">Name A-Z</option>
              <option value="anime">Anime A-Z</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {sortedProducts.length} of {sampleProducts.length} products
            {searchQuery && ` matching "${searchQuery}"`}
            {selectedCategory !== 'all' && ` in ${selectedCategory}`}
            {selectedAnime !== 'all' && ` from ${selectedAnime}`}
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchQuery ? `No products found for "${searchQuery}"` : 'No products found'}
            </h3>
            <p className="text-gray-500 mb-4">
              {searchQuery 
                ? 'Try different keywords or adjust your filters to see more products.'
                : 'Try adjusting your filters to see more products.'
              }
            </p>
            <button
              onClick={clearFilters}
              className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}


      </div>
      
    </div>
  );
}
