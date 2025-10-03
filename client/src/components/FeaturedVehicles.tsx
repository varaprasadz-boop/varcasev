import VehicleCard from "./VehicleCard";
import vehicle1 from "@assets/stock_images/electric_scooter_pro_ed0c12d8.jpg";
import vehicle2 from "@assets/stock_images/electric_scooter_pro_c96f7582.jpg";
import vehicle3 from "@assets/stock_images/electric_scooter_pro_bdc85862.jpg";
import vehicle4 from "@assets/stock_images/electric_scooter_pro_7cc39faa.jpg";

const vehicles = [
  {
    name: "FALCON",
    image: vehicle1,
    range: "150 KM/Charge",
    battery: "Lithium-ION, 3 Year Warranty",
    link: "/vehicle/falcon",
  },
  {
    name: "EAGAN",
    image: vehicle2,
    range: "140 KM/Charge",
    battery: "Lithium-ION, 3 Year Warranty",
    link: "/vehicle/eagan",
  },
  {
    name: "CRONY",
    image: vehicle3,
    range: "130 KM/Charge",
    battery: "Lithium-ION, 3 Year Warranty",
    link: "/vehicle/crony",
  },
  {
    name: "AMAN",
    image: vehicle4,
    range: "150 KM/Charge",
    battery: "Lithium-ION, 3 Year Warranty",
    link: "/vehicle/aman",
  },
];

export default function FeaturedVehicles() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Our Model Collection
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our range of smart, connected electric vehicles designed for the modern commuter
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.name} {...vehicle} />
          ))}
        </div>
      </div>
    </section>
  );
}