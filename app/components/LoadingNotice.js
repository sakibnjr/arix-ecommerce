"use client";

import { useState, useEffect } from "react";

export default function LoadingNotice() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Auto-hide the notice after 45 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 45000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <p className="text-sm font-medium">
              ⚡ Due to free hosting, initial load may take up to 30-40 seconds.
              Thank you for your patience!
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="flex-shrink-0 ml-4 text-white hover:text-gray-200 transition-colors"
          aria-label="Close notice"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
