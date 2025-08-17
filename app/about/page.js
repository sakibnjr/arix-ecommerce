import React from 'react';
import Link from 'next/link';
import { HiChevronRight, HiStar, HiHeart, HiShieldCheck, HiUsers, HiGlobe, HiLightningBolt, HiSparkles } from 'react-icons/hi';

export default function AboutPage() {
  const stats = [
    { number: '10K+', label: 'Happy Customers' },
    { number: '50+', label: 'Anime Series' },
    { number: '100%', label: 'Quality Guarantee' },
    { number: '24/7', label: 'Customer Support' }
  ];

  const values = [
    {
      title: 'Excellence',
      description: 'We strive for excellence in every product, ensuring the highest quality standards.'
    },
    {
      title: 'Passion',
      description: 'Our love for anime drives us to create authentic, meaningful merchandise.'
    },
    {
      title: 'Innovation',
      description: 'We continuously innovate to bring you the latest trends and designs.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link href="/" className="text-gray-500 hover:text-black transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <HiChevronRight className="w-5 h-5 text-gray-300" />
              </li>
              <li>
                <span className="text-gray-900 font-medium">About</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div>
            <h1 className="font-display text-display-lg md:text-display-xl lg:text-7xl text-white mb-6 leading-tight">
              About Arix
            </h1>
            <p className="text-body-xl md:text-body-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Your ultimate destination for premium anime t-shirts and expressing your otaku spirit with style and quality.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center"
              >
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {index === 0 && <HiUsers className="w-10 h-10 text-gray-700" />}
                  {index === 1 && <HiGlobe className="w-10 h-10 text-gray-700" />}
                  {index === 2 && <HiShieldCheck className="w-10 h-10 text-gray-700" />}
                  {index === 3 && <HiLightningBolt className="w-10 h-10 text-gray-700" />}
                </div>
                <div className="text-display-md font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-body-md text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-display-md md:text-display-lg text-gray-900 mb-6 leading-tight">
                Our Story
              </h2>
              <div className="space-y-4 text-body-lg text-gray-700 leading-relaxed">
                <p>
                  Arix was born from a deep passion for anime and an unwavering commitment to quality fashion. 
                  We believe that anime fans deserve merchandise that reflects both their interests and their standards for excellence.
                </p>
                <p>
                  What started as a small collection of hand-picked designs has grown into a comprehensive platform 
                  dedicated to celebrating anime culture through premium, comfortable, and stylish t-shirts.
                </p>
                <p>
                  Every product in our collection is carefully selected to ensure it meets our high standards 
                  for quality, comfort, and authentic representation of your favorite anime series.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl p-12 text-center">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <HiStar className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-heading-lg font-bold text-gray-900 mb-3">Established 2024</h3>
                  <p className="text-body-md text-gray-600">
                    Born from passion, built with purpose, and dedicated to the anime community.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="font-display text-display-md md:text-display-lg text-gray-900 mb-6 leading-tight">
              Our Mission
            </h2>
            <p className="text-body-xl text-gray-700 leading-relaxed">
              To provide anime enthusiasts with high-quality, comfortable, and stylish t-shirts that allow them to 
              express their passion for anime in their everyday lives. We're committed to authenticity, quality, 
              and celebrating the incredible world of anime culture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-all duration-300"
              >
                <div className="bg-black w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  {index === 0 && <HiStar className="w-8 h-8 text-white" />}
                  {index === 1 && <HiHeart className="w-8 h-8 text-white" />}
                  {index === 2 && <HiSparkles className="w-8 h-8 text-white" />}
                </div>
                <h3 className="text-heading-lg font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-body-md text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quality Promise Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-display-md md:text-display-lg text-gray-900 mb-6 leading-tight">
              Quality Promise
            </h2>
            <p className="text-body-xl text-gray-700 max-w-3xl mx-auto">
              We're committed to delivering the highest quality products that exceed your expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="bg-gradient-to-br from-green-100 to-green-200 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <HiShieldCheck className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-heading-lg font-bold text-gray-900 mb-4">Premium Materials</h3>
              <p className="text-body-md text-gray-600 leading-relaxed">
                100% cotton blend fabrics sourced for maximum comfort, durability, and breathability. 
                Our materials are carefully selected to ensure long-lasting quality and comfort.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <HiStar className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-heading-lg font-bold text-gray-900 mb-4">Authentic Designs</h3>
              <p className="text-body-md text-gray-600 leading-relaxed">
                Official artwork and designs that truly capture the essence of your favorite anime characters. 
                Every design is carefully crafted to maintain the authenticity and spirit of the original series.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div>
            <h2 className="font-display text-display-md md:text-display-lg text-white mb-6 leading-tight">
              Join the Arix Community
            </h2>
            <p className="text-body-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Discover our collection of premium anime t-shirts and become part of our growing community of anime enthusiasts.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center bg-white text-black px-8 py-4 rounded-xl font-semibold text-body-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Explore Collection
              <HiChevronRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
