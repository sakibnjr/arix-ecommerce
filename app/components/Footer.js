'use client';

import Link from 'next/link';
import { RiSendPlaneFill } from 'react-icons/ri';
import { FaInstagram, FaTwitter, FaTiktok, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' }
    ]
  };

  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://instagram.com/arix',
      icon: <FaInstagram className="w-5 h-5" />
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/arix',
      icon: <FaTwitter className="w-5 h-5" />
    },
    {
      name: 'TikTok',
      href: 'https://tiktok.com/@arix',
      icon: <FaTiktok className="w-5 h-5" />
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com/@arix',
      icon: <FaYoutube className="w-5 h-5" />
    }
  ];

  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden">
      {/* Sophisticated Background Elements */}
      <div className="absolute inset-0">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 via-transparent to-gray-800/30" />
        
        {/* Geometric accent elements */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-white/5 to-transparent rounded-full blur-3xl" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 sm:py-16">
          <div className="grid grid-cols-1 gap-8 sm:gap-12">
            {/* Brand Section */}
            <div className="relative z-10">
              <Link href="/" className="font-display text-2xl sm:text-3xl lg:text-4xl text-white hover:text-gray-300 transition-colors duration-300">
                ARIX
              </Link>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-300 leading-relaxed max-w-lg">
                Your ultimate destination for premium anime t-shirts. Express your otaku spirit with our carefully curated collection featuring the most popular anime series.
              </p>
              
              {/* Company Links */}
              <div className="mt-4 sm:mt-6 flex items-center space-x-4 sm:space-x-6">
                {footerLinks.company.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href} 
                    className="text-gray-300 hover:text-white transition-all duration-300 text-sm font-medium hover:scale-105 transform"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              
              {/* Newsletter Signup */}
              <div className="mt-6 sm:mt-8">
                <h4 className="text-base sm:text-lg font-medium text-white mb-3 sm:mb-4 tracking-wide">Stay Updated</h4>
                <div className="flex max-w-md">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 sm:px-5 py-2.5 sm:py-3 bg-gray-800 border border-gray-700 rounded-l-lg sm:rounded-l-xl focus:outline-none focus:border-white text-sm sm:text-base transition-all duration-300"
                  />
                  <button className="bg-white hover:bg-gray-200 text-black px-3 sm:px-4 py-2.5 sm:py-3 rounded-r-lg sm:rounded-r-xl transition-all duration-300 hover:scale-105 transform shadow-lg">
                    <RiSendPlaneFill className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-4 sm:py-6 border-t border-gray-800 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} Arix. All rights reserved. Made with ❤️ for anime fans.
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4 sm:space-x-6">
              <span className="text-gray-400 text-sm">Follow us:</span>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 transform p-1.5 sm:p-2 rounded-lg hover:bg-white/10"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
