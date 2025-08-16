'use client';

import Link from 'next/link';
import { useState } from 'react';
import { HiSearch, HiShoppingCart, HiMenu, HiX } from 'react-icons/hi';
import { useCart } from '../context/CartContext';
import { sampleProducts } from '../data/sampleProducts';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setSearchQuery('');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Redirect to products page with search query
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const filteredProducts = searchQuery.trim() 
    ? sampleProducts.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.anime.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Debug: Log filtered products
  if (searchQuery.trim()) {
    console.log('Search Query:', searchQuery);
    console.log('Filtered Products:', filteredProducts);
    console.log('Filtered Products Length:', filteredProducts.length);
  }

  return (
    <header className="bg-black shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="font-display text-display-md text-white hover:text-gray-300 transition-colors duration-300">
              ARIX
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10">
            <Link href="/" className="text-body-lg text-gray-300 hover:text-white transition-colors duration-300 font-medium tracking-wide">
              Home
            </Link>
            <Link href="/new-arrivals" className="text-body-lg text-gray-300 hover:text-white transition-colors duration-300 font-medium tracking-wide">
              New Arrivals
            </Link>
            <Link href="/on-sale" className="text-body-lg text-gray-300 hover:text-white transition-colors duration-300 font-medium tracking-wide">
              On Sale
            </Link>
          </nav>

          {/* Cart and User Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={toggleSearch}
              className="p-3 text-gray-300 hover:text-white transition-colors duration-300"
            >
              <HiSearch className="w-6 h-6" />
            </button>
            <Link href="/cart" className="p-3 text-gray-300 hover:text-white transition-colors duration-300 relative">
              <HiShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-black text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold tracking-wide">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-300 hover:text-white transition-colors duration-300"
            >
              {isMenuOpen ? (
                <HiX className="w-6 h-6" />
              ) : (
                <HiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden"
            >
              <div className="px-4 pt-4 pb-6 space-y-2 sm:px-6 bg-black border-t border-gray-700">
                <Link href="/" className="block px-4 py-3 text-body-lg text-gray-300 hover:text-white transition-colors duration-300 tracking-wide">
                  Home
                </Link>
                <Link href="/new-arrivals" className="block px-4 py-3 text-body-lg text-gray-300 hover:text-white transition-colors duration-300 tracking-wide">
                  New Arrivals
                </Link>
                <Link href="/on-sale" className="block px-4 py-3 text-body-lg text-gray-300 hover:text-white transition-colors duration-300 tracking-wide">
                  On Sale
                </Link>
                <div className="flex items-center space-x-6 px-4 py-4 border-t border-gray-700 mt-2">
                  <button 
                    onClick={toggleSearch}
                    className="p-3 text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    <HiSearch className="w-6 h-6" />
                  </button>
                  <Link href="/cart" className="p-3 text-gray-300 hover:text-white transition-colors duration-300 relative">
                    <HiShoppingCart className="w-6 h-6" />
                    {totalItems > 0 && (
                      <span className="absolute -top-1 -right-1 bg-white text-black text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold tracking-wide">
                        {totalItems > 99 ? '99+' : totalItems}
                      </span>
                    )}
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Modal */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden"
              >
              {/* Search Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="font-display text-heading-lg text-gray-900">Search Products</h3>
                <button
                  onClick={toggleSearch}
                  className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <HiX className="w-6 h-6" />
                </button>
              </div>

              {/* Search Form */}
              <form onSubmit={handleSearch} className="p-6 border-b border-gray-200">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by product name, anime series, or category..."
                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors text-body-md bg-white text-gray-900 placeholder-gray-500"
                    autoFocus
                  />
                  <HiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                </div>
                <button
                  type="submit"
                  className="w-full mt-4 bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors text-body-md"
                >
                  Search
                </button>
              </form>

              {/* Search Results Preview */}
              {searchQuery.trim() && (
                <div className="p-6">
                  <h4 className="font-display text-heading-md text-gray-900 mb-4">
                    Quick Results ({filteredProducts.length})
                  </h4>
                  {filteredProducts.length > 0 ? (
                    <div className="space-y-3 overflow-y-auto pr-2">
                      {filteredProducts.slice(0, 8).map((product, index) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <Link
                            href={`/product/${product.id}`}
                            onClick={toggleSearch}
                            className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors group border border-transparent hover:border-gray-200"
                          >
                            <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-300">
                              <span className="text-sm font-bold text-gray-800">{product.name.charAt(0)}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h5 className="font-medium text-gray-900 group-hover:text-black transition-colors truncate">
                                {product.name}
                              </h5>
                              <p className="text-sm text-gray-600">
                                {product.anime} • {product.category}
                              </p>
                            </div>
                            <div className="text-right">
                              <span className="font-semibold text-gray-800">৳{product.price.toFixed(2)}</span>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                      {filteredProducts.length > 8 && (
                        <div className="text-center pt-3 border-t border-gray-200 mt-3">
                          <Link
                            href={`/products?search=${encodeURIComponent(searchQuery.trim())}`}
                            onClick={toggleSearch}
                            className="text-sm text-blue-700 hover:text-blue-900 font-medium underline"
                          >
                            View all {filteredProducts.length} results →
                          </Link>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-700 mb-2 font-medium">No products found</p>
                      <p className="text-sm text-gray-600">Try different keywords or browse all products</p>
                    </div>
                  )}
                </div>
              )}

              {/* Browse All Products */}
              {!searchQuery.trim() && (
                <div className="p-6 text-center">
                  <p className="text-gray-700 mb-4 font-medium">Start typing to search products</p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <Link
                      href="/products"
                      onClick={toggleSearch}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium border border-gray-300"
                    >
                      All Products
                    </Link>
                    <Link
                      href="/new-arrivals"
                      onClick={toggleSearch}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium border border-gray-300"
                    >
                      New Arrivals
                    </Link>
                    <Link
                      href="/on-sale"
                      onClick={toggleSearch}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium border border-gray-300"
                    >
                      On Sale
                    </Link>
                  </div>
                </div>
              )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
