'use client';

import { useEffect, useState, Fragment } from 'react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openRows, setOpenRows] = useState({});

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

  const toggleDetails = (orderNo) => {
    setOpenRows((prev) => ({ ...prev, [orderNo]: !prev[orderNo] }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  // Simple overview
  const totalOrders = orders.length;
  const totalsSum = orders.reduce((sum, o) => sum + (o.totals?.total || 0), 0);
  const statusCounts = orders.reduce((acc, o) => { acc[o.status] = (acc[o.status] || 0) + 1; return acc; }, {});

  return (
    <div className="space-y-6">
      {/* Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-sm text-gray-600">Total Orders</p>
          <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-sm text-gray-600">Revenue</p>
          <p className="text-2xl font-bold text-gray-900">৳{totalsSum.toFixed(2)}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-sm text-gray-600">By Status</p>
          <div className="flex flex-wrap gap-2 mt-1 text-xs">
            {Object.entries(statusCounts).map(([k,v]) => (
              <span key={k} className="px-2 py-1 rounded-full bg-gray-100 text-gray-800">{k}: {v}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Orders Table */}
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
                <Fragment key={o.orderNo}>
                  <tr className="border-t border-gray-100">
                    <td className="py-2 pr-4 font-medium text-gray-900">{o.orderNo}</td>
                    <td className="py-2 pr-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">{o.customer?.fullName}</span>
                        {o.customer?.phone && (
                          <span className="text-xs text-gray-600">{o.customer.phone}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-2 pr-4">{o.totals?.itemsCount}</td>
                    <td className="py-2 pr-4">৳{o.totals?.total?.toFixed(2)}</td>
                    <td className="py-2 pr-4">{o.status}</td>
                    <td className="py-2 pr-0">
                      <div className="flex flex-wrap gap-2">
                        <button onClick={() => toggleDetails(o.orderNo)} className="px-2 py-1 text-xs rounded bg-black text-white hover:bg-gray-800">
                          {openRows[o.orderNo] ? 'Hide' : 'Details'}
                        </button>
                        {['placed','confirmed','processing','shipped','delivered','cancelled'].map(s => (
                          <button key={s} onClick={() => updateStatus(o.orderNo, s)} className="px-2 py-1 text-xs rounded bg-gray-200 hover:bg-gray-300">
                            {s}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                  {openRows[o.orderNo] && (
                    <tr className="bg-gray-50">
                      <td colSpan={6} className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-800">
                          <div>
                            <p className="font-semibold text-gray-900 mb-1">Customer</p>
                            <p>Name: {o.customer?.fullName || '-'}</p>
                            <p>Phone: {o.customer?.phone || '-'}</p>
                            <p>Email: {o.customer?.email || '-'}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 mb-1">Address</p>
                            <p>{o.customer?.address || '-'}</p>
                            <p>{o.customer?.city || '-'} {o.customer?.postalCode ? `- ${o.customer.postalCode}` : ''}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 mb-1">Notes</p>
                            <p className="whitespace-pre-wrap">{o.customer?.notes || '-'}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


