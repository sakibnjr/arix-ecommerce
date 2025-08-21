'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import adminCache from '../../../../utils/adminCache';

// Reuse the same options from the new product page
const ANIME_OPTIONS = [
  { value: '', label: 'Select Anime' },
  { value: 'Naruto', label: 'Naruto' },
  { value: 'Jujutsu Kaisen', label: 'Jujutsu Kaisen' },
  { value: 'One Piece', label: 'One Piece' },
  { value: 'Demon Slayer', label: 'Demon Slayer' },
  { value: 'Solo Leveling', label: 'Solo Leveling' }
];

const CATEGORY_OPTIONS = [
  { value: '', label: 'Select Category' },
  { value: 'normal', label: 'Classic' },
  { value: 'drop-shoulder', label: 'Drop Shoulder' }
];

const SIZE_OPTIONS = [
  { value: 'M', label: 'M' },
  { value: 'L', label: 'L' },
  { value: 'XL', label: 'XL' }
];

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id;

  const [form, setForm] = useState({
    name: '',
    price: '',
    originalPrice: '',
    anime: '',
    category: '',
    sizes: ['M', 'L', 'XL'],
    isNew: false,
    discount: '',
    images: {
      front: '',
      back: '',
      detail: ''
    }
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Load existing product data
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/products/${productId}`);
        const data = await res.json();
        
        if (!res.ok) {
          throw new Error(data.error || 'Failed to load product');
        }

        const product = data.item;
        setForm({
          name: product.name || '',
          price: product.price?.toString() || '',
          originalPrice: product.originalPrice?.toString() || '',
          anime: product.anime || '',
          category: product.category || '',
          sizes: product.sizes || ['M', 'L', 'XL'],
          isNew: !!product.isNew,
          discount: product.discount?.toString() || '',
          images: {
            front: product.images?.front || '',
            back: product.images?.back || '',
            detail: product.images?.detail || ''
          }
        });
      } catch (e) {
        setError('Failed to load product: ' + e.message);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      loadProduct();
    }
  }, [productId]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const onSizeChange = (size) => {
    setForm(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  // Image upload function (same as new product page)
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const res = await fetch(`/api/admin/uploads?folder=products`, {
      method: 'POST',
      body: formData,
    });
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || 'Upload failed');
    }
    
    return await res.json();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      // Build images object only with non-empty values
      const images = {};
      if (form.images.front) images.front = form.images.front;
      if (form.images.back) images.back = form.images.back;
      if (form.images.detail) images.detail = form.images.detail;

      const payload = {
        name: form.name,
        price: Number(form.price),
        originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
        anime: form.anime || undefined,
        category: form.category || undefined,
        sizes: form.sizes.length > 0 ? form.sizes : undefined,
        isNew: !!form.isNew,
        discount: form.discount ? Number(form.discount) : undefined,
        ...(Object.keys(images).length > 0 && { images }),
      };

      const res = await fetch(`/api/admin/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ? JSON.stringify(data.error) : 'Failed');
      
      setSuccess('Product updated successfully');
      toast.success('Product updated successfully');
      
      // Invalidate cache to ensure fresh data
      adminCache.invalidate('admin-products');
      adminCache.invalidate('admin-stats');
      
      // Redirect back to products list after 1 second
      setTimeout(() => {
        router.push('/admin/products');
      }, 1000);
    } catch (e) {
      setError('Failed to update product: ' + e.message);
      toast.error('Failed to update product');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
    </div>
  );

  if (error && !form.name) return (
    <div className="text-red-600 bg-red-50 p-4 rounded-lg">{error}</div>
  );

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => router.back()}
          className="px-3 py-2 text-gray-600 hover:text-black transition-colors"
        >
          ← Back
        </button>
        <h1 className="font-display text-heading-lg text-gray-900">Edit Product</h1>
      </div>
      
      <p className="text-sm text-gray-600 mb-6">
        Update product details. Upload new images to replace existing ones, or leave unchanged to keep current images.
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded text-green-700 text-sm">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Name</label>
          <input 
            name="name" 
            value={form.name} 
            onChange={onChange} 
            className="w-full border border-gray-300 rounded px-3 py-2" 
            required 
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Price (৳)</label>
            <input 
              name="price" 
              type="number" 
              step="0.01" 
              value={form.price} 
              onChange={onChange} 
              className="w-full border border-gray-300 rounded px-3 py-2" 
              required 
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Original Price (৳)</label>
            <input 
              name="originalPrice" 
              type="number" 
              step="0.01" 
              value={form.originalPrice} 
              onChange={onChange} 
              className="w-full border border-gray-300 rounded px-3 py-2" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Anime Series</label>
            <select 
              name="anime" 
              value={form.anime} 
              onChange={onChange} 
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              {ANIME_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Category</label>
            <select 
              name="category" 
              value={form.category} 
              onChange={onChange} 
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              {CATEGORY_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-2">Available Sizes</label>
          <div className="flex gap-3">
            {SIZE_OPTIONS.map(size => (
              <label key={size.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.sizes.includes(size.value)}
                  onChange={() => onSizeChange(size.value)}
                />
                <span className="text-sm">{size.label}</span>
              </label>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Selected: {form.sizes.length > 0 ? form.sizes.join(', ') : 'None'}
          </p>
        </div>

        {/* Product Images - 3 uploads */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Front View (upload)</label>
            <input type="file" accept="image/*" onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setSaving(true);
              try {
                const up = await uploadToCloudinary(file);
                setForm((f) => ({ ...f, images: { ...f.images, front: up.url } }));
              } catch (e) {
                setError('Front image upload failed');
              } finally {
                setSaving(false);
              }
            }} />
            {form.images.front && (
              <div className="mt-2">
                <img src={form.images.front} alt="Front view" className="w-full h-32 object-cover rounded border" />
                <p className="text-xs text-gray-600 mt-1 truncate">{form.images.front}</p>
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Back View (upload)</label>
            <input type="file" accept="image/*" onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setSaving(true);
              try {
                const up = await uploadToCloudinary(file);
                setForm((f) => ({ ...f, images: { ...f.images, back: up.url } }));
              } catch (e) {
                setError('Back image upload failed');
              } finally {
                setSaving(false);
              }
            }} />
            {form.images.back && (
              <div className="mt-2">
                <img src={form.images.back} alt="Back view" className="w-full h-32 object-cover rounded border" />
                <p className="text-xs text-gray-600 mt-1 truncate">{form.images.back}</p>
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Detail View (upload)</label>
            <input type="file" accept="image/*" onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setSaving(true);
              try {
                const up = await uploadToCloudinary(file);
                setForm((f) => ({ ...f, images: { ...f.images, detail: up.url } }));
              } catch (e) {
                setError('Detail image upload failed');
              } finally {
                setSaving(false);
              }
            }} />
            {form.images.detail && (
              <div className="mt-2">
                <img src={form.images.detail} alt="Detail view" className="w-full h-32 object-cover rounded border" />
                <p className="text-xs text-gray-600 mt-1 truncate">{form.images.detail}</p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <input 
              id="isNew" 
              name="isNew" 
              type="checkbox" 
              checked={form.isNew} 
              onChange={onChange} 
            />
            <label htmlFor="isNew" className="text-sm text-gray-700">New Arrival</label>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Discount (%)</label>
            <input 
              name="discount" 
              type="number" 
              min="0" 
              max="100" 
              value={form.discount} 
              onChange={onChange} 
              className="w-full border border-gray-300 rounded px-3 py-2" 
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button 
            type="submit" 
            disabled={saving} 
            className="px-4 py-2 rounded bg-black text-white text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
          >
            {saving ? 'Updating...' : 'Update Product'}
          </button>
          <button 
            type="button" 
            onClick={() => router.back()}
            className="px-4 py-2 rounded border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>

      <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded text-sm text-gray-700">
        <strong>Edit Guidelines:</strong>
        <ul className="mt-2 space-y-1 list-disc list-inside">
          <li>Only upload new images if you want to replace existing ones</li>
          <li>All fields are optional - leave unchanged to keep current values</li>
          <li>Changes are saved immediately upon submission</li>
        </ul>
      </div>
    </div>
  );
}
