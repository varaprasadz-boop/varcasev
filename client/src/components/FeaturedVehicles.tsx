import VehicleCard from "./VehicleCard";

const vehicles = [
  {
    name: "FALCON",
    image: "https://varcasautomobiles.com/images/falcon_red.png",
    range: "100 KM/Charge",
    battery: "Lithium-ION, 3 Year Warranty",
    link: "/vehicle/falcon",
  },
  {
    name: "EAGAN",
    image: "https://varcasautomobiles.com/images/egan_prod.png",
    range: "80-95 KM/Charge",
    battery: "Lithium-ION, 3 Year Warranty",
    link: "/vehicle/eagan",
  },
  {
    name: "CRONY",
    image: "https://varcasautomobiles.com/images/cap-img-6.png",
    range: "55 KM/Charge",
    battery: "Lithium-ION, 3 Year Warranty",
    link: "/vehicle/crony",
  },
  {
    name: "AMAN",
    image: "https://varcasautomobiles.com/images/aman.png",
    range: "80-95 KM/Charge",
    battery: "Lithium-ION, 3 Year Warranty",
    link: "/vehicle/aman",
  },
  {
    name: "RUBY",
    image: "https://varcasautomobiles.com/images/ruby.png",
    range: "55 KM/Charge",
    battery: "Lithium-ION, 3 Year Warranty",
    link: "/vehicle/ruby",
  },
  {
    name: "TEJAS-SPORT",
    image: "https://varcasautomobiles.com/images/TEJA.png",
    range: "Pedal Assist",
    battery: "250W Motor, Shimano Gears",
    link: "/vehicle/tejas-sport",
  },
  {
    name: "RANI-EX",
    image: "https://varcasautomobiles.com/images/rani.png",
    range: "30 KM/Charge",
    battery: "36V 12Ah, Front Basket",
    link: "/vehicle/rani-ex",
  },
  {
    name: "RANI-LX",
    image: "https://varcasautomobiles.com/images/rani-lx.png",
    range: "40 KM/Charge",
    battery: "36V 12Ah, Rear Seat",
    link: "/vehicle/rani-lx",
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.name} {...vehicle} />
          ))}
        </div>
      </div>
    </section>
  );
}