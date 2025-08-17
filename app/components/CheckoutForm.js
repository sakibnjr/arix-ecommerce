'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HiX, HiUser, HiMail, HiPhone, HiLocationMarker, HiShoppingBag } from 'react-icons/hi';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

export default function CheckoutForm({ isOpen, onClose, orderType = 'cart' }) {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    // Email is optional; if provided, validate format
    if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else {
      const normalized = formData.phone.replace(/\s+/g, '');
      const isValid = /^01\d{9}$/.test(normalized) || /^\+8801\d{9}$/.test(normalized);
      if (!isValid) {
        newErrors.phone = 'Please enter a valid Bangladesh phone number (01XXXXXXXXX or +88 01XXXXXXXXX)';
      }
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Delivery address is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Postal code is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fill in all required fields correctly');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate order number
      const orderNumber = `ARX${Date.now().toString().slice(-6)}`;
      const orderRecord = {
        id: orderNumber,
        createdAt: new Date().toISOString(),
        orderType,
        customer: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          notes: formData.notes,
        },
        items: (items || []).map(i => ({ id: i.id, name: i.name, size: i.size, qty: i.quantity, price: i.price, originalPrice: i.originalPrice, anime: i.anime, category: i.category })),
        totals: {
          itemsCount: totalItems || 0,
          subtotal: totalPrice || 0,
          shipping: 80,
          total: (totalPrice || 0) + 80,
        },
      };

      // Persist order locally for tracking
      try {
        const existingRaw = localStorage.getItem('arix_orders');
        const existing = existingRaw ? JSON.parse(existingRaw) : [];
        const updated = [orderRecord, ...existing].slice(0, 50); // keep recent 50
        localStorage.setItem('arix_orders', JSON.stringify(updated));
      } catch (_) {
        // ignore storage errors
      }
      
      // Success toast
      toast.success(`Order #${orderNumber} submitted successfully!`, {
        duration: 6000,
      });

      // Show order summary toast
      setTimeout(() => {
        toast.success(
          `Thank you, ${formData.fullName}! Your order for ${totalItems} item${totalItems > 1 ? 's' : ''} has been submitted. We'll contact you soon to arrange delivery to ${formData.city} for ৳${finalTotal.toFixed(2)} (including ৳80 shipping).`,
          { duration: 8000 }
        );
      }, 1000);

      // Clear cart and navigate to tracking page
      clearCart();
      router.push(`/order/${orderNumber}`);
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        notes: ''
      });

    } catch (error) {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  const finalTotal = totalPrice + 80; // Including ৳80 shipping cost

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-xl">
          <div className="flex items-center">
            <HiShoppingBag className="w-6 h-6 mr-3 text-gray-700" />
            <h2 className="font-display text-display-md text-gray-900">Order Details</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <HiX className="w-6 h-6" />
          </button>
        </div>

        {/* Order Summary */}
        <div className="p-6 bg-white border-b border-gray-200 shadow-sm">
          <h3 className="font-display text-heading-lg text-gray-900 mb-4">Order Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-body-md text-gray-700">Items ({totalItems || 0})</span>
              <span className="text-body-md font-semibold text-gray-900">৳{(totalPrice || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-body-md text-gray-700">Shipping</span>
              <span className="text-body-md font-semibold text-gray-900">৳80.00</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-gray-300">
              <span className="text-heading-lg font-bold text-gray-900">Total</span>
              <span className="text-heading-lg font-bold text-gray-900">৳{((totalPrice || 0) + 80).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="font-display text-heading-lg text-gray-900 mb-4 flex items-center">
              <HiUser className="w-5 h-5 mr-2" />
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-body-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors bg-white text-gray-900 ${
                    errors.fullName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-body-sm mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-body-sm font-medium text-gray-700 mb-2">
                  Email Address (optional)
                </label>
                <div className="relative">
                  <HiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors bg-white text-gray-900 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="your.email@example.com (optional)"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-body-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-body-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <HiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors bg-white text-gray-900 ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="01XXXXXXXXX"
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-body-sm mt-1">{errors.phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Delivery Information */}
          <div>
            <h3 className="font-display text-heading-lg text-gray-900 mb-4 flex items-center">
              <HiLocationMarker className="w-5 h-5 mr-2" />
              Delivery Address
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-body-sm font-medium text-gray-700 mb-2">
                  Street Address *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors bg-white text-gray-900 ${
                    errors.address ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="House number, road/street, area, thana..."
                />
                {errors.address && (
                  <p className="text-red-500 text-body-sm mt-1">{errors.address}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-body-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors bg-white text-gray-900 ${
                      errors.city ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Dhaka, Chittagong, etc."
                  />
                  {errors.city && (
                    <p className="text-red-500 text-body-sm mt-1">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-body-sm font-medium text-gray-700 mb-2">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors bg-white text-gray-900 ${
                      errors.postalCode ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="1000"
                  />
                  {errors.postalCode && (
                    <p className="text-red-500 text-body-sm mt-1">{errors.postalCode}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-body-sm font-medium text-gray-700 mb-2">
                  Special Instructions (Optional)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors bg-white text-gray-900"
                  placeholder="Any special delivery instructions..."
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-200 text-gray-800 py-4 px-6 rounded-xl font-semibold hover:bg-gray-300 transition-colors text-body-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isProcessing}
                className="flex-1 bg-black text-white py-4 px-6 rounded-xl font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-body-md"
              >
                {isProcessing ? 'Processing Order...' : `Confirm Order - ৳${finalTotal.toFixed(2)}`}
              </button>
            </div>
            
            <p className="text-body-sm text-gray-500 text-center mt-4">
              By placing this order, you agree to our terms and conditions. 
              You will receive an email confirmation shortly.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
