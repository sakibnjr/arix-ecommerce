import { useState, useEffect, useCallback } from 'react';
import adminCache from '../utils/adminCache';

export function useAdminStats() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    newProducts: 0,
    saleProducts: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const loadStats = useCallback(async (forceRefresh = false) => {
    const cacheKey = 'admin-stats';
    
    // Check cache first
    if (!forceRefresh) {
      const cachedStats = adminCache.get(cacheKey);
      if (cachedStats) {
        setStats(cachedStats);
        setLoading(false);
        return;
      }
    }

    setLoading(true);
    setError(null);

    try {
      // Load products and orders in parallel
      const [productsRes, ordersRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/products`),
        fetch(`/api/admin/orders`)
      ]);

      const [productsData, ordersData] = await Promise.all([
        productsRes.json(),
        ordersRes.json()
      ]);

      const products = productsData.items || [];
      const orders = ordersData.items || [];

      const totalRevenue = orders.reduce((sum, o) => sum + (o.totals?.total || 0), 0);
      const newStats = {
        totalProducts: products.length,
        totalOrders: orders.length,
        newProducts: products.filter(p => p.isNew).length,
        saleProducts: products.filter(p => p.discount && p.discount > 0).length,
        revenue: totalRevenue,
      };

      // Cache the results
      adminCache.set(cacheKey, newStats);
      setStats(newStats);
      setLastUpdated(new Date());
    } catch (e) {
      console.error('Failed to load stats:', e);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  return { stats, loading, error, lastUpdated, refetch: () => loadStats(true) };
}

export function useAdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProducts = useCallback(async (forceRefresh = false) => {
    const cacheKey = 'admin-products';
    
    // Check cache first
    if (!forceRefresh) {
      const cachedProducts = adminCache.get(cacheKey);
      if (cachedProducts) {
        setProducts(cachedProducts);
        setLoading(false);
        return;
      }
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/products`);
      const data = await res.json();
      const productsData = data.items || [];

      // Cache the results
      adminCache.set(cacheKey, productsData);
      setProducts(productsData);
    } catch (e) {
      console.error('Failed to load products:', e);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteProduct = useCallback(async (productId, productName) => {
    try {
      const res = await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) {
        throw new Error('Failed to delete product');
      }
      
      // Update local state immediately
      setProducts(prev => prev.filter(p => (p._id || p.id) !== productId));
      
      // Invalidate cache to ensure fresh data on next load
      adminCache.invalidate('admin-products');
      adminCache.invalidate('admin-stats');
      
      return { success: true, message: `"${productName}" deleted successfully` };
    } catch (e) {
      return { success: false, message: 'Failed to delete product' };
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return { 
    products, 
    loading, 
    error, 
    refetch: () => loadProducts(true),
    deleteProduct
  };
}
