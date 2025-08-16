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
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 gap-12">
            {/* Brand Section */}
            <div>
            <Link href="/" className="font-display text-display-md text-white hover:text-gray-300 transition-colors duration-300">
              ARIX
            </Link>
              <p className="mt-6 text-body-lg text-gray-300 leading-relaxed max-w-lg">
                Your ultimate destination for premium anime t-shirts. Express your otaku spirit with our carefully curated collection featuring the most popular anime series.
              </p>
              
              {/* Company Links */}
              <div className="mt-6 flex items-center space-x-6">
                {footerLinks.company.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href} 
                    className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              
              {/* Newsletter Signup */}
              <div className="mt-6">
                <h4 className="text-body-md font-medium text-white mb-4 tracking-wide">Stay Updated</h4>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-5 py-3 bg-gray-800 border border-gray-700 rounded-l-xl focus:outline-none focus:border-white text-body-sm"
                  />
                  <button className="bg-white hover:bg-gray-200 text-black px-4 py-2 rounded-r-lg transition-colors">
                    <RiSendPlaneFill className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>



        {/* Bottom Footer */}
        <div className="py-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Copyright */}
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Arix. All rights reserved. Made with ❤️ for anime fans.
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-6">
              <span className="text-gray-400 text-sm">Follow us:</span>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
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
