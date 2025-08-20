'use client';

import Link from 'next/link';
import Image from 'next/image';
import { HiArrowRight } from 'react-icons/hi';
import { motion } from 'framer-motion';

export default function AnimeCategoriesSection() {
  const animeCategories = [
    {
      id: 1,
      name: 'Jujutsu Kaisen',
      description: 'Unleash your cursed energy with official JJK designs',
      href: '/anime/jujutsu-kaisen',
      color: 'from-black to-gray-800',
      textColor: 'text-white',
      popularity: 'Trending',
      characters: ['Gojo Satoru', 'Yuji Itadori', 'Megumi Fushiguro'],
      image: 'https://images.unsplash.com/photo-1722573783570-9811ce67025e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8anVqdXRzdSUyMGthaXNlbnxlbnwwfHwwfHx8MA%3D%3D'
    },
    {
      id: 2,
      name: 'Naruto',
      description: 'Believe it! Classic ninja designs for true fans',
      href: '/anime/naruto',
      color: 'from-gray-800 to-black',
      textColor: 'text-white',
      popularity: 'Classic',
      characters: ['Naruto Uzumaki', 'Sasuke Uchiha', 'Kakashi Hatake'],
      image: '/images/anime/naruto.jpg'
    },
    {
      id: 3,
      name: 'One Piece',
      description: 'Set sail with the Straw Hat Pirates collection',
      href: '/anime/one-piece',
      color: 'from-gray-700 to-gray-900',
      textColor: 'text-white',
      popularity: 'Popular',
      characters: ['Monkey D. Luffy', 'Roronoa Zoro', 'Nami'],
      image: '/images/anime/one-piece.jpg'
    },
    {
      id: 4,
      name: 'Demon Slayer',
      description: 'Breathe and become a demon slayer',
      href: '/anime/demon-slayer',
      color: 'from-gray-900 to-black',
      textColor: 'text-white',
      popularity: 'Hot',
      characters: ['Tanjiro Kamado', 'Nezuko Kamado', 'Inosuke Hashibira'],
      image: '/images/anime/demon-slayer.jpg'
    },
    {
      id: 5,
      name: 'Solo Leveling',
      description: 'Rise from E-rank to S-rank hunter',
      href: '/anime/solo-leveling',
      color: 'from-black to-gray-800',
      textColor: 'text-white',
      popularity: 'New',
      characters: ['Sung Jin-Woo', 'Shadow Army', 'Igris'],
      image: '/images/anime/solo-leveling.jpg'
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
            <span className="text-xs font-medium text-black/60 tracking-widest uppercase">Anime</span>
            <div className="w-6 h-px bg-black/20" />
          </div>
          
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 leading-tight">
            Anime Collections
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Express your passion with our curated anime t-shirt collections
          </p>
        </motion.div>

        {/* Enhanced Featured Anime - Large Card */}
        <div className="mb-12 sm:mb-16">
          <Link
            href={animeCategories[0].href}
            className="group block relative overflow-hidden rounded-2xl lg:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
          >
            <div className={`bg-gradient-to-r ${animeCategories[0].color} p-6 sm:p-8 lg:p-12 min-h-[400px] sm:min-h-[480px] flex items-center relative overflow-hidden`}>
              {/* Enhanced Floating Background Elements */}
              <div className="absolute top-0 right-0 opacity-10">
                <div className="w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-white rounded-full blur-2xl lg:blur-3xl"></div>
              </div>
              <div className="absolute bottom-0 left-0 opacity-5">
                <div className="w-40 h-40 sm:w-64 sm:h-64 lg:w-80 lg:h-80 bg-white rounded-full blur-2xl lg:blur-3xl"></div>
              </div>
              
              <div className="max-w-4xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center relative z-10">
                {/* Content */}
                <div className={animeCategories[0].textColor}>
                  <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 lg:mb-8 leading-tight">
                    {animeCategories[0].name}
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 max-w-md">
                    {animeCategories[0].description}
                  </p>

                  <span className="inline-flex items-center bg-white text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg group-hover:bg-gray-100 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                    Shop Collection
                    <HiArrowRight className="ml-2 sm:ml-3 w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>

                {/* Featured Image */}
                <div className="relative">
                  <div className="relative rounded-xl lg:rounded-2xl overflow-hidden aspect-square border border-white/20 shadow-2xl">
                    <Image
                      src={animeCategories[0].image}
                      alt={`${animeCategories[0].name} artwork`}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 420px, 60vw"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Decorative Background removed in favor of real imagery */}
            </div>
          </Link>
        </div>

        {/* Enhanced Other Anime Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
          {animeCategories.slice(1).map((anime, index) => (
            <motion.div
              key={anime.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group"
            >
              <Link
                href={anime.href}
                className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 block h-full"
              >
                <div className={`relative p-6 sm:p-8 min-h-[280px] sm:min-h-[320px] flex flex-col justify-between overflow-hidden h-full`}>
                  {/* Full background image */}
                  <Image
                    src={anime.image}
                    alt={`${anime.name} artwork`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 25vw, 90vw"
                  />
                  {/* Gradient overlay for readability */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${anime.color} opacity-70`} />

                  {/* Header */}
                  <div className="relative z-10">
                    <h3 className={`font-display text-lg sm:text-xl font-bold leading-tight ${anime.textColor} mb-2`}>
                      {anime.name}
                    </h3>
                    <p className={`text-gray-200 text-xs sm:text-sm ${anime.textColor} opacity-90 leading-relaxed`}>
                      {anime.description}
                    </p>
                  </div>

                  {/* Enhanced CTA */}
                  <span className={`relative z-10 inline-flex items-center bg-white/20 backdrop-blur-sm ${anime.textColor} px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-medium group-hover:bg-white/30 transition-all duration-300 tracking-wide border border-white/20`}>
                    View Collection
                    <HiArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
