import Link from "next/link";
import ProductDetailsClient from "./ProductDetailsClient";

async function getProduct(id) {
  try {
    // Use the backend API directly in server components
    const apiBase =
      process.env.NEXT_PUBLIC_API_BASE ||
      process.env.API_BASE ||
      "http://localhost:4000";
    const res = await fetch(`${apiBase}/api/products/${id}`, {
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      return data?.item || null;
    } else {
      console.error("Backend API error:", res.status, res.statusText);
      return null;
    }
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
}

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Product Not Found
            </h1>
            <p className="text-gray-600 mb-8">
              The product you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
              href="/"
              className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
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

// Mark as dynamic for proper SSR
export const dynamic = "force-dynamic";

// Pre-generate static routes for better perf and prefetch
export function generateStaticParams() {
  return [];
}
