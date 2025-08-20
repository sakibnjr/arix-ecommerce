'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FaCopy } from 'react-icons/fa';
import toast from 'react-hot-toast';

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
          <div className="mt-2 flex items-center gap-2 text-gray-600">
            <span>Tracking number:</span>
            <span className="font-semibold text-gray-900">{id}</span>
            <button
              type="button"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(String(id));
                  toast.success('Tracking number copied');
                } catch (_) {
                  toast.error('Failed to copy');
                }
              }}
              className="p-1 rounded border border-gray-200 hover:bg-gray-100 text-gray-700"
              aria-label="Copy tracking number"
              title="Copy tracking number"
            >
              <FaCopy className="w-3.5 h-3.5" />
            </button>
          </div>
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
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <h2 className="font-display text-heading-lg text-gray-900">Status</h2>
                  {(() => {
                    const s = order.status || 'placed';
                    const isDelivered = s === 'delivered';
                    const isCancelled = s === 'cancelled';
                    const label = s.charAt(0).toUpperCase() + s.slice(1);
                    const cls = isCancelled ? 'bg-red-100 text-red-700' : isDelivered ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-800';
                    return (
                      <motion.span
                        initial={{ y: -8, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${cls}`}
                      >
                        {label}
                      </motion.span>
                    );
                  })()}
                </div>
              </div>
              <div className="flex items-center justify-between">
                {steps.map((s, idx) => {
                  const currentIdx = steps.indexOf((order.status || 'placed'));
                  const isCancelled = order.status === 'cancelled';
                  const isDelivered = order.status === 'delivered';
                  const isDone = idx <= currentIdx || (isCancelled && idx === 0);
                  const doneCircleClass = isCancelled
                    ? 'bg-red-100 text-red-700 border-red-200'
                    : isDelivered
                      ? 'bg-green-600 text-white border-green-600'
                      : 'bg-black text-white border-black';
                  return (
                    <div key={s} className="flex-1 flex items-center">
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 18, delay: isDelivered ? idx * 0.05 : 0 }}
                        className={`flex items-center justify-center w-9 h-9 rounded-full text-xs font-semibold border ${isDone ? doneCircleClass : 'bg-white text-gray-500 border-gray-300'}`}
                      >
                        {idx + 1}
                      </motion.div>
                      {idx < steps.length - 1 && (
                        <div className="relative flex-1 mx-2 h-0.5 bg-gray-300 overflow-hidden">
                          {!isCancelled && (
                            <motion.div
                              className={`absolute left-0 top-0 h-0.5 ${isDelivered ? 'bg-green-600' : 'bg-black'}`}
                              initial={{ width: 0 }}
                              animate={{ width: idx < currentIdx ? '100%' : idx === currentIdx ? '50%' : '0%' }}
                              transition={{ duration: 0.6, ease: 'easeInOut', delay: isDelivered ? idx * 0.1 : 0 }}
                            />
                          )}
                          {isCancelled && (
                            <div className="absolute left-0 top-0 h-0.5 w-full bg-red-200" />
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
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
                {(order.items || []).map((it, idx) => {
                  const qtyRaw = it.qty ?? it.quantity ?? 0;
                  const qty = Number(qtyRaw) || 0;
                  const unitPrice = Number(it.price) || 0;
                  const lineTotal = unitPrice * qty;
                  const keyBase = it.id || it.productId || it.name || idx;
                  return (
                    <div key={`${keyBase}-${it.size || ''}-${idx}`} className="py-4 flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">{it.name}</div>
                        <div className="text-sm text-gray-600">{it.anime} • {it.category} • Size {it.size}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">৳{lineTotal.toFixed(2)}</div>
                        <div className="text-sm text-gray-600">{qty} × ৳{unitPrice.toFixed(2)}</div>
                      </div>
                    </div>
                  );
                })}
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


