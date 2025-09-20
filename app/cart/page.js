"use client";

import { useState } from "react";
import CheckoutForm from "../components/CheckoutForm";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import {
  HiChevronRight,
  HiX,
  HiPlus,
  HiMinus,
  HiShoppingBag,
} from "react-icons/hi";
import { AiFillStar } from "react-icons/ai";
import toast from "react-hot-toast";

export default function CartPage() {
  const {
    items,
    totalItems,
    totalPrice,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  const handleQuantityChange = (id, size, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id, size);
      toast.success("Item removed from cart");
    } else {
      updateQuantity(id, size, newQuantity);
      toast.success("Quantity updated");
    }
  };

  const handleRemoveItem = (id, size) => {
    removeFromCart(id, size);
    toast.success("Item removed from cart");
  };

  const handleClearCart = () => {
    clearCart();
    toast.success("Cart cleared");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link
                  href="/"
                  className="text-gray-500 hover:text-black transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <HiChevronRight className="w-5 h-5 text-gray-300" />
              </li>
              <li>
                <span className="text-gray-900 font-medium">Shopping Cart</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Cart Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-display-md md:text-display-lg text-gray-900 mb-8 leading-tight">
            Shopping Cart
          </h1>
          {items.length > 0 && (
            <button
              onClick={handleClearCart}
              className="text-gray-500 hover:text-red-600 transition-colors text-sm"
            >
              Clear Cart
            </button>
          )}
        </div>

        {items.length === 0 ? (
          /* Empty Cart */
          <div className="text-center py-16">
            <div className="mb-8">
              <HiShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-500 mb-8">
                Looks like you haven&apos;t added any anime t-shirts to your
                cart yet.
              </p>
              <Link
                href="/"
                className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors inline-flex items-center"
              >
                Continue Shopping
                <HiChevronRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        ) : (
          /* Cart with Items */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="font-display text-heading-lg text-gray-900">
                    Cart Items ({totalItems}{" "}
                    {totalItems === 1 ? "item" : "items"})
                  </h2>
                </div>

                <div className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="p-6">
                      <div className="flex items-start space-x-4">
                        {/* Product Image */}
                        <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
                          {item.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <AiFillStar className="w-8 h-8 text-gray-400" />
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                <Link
                                  href={`/product/${item.id}`}
                                  className="hover:text-gray-700 transition-colors"
                                >
                                  {item.name}
                                </Link>
                              </h3>
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-body-sm bg-black text-white px-2 py-1 rounded">
                                  {item.anime}
                                </span>
                                <span className="text-body-sm bg-gray-200 text-black px-2 py-1 rounded">
                                  {item.category}
                                </span>
                                <span className="text-body-sm bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                  Size: {item.size}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-gray-900">
                                  ৳{item.price.toFixed(2)}
                                </span>
                                {item.originalPrice && (
                                  <span className="text-sm text-gray-500 line-through">
                                    ৳{item.originalPrice.toFixed(2)}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Remove Button */}
                            <button
                              onClick={() =>
                                handleRemoveItem(item.id, item.size)
                              }
                              className="text-gray-400 hover:text-red-600 transition-colors p-1"
                              title="Remove item"
                            >
                              <HiX className="w-5 h-5" />
                            </button>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center border border-gray-300 rounded-lg bg-white">
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    item.id,
                                    item.size,
                                    item.quantity - 1
                                  )
                                }
                                className="p-2 hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900"
                                disabled={item.quantity <= 1}
                              >
                                <HiMinus className="w-4 h-4" />
                              </button>
                              <span className="px-4 py-2 font-semibold min-w-[50px] text-center text-gray-900">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    item.id,
                                    item.size,
                                    item.quantity + 1
                                  )
                                }
                                className="p-2 hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900"
                              >
                                <HiPlus className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="text-right">
                              <div className="text-lg font-bold text-gray-900">
                                ৳{(item.price * item.quantity).toFixed(2)}
                              </div>
                              <div className="text-sm text-gray-500">
                                ৳{item.price.toFixed(2)} each
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Continue Shopping */}
              <div className="mt-6">
                <Link
                  href="/"
                  className="text-body-md text-gray-700 hover:text-black transition-colors inline-flex items-center"
                >
                  <HiChevronRight className="w-5 h-5 mr-2 rotate-180" />
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24 shadow-sm">
                <h2 className="font-display text-heading-lg text-gray-900 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-body-md text-gray-700">
                      Items ({totalItems})
                    </span>
                    <span className="font-semibold text-gray-900">
                      ৳{totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-body-md text-gray-700">Shipping</span>
                    <span className="font-semibold text-gray-900">৳80.00</span>
                  </div>
                  <div className="border-t border-gray-300 pt-4">
                    <div className="flex justify-between">
                      <span className="text-heading-lg font-semibold text-gray-900">
                        Total
                      </span>
                      <span className="text-heading-lg font-bold text-gray-900">
                        ৳{(totalPrice + 80).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowCheckoutForm(true)}
                  className="w-full bg-black text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors"
                >
                  Place Order
                </button>

                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500">
                    Standard shipping: ৳80 for all orders
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Checkout Form Modal */}
      <CheckoutForm
        isOpen={showCheckoutForm}
        onClose={() => setShowCheckoutForm(false)}
        orderType="cart"
      />
    </div>
  );
}
