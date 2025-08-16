'use client';

import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';
import { AiFillStar } from 'react-icons/ai';

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
      characters: ['Gojo Satoru', 'Yuji Itadori', 'Megumi Fushiguro']
    },
    {
      id: 2,
      name: 'Naruto',
      description: 'Believe it! Classic ninja designs for true fans',
      href: '/anime/naruto',
      color: 'from-gray-800 to-black',
      textColor: 'text-white',
      popularity: 'Classic',
      characters: ['Naruto Uzumaki', 'Sasuke Uchiha', 'Kakashi Hatake']
    },
    {
      id: 3,
      name: 'One Piece',
      description: 'Set sail with the Straw Hat Pirates collection',
      href: '/anime/one-piece',
      color: 'from-gray-700 to-gray-900',
      textColor: 'text-white',
      popularity: 'Popular',
      characters: ['Monkey D. Luffy', 'Roronoa Zoro', 'Nami']
    },
    {
      id: 4,
      name: 'Demon Slayer',
      description: 'Breathe and become a demon slayer',
      href: '/anime/demon-slayer',
      color: 'from-gray-900 to-black',
      textColor: 'text-white',
      popularity: 'Hot',
      characters: ['Tanjiro Kamado', 'Nezuko Kamado', 'Inosuke Hashibira']
    },
    {
      id: 5,
      name: 'Solo Leveling',
      description: 'Rise from E-rank to S-rank hunter',
      href: '/anime/solo-leveling',
      color: 'from-black to-gray-800',
      textColor: 'text-white',
      popularity: 'New',
      characters: ['Sung Jin-Woo', 'Shadow Army', 'Igris']
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-display-md md:text-display-lg text-gray-900 mb-6 leading-tight">
            Anime Collections
          </h2>
        </div>

        {/* Featured Anime - Large Card */}
        <div className="mb-16">
          <Link
            href={animeCategories[0].href}
            className="group block relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3"
          >
            <div className={`bg-gradient-to-r ${animeCategories[0].color} p-10 lg:p-20 min-h-[520px] flex items-center`}>
              <div className="max-w-4xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Content */}
                <div className={animeCategories[0].textColor}>
                  <h3 className="font-display text-display-lg md:text-display-xl font-bold mb-10 leading-tight">
                    {animeCategories[0].name}
                  </h3>

                  <span className="inline-flex items-center bg-white text-gray-900 px-8 py-4 rounded-xl font-bold text-lg group-hover:bg-gray-100 transition-colors">
                    Shop Collection
                    <HiArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>

                {/* Image Placeholder */}
                <div className="relative">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 aspect-square flex items-center justify-center">
                    <div className="text-center text-white/90">
                      <AiFillStar className="w-32 h-32 mx-auto mb-4" />
                      <p className="text-lg font-bold">Domain Expansion</p>
                      <p className="text-sm opacity-75">Infinite Void</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Background Elements */}
              <div className="absolute top-0 right-0 opacity-10">
                <AiFillStar className="w-96 h-96" />
              </div>
            </div>
          </Link>
        </div>

        {/* Other Anime Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {animeCategories.slice(1).map((anime) => (
            <Link
              key={anime.id}
              href={anime.href}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className={`bg-gradient-to-br ${anime.color} p-8 min-h-[340px] flex flex-col justify-between`}>
                {/* Header */}
                <div>
                  <h3 className={`font-display text-heading-lg font-bold leading-tight ${anime.textColor}`}>
                    {anime.name}
                  </h3>
                </div>

                {/* CTA */}
                <span className={`inline-flex items-center bg-white/20 backdrop-blur-sm ${anime.textColor} px-6 py-3 rounded-xl text-body-sm font-medium group-hover:bg-white/30 transition-all duration-300 tracking-wide`}>
                  View Collection
                  <HiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>

                {/* Background Decoration */}
                <div className="absolute bottom-0 right-0 opacity-20">
                  <AiFillStar className="w-20 h-20" />
                </div>
              </div>
            </Link>
          ))}
        </div>


      </div>
    </section>
  );
}
