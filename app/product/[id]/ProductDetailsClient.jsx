'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';

// Lazy-load heavy modal only when needed
const CheckoutForm = dynamic(() => import('../../components/CheckoutForm'), {
  ssr: false,
  loading: () => null,
});

// Inline small SVGs to avoid pulling big icon packs
const ChevronRightIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const StarIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M11.48 3.5l2.09 4.23c.14.28.41.47.72.52l4.67.68c.79.12 1.1 1.09.53 1.64l-3.38 3.29c-.23.22-.33.54-.28.85l.8 4.64c.14.79-.7 1.39-1.41 1.02l-4.16-2.19a.99.99 0 00-.93 0L6.97 20.4c-.71.37-1.55-.23-1.41-1.02l.8-4.64a1 1 0 00-.28-.85L2.7 10.57c-.57-.55-.26-1.52.53-1.64l4.67-.68c.31-.05.58-.24.72-.52L10.7 3.5c.35-.71 1.37-.71 1.72 0z" />
  </svg>
);

export default function ProductDetailsClient({ product }) {
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [openSections, setOpenSections] = useState({
    features: false,
    size: false,
    care: false,
    shipping: false
  });

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const sizes = product.sizes || ['M', 'L', 'XL'];

  const discountPercentage = useMemo(() => {
    if (product.originalPrice && product.price) {
      return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    }
    return product.discount;
  }, [product.originalPrice, product.price, product.discount]);

  const productImages = useMemo(() => [
    { id: 1, alt: 'Front view', placeholder: 'Main Design' },
    { id: 2, alt: 'Back view', placeholder: 'Back Design' },
    { id: 3, alt: 'Detail view', placeholder: 'Design Detail' },
    { id: 4, alt: 'Model wearing', placeholder: 'Lifestyle Shot' }
  ], []);

  const productFeatures = useMemo(() => [
    '100% Cotton blend fabric',
    'Machine washable',
    'Fade-resistant printing',
    'Pre-shrunk for perfect fit',
    'Reinforced seams',
    'Officially licensed design'
  ], []);

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link href="/" className="text-gray-500 hover:text-black transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <ChevronRightIcon className="w-5 h-5 text-gray-300" />
              </li>
              <li>
                <Link href={`/anime/${product.anime.toLowerCase().replace(/\s+/g, '-')}`} className="text-gray-500 hover:text-black transition-colors">
                  {product.anime}
                </Link>
              </li>
              <li>
                <ChevronRightIcon className="w-5 h-5 text-gray-300" />
              </li>
              <li>
                <span className="text-gray-900 font-medium">{product.name}</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            {/* Main Image */}
            <div className="aspect-square bg-gray-100 rounded-xl mb-4 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <StarIcon className="w-24 h-24 mx-auto mb-4" />
                  <p className="text-lg font-medium">{productImages[activeImageIndex].placeholder}</p>
                  <p className="text-sm text-gray-500">{product.name}</p>
                </div>
              </div>
            </div>

            {/* Image Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {productImages.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setActiveImageIndex(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    index === activeImageIndex ? 'border-black' : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <StarIcon className="w-8 h-8 mx-auto mb-1" />
                      <p className="text-xs">{image.alt}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            {/* Categories */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm bg-black text-white px-3 py-1 rounded">
                {product.anime}
              </span>
              <span className="text-sm bg-gray-200 text-black px-3 py-1 rounded">
                {product.category}
              </span>
              {product.isNew && (
                <span className="text-sm bg-green-500 text-white px-3 py-1 rounded font-bold">
                  NEW
                </span>
              )}
              {discountPercentage && (
                <span className="text-sm bg-red-500 text-white px-3 py-1 rounded font-bold">
                  SALE
                </span>
              )}
            </div>

            {/* Product Name */}
            <h1 className="font-display text-display-md md:text-display-lg text-gray-900 mb-6 leading-tight">{product.name}</h1>

            {/* Price */}
            <div className="flex items-center gap-6 mb-8">
              <span className="text-display-md font-bold text-gray-900 tracking-wide">
                ৳{product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-heading-lg text-gray-500 line-through">
                  ৳{product.originalPrice.toFixed(2)}
                </span>
              )}
              {discountPercentage && (
                <span className="text-body-lg text-green-600 font-semibold tracking-wide">
                  Save ৳{(product.originalPrice - product.price).toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed">
                Express your passion for {product.anime} with this premium quality t-shirt featuring authentic designs. 
                Made from 100% cotton blend for maximum comfort and durability. Perfect for fans who want to 
                showcase their love for anime in style.
              </p>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="font-display text-heading-lg text-gray-900 mb-3">Size</h3>
              <div className="flex gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 border-2 rounded-lg font-semibold transition-colors ${
                      selectedSize === size
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 text-gray-900 hover:border-black hover:bg-gray-50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="font-display text-heading-lg text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center border border-gray-300 rounded-lg w-32 bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900 font-semibold"
                >
                  -
                </button>
                <span className="flex-1 text-center py-2 font-semibold text-gray-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900 font-semibold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4 mb-8">
              <button 
                onClick={() => {
                  addToCart(product, selectedSize, quantity);
                  toast.success(`Added ${quantity} x ${product.name} (${selectedSize}) to cart!`);
                }}
                className="w-full bg-black text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors"
              >
                Add to Cart - ৳{(product.price * quantity).toFixed(2)}
              </button>
              <button 
                onClick={() => {
                  addToCart(product, selectedSize, quantity);
                  toast.success('Item added to cart!');
                  setShowCheckoutForm(true);
                }}
                className="w-full border-2 border-black text-black py-4 px-6 rounded-lg font-semibold text-lg hover:bg-black hover:text-white transition-colors"
              >
                Order Now - ৳{(product.price * quantity).toFixed(2)}
              </button>
            </div>

            
          </div>
        </div>

        {/* More Details (collapsed sections by default) */}
        <div className="mt-12 max-w-4xl">
          {/* Size Guide */}
          <div className="border-t border-gray-200">
            <button
              type="button"
              onClick={() => toggleSection('size')}
              className="w-full flex items-center justify-between py-4"
              aria-expanded={openSections.size}
            >
              <span className="font-display text-heading-lg text-gray-900">Size Guide</span>
              <ChevronRightIcon className={`w-5 h-5 text-gray-500 transition-transform ${openSections.size ? 'rotate-90' : ''}`} />
            </button>
            {openSections.size && (
              <div className="pb-6 space-y-2 text-body-sm">
                <div className="flex justify-between"><span className="font-medium text-gray-900">M:</span><span className="text-gray-700">Chest 38-40"</span></div>
                <div className="flex justify-between"><span className="font-medium text-gray-900">L:</span><span className="text-gray-700">Chest 42-44"</span></div>
                <div className="flex justify-between"><span className="font-medium text-gray-900">XL:</span><span className="text-gray-700">Chest 46-48"</span></div>
              </div>
            )}
          </div>

          {/* Care Instructions */}
          <div className="border-t border-gray-200">
            <button
              type="button"
              onClick={() => toggleSection('care')}
              className="w-full flex items-center justify-between py-4"
              aria-expanded={openSections.care}
            >
              <span className="font-display text-heading-lg text-gray-900">Care Instructions</span>
              <ChevronRightIcon className={`w-5 h-5 text-gray-500 transition-transform ${openSections.care ? 'rotate-90' : ''}`} />
            </button>
            {openSections.care && (
              <div className="pb-6">
                <ul className="space-y-1 text-body-sm text-gray-700">
                  <li>• Machine wash cold</li>
                  <li>• Tumble dry low</li>
                  <li>• Do not bleach</li>
                  <li>• Iron inside out</li>
                  <li>• Do not dry clean</li>
                </ul>
              </div>
            )}
          </div>

          {/* Shipping */}
          <div className="border-t border-gray-200">
            <button
              type="button"
              onClick={() => toggleSection('shipping')}
              className="w-full flex items-center justify-between py-4"
              aria-expanded={openSections.shipping}
            >
              <span className="font-display text-heading-lg text-gray-900">Shipping</span>
              <ChevronRightIcon className={`w-5 h-5 text-gray-500 transition-transform ${openSections.shipping ? 'rotate-90' : ''}`} />
            </button>
            {openSections.shipping && (
              <div className="pb-6">
                <ul className="space-y-1 text-body-sm text-gray-700">
                  <li>• Free shipping on orders ৳500+</li>
                  <li>• Standard: 3-5 business days</li>
                  <li>• Express: 1-2 business days</li>
                  <li>• International shipping available</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Checkout Form Modal */}
      <CheckoutForm 
        isOpen={showCheckoutForm}
        onClose={() => setShowCheckoutForm(false)}
        orderType="single"
      />
    </>
  );
}


