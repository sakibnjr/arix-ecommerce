'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MdArrowBack, MdCloudUpload, MdClose, MdCheckCircle, MdInfo } from 'react-icons/md';
import toast from 'react-hot-toast';
import adminCache from '../../../utils/adminCache';

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

export default function AdminNewProductPage() {
  const [form, setForm] = useState({
    name: '',
    price: '',
    originalPrice: '',
    anime: '',
    category: '',
    sizes: ['M', 'L', 'XL'], // Changed to array for better handling
    isNew: false,
    discount: '',
    images: {
      front: '',
      back: '',
      detail: ''
    }
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Auto-calculate discount percentage from originalPrice and price
  useEffect(() => {
    const price = parseFloat(form.price);
    const original = parseFloat(form.originalPrice);
    let computed = '';
    if (!isNaN(price) && !isNaN(original) && original > 0 && price < original) {
      const pct = Math.round(((original - price) / original) * 100);
      computed = String(pct);
    }
    setForm((prev) => {
      if (prev.discount === computed) return prev;
      return { ...prev, discount: computed };
    });
  }, [form.price, form.originalPrice]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSizeChange = (size) => {
    setForm((f) => ({
      ...f,
      sizes: f.sizes.includes(size)
        ? f.sizes.filter(s => s !== size)
        : [...f.sizes, size]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ? JSON.stringify(data.error) : 'Failed');
      setSuccess('Product created');
      setForm({ name: '', price: '', originalPrice: '', anime: '', category: '', sizes: ['M', 'L', 'XL'], isNew: false, discount: '', images: { front: '', back: '', detail: '' } });
      
      // Invalidate cache to ensure fresh data
      adminCache.invalidate('admin-products');
      adminCache.invalidate('admin-stats');
    } catch (e) {
      setError('Failed to create product');
    } finally {
      setSaving(false);
    }
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/uploads?folder=products`, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) throw new Error('upload failed');
    return res.json();
  };

  return (
    <div className="w-full mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link 
            href="/admin/products" 
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Back to Products"
          >
            <MdArrowBack className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="font-display text-3xl font-bold text-gray-900">Add New Product</h1>
          </div>
        </div>
      </div>

      <form id="product-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Basic Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
                <input 
                  name="name" 
                  value={form.name} 
                  onChange={onChange} 
                  placeholder="e.g., Naruto Hokage T-Shirt"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:border-transparent transition-all" 
                  required 
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">৳</span>
                    <input 
                      name="price" 
                      type="number" 
                      step="0.01" 
                      value={form.price} 
                      onChange={onChange} 
                      placeholder="29.99"
                      className="w-full border border-gray-300 rounded-lg pl-8 pr-4 py-3 focus:ring-2 focus:ring-black focus:border-transparent transition-all" 
                      required 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Original Price</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">৳</span>
                    <input 
                      name="originalPrice" 
                      type="number" 
                      step="0.01" 
                      value={form.originalPrice} 
                      onChange={onChange} 
                      placeholder="39.99"
                      className="w-full border border-gray-300 rounded-lg pl-8 pr-4 py-3 focus:ring-2 focus:ring-black focus:border-transparent transition-all" 
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Anime Series *</label>
                  <select 
                    name="anime" 
                    value={form.anime} 
                    onChange={onChange} 
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-900 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    required
                  >
                    {ANIME_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">T-Shirt Style *</label>
                  <select 
                    name="category" 
                    value={form.category} 
                    onChange={onChange} 
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-900 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    required
                  >
                    {CATEGORY_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Available Sizes</label>
                <div className="flex flex-wrap gap-3">
                  {SIZE_OPTIONS.map((size) => (
                    <label key={size.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.sizes.includes(size.value)}
                        onChange={() => handleSizeChange(size.value)}
                        className="rounded border-gray-300 text-black focus:ring-black"
                      />
                      <span className="text-sm font-medium text-gray-700 px-3 py-1 bg-gray-100 rounded-md">
                        {size.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product Options */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Options</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg">
                <input 
                  id="isNew" 
                  name="isNew" 
                  type="checkbox" 
                  checked={form.isNew} 
                  onChange={onChange}
                  className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                />
                <div>
                  <label htmlFor="isNew" className="text-sm font-medium text-gray-900 cursor-pointer">
                    New Arrival
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Discount Percentage</label>
                <div className="relative">
                  <input 
                    name="discount" 
                    type="number" 
                    step="1" 
                    value={form.discount} 
                    onChange={onChange} 
                    placeholder="0"
                    readOnly
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-8 bg-gray-50 focus:ring-2 focus:ring-black focus:border-transparent transition-all" 
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Images */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Images</h3>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-gray-400 transition-colors">
                <div className="text-center">
                  <MdCloudUpload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <label htmlFor="front-upload" className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-gray-900">Front *</span>
                    </label>
                    <input
                      id="front-upload"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setSaving(true);
                        try {
                          const up = await uploadToCloudinary(file);
                          setForm((f) => ({ ...f, images: { ...f.images, front: up.url } }));
                          toast.success('Front image uploaded successfully');
                        } catch (e) {
                          setError('Front image upload failed');
                          toast.error('Front image upload failed');
                        } finally {
                          setSaving(false);
                        }
                      }}
                    />
                  </div>
                </div>
                {form.images.front && (
                  <div className="mt-4 relative">
                    <img src={form.images.front} alt="Front view" className="w-full h-32 object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, images: { ...f.images, front: '' } }))}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <MdClose className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-gray-400 transition-colors">
                <div className="text-center">
                  <MdCloudUpload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <label htmlFor="back-upload" className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-gray-900">Back</span>
                    </label>
                    <input
                      id="back-upload"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setSaving(true);
                        try {
                          const up = await uploadToCloudinary(file);
                          setForm((f) => ({ ...f, images: { ...f.images, back: up.url } }));
                          toast.success('Back image uploaded successfully');
                        } catch (e) {
                          setError('Back image upload failed');
                          toast.error('Back image upload failed');
                        } finally {
                          setSaving(false);
                        }
                      }}
                    />
                  </div>
                </div>
                {form.images.back && (
                  <div className="mt-4 relative">
                    <img src={form.images.back} alt="Back view" className="w-full h-32 object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, images: { ...f.images, back: '' } }))}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <MdClose className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-gray-400 transition-colors">
                <div className="text-center">
                  <MdCloudUpload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <label htmlFor="detail-upload" className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-gray-900">Detail</span>
                    </label>
                    <input
                      id="detail-upload"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setSaving(true);
                        try {
                          const up = await uploadToCloudinary(file);
                          setForm((f) => ({ ...f, images: { ...f.images, detail: up.url } }));
                          toast.success('Detail image uploaded successfully');
                        } catch (e) {
                          setError('Detail image upload failed');
                          toast.error('Detail image upload failed');
                        } finally {
                          setSaving(false);
                        }
                      }}
                    />
                  </div>
                </div>
                {form.images.detail && (
                  <div className="mt-4 relative">
                    <img src={form.images.detail} alt="Detail view" className="w-full h-32 object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, images: { ...f.images, detail: '' } }))}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <MdClose className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Form Actions */}
      <div className="mt-8 flex items-center justify-between p-6 bg-white border border-gray-200 rounded-xl">
        <div>
          {error && (
            <div className="flex items-center gap-2 text-red-600 mb-2">
              <MdClose className="w-4 h-4" />
              <span className="text-sm">{error}</span>
            </div>
          )}
          {success && (
            <div className="flex items-center gap-2 text-green-600 mb-2">
              <MdCheckCircle className="w-4 h-4" />
              <span className="text-sm">{success}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <Link 
            href="/admin/products" 
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </Link>
          <button 
            type="submit" 
            form="product-form"
            disabled={saving} 
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center gap-2"
          >
            {saving && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            )}
            {saving ? 'Creating Product...' : 'Create Product'}
          </button>
        </div>
      </div>
    </div>
  );
}


