'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { sampleProducts } from '../../data/sampleProducts';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { HiChevronRight, HiCheckCircle } from 'react-icons/hi';
import { AiFillStar } from 'react-icons/ai';
import { useCart } from '../../context/CartContext';
import CheckoutForm from '../../components/CheckoutForm';
import toast from 'react-hot-toast';

export default function ProductDetailsPage() {
  const params = useParams();
  const productId = parseInt(params.id);
  const product = sampleProducts.find(p => p.id === productId);
  const { addToCart } = useCart();
  
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
            <Link href="/" className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const {
    name,
    price,
    originalPrice,
    anime,
    category,
    sizes = ['M', 'L', 'XL'],
    isNew,
    discount
  } = product;

  const discountPercentage = originalPrice && price 
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : discount;

  // Mock additional images for gallery
  const productImages = [
    { id: 1, alt: 'Front view', placeholder: 'Main Design' },
    { id: 2, alt: 'Back view', placeholder: 'Back Design' },
    { id: 3, alt: 'Detail view', placeholder: 'Design Detail' },
    { id: 4, alt: 'Model wearing', placeholder: 'Lifestyle Shot' }
  ];

  const productFeatures = [
    '100% Cotton blend fabric',
    'Machine washable',
    'Fade-resistant printing',
    'Pre-shrunk for perfect fit',
    'Reinforced seams',
    'Officially licensed design'
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
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
                <HiChevronRight className="w-5 h-5 text-gray-300" />
              </li>
              <li>
                <Link href={`/anime/${anime.toLowerCase().replace(/\s+/g, '-')}`} className="text-gray-500 hover:text-black transition-colors">
                  {anime}
                </Link>
              </li>
              <li>
                <HiChevronRight className="w-5 h-5 text-gray-300" />
              </li>
              <li>
                <span className="text-gray-900 font-medium">{name}</span>
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
                  <AiFillStar className="w-24 h-24 mx-auto mb-4" />
                  <p className="text-lg font-medium">{productImages[activeImageIndex].placeholder}</p>
                  <p className="text-sm text-gray-500">{name}</p>
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
                      <AiFillStar className="w-8 h-8 mx-auto mb-1" />
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
                {anime}
              </span>
              <span className="text-sm bg-gray-200 text-black px-3 py-1 rounded">
                {category}
              </span>
              {isNew && (
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
            <h1 className="font-display text-display-md md:text-display-lg text-gray-900 mb-6 leading-tight">{name}</h1>

            {/* Price */}
            <div className="flex items-center gap-6 mb-8">
              <span className="text-display-md font-bold text-gray-900 tracking-wide">
                ৳{price.toFixed(2)}
              </span>
              {originalPrice && (
                <span className="text-heading-lg text-gray-500 line-through">
                  ৳{originalPrice.toFixed(2)}
                </span>
              )}
              {discountPercentage && (
                <span className="text-body-lg text-green-600 font-semibold tracking-wide">
                  Save ৳{(originalPrice - price).toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed">
                Express your passion for {anime} with this premium quality t-shirt featuring authentic designs. 
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
                Add to Cart - ৳{(price * quantity).toFixed(2)}
              </button>
              <button 
                onClick={() => {
                  addToCart(product, selectedSize, quantity);
                  toast.success('Item added to cart!');
                  setShowCheckoutForm(true);
                }}
                className="w-full border-2 border-black text-black py-4 px-6 rounded-lg font-semibold text-lg hover:bg-black hover:text-white transition-colors"
              >
                Order Now - ৳{(price * quantity).toFixed(2)}
              </button>
            </div>

            {/* Product Features */}
            <div>
              <h3 className="font-display text-heading-lg text-gray-900 mb-4">Features</h3>
              <ul className="space-y-2">
                {productFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <HiCheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-body-md text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Additional Info Tabs */}
        <div className="mt-16 border-t pt-16">
          <div className="max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
                <h3 className="font-display text-heading-lg text-gray-900 mb-3">Size Guide</h3>
                <div className="space-y-2 text-body-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-900">M:</span>
                    <span className="text-gray-700">Chest 38-40"</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-900">L:</span>
                    <span className="text-gray-700">Chest 42-44"</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-900">XL:</span>
                    <span className="text-gray-700">Chest 46-48"</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
                <h3 className="font-display text-heading-lg text-gray-900 mb-3">Care Instructions</h3>
                <ul className="space-y-1 text-body-sm text-gray-700">
                  <li>• Machine wash cold</li>
                  <li>• Tumble dry low</li>
                  <li>• Do not bleach</li>
                  <li>• Iron inside out</li>
                  <li>• Do not dry clean</li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
                <h3 className="font-display text-heading-lg text-gray-900 mb-3">Shipping</h3>
                <ul className="space-y-1 text-body-sm text-gray-700">
                  <li>• Free shipping on orders ৳500+</li>
                  <li>• Standard: 3-5 business days</li>
                  <li>• Express: 1-2 business days</li>
                  <li>• International shipping available</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
      
      {/* Checkout Form Modal */}
      <CheckoutForm 
        isOpen={showCheckoutForm}
        onClose={() => setShowCheckoutForm(false)}
        orderType="single"
      />
    </div>
  );
}
