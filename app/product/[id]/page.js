import { sampleProducts } from '../../data/sampleProducts';
import Link from 'next/link';
import ProductDetailsClient from './ProductDetailsClient';

export default function ProductDetailsPage({ params }) {
  const productId = parseInt(params.id, 10);
  const product = sampleProducts.find(p => p.id === productId);

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
  return sampleProducts.map((p) => ({ id: String(p.id) }));
}
