'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function OrderTrackingPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const steps = ['placed','confirmed','processing','shipped','delivered'];

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/orders/${id}`);
        if (!res.ok) throw new Error('not found');
        const data = await res.json();
        if (active) setOrder(data.order);
      } catch (_) {
        // fallback to local record if exists
        try {
          const raw = localStorage.getItem('arix_orders');
          const list = raw ? JSON.parse(raw) : [];
          const found = list.find((o) => o.id === id) || null;
          if (active) setOrder(found);
        } catch (_) {}
      } finally {
        if (active) setLoaded(true);
      }
    })();
    return () => { active = false; };
  }, [id]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="font-display text-display-md text-gray-900">Order Tracking</h1>
          <p className="text-gray-600 mt-2">Tracking number: <span className="font-semibold text-gray-900">{id}</span></p>
        </div>

        {!loaded ? (
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4" />
            <div className="h-40 bg-gray-200 rounded" />
          </div>
        ) : !order ? (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
            <p className="text-gray-700 mb-4">We couldn't find an order with this tracking number.</p>
            <Link href="/" className="inline-block bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">Go Home</Link>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Status */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="font-display text-heading-lg text-gray-900 mb-4">Status</h2>
              <div className="flex items-center justify-between">
                {steps.map((s, idx) => {
                  const currentIdx = steps.indexOf((order.status || 'placed'));
                  const isDone = idx <= currentIdx || (order.status === 'cancelled' && idx === 0);
                  const isCancelled = order.status === 'cancelled';
                  return (
                    <div key={s} className="flex-1 flex items-center">
                      <div className={`flex items-center justify-center w-9 h-9 rounded-full text-xs font-semibold border ${isCancelled ? 'bg-red-100 text-red-700 border-red-200' : isDone ? 'bg-black text-white border-black' : 'bg-white text-gray-500 border-gray-300'}`}>{idx+1}</div>
                      {idx < steps.length - 1 && (
                        <div className={`h-0.5 flex-1 mx-2 ${isCancelled ? 'bg-red-200' : idx < currentIdx ? 'bg-black' : 'bg-gray-300'}`} />
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="mt-3 text-sm">
                <span className={`px-2 py-1 rounded-full ${order.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-800'}`}>{order.status || 'placed'}</span>
              </div>
            </div>
            {/* Summary */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="font-display text-heading-lg text-gray-900 mb-4">Summary</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                <div>
                  <div className="text-sm text-gray-500">Order No</div>
                  <div className="font-semibold text-gray-900">{order.orderNo || order.id}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Placed On</div>
                  <div className="font-semibold text-gray-900">{new Date(order.createdAt).toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Items</div>
                  <div className="font-semibold text-gray-900">{order.totals.itemsCount}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Total</div>
                  <div className="font-semibold text-gray-900">৳{order.totals.total.toFixed(2)}</div>
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="font-display text-heading-lg text-gray-900 mb-4">Items</h2>
              <div className="divide-y divide-gray-200">
                {(order.items || []).map((it) => (
                  <div key={`${it.id}-${it.size}`} className="py-4 flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{it.name}</div>
                      <div className="text-sm text-gray-600">{it.anime} • {it.category} • Size {it.size}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">৳{(it.price * it.qty).toFixed(2)}</div>
                      <div className="text-sm text-gray-600">{it.qty} × ৳{it.price.toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="font-display text-heading-lg text-gray-900 mb-4">Delivery</h2>
              <div className="text-gray-700 space-y-1">
                <div className="font-semibold text-gray-900">{order.customer.fullName}</div>
                {order.customer.phone && <div>Phone: {order.customer.phone}</div>}
                {order.customer.email && <div>Email: {order.customer.email}</div>}
                <div>{order.customer.address}</div>
                <div>{order.customer.city} {order.customer.postalCode}</div>
                {order.customer.notes && <div className="text-gray-600">Notes: {order.customer.notes}</div>}
              </div>
            </div>

            <div className="flex gap-4">
              <Link href="/" className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">Back to Home</Link>
              <Link href="/products" className="bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors">Continue Shopping</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


