import HeroSlider from './components/HeroSlider';
import CategoriesSection from './components/CategoriesSection';
import AnimeCategoriesSection from './components/AnimeCategoriesSection';
import ProductsSection from './components/ProductsSection';
import TestimonialsMarquee from './components/TestimonialsMarquee';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        <HeroSlider />
        <ProductsSection />
        <CategoriesSection />
        <AnimeCategoriesSection />
        <TestimonialsMarquee />
      </main>
    </div>
  );
}
