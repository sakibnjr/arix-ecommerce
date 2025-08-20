'use client';

import { useEffect, useState, Fragment } from 'react';
import { FaCopy } from "react-icons/fa";
import toast from 'react-hot-toast';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openRows, setOpenRows] = useState({});
  const [query, setQuery] = useState('');

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

  const copyOrderNo = async (orderNo) => {
    try {
      await navigator.clipboard.writeText(orderNo);
      toast.success('Order number copied');
    } catch (e) {
      toast.error('Failed to copy');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  // Simple overview
  const totalOrders = orders.length;
  const totalsSum = orders.reduce((sum, o) => sum + (o.totals?.total || 0), 0);
  const statusCounts = orders.reduce((acc, o) => { acc[o.status] = (acc[o.status] || 0) + 1; return acc; }, {});
  const steps = ['placed','confirmed','processing','shipped','delivered'];

  const normalized = query.trim().toLowerCase();
  const visibleOrders = normalized
    ? orders.filter(o =>
        (o.orderNo || '').toLowerCase().includes(normalized) ||
        (o.customer?.phone || '').toLowerCase().includes(normalized)
      )
    : orders;

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
        <div className="mb-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by Order ID or Contact number"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600">
                <th className="py-2 pr-4">Order ID</th>
                <th className="py-2 pr-4">Customer</th>
                <th className="py-2 pr-4">Items</th>
                <th className="py-2 pr-4">Total</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-0">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visibleOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-gray-600">No results found</td>
                </tr>
              ) : visibleOrders.map((o) => (
                <Fragment key={o.orderNo}>
                  <tr className={`border-t border-gray-100 ${o.status === 'cancelled' ? 'bg-red-50' : ''}`}>
                    <td className="py-2 pr-4 font-medium text-gray-900">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => copyOrderNo(o.orderNo)}
                          className="p-1 rounded hover:bg-gray-100 border border-gray-200"
                          title="Copy order number"
                          aria-label="Copy order number"
                        >
                          <FaCopy className="w-4 h-4 text-gray-700" />
                        </button>
                        <span>{o.orderNo}</span>
                      </div>
                    </td>
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
                      <div className="flex flex-col gap-2 min-w-[260px]">
                        {/* Visual status indicator */}
                        {o.status === 'cancelled' ? (
                          null
                        ) : (
                          <div className="flex items-center gap-1" title={o.status}>
                            {steps.map((s, idx) => {
                              const currentIdx = steps.indexOf(o.status || 'placed');
                              const isDone = idx <= currentIdx;
                              return (
                                <div key={s} className="flex items-center flex-1">
                                  <div className={`w-2.5 h-2.5 rounded-full border ${isDone ? 'bg-black border-black' : 'bg-white border-gray-300'}`} title={s} />
                                  {idx < steps.length - 1 && (
                                    <div className={`h-0.5 flex-1 mx-1 ${idx < currentIdx ? 'bg-black' : 'bg-gray-300'}`} />
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex flex-wrap gap-2">
                          <button onClick={() => toggleDetails(o.orderNo)} className="px-2 py-1 text-xs rounded bg-black text-white hover:bg-gray-800">
                            {openRows[o.orderNo] ? 'Hide' : 'Details'}
                          </button>
                          {['placed','confirmed','processing','shipped','delivered','cancelled'].map(s => (
                            <button
                              key={s}
                              onClick={() => updateStatus(o.orderNo, s)}
                              className={`px-2 py-1 text-xs rounded border ${o.status === s ? (s === 'cancelled' ? 'bg-red-600 text-white border-red-700' : 'bg-black text-white border-black') : 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200'}`}
                              title={`Mark as ${s}`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
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


