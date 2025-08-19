import Link from 'next/link';

export const metadata = { title: 'Admin | Arix' };

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="font-display text-display-md text-gray-900 mb-6">Admin Dashboard</h1>
        <nav className="flex gap-4 mb-8">
          <Link href="/admin" className="text-sm px-3 py-2 rounded bg-black text-white">Overview</Link>
          <Link href="/admin/orders" className="text-sm px-3 py-2 rounded bg-gray-200 text-gray-900">Orders</Link>
          <Link href="/admin/products" className="text-sm px-3 py-2 rounded bg-gray-200 text-gray-900">Products</Link>
        </nav>
        {children}
      </div>
    </div>
  );
}


