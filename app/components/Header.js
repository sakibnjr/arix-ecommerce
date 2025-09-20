"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HiSearch, HiShoppingCart, HiMenu, HiX } from "react-icons/hi";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { formatCategoryLabel } from "../utils/categoryFormatter";

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loadingResults, setLoadingResults] = useState(false);
  const { totalItems } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setSearchQuery("");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    setIsSearchOpen(false);
  };

  // Fetch search results from API
  useEffect(() => {
    let active = true;
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }
    setLoadingResults(true);
    const t = setTimeout(async () => {
      try {
        const res = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_BASE
          }/api/products?search=${encodeURIComponent(searchQuery.trim())}`
        );
        const data = await res.json();
        if (active) setResults(data.items || []);
      } catch (_) {
        if (active) setResults([]);
      } finally {
        if (active) setLoadingResults(false);
      }
    }, 200);
    return () => {
      active = false;
      clearTimeout(t);
    };
  }, [searchQuery]);

  return (
    <header className="relative bg-black shadow-lg sticky top-0 z-50 overflow-hidden">
      {/* Sophisticated Background Elements */}
      <div className="absolute inset-0">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 via-transparent to-gray-900/50" />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="font-display text-xl sm:text-2xl lg:text-3xl text-white hover:text-gray-300 transition-all duration-300 hover:scale-105 transform"
            >
              ARIX
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8">
            <Link
              href="/"
              className="text-sm sm:text-base text-gray-300 hover:text-white transition-all duration-300 font-medium tracking-wide hover:scale-105 transform"
            >
              Home
            </Link>
            <Link
              href="/new-arrivals"
              className="text-sm sm:text-base text-gray-300 hover:text-white transition-all duration-300 font-medium tracking-wide hover:scale-105 transform"
            >
              New Arrivals
            </Link>
            <Link
              href="/on-sale"
              className="text-sm sm:text-base text-gray-300 hover:text-white transition-all duration-300 font-medium tracking-wide hover:scale-105 transform"
            >
              On Sale
            </Link>
          </nav>

          {/* Cart and User Actions */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <button
              onClick={toggleSearch}
              className="p-2 sm:p-3 text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 transform rounded-lg hover:bg-white/10"
            >
              <HiSearch className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <Link
              href="/cart"
              className="p-2 sm:p-3 text-gray-300 hover:text-white transition-all duration-300 relative hover:scale-110 transform rounded-lg hover:bg-white/10"
            >
              <HiShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-black text-xs rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center font-bold tracking-wide">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 transform rounded-lg hover:bg-white/10"
            >
              {isMenuOpen ? (
                <HiX className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <HiMenu className="w-5 h-5 sm:w-6 sm:h-6" />
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
              <div className="px-4 pt-4 pb-6 space-y-2 sm:px-6 bg-black/95 backdrop-blur-md border-t border-gray-700/50">
                <Link
                  href="/"
                  className="block px-4 py-2.5 text-sm sm:text-base text-gray-300 hover:text-white transition-all duration-300 tracking-wide rounded-lg hover:bg-white/10"
                >
                  Home
                </Link>
                <Link
                  href="/new-arrivals"
                  className="block px-4 py-2.5 text-sm sm:text-base text-gray-300 hover:text-white transition-all duration-300 tracking-wide rounded-lg hover:bg-white/10"
                >
                  New Arrivals
                </Link>
                <Link
                  href="/on-sale"
                  className="block px-4 py-2.5 text-sm sm:text-base text-gray-300 hover:text-white transition-all duration-300 tracking-wide rounded-lg hover:bg-white/10"
                >
                  On Sale
                </Link>
                <div className="flex items-center space-x-4 px-4 py-4 border-t border-gray-700/50 mt-3">
                  <button
                    onClick={toggleSearch}
                    className="p-2.5 text-gray-300 hover:text-white transition-all duration-300 rounded-lg hover:bg-white/10"
                  >
                    <HiSearch className="w-5 h-5" />
                  </button>
                  <Link
                    href="/cart"
                    className="p-2.5 text-gray-300 hover:text-white transition-all duration-300 relative rounded-lg hover:bg-white/10"
                  >
                    <HiShoppingCart className="w-5 h-5" />
                    {totalItems > 0 && (
                      <span className="absolute -top-1 -right-1 bg-white text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold tracking-wide">
                        {totalItems > 99 ? "99+" : totalItems}
                      </span>
                    )}
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Search Modal */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-start justify-center pt-16 p-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl mx-4 max-h-[85vh] overflow-hidden border border-gray-200/50"
              >
                {/* Enhanced Search Header */}
                <div className="flex items-center justify-between p-5 sm:p-6 border-b border-gray-200 bg-gray-50">
                  <h3 className="font-display text-lg sm:text-xl font-semibold text-gray-900">
                    Search Products
                  </h3>
                  <button
                    onClick={toggleSearch}
                    className="p-2 text-gray-500 hover:text-gray-700 transition-all duration-300 hover:scale-110 transform rounded-lg hover:bg-gray-200"
                  >
                    <HiX className="w-5 h-5" />
                  </button>
                </div>

                {/* Enhanced Search Form */}
                <form
                  onSubmit={handleSearch}
                  className="p-5 sm:p-6 border-b border-gray-200"
                >
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by product name, anime series, or category..."
                      className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-all duration-300 text-sm sm:text-base bg-white text-gray-900 placeholder-gray-500 shadow-sm focus:shadow-md"
                      autoFocus
                    />
                    <HiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  </div>
                  <button
                    type="submit"
                    className="w-full mt-4 bg-black text-white py-3 px-6 rounded-xl font-medium hover:bg-gray-800 transition-all duration-300 text-sm sm:text-base hover:scale-[1.02] transform shadow-lg hover:shadow-xl"
                  >
                    Search
                  </button>
                </form>

                {/* Enhanced Search Results Preview */}
                {searchQuery.trim() && (
                  <div className="p-5 sm:p-6">
                    <h4 className="font-display text-base sm:text-lg font-semibold text-gray-900 mb-4">
                      Quick Results ({results.length})
                    </h4>
                    {loadingResults ? (
                      <div className="text-center py-8 text-gray-600">
                        <div className="inline-flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
                          Searching...
                        </div>
                      </div>
                    ) : results.length > 0 ? (
                      <div className="space-y-2 overflow-y-auto pr-2 max-h-72 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        {results.slice(0, 8).map((product, index) => (
                          <motion.div
                            key={product._id || product.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <Link
                              href={`/product/${product._id || product.id}`}
                              onClick={toggleSearch}
                              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-300 group border border-transparent hover:border-gray-200"
                            >
                              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-300">
                                <span className="text-xs sm:text-sm font-bold text-gray-800">
                                  {product.name.charAt(0)}
                                </span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <h5 className="font-medium text-gray-900 group-hover:text-black transition-colors truncate text-sm sm:text-base">
                                  {product.name}
                                </h5>
                                <p className="text-xs sm:text-sm text-gray-600">
                                  {product.anime} •{" "}
                                  {formatCategoryLabel(product.category)}
                                </p>
                              </div>
                              <div className="text-right">
                                <span className="font-semibold text-gray-800 text-sm sm:text-base">
                                  ৳{Number(product.price || 0).toFixed(2)}
                                </span>
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                        {results.length > 8 && (
                          <div className="text-center pt-3 border-t border-gray-200 mt-3">
                            <Link
                              href={`/products?search=${encodeURIComponent(
                                searchQuery.trim()
                              )}`}
                              onClick={toggleSearch}
                              className="text-sm text-blue-700 hover:text-blue-900 font-medium underline hover:scale-105 transform inline-block"
                            >
                              View all {results.length} results →
                            </Link>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <HiSearch className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-700 mb-2 font-medium">
                          No products found
                        </p>
                        <p className="text-sm text-gray-600">
                          Try different keywords or browse all products
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Enhanced Browse All Products */}
                {!searchQuery.trim() && (
                  <div className="p-5 sm:p-6 text-center">
                    <p className="text-gray-700 mb-4 font-medium">
                      Start typing to search products
                    </p>
                    <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
                      <Link
                        href="/products"
                        onClick={toggleSearch}
                        className="px-3 sm:px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all duration-300 text-sm font-medium border border-gray-300 hover:scale-105 transform"
                      >
                        All Products
                      </Link>
                      <Link
                        href="/new-arrivals"
                        onClick={toggleSearch}
                        className="px-3 sm:px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all duration-300 text-sm font-medium border border-gray-300 hover:scale-105 transform"
                      >
                        New Arrivals
                      </Link>
                      <Link
                        href="/on-sale"
                        onClick={toggleSearch}
                        className="px-3 sm:px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all duration-300 text-sm font-medium border border-gray-300 hover:scale-105 transform"
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
