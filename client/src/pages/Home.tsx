import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ProductCollections from "@/components/ProductCollections";
import SmartFeatures from "@/components/SmartFeatures";
import AboutPreview from "@/components/AboutPreview";
import EnvironmentalImpact from "@/components/EnvironmentalImpact";
import CostCalculator from "@/components/CostCalculator";
import Testimonials from "@/components/Testimonials";
import PressMediaSlider from "@/components/PressMediaSlider";
import FAQSection from "@/components/FAQSection";
import DealerCTA from "@/components/DealerCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <StatsSection />
      <ProductCollections />
      <SmartFeatures />
      <AboutPreview />
      <EnvironmentalImpact />
      <CostCalculator />
      <Testimonials />
      <PressMediaSlider />
      <FAQSection />
      <DealerCTA />
      <Footer />
    </div>
  );
}