import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { HiHome, HiArrowLeft } from 'react-icons/hi';

export default function AnimeNotFound() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Anime Series Not Found</h2>
            <p className="text-lg text-gray-600 mb-8">
              The anime series you're looking for doesn't exist or may have been moved.
            </p>
          </div>
          
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              <HiHome className="w-5 h-5 mr-2" />
              Go Home
            </Link>
            <Link
              href="/#anime-categories"
              className="inline-flex items-center px-6 py-3 border-2 border-black text-black rounded-lg font-semibold hover:bg-black hover:text-white transition-colors"
            >
              <HiArrowLeft className="w-5 h-5 mr-2" />
              Browse Anime
            </Link>
          </div>
          
          <div className="mt-12">
            <p className="text-sm text-gray-500 mb-4">Available Anime Series:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['Jujutsu Kaisen', 'Naruto', 'One Piece', 'Demon Slayer', 'Solo Leveling'].map((anime) => (
                <span key={anime} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  {anime}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
