'use client';

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
    { id: 1, title: "Premium Anime T-Shirts", description: "Clean, character-driven prints on premium cotton." },
    { id: 2, title: "Jujutsu Kaisen", description: "Official designs, minimal aesthetics." },
    { id: 3, title: "Drop Shoulder", description: "Relaxed oversized fits for daily wear." },
  ];

  const slides = (sliders?.length ? sliders : fallbackSlides).map((s, i) => ({
    key: s._id || s.id || i,
    title: s.title || "",
    description: s.description || "",
    image: s.image || s.img || undefined,
  }));

  // Use useCallback to prevent function recreation on every render
  const go = useCallback((n) => {
    setCurrent((n + slides.length) % slides.length);
  }, [slides.length]);

  const next = useCallback(() => {
    go(current + 1);
  }, [current, go]);

  const prev = useCallback(() => {
    go(current - 1);
  }, [current, go]);

  // Auto-advance effect
  useEffect(() => {
    if (slides.length <= 1) return;
    
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || paused) return;
    
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 2000);
    
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
      className="relative isolate overflow-hidden bg-black text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[26rem] md:h-[32rem] lg:h-[36rem] xl:h-[40rem]">
        {slides.map((s, i) => (
          <Slide key={s.key} active={i === current} slide={s} index={i} total={slides.length} />
        ))}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.6),transparent_15%,transparent_85%,rgba(0,0,0,0.6))]" />
      </div>

      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 backdrop-blur px-3 py-3 hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-white/40"
          >
            <HiChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={next}
            aria-label="Next slide"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 backdrop-blur px-3 py-3 hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-white/40"
          >
            <HiChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === current}
                className={`h-1.5 rounded-full transition-all ${
                  i === current ? "w-8 bg-white" : "w-3 bg-white/40 hover:bg-white/70"
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
      className={`absolute inset-0 transition-opacity duration-700 ${active ? "opacity-100" : "opacity-0"}`}
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${total}`}
      aria-hidden={!active}
    >
      <div className="relative mx-auto h-full max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
        <div className="order-2 lg:order-1">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight">
            {slide.title}
          </h1>
          {slide.description && (
            <p className="mt-4 max-w-xl text-sm md:text-base text-white/70">
              {slide.description}
            </p>
          )}
        </div>

        <div className="order-1 lg:order-2 flex items-center justify-center">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3 shadow-2xl">
            <div className="relative h-56 w-56 sm:h-72 sm:w-72 md:h-80 md:w-80 lg:h-[28rem] lg:w-[28rem]">
              {slide.image ? (
                <Image
                  src={slide.image}
                  alt={slide.title || "Hero image"}
                  fill
                  priority
                  className="object-cover rounded-lg"
                />
              ) : (
                <div className="h-full w-full rounded-lg bg-white/10" />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.045),transparent_55%)]" />
    </div>
  );
}
