import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import VehicleCard from "@/components/VehicleCard";
import { Skeleton } from "@/components/ui/skeleton";

interface Vehicle {
  id: number;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  category: string;
  mainImage: string | null;
  keyHighlights: string[] | null;
  status: string;
}

const categoryTitles: Record<string, string> = {
  "electric_scooters": "Electric Scooters",
  "electric_motorcycles": "Electric Motorcycles",
  "three_wheelers": "Three-Wheelers",
  "four_wheelers": "Four-Wheelers",
};

const categoryDescriptions: Record<string, string> = {
  "electric_scooters": "Efficient and stylish electric scooters perfect for urban commuting",
  "electric_motorcycles": "High-performance electric motorcycles for the thrill seekers",
  "three_wheelers": "Robust cargo solutions for commercial transportation",
  "four_wheelers": "Heavy-duty electric transporters for logistics and delivery",
};

export default function Vehicles() {
  const [location] = useLocation();
  const params = new URLSearchParams(location.split("?")[1]);
  const category = params.get("category") || "";

  const { data: vehicles, isLoading } = useQuery<Vehicle[]>({
    queryKey: ["/api/vehicles", category],
    queryFn: async () => {
      const url = category ? `/api/vehicles?category=${category}` : "/api/vehicles";
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch vehicles");
      return response.json();
    },
  });

  const categoryTitle = categoryTitles[category] || "All Vehicles";
  const categoryDescription = categoryDescriptions[category] || "Explore our complete range of electric vehicles";

  const breadcrumbItems = category
    ? [{ label: categoryTitle }]
    : [{ label: "All Vehicles" }];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <Breadcrumbs items={breadcrumbItems} />
        
        <div className="text-center mb-12 mt-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4" data-testid="heading-vehicles-category">
            {categoryTitle}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {categoryDescription}
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-12">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-[4/3] w-full" />
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        ) : vehicles && vehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-12" data-testid="grid-vehicles">
            {vehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                name={vehicle.name}
                image={vehicle.mainImage || "https://varcasautomobiles.com/images/placeholder.png"}
                range={vehicle.keyHighlights?.[0] || "Range info coming soon"}
                battery={vehicle.keyHighlights?.[1] || "Battery info coming soon"}
                link={`/vehicle/${vehicle.slug}`}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-xl text-muted-foreground" data-testid="text-no-vehicles">
              No vehicles found in this category.
            </p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}
