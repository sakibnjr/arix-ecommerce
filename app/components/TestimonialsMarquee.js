"use client";

import { motion } from "framer-motion";

const reviews = [
  {
    name: "Ayesha K.",
    text: "Top-notch quality! The print looks amazing and the fabric is comfy.",
  },
  {
    name: "Rifat H.",
    text: "Loved the minimal packaging and super fast delivery. Will buy again.",
  },
  {
    name: "Sadia N.",
    text: "Perfect fit. The black and white theme is classy and clean.",
  },
  {
    name: "Tanvir R.",
    text: "Great value for money. The Naruto design is crisp and detailed.",
  },
  {
    name: "Mehedi I.",
    text: "Customer support was helpful and responsive. Highly recommended.",
  },
  {
    name: "Zara S.",
    text: "Exactly as pictured. Subtle, modern and eye-catching.",
  },
];

function Row({ reversed = false }) {
  const items = reversed ? [...reviews].reverse() : reviews;
  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex gap-4 will-change-transform"
        aria-hidden
        animate={{ x: ["-100%", "0%"] }}
        transition={{ duration: 25, ease: "linear", repeat: Infinity }}
      >
        {[...items, ...items].map((r, idx) => (
          <div
            key={`${r.name}-${idx}`}
            className="min-w-[320px] sm:min-w-[380px] md:min-w-[440px] bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
          >
            <p className="text-gray-900">“{r.text}”</p>
            <p className="mt-2 text-sm text-gray-600">— {r.name}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function TestimonialsMarquee() {
  return (
    <section className="py-8 sm:py-10 border-y border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="w-6 h-px bg-black/20" />
            <span className="text-xs font-medium text-black/60 tracking-widest uppercase">
              Reviews
            </span>
            <div className="w-6 h-px bg-black/20" />
          </div>

          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 leading-tight">
            What our customers say
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Some words from our buyers about their experience with us.
          </p>
        </motion.div>

        <div className="space-y-4">
          <Row />
          <Row reversed />
        </div>
      </div>
    </section>
  );
}
