'use client';

import { useEffect, useState } from 'react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + '/api/orders');
      const data = await res.json();
      setOrders(data.items || []);
    } catch (e) {
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (orderNo, status) => {
    try {
      await fetch(process.env.NEXT_PUBLIC_API_BASE + '/api/orders/' + orderNo, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      load();
    } catch (e) {}
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h2 className="font-display text-heading-lg text-gray-900 mb-4">Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-600">
              <th className="py-2 pr-4">Order No</th>
              <th className="py-2 pr-4">Customer</th>
              <th className="py-2 pr-4">Items</th>
              <th className="py-2 pr-4">Total</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2 pr-0">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.orderNo} className="border-t border-gray-100">
                <td className="py-2 pr-4 font-medium text-gray-900">{o.orderNo}</td>
                <td className="py-2 pr-4">{o.customer?.fullName}</td>
                <td className="py-2 pr-4">{o.totals?.itemsCount}</td>
                <td className="py-2 pr-4">৳{o.totals?.total?.toFixed(2)}</td>
                <td className="py-2 pr-4">{o.status}</td>
                <td className="py-2 pr-0">
                  <div className="flex gap-2">
                    {['placed','processing','shipped','delivered','cancelled'].map(s => (
                      <button key={s} onClick={() => updateStatus(o.orderNo, s)} className="px-2 py-1 text-xs rounded bg-gray-200 hover:bg-gray-300">
                        {s}
                      </button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


