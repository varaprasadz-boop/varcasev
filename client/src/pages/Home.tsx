import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import FeaturedVehicles from "@/components/FeaturedVehicles";
import SmartFeatures from "@/components/SmartFeatures";
import AboutPreview from "@/components/AboutPreview";
import EnvironmentalImpact from "@/components/EnvironmentalImpact";
import Testimonials from "@/components/Testimonials";
import DealerCTA from "@/components/DealerCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Watch Our Technology in Action</h2>
            <p className="text-lg text-muted-foreground">
              See how we build the future of electric mobility
            </p>
          </div>
          
          <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-xl" data-testid="video-assembly">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/80">
              <div className="text-center space-y-4">
                <div className="text-6xl">🎬</div>
                <p className="text-xl font-semibold">Electric Scooter Assembly Video</p>
                <p className="text-sm text-gray-300 max-w-md">
                  Animated video showcasing the precision engineering and assembly process of VARCAS electric scooters
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatsSection />
      <FeaturedVehicles />
      <SmartFeatures />
      <AboutPreview />
      <EnvironmentalImpact />
      <Testimonials />
      <DealerCTA />
      <Footer />
    </div>
  );
}