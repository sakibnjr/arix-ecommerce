"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useHomepageSliders } from "../hooks/useSliderData";

export default function HeroSlider() {
  const { sliders, loading } = useHomepageSliders();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const carouselRef = useRef(null);

  const fallbackSlides = [
    {
      id: 1,
      title: "Premium Anime T-Shirts",
      description: "Clean, character-driven prints on premium cotton.",
    },
    {
      id: 2,
      title: "Jujutsu Kaisen",
      description: "Official designs, minimal aesthetics.",
    },
    {
      id: 3,
      title: "Drop Shoulder",
      description: "Relaxed oversized fits for daily wear.",
    },
  ];

  const slides = (sliders?.length ? sliders : fallbackSlides).map((s, i) => ({
    key: s._id || s.id || i,
    title: s.title || "",
    description: s.description || "",
    image: s.image || s.img || undefined,
  }));

  // Use useCallback to prevent function recreation on every render
  const go = useCallback(
    (n) => {
      setCurrent((n + slides.length) % slides.length);
    },
    [slides.length]
  );

  const next = useCallback(() => {
    go(current + 1);
  }, [current, go]);

  const prev = useCallback(() => {
    go(current - 1);
  }, [current, go]);

  // Auto-advance effect
  useEffect(() => {
    if (slides.length <= 1) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced || paused) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [paused, slides.length]);

  // Keyboard navigation effect
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [next, prev]);

  return (
    <section
      ref={carouselRef}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured collections"
      className="relative isolate overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div className="relative h-[28rem] sm:h-[32rem] md:h-[36rem] lg:h-[42rem] xl:h-[48rem]">
        {slides.map((s, i) => (
          <Slide
            key={s.key}
            active={i === current}
            slide={s}
            index={i}
            total={slides.length}
          />
        ))}
        {/* Enhanced overlay gradients */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.7),transparent_20%,transparent_80%,rgba(0,0,0,0.7))]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
      </div>

      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-2 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md w-10 h-10 sm:w-12 sm:h-12 hover:bg-white/20 hover:border-white/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 z-20 group"
          >
            <HiChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-white group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={next}
            aria-label="Next slide"
            className="absolute right-2 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md w-10 h-10 sm:w-12 sm:h-12 hover:bg-white/20 hover:border-white/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 z-20 group"
          >
            <HiChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-white group-hover:scale-110 transition-transform" />
          </button>

          {/* Dot Navigation */}
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-3 z-20">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === current}
                className={`rounded-full transition-all duration-300 hover:scale-110 ${
                  i === current
                    ? "h-2 w-8 sm:h-2.5 sm:w-10 bg-white shadow-lg"
                    : "h-2 w-2 sm:h-2.5 sm:w-2.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

function Slide({ active, slide, index, total }) {
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-700 ${
        active ? "opacity-100" : "opacity-0"
      }`}
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${total}`}
      aria-hidden={!active}
    >
      <div className="relative mx-auto h-full max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 items-center gap-6 sm:gap-8 lg:gap-12">
        <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left px-2 sm:px-4 lg:px-6 space-y-4 sm:space-y-6">
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-tight max-w-2xl">
            {slide.title}
          </h1>
          {slide.description && (
            <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {slide.description}
            </p>
          )}
        </div>

        <div className="order-1 lg:order-2 flex items-center justify-center">
          <div className="relative overflow-hidden rounded-2xl lg:rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-3 sm:p-4 lg:p-6 shadow-2xl backdrop-blur-sm">
            <div className="relative h-48 w-48 sm:h-64 sm:w-64 md:h-80 md:w-80 lg:h-[26rem] lg:w-[26rem] xl:h-[30rem] xl:w-[30rem]">
              {slide.image ? (
                <Image
                  src={slide.image}
                  alt={slide.title || "Hero image"}
                  fill
                  priority
                  className="object-cover rounded-lg lg:rounded-xl"
                />
              ) : (
                <div className="h-full w-full rounded-lg lg:rounded-xl bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center">
                  <div className="text-white/40 text-center">
                    <svg
                      className="w-16 h-16 mx-auto mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-sm font-medium">Image Coming Soon</p>
                  </div>
                </div>
              )}
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-xl" />
            <div className="absolute -bottom-3 -left-3 w-20 h-20 bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-xl" />
          </div>
        </div>
      </div>
      {/* Enhanced background effects */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent" />
    </div>
  );
}
