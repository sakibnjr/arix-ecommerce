"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast";
import { formatCategoryLabel } from "../../utils/categoryFormatter";

// Lazy-load heavy modal only when needed
const CheckoutForm = dynamic(() => import("../../components/CheckoutForm"), {
  ssr: false,
  loading: () => null,
});

// Inline small SVGs to avoid pulling big icon packs
const ChevronRightIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    {...props}
  >
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

  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [openSections, setOpenSections] = useState({
    features: false,
    size: false,
    care: false,
    shipping: false,
  });

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const sizes = product.sizes || ["M", "L", "XL"];

  const discountPercentage = useMemo(() => {
    if (product.originalPrice && product.price) {
      return Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      );
    }
    return product.discount;
  }, [product.originalPrice, product.price, product.discount]);
  const hasDiscount = Number(discountPercentage) > 0;

  const productImages = useMemo(() => {
    const images = [];

    // Front view
    if (product.images?.front) {
      images.push({
        id: 1,
        src: product.images.front,
        alt: "Front view",
        placeholder: "Front View",
      });
    }

    // Back view
    if (product.images?.back) {
      images.push({
        id: 2,
        src: product.images.back,
        alt: "Back view",
        placeholder: "Back View",
      });
    }

    // Detail view
    if (product.images?.detail) {
      images.push({
        id: 3,
        src: product.images.detail,
        alt: "Detail view",
        placeholder: "Detail View",
      });
    }

    // If no images available, show placeholders
    if (images.length === 0) {
      return [
        { id: 1, alt: "Front view", placeholder: "Front View" },
        { id: 2, alt: "Back view", placeholder: "Back View" },
        { id: 3, alt: "Detail view", placeholder: "Detail View" },
      ];
    }

    return images;
  }, [product.images]);

  const productFeatures = useMemo(
    () => [
      "100% Cotton blend fabric",
      "Machine washable",
      "Fade-resistant printing",
      "Pre-shrunk for perfect fit",
      "Reinforced seams",
      "Officially licensed design",
    ],
    []
  );

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-white py-3 sm:py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-3 sm:space-x-4">
              <li>
                <Link
                  href="/"
                  className="text-sm sm:text-base text-gray-500 hover:text-black transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" />
              </li>
              <li>
                <Link
                  href={`/anime/${product.anime
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="text-sm sm:text-base text-gray-500 hover:text-black transition-colors"
                >
                  {product.anime}
                </Link>
              </li>
              <li>
                <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:w-5 text-gray-300" />
              </li>
              <li>
                <span className="text-sm sm:text-base text-gray-900 font-medium">
                  {product.name}
                </span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 lg:items-start">
          {/* Enhanced Product Images */}
          <div>
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-50 rounded-xl mb-4 overflow-hidden border border-gray-200">
              {productImages[activeImageIndex]?.src ? (
                <Image
                  src={productImages[activeImageIndex].src}
                  alt={productImages[activeImageIndex].alt}
                  fill
                  className="object-cover object-center"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority={activeImageIndex === 0}
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <StarIcon className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3" />
                    <p className="text-base sm:text-lg font-medium">
                      {productImages[activeImageIndex]?.placeholder ||
                        "No Image"}
                    </p>
                    <p className="text-sm text-gray-500">{product.name}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Image Thumbnails */}
            <div className="grid grid-cols-3 gap-3">
              {productImages.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setActiveImageIndex(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden border transition-colors ${
                    index === activeImageIndex
                      ? "border-black ring-2 ring-black"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  {image.src ? (
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover object-center"
                      sizes="120px"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <StarIcon className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1" />
                        <p className="text-xs">{image.alt}</p>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:pl-8 lg:sticky lg:top-24">
            {/* Enhanced Categories */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs sm:text-sm bg-black text-white px-2.5 sm:px-3 py-1 rounded-full font-medium">
                {product.anime}
              </span>
              <span className="text-xs sm:text-sm bg-white text-gray-800 px-2.5 sm:px-3 py-1 rounded-full font-medium border border-gray-300">
                {formatCategoryLabel(product.category)}
              </span>
              {product.isNew && (
                <span className="text-xs sm:text-sm bg-white text-gray-900 px-2.5 sm:px-3 py-1 rounded-full font-medium border border-gray-300">
                  NEW
                </span>
              )}
              {hasDiscount && (
                <span className="text-xs sm:text-sm bg-black text-white px-2.5 sm:px-3 py-1 rounded-full font-medium">
                  SALE
                </span>
              )}
            </div>

            {/* Enhanced Product Name */}
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl text-gray-900 mb-3 sm:mb-5 leading-tight">
              {product.name}
            </h1>

            {/* Enhanced Price */}
            <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                ৳{product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-base sm:text-lg text-gray-500 line-through">
                  ৳{product.originalPrice.toFixed(2)}
                </span>
              )}
              {hasDiscount && (
                <span className="text-sm sm:text-base text-gray-700">
                  Save ৳{(product.originalPrice - product.price).toFixed(2)}
                </span>
              )}
            </div>

            {/* Enhanced Description */}
            <div className="mb-6">
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Express your passion for {product.anime} with this premium
                quality t-shirt featuring authentic designs. Made from 100%
                cotton blend for maximum comfort and durability. Perfect for
                fans who want to showcase their love for anime in style.
              </p>
            </div>

            {/* Enhanced Size Selection */}
            <div className="mb-6">
              <h3 className="font-display text-base sm:text-lg text-gray-900 mb-2">
                Size
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 sm:px-4 h-9 sm:h-10 border rounded-full font-medium text-sm transition-colors ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-gray-300 text-gray-900 hover:border-black hover:bg-gray-50"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Enhanced Quantity */}
            <div className="mb-6 sm:mb-8">
              <h3 className="font-display text-base sm:text-lg text-gray-900 mb-2">
                Quantity
              </h3>
              <div className="inline-flex items-center border border-gray-300 rounded-full bg-white overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-gray-700 hover:bg-gray-100"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="px-4 py-2 font-semibold text-gray-900 select-none">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-gray-700 hover:bg-gray-100"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Enhanced Add to Cart */}
            <div className="space-y-3 sm:space-y-4 mb-8">
              <button
                onClick={() => {
                  addToCart(product, selectedSize, quantity);
                  toast.success(
                    `Added ${quantity} x ${product.name} (${selectedSize}) to cart!`
                  );
                }}
                className="w-full bg-black text-white py-3 sm:py-3.5 px-6 rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-900 transition-colors"
              >
                Add to Cart - ৳{(product.price * quantity).toFixed(2)}
              </button>
              <button
                onClick={() => {
                  addToCart(product, selectedSize, quantity);
                  toast.success("Item added to cart!");
                  setShowCheckoutForm(true);
                }}
                className="w-full border border-black text-black py-3 sm:py-3.5 px-6 rounded-lg font-semibold text-base sm:text-lg hover:bg-black hover:text-white transition-colors"
              >
                Order Now - ৳{(product.price * quantity).toFixed(2)}
              </button>
            </div>
          </div>
        </div>

        {/* More Details */}
        <div className="mt-8 sm:mt-12 max-w-3xl">
          {/* Enhanced Size Guide */}
          <div className="border-t border-gray-200">
            <button
              type="button"
              onClick={() => toggleSection("size")}
              className="w-full flex items-center justify-between py-4 px-1 sm:px-2 rounded-md hover:bg-gray-50"
              aria-expanded={openSections.size}
            >
              <span className="font-display text-lg sm:text-xl text-gray-900">
                Size Guide
              </span>
              <div
                className={`transition-transform duration-300 ${
                  openSections.size ? "rotate-90" : ""
                }`}
              >
                <ChevronRightIcon className="w-5 h-5 text-gray-500" />
              </div>
            </button>
            {openSections.size && (
              <div className="pb-6 px-1 sm:px-2 space-y-2 text-sm sm:text-base">
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
            )}
          </div>

          {/* Enhanced Care Instructions */}
          <div className="border-t border-gray-200">
            <button
              type="button"
              onClick={() => toggleSection("care")}
              className="w-full flex items-center justify-between py-4 px-1 sm:px-2 rounded-md hover:bg-gray-50"
              aria-expanded={openSections.care}
            >
              <span className="font-display text-lg sm:text-xl text-gray-900">
                Care Instructions
              </span>
              <div
                className={`transition-transform duration-300 ${
                  openSections.care ? "rotate-90" : ""
                }`}
              >
                <ChevronRightIcon className="w-5 h-5 text-gray-500" />
              </div>
            </button>
            {openSections.care && (
              <div className="pb-6 px-1 sm:px-2">
                <ul className="space-y-1 text-sm sm:text-base text-gray-700">
                  <li>• Machine wash cold</li>
                  <li>• Tumble dry low</li>
                  <li>• Do not bleach</li>
                  <li>• Iron inside out</li>
                  <li>• Do not dry clean</li>
                </ul>
              </div>
            )}
          </div>

          {/* Enhanced Shipping */}
          <div className="border-t border-gray-200">
            <button
              type="button"
              onClick={() => toggleSection("shipping")}
              className="w-full flex items-center justify-between py-4 px-1 sm:px-2 rounded-md hover:bg-gray-50"
              aria-expanded={openSections.shipping}
            >
              <span className="font-display text-lg sm:text-xl text-gray-900">
                Shipping
              </span>
              <div
                className={`transition-transform duration-300 ${
                  openSections.shipping ? "rotate-90" : ""
                }`}
              >
                <ChevronRightIcon className="w-5 h-5 text-gray-500" />
              </div>
            </button>
            {openSections.shipping && (
              <div className="pb-6 px-1 sm:px-2">
                <ul className="space-y-1 text-sm sm:text-base text-gray-700">
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
