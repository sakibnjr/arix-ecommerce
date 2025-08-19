'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  MdShoppingCart, 
  MdShoppingBag, 
  MdTrendingUp, 
  MdRefresh, 
  MdAdd,
  MdVisibility,
  MdBarChart,
  MdInventory,
  MdPeople
} from 'react-icons/md';
import { useAdminStats } from '../hooks/useAdminData';

export default function AdminHome() {
  const { stats, loading, error, lastUpdated, refetch } = useAdminStats();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    );
  }

  if (error) {
    return (
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
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl p-8 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="font-display text-4xl font-bold mb-2">
                Welcome to ARIX Admin
              </h1>
              <p className="text-gray-300 text-lg">
                Manage your anime t-shirt store with ease
              </p>
              {lastUpdated && (
                <p className="text-gray-400 text-sm mt-2">
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </p>
              )}
            </div>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50 backdrop-blur-sm"
              title="Refresh data"
            >
              <MdRefresh className={`w-6 h-6 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
          
          {/* Quick Actions */}
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/admin/products/new"
              className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              <MdAdd className="w-5 h-5" />
              Add Product
            </Link>
            <Link 
              href="/admin/products"
              className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors font-medium backdrop-blur-sm"
            >
              <MdInventory className="w-5 h-5" />
              Manage Products
            </Link>
            <a 
              href="/products" 
              target="_blank"
              className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors font-medium backdrop-blur-sm"
            >
              <MdVisibility className="w-5 h-5" />
              View Store
            </a>
          </div>
        </div>
        
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-white/5 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-white/5 to-transparent rounded-full translate-y-24 -translate-x-24"></div>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Products</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalProducts}</p>
              <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                <MdTrendingUp className="w-3 h-3" />
                Active inventory
              </p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <MdShoppingBag className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>

        <div className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:border-green-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Orders</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                <MdPeople className="w-3 h-3" />
                Customer orders
              </p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <MdShoppingCart className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>

        <div className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:border-purple-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">New Arrivals</p>
              <p className="text-3xl font-bold text-gray-900">{stats.newProducts}</p>
              <p className="text-xs text-purple-600 mt-1 flex items-center gap-1">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                Recently added
              </p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-white font-bold text-lg">NEW</span>
            </div>
          </div>
        </div>

        <div className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:border-orange-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">On Sale</p>
              <p className="text-3xl font-bold text-gray-900">{stats.saleProducts}</p>
              <p className="text-xs text-orange-600 mt-1 flex items-center gap-1">
                <MdBarChart className="w-3 h-3" />
                Discounted items
              </p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <MdTrendingUp className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Management Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Management */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-900 to-black rounded-2xl flex items-center justify-center">
                <MdShoppingBag className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-gray-900">Products</h2>
                <p className="text-gray-600">Manage your anime t-shirt catalog</p>
                <p className="text-sm text-gray-500 mt-1">{stats.totalProducts} items in inventory</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <Link 
              href="/admin/products" 
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <MdInventory className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">View All Products</span>
              </div>
              <span className="text-gray-400 group-hover:text-gray-600 transition-colors">→</span>
            </Link>
            
            <Link 
              href="/admin/products/new" 
              className="flex items-center justify-between p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <MdAdd className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-900">Add New Product</span>
              </div>
              <span className="text-blue-400 group-hover:text-blue-600 transition-colors">→</span>
            </Link>
          </div>
        </div>
        
        {/* Order Management */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center">
                <MdShoppingCart className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-gray-900">Orders</h2>
                <p className="text-gray-600">Track and manage customer orders</p>
                <p className="text-sm text-gray-500 mt-1">{stats.totalOrders} total orders received</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <Link 
              href="/admin/orders" 
              className="flex items-center justify-between p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <MdShoppingCart className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-900">View All Orders</span>
              </div>
              <span className="text-green-400 group-hover:text-green-600 transition-colors">→</span>
            </Link>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <MdBarChart className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">Analytics</span>
              </div>
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Coming Soon</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links & Shortcuts */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
            <MdInventory className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Quick Actions</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/admin/products/new" className="group p-4 bg-white rounded-xl border hover:border-blue-300 hover:shadow-md transition-all">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
              <MdAdd className="w-5 h-5 text-blue-600" />
            </div>
            <p className="font-medium text-gray-900 mb-1">Add Product</p>
            <p className="text-sm text-gray-600">Create new anime t-shirt</p>
          </Link>
          
          <Link href="/admin/products" className="group p-4 bg-white rounded-xl border hover:border-gray-400 hover:shadow-md transition-all">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-gray-200 transition-colors">
              <MdInventory className="w-5 h-5 text-gray-600" />
            </div>
            <p className="font-medium text-gray-900 mb-1">Product List</p>
            <p className="text-sm text-gray-600">Manage inventory</p>
          </Link>
          
          <Link href="/admin/orders" className="group p-4 bg-white rounded-xl border hover:border-green-300 hover:shadow-md transition-all">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-green-200 transition-colors">
              <MdShoppingCart className="w-5 h-5 text-green-600" />
            </div>
            <p className="font-medium text-gray-900 mb-1">Order List</p>
            <p className="text-sm text-gray-600">Track customer orders</p>
          </Link>
          
          <a href="/products" target="_blank" className="group p-4 bg-white rounded-xl border hover:border-purple-300 hover:shadow-md transition-all">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-purple-200 transition-colors">
              <MdVisibility className="w-5 h-5 text-purple-600" />
            </div>
            <p className="font-medium text-gray-900 mb-1">View Store</p>
            <p className="text-sm text-gray-600">See live website</p>
          </a>
        </div>
      </div>
    </div>
  );
}


