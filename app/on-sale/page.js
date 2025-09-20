"use client";

import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Link from "next/link";
import { HiChevronRight, HiFilter, HiX } from "react-icons/hi";

export default function OnSalePage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedAnime, setSelectedAnime] = useState("all");
  const [sortBy, setSortBy] = useState("discount");
  const [showFilters, setShowFilters] = useState(false);

  const [saleProducts, setSaleProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch on-sale products
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/api/products?onSale=true`
        );
        const data = await res.json();
        if (active) setSaleProducts(data.items || []);
      } catch (error) {
        console.error("Failed to load sale products:", error);
        if (active) setSaleProducts([]);
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  // Get unique categories and anime series from sale products
  const categoryValues = [...new Set(saleProducts.map((p) => p.category))];
  const categories = categoryValues.map((value) => ({
    value,
    label:
      value === "normal"
        ? "Classic"
        : value === "drop-shoulder"
        ? "Drop Shoulder"
        : value,
  }));
  const animeList = [...new Set(saleProducts.map((p) => p.anime))];

  // Apply additional filters
  const filteredProducts = saleProducts.filter((product) => {
    const categoryMatch =
      selectedCategory === "all" || product.category === selectedCategory;
    const animeMatch =
      selectedAnime === "all" || product.anime === selectedAnime;
    return categoryMatch && animeMatch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "discount":
        const discountA = a.originalPrice
          ? ((a.originalPrice - a.price) / a.originalPrice) * 100
          : a.discount || 0;
        const discountB = b.originalPrice
          ? ((b.originalPrice - b.price) / b.originalPrice) * 100
          : b.discount || 0;
        return discountB - discountA; // Highest discount first
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      case "anime":
        return a.anime.localeCompare(b.anime);
      default:
        return 0;
    }
  });

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedAnime("all");
    setSortBy("discount");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link
                  href="/"
                  className="text-gray-500 hover:text-black transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <HiChevronRight className="w-5 h-5 text-gray-300" />
              </li>
              <li>
                <span className="text-gray-900 font-medium">On Sale</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">On Sale</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Grab amazing deals on your favorite anime t-shirts
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
          <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:border-transparent bg-white text-gray-900"
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Anime Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Anime Series
                </label>
                <select
                  value={selectedAnime}
                  onChange={(e) => setSelectedAnime(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:border-transparent bg-white text-gray-900"
                >
                  <option value="all">All Anime</option>
                  {animeList.map((anime) => (
                    <option key={anime} value={anime}>
                      {anime}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              {(selectedCategory !== "all" || selectedAnime !== "all") && (
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort by
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:border-transparent bg-white text-gray-900"
            >
              <option value="discount">Best Discount</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name A-Z</option>
              <option value="anime">Anime A-Z</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {sortedProducts.length} of {saleProducts.length} products on
            sale
            {selectedCategory !== "all" && ` in ${selectedCategory}`}
            {selectedAnime !== "all" && ` from ${selectedAnime}`}
          </p>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-64 bg-gray-100 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product._id || product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-500 mb-4">
              <svg
                className="w-16 h-16 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-6m-10 0H4"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No sale products found
            </h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your filters to see more products.
            </p>
            <button
              onClick={clearFilters}
              className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Back to Home */}
        <div className="mt-16 text-center">
          <div className="bg-gray-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Explore More
            </h3>
            <p className="text-gray-600 mb-6">
              Check out our full collection of anime t-shirts
            </p>
            <Link
              href="/"
              className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors inline-flex items-center"
            >
              Browse All Collections
              <HiChevronRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
