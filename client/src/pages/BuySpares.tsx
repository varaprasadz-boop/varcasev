import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQCTA from "@/components/FAQCTA";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Battery, Zap, Wrench, Cog, Shield, CircuitBoard, ExternalLink } from "lucide-react";

const spareCategories = [
  {
    icon: Battery,
    name: "Batteries & Chargers",
    description: "Replacement batteries, chargers, and power accessories",
    shopifyUrl: "#",
  },
  {
    icon: Zap,
    name: "Electrical Components",
    description: "Controllers, wiring harnesses, and electrical parts",
    shopifyUrl: "#",
  },
  {
    icon: Wrench,
    name: "Mechanical Parts",
    description: "Brakes, suspension, wheels, and mechanical components",
    shopifyUrl: "#",
  },
  {
    icon: Cog,
    name: "Motors & Drivetrain",
    description: "Hub motors, belts, chains, and drivetrain parts",
    shopifyUrl: "#",
  },
  {
    icon: Shield,
    name: "Body & Accessories",
    description: "Panels, mirrors, lights, and exterior accessories",
    shopifyUrl: "#",
  },
  {
    icon: CircuitBoard,
    name: "Smart Features",
    description: "GPS modules, display units, and smart accessories",
    shopifyUrl: "#",
  },
];

export default function BuySpares() {
  const handleCategoryClick = (url: string, name: string) => {
    console.log(`Opening Shopify store for ${name}: ${url}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <Breadcrumbs items={[{ label: "Buy Spares" }]} />
      </div>
      
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Buy Spares</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Genuine VARCAS spare parts and accessories delivered to your doorstep
            </p>
          </div>

          <div className="bg-card rounded-md p-8 mb-12 border border-card-border">
            <h2 className="text-2xl font-bold mb-4">Why Choose Genuine Parts?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-2 text-primary">Quality Assured</h3>
                <p className="text-muted-foreground">All parts are tested and certified for optimal performance</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-primary">Perfect Fit</h3>
                <p className="text-muted-foreground">Designed specifically for your VARCAS model</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-primary">Warranty Coverage</h3>
                <p className="text-muted-foreground">Protected by manufacturer's warranty</p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-8">Spare Parts Categories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spareCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Card key={category.name} className="p-6 hover-elevate transition-all" data-testid={`card-category-${category.name.toLowerCase().replace(/\s+/g, '-')}`}>
                  <Icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                  <p className="text-muted-foreground mb-6">{category.description}</p>
                  <Button
                    variant="default"
                    className="w-full gap-2"
                    onClick={() => handleCategoryClick(category.shopifyUrl, category.name)}
                    data-testid={`button-shop-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    Shop Now
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </Card>
              );
            })}
          </div>

          <Card className="mt-16 p-8 md:p-12 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Need Help Finding Parts?</h2>
                <p className="text-muted-foreground mb-6">
                  Our parts specialists are here to help you find the right components for your VARCAS vehicle. Contact us for expert assistance.
                </p>
                <Button
                  variant="default"
                  size="lg"
                  data-testid="button-contact-support"
                  onClick={() => console.log('Contact support')}
                >
                  Contact Support
                </Button>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-md flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Genuine Parts Only</h3>
                    <p className="text-sm text-muted-foreground">100% authentic VARCAS components</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-md flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Fast Delivery</h3>
                    <p className="text-sm text-muted-foreground">Quick shipping across India</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-md flex items-center justify-center flex-shrink-0">
                    <Wrench className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Installation Support</h3>
                    <p className="text-sm text-muted-foreground">Expert guidance available</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <FAQCTA />
      <Footer />
    </div>
  );
}