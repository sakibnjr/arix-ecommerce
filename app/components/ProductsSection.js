'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { HiArrowRight } from 'react-icons/hi';

export default function ProductsSection() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/products`);
        const data = await res.json();
        if (active) setItems((data.items || []).slice(0, 4));
      } catch (_) {
        if (active) setItems([]);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        <div className="text-center mb-16">
          <h2 className="font-display text-display-md md:text-display-lg text-gray-900 mb-6 leading-tight">
            Featured Products
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-64 bg-gray-100 rounded-xl animate-pulse" />
            ))
          ) : (
            items.map((product) => (
              <ProductCard key={product._id || product.id} product={product} />
            ))
          )}
        </div>

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
