'use client';

import Link from 'next/link';
import Image from 'next/image';
import { HiArrowRight } from 'react-icons/hi';
import { motion } from 'framer-motion';

export default function CategoriesSection() {
  const categories = [
    {
      id: 1,
      name: 'Classic T-Shirts',
      description: 'Classic fit t-shirts with premium comfort and quality',
      image: 'https://images.unsplash.com/photo-1706801023261-1b7878b7bbfb?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      href: '/products?category=normal',
      color: 'from-black to-gray-800',
      features: ['Regular Fit', 'Cotton Blend', 'Durable Print']
    },
    {
      id: 2,
      name: 'Drop Shoulder T-Shirts',
      description: 'Relaxed oversized fit for ultimate comfort and style',
      image: 'https://images.unsplash.com/photo-1593278641722-49b1047ede21?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFuaW1lJTIwdHNoaXJ0fGVufDB8fDB8fHww',
      href: '/products?category=drop-shoulder',
      color: 'from-gray-800 to-black',
      features: ['Oversized Fit', 'Soft Cotton', 'Trendy Design']
    }
  ];

  return (
    <section className="relative py-8 sm:py-12 lg:py-16 bg-white overflow-hidden">
      {/* Sophisticated Background Elements */}
      <div className="absolute inset-0">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-50/30" />
        
        {/* Geometric accent elements */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-br from-black/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-black/5 to-transparent rounded-full blur-3xl" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          {/* Subtle accent line */}
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="w-6 h-px bg-black/20" />
            <span className="text-xs font-medium text-black/60 tracking-widest uppercase">Styles</span>
            <div className="w-6 h-px bg-black/20" />
          </div>
          
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 leading-tight">
            Shop by Style
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Choose your perfect fit from our carefully curated collection of t-shirt styles
          </p>
        </motion.div>

        {/* Enhanced Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group"
            >
              <Link
                href={category.href}
                className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 block h-full"
              >
                <div className={`relative p-6 sm:p-8 lg:p-10 min-h-[320px] sm:min-h-[360px] flex flex-col justify-between overflow-hidden h-full`}>
                  {/* Full background image */}
                  <Image
                    src={category.image}
                    alt={`${category.name} preview`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    priority={index === 0}
                  />
                  {/* Gradient overlay for readability */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-70`} />

                  {/* Content */}
                  <div className="text-white relative z-10">
                    <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold leading-tight mb-3">
                      {category.name}
                    </h3>
                    <p className="text-gray-200 text-sm sm:text-base max-w-md leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-6 sm:mt-8 relative z-10">
                    <span className="inline-flex items-center bg-white text-gray-900 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold group-hover:bg-gray-100 transition-all duration-300 shadow-lg group-hover:shadow-xl text-sm sm:text-base">
                      Shop {category.name}
                      <HiArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
