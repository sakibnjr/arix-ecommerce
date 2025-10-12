import HeroSlider from "./components/HeroSlider";
import CategoriesSection from "./components/CategoriesSection";
import AnimeCategoriesSection from "./components/AnimeCategoriesSection";
import ProductsSection from "./components/ProductsSection";
import TestimonialsMarquee from "./components/TestimonialsMarquee";
import LoadingNotice from "./components/LoadingNotice";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <LoadingNotice />
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
