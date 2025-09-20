'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function OrderLookupPage() {
  const router = useRouter();
  const [trackingId, setTrackingId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = (trackingId || '').trim();
    if (!id) {
      setError('Please enter your order ID');
      return;
    }
    setError('');
    router.push(`/order/${encodeURIComponent(id)}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="font-display text-display-md text-gray-900">Track Your Order</h1>
          <p className="text-gray-600 mt-2">Enter your order ID to view status and details.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-2">Order ID</label>
          <input
            id="orderId"
            type="text"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            placeholder="e.g. ARX123456 or your backend order number"
            className={`w-full px-4 py-3 border rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${error ? 'border-red-500' : 'border-gray-300'}`}
          />
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

          <div className="mt-6 flex gap-3">
            <button type="submit" className="flex-1 bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors">Track Order</button>
            <Link href="/" className="flex-1 text-center bg-gray-200 text-gray-900 py-3 px-6 rounded-lg font-medium hover:bg-gray-300 transition-colors">Cancel</Link>
          </div>
        </form>

        <div className="mt-6 text-sm text-gray-600">
          <p>
            You can find your order ID on the confirmation screen right after placing the order. If you placed an order without backend confirmation, your ID looks like <span className="font-mono">ARXXXXXXX</span>.
          </p>
        </div>
      </div>
    </div>
  );
}


