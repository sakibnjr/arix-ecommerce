import Header from './components/Header';
import HeroSlider from './components/HeroSlider';
import CategoriesSection from './components/CategoriesSection';
import AnimeCategoriesSection from './components/AnimeCategoriesSection';
import ProductsSection from './components/ProductsSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSlider />
        <ProductsSection />
        <CategoriesSection />
        <AnimeCategoriesSection />
      </main>
      <Footer />
    </div>
  );
}
