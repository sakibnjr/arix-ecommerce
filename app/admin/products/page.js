'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCategoryLabel } from '../../utils/categoryFormatter';
import { MdEdit, MdDelete, MdVisibility, MdRefresh } from 'react-icons/md';
import toast from 'react-hot-toast';
import { useAdminProducts } from '../../hooks/useAdminData';

export default function AdminProductsPage() {
  const { products, loading, error, refetch, deleteProduct } = useAdminProducts();
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleDelete = async (productId, productName) => {
    if (!confirm(`Are you sure you want to delete "${productName}"? This action cannot be undone.`)) {
      return;
    }

    setDeleteLoading(productId);
    const result = await deleteProduct(productId, productName);
    
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
    
    setDeleteLoading(null);
  };

  // Calculate summary statistics
  const totalProducts = products.length;
  const newProducts = products.filter(p => p.isNew).length;
  const saleProducts = products.filter(p => p.discount && p.discount > 0).length;
  const categories = [...new Set(products.map(p => p.category))];
  const animes = [...new Set(products.map(p => p.anime))];

  if (loading) return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
    </div>
  );
  
  if (error) return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="text-red-600 bg-red-50 p-4 rounded-lg">{error}</div>
      <button 
        onClick={refetch}
        className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
      >
        Retry
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Total Products</p>
              <p className="text-2xl font-bold text-blue-900">{totalProducts}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <MdVisibility className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">New Arrivals</p>
              <p className="text-2xl font-bold text-green-900">{newProducts}</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">NEW</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">On Sale</p>
              <p className="text-2xl font-bold text-red-900">{saleProducts}</p>
            </div>
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">SALE</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Categories</p>
              <p className="text-2xl font-bold text-purple-900">{categories.length}</p>
              <p className="text-xs text-purple-500 mt-1">{animes.length} anime series</p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">📚</span>
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-heading-lg text-gray-900">All Products</h2>
          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
              title="Refresh products"
            >
              <MdRefresh className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
            <Link href="/admin/products/new" className="px-4 py-2 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors">
              Add New Product
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600 border-b border-gray-200">
                <th className="py-3 pr-4 font-medium">Name</th>
                <th className="py-3 pr-4 font-medium">Anime</th>
                <th className="py-3 pr-4 font-medium">Category</th>
                <th className="py-3 pr-4 font-medium">Price</th>
                <th className="py-3 pr-4 font-medium">Status</th>
                <th className="py-3 pr-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id || p.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-3">
                      {p.images?.front && (
                        <img 
                          src={p.images.front} 
                          alt={p.name}
                          className="w-10 h-10 rounded-lg object-cover bg-gray-100"
                        />
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{p.name}</p>
                        <p className="text-xs text-gray-500">ID: {(p._id || p.id)?.slice(-8)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 pr-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-black text-white">
                      {p.anime}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {formatCategoryLabel(p.category)}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-900">৳{(p.price || 0).toFixed(2)}</span>
                      {p.originalPrice && (
                        <span className="text-xs text-gray-500 line-through">৳{p.originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 pr-4">
                    <div className="flex flex-wrap gap-1">
                      {p.isNew && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          NEW
                        </span>
                      )}
                      {p.discount && p.discount > 0 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          {p.discount}% OFF
                        </span>
                      )}
                      {!p.isNew && (!p.discount || p.discount === 0) && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                          Regular
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 pr-0">
                    <div className="flex items-center gap-2">
                      <a
                        href={`/product/${p._id || p.id}`}
                        target="_blank"
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Product"
                      >
                        <MdVisibility className="w-4 h-4" />
                      </a>
                      <Link
                        href={`/admin/products/${p._id || p.id}/edit`}
                        className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit Product"
                      >
                        <MdEdit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(p._id || p.id, p.name)}
                        disabled={deleteLoading === (p._id || p.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                        title="Delete Product"
                      >
                        {deleteLoading === (p._id || p.id) ? (
                          <div className="w-4 h-4 border-2 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
                        ) : (
                          <MdDelete className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


