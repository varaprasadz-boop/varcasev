import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import FeaturedVehicles from "@/components/FeaturedVehicles";
import SmartFeatures from "@/components/SmartFeatures";
import AboutPreview from "@/components/AboutPreview";
import EnvironmentalImpact from "@/components/EnvironmentalImpact";
import Testimonials from "@/components/Testimonials";
import PressMediaSlider from "@/components/PressMediaSlider";
import DealerCTA from "@/components/DealerCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <StatsSection />
      <FeaturedVehicles />
      <SmartFeatures />
      <AboutPreview />
      <EnvironmentalImpact />
      <Testimonials />
      <PressMediaSlider />
      <DealerCTA />
      <Footer />
    </div>
  );
}