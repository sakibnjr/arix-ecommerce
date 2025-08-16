'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { AiFillStar } from 'react-icons/ai';

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Premium Anime T-Shirts",
      backgroundColor: "bg-gradient-to-r from-black to-gray-800"
    },
    {
      id: 2,
      title: "Jujutsu Kaisen",
      backgroundColor: "bg-gradient-to-r from-gray-900 to-black"
    },
    {
      id: 3,
      title: "Drop Shoulder Style",
      backgroundColor: "bg-gradient-to-r from-gray-800 to-gray-700"
    },
    {
      id: 4,
      title: "Solo Leveling",
      backgroundColor: "bg-gradient-to-r from-gray-700 to-black"
    }
  ];

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative h-[28rem] md:h-[32rem] lg:h-[36rem] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className={`h-full w-full ${slide.backgroundColor} flex items-center`}>
            <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Content */}
                <div className="text-white text-center lg:text-left">
                  <h1 className="font-display text-display-lg md:text-display-xl lg:text-6xl xl:text-7xl text-white leading-tight mb-6">
                    {slide.title}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all z-10"
        aria-label="Previous slide"
      >
        <HiChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all z-10"
        aria-label="Next slide"
      >
        <HiChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide 
                ? 'bg-white' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>


    </div>
  );
}
