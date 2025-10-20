import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Bike, Truck, Package } from "lucide-react";

interface Product {
  name: string;
  slug: string;
  tagline: string;
  image: string;
  category: string;
}

const products: Product[] = [
  { name: "FALCON", slug: "falcon", tagline: "Powerful Performance, Smart Connectivity", image: "https://varcasautomobiles.com/images/falcon_red.png", category: "Electric Scooters" },
  { name: "EAGAN", slug: "eagan", tagline: "Sleek Design, Superior Range", image: "https://varcasautomobiles.com/images/egan_prod.png", category: "Electric Scooters" },
  { name: "CRONY", slug: "crony", tagline: "Compact & Vibrant City Companion", image: "https://varcasautomobiles.com/images/cap-img-6.png", category: "Electric Scooters" },
  { name: "AMAN", slug: "aman", tagline: "Advanced Features, Premium Comfort", image: "https://varcasautomobiles.com/images/aman.png", category: "Electric Scooters" },
  { name: "RUBY", slug: "ruby", tagline: "Bold Style, Reliable Performance", image: "https://varcasautomobiles.com/images/ruby.png", category: "Electric Scooters" },
  { name: "TEJAS-SPORT", slug: "tejas-sport", tagline: "Sporty E-Cycle for Active Lifestyles", image: "https://varcasautomobiles.com/images/TEJA.png", category: "Electric Scooters" },
  { name: "RANI-EX", slug: "rani-ex", tagline: "Elegant E-Cycle with Practical Features", image: "https://varcasautomobiles.com/images/rani.png", category: "Electric Scooters" },
  { name: "RANI-LX", slug: "rani-lx", tagline: "Premium Comfort for City Riding", image: "https://varcasautomobiles.com/images/rani-lx.png", category: "Electric Scooters" },
  
  { name: "THUNDER 350", slug: "thunder-350", tagline: "Power Meets Performance", image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&h=300&fit=crop", category: "Electric Motorcycles" },
  { name: "VOLT SPORT", slug: "volt-sport", tagline: "Urban Agility, Electric Efficiency", image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400&h=300&fit=crop", category: "Electric Motorcycles" },
  { name: "CRUISER PRO", slug: "cruiser-pro", tagline: "Long Range, Premium Comfort", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop", category: "Electric Motorcycles" },
  
  { name: "CARGO LITE", slug: "cargo-lite", tagline: "Efficient Last-Mile Delivery Solution", image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&h=300&fit=crop", category: "Three-Wheelers" },
  { name: "CARGO MAX", slug: "cargo-max", tagline: "Heavy-Duty Electric Cargo Champion", image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&h=300&fit=crop", category: "Three-Wheelers" },
  
  { name: "TRANSPORTER CITY", slug: "transporter-city", tagline: "Urban Mobility for Passengers & Goods", image: "https://images.unsplash.com/photo-1548262938-cf874d2bcf3b?w=400&h=300&fit=crop", category: "Four-Wheelers" },
  { name: "TRANSPORTER CARGO", slug: "transporter-cargo", tagline: "Maximum Capacity, Minimum Operating Cost", image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=300&fit=crop", category: "Four-Wheelers" },
];

const categoryIcons = {
  "Electric Scooters": <Zap className="w-6 h-6" />,
  "Electric Motorcycles": <Bike className="w-6 h-6" />,
  "Three-Wheelers": <Package className="w-6 h-6" />,
  "Four-Wheelers": <Truck className="w-6 h-6" />,
};

export default function ViewAllProducts() {
  const electricScooters = products.filter(p => p.category === "Electric Scooters");
  const electricMotorcycles = products.filter(p => p.category === "Electric Motorcycles");
  const threeWheelers = products.filter(p => p.category === "Three-Wheelers");
  const fourWheelers = products.filter(p => p.category === "Four-Wheelers");

  const CategorySection = ({ title, products, icon }: { title: string; products: Product[]; icon: React.ReactNode }) => (
    <section className="mb-16">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-primary/10 rounded-lg text-primary">
          {icon}
        </div>
        <div>
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="text-muted-foreground">{products.length} models available</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.slug} className="overflow-hidden hover-elevate transition-all" data-testid={`card-product-${product.slug}`}>
            <div className="aspect-[4/3] bg-muted overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-bold">{product.name}</h3>
                <Badge variant="secondary" className="text-xs">
                  New
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {product.tagline}
              </p>
              <Link href={`/vehicle/${product.slug}`}>
                <Button variant="default" className="w-full group" data-testid={`button-explore-${product.slug}`}>
                  Explore
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <Zap className="w-5 h-5" />
              <span className="font-semibold">Complete Product Range</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Products</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore VARCAS's complete range of electric vehicles - from personal scooters and motorcycles to commercial cargo solutions
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CategorySection 
            title="Electric Scooters" 
            products={electricScooters} 
            icon={categoryIcons["Electric Scooters"]} 
          />
          
          <CategorySection 
            title="Electric Motorcycles" 
            products={electricMotorcycles} 
            icon={categoryIcons["Electric Motorcycles"]} 
          />

          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-primary/10 rounded-lg text-primary">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">Cargo & Commercial EVs</h2>
                <p className="text-muted-foreground">Professional logistics solutions</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                Three-Wheelers
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {threeWheelers.map((product) => (
                  <Card key={product.slug} className="overflow-hidden hover-elevate transition-all" data-testid={`card-product-${product.slug}`}>
                    <div className="aspect-[4/3] bg-muted overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-bold">{product.name}</h3>
                        <Badge variant="secondary" className="text-xs">
                          Commercial
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        {product.tagline}
                      </p>
                      <Link href={`/vehicle/${product.slug}`}>
                        <Button variant="default" className="w-full group" data-testid={`button-explore-${product.slug}`}>
                          Explore
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-primary" />
                Four-Wheelers
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {fourWheelers.map((product) => (
                  <Card key={product.slug} className="overflow-hidden hover-elevate transition-all" data-testid={`card-product-${product.slug}`}>
                    <div className="aspect-[4/3] bg-muted overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-bold">{product.name}</h3>
                        <Badge variant="secondary" className="text-xs">
                          Commercial
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        {product.tagline}
                      </p>
                      <Link href={`/vehicle/${product.slug}`}>
                        <Button variant="default" className="w-full group" data-testid={`button-explore-${product.slug}`}>
                          Explore
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
