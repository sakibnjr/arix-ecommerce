'use client';

import Link from 'next/link';
import { HiArrowRight, HiCheckCircle, HiLightBulb, HiHeart } from 'react-icons/hi';
import { AiFillStar } from 'react-icons/ai';
import { motion } from 'framer-motion';

export default function CategoriesSection() {
  const categories = [
    {
      id: 1,
      name: 'Normal T-Shirts',
      description: 'Classic fit t-shirts with premium comfort and quality',
      image: '/placeholder-normal-tshirt.jpg',
      href: '/products?category=Normal T-Shirt',
      color: 'from-black to-gray-800',
      features: ['Regular Fit', 'Cotton Blend', 'Durable Print']
    },
    {
      id: 2,
      name: 'Drop Shoulder T-Shirts',
      description: 'Relaxed oversized fit for ultimate comfort and style',
      image: '/placeholder-drop-shoulder.jpg',
      href: '/products?category=Drop Shoulder',
      color: 'from-gray-800 to-black',
      features: ['Oversized Fit', 'Soft Cotton', 'Trendy Design']
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-display-md md:text-display-lg text-gray-900 mb-6 leading-tight">
            Shop by Style
          </h2>
          <p className="text-body-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Choose your perfect fit from our carefully curated collection of t-shirt styles
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <Link
                href={category.href}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 block"
              >
              <div className={`bg-gradient-to-br ${category.color} p-10 lg:p-16 min-h-[420px] flex flex-col justify-between`}>
                {/* Content */}
                <div className="text-white">
                  <h3 className="font-display text-heading-xl md:text-display-md font-bold leading-tight">
                    {category.name}
                  </h3>
                </div>

                {/* Image Placeholder */}
                <div className="relative">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex items-center justify-center aspect-square max-w-xs ml-auto">
                    <div className="text-center text-white/80">
                      <AiFillStar className="w-20 h-20 mx-auto mb-3" />
                      <p className="text-sm font-medium">
                        {category.name.split(' ')[0]} Style
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="mt-8">
                  <span className="inline-flex items-center bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold group-hover:bg-gray-100 transition-colors">
                    Shop {category.name}
                    <HiArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 opacity-20">
                  <AiFillStar className="w-24 h-24" />
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
