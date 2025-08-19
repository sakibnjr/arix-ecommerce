import { use } from 'react';
import Link from 'next/link';
import ProductDetailsClient from './ProductDetailsClient';

export default function ProductDetailsPage({ params }) {
  const { id } = use(params);
  // server fetch product by id
  // Note: API uses Mongo IDs; fallback to numeric id if present
  // We'll fetch directly from API using fetch in server component
  // Next.js supports Request in server components
  // eslint-disable-next-line no-undef
  const res = use(fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/products/${id}`, { cache: 'no-store' }));
  const data = use(res.json());
  const product = data?.item || null;

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
            <Link href="/" className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <ProductDetailsClient product={product} />
    </div>
  );
}

// Pre-generate static routes for better perf and prefetch
export function generateStaticParams() {
  return [];
}
