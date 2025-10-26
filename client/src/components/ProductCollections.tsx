import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const collections = [
  {
    title: "Electric Scooters",
    description: "Efficient and stylish electric scooters perfect for urban commuting",
    image: "https://varcasautomobiles.com/images/falcon_red.png",
    link: "/vehicles?category=electric-scooters",
    vehicleCount: "8 Models",
  },
  {
    title: "Electric Motorcycles",
    description: "High-performance electric motorcycles for the thrill seekers",
    image: "https://varcasautomobiles.com/images/thunder-350.png",
    link: "/vehicles?category=electric-motorcycles",
    vehicleCount: "3 Models",
  },
  {
    title: "Three-Wheelers",
    description: "Robust cargo solutions for commercial transportation",
    image: "https://varcasautomobiles.com/images/cargo-lite.png",
    link: "/vehicles?category=three-wheelers",
    vehicleCount: "2 Models",
  },
  {
    title: "Four-Wheelers",
    description: "Heavy-duty electric transporters for logistics and delivery",
    image: "https://varcasautomobiles.com/images/transporter-city.png",
    link: "/vehicles?category=four-wheelers",
    vehicleCount: "2 Models",
  },
];

export default function ProductCollections() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            OUR PRODUCT COLLECTIONS
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our diverse range of electric vehicles designed for every need
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((collection) => (
            <Link key={collection.title} href={collection.link}>
              <Card className="h-full hover-elevate active-elevate-2 cursor-pointer overflow-hidden group" data-testid={`card-collection-${collection.title.toLowerCase().replace(/\s+/g, '-')}`}>
                <div className="aspect-square relative overflow-hidden bg-muted">
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-xl" data-testid={`text-collection-title-${collection.title.toLowerCase().replace(/\s+/g, '-')}`}>
                      {collection.title}
                    </h3>
                    <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {collection.description}
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    {collection.vehicleCount}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
