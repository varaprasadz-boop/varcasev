import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Battery, Zap, Navigation as NavIcon, Gauge, Weight, Clock } from "lucide-react";
import vehicleImage from "@assets/stock_images/electric_scooter_pro_ed0c12d8.jpg";

const vehicleImages = [
  vehicleImage,
  vehicleImage,
  vehicleImage,
];

const colors = [
  { name: "Graphite Black", value: "#1a1a1a" },
  { name: "Pearl White", value: "#f5f5f5" },
  { name: "Ruby Red", value: "#dc2626" },
  { name: "Golden Glow", value: "#eab308" },
];

const features = [
  { icon: Zap, label: "Range", value: "150 KM/Charge" },
  { icon: Battery, label: "Battery", value: "Lithium-ION, 3 Year Warranty" },
  { icon: NavIcon, label: "Tracking", value: "GPS & GPRS Enabled" },
  { icon: Gauge, label: "Top Speed", value: "45 km/h" },
  { icon: Weight, label: "Weight", value: "85 kg" },
  { icon: Clock, label: "Charging Time", value: "4-5 hours" },
];

export default function VehicleDetail() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <div className="mb-4">
                <img
                  src={vehicleImages[selectedImage]}
                  alt="FALCON"
                  className="w-full h-96 object-cover rounded-md"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {vehicleImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`rounded-md overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? "border-primary" : "border-transparent"
                    }`}
                    data-testid={`button-image-${index}`}
                  >
                    <img src={img} alt={`View ${index + 1}`} className="w-full h-24 object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Badge className="mb-4" data-testid="badge-available">Available Now</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">FALCON</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Experience the future of urban commuting with the FALCON - our flagship smart & connected e-bike that seamlessly blends sleek design with advanced technology.
              </p>

              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Available Colors</h3>
                <div className="flex gap-3">
                  {colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(index)}
                      className={`w-12 h-12 rounded-full border-2 transition-all hover-elevate ${
                        selectedColor === index ? "border-primary ring-2 ring-primary/20" : "border-border"
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                      data-testid={`button-color-${index}`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-2">{colors[selectedColor].name}</p>
              </div>

              <Button
                variant="default"
                size="lg"
                className="w-full mb-4"
                data-testid="button-enquire-vehicle"
                onClick={() => console.log('Open enquiry form')}
              >
                Enquire Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                data-testid="button-book-test-ride"
                onClick={() => console.log('Book test ride')}
              >
                Book Test Ride
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-6">Description</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-muted-foreground mb-4">
                  The FALCON represents the pinnacle of electric mobility, combining cutting-edge technology with sustainable transportation. Designed for the modern commuter, it offers an unmatched riding experience with its powerful motor and intelligent features.
                </p>
                <p className="text-muted-foreground mb-4">
                  Equipped with GPS and GPRS tracking, the FALCON ensures your peace of mind with real-time location updates and anti-theft alerts. The lithium-ion battery provides an impressive 150 km range on a single charge, making it perfect for daily commutes and longer journeys alike.
                </p>
                <p className="text-muted-foreground">
                  With our Varcas Care Program, you get assured doorstep sales and after-sales support, ensuring your e-bike is always in top condition. Experience the future of sustainable transportation with the FALCON.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6">Key Features</h2>
              <div className="space-y-3">
                {features.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <Card key={feature.label} className="p-4">
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-primary flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground">{feature.label}</p>
                          <p className="font-semibold">{feature.value}</p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6">Technical Specifications</h2>
            <Card className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4 text-lg">Motor & Performance</h3>
                  <dl className="space-y-3">
                    <div className="flex justify-between border-b border-border pb-2">
                      <dt className="text-muted-foreground">Motor Type</dt>
                      <dd className="font-medium">BLDC Hub Motor</dd>
                    </div>
                    <div className="flex justify-between border-b border-border pb-2">
                      <dt className="text-muted-foreground">Motor Power</dt>
                      <dd className="font-medium">250W</dd>
                    </div>
                    <div className="flex justify-between border-b border-border pb-2">
                      <dt className="text-muted-foreground">Top Speed</dt>
                      <dd className="font-medium">45 km/h</dd>
                    </div>
                    <div className="flex justify-between border-b border-border pb-2">
                      <dt className="text-muted-foreground">Range</dt>
                      <dd className="font-medium">150 KM/Charge</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h3 className="font-semibold mb-4 text-lg">Battery & Charging</h3>
                  <dl className="space-y-3">
                    <div className="flex justify-between border-b border-border pb-2">
                      <dt className="text-muted-foreground">Battery Type</dt>
                      <dd className="font-medium">Lithium-ION</dd>
                    </div>
                    <div className="flex justify-between border-b border-border pb-2">
                      <dt className="text-muted-foreground">Battery Warranty</dt>
                      <dd className="font-medium">3 Years</dd>
                    </div>
                    <div className="flex justify-between border-b border-border pb-2">
                      <dt className="text-muted-foreground">Charging Time</dt>
                      <dd className="font-medium">4-5 hours</dd>
                    </div>
                    <div className="flex justify-between border-b border-border pb-2">
                      <dt className="text-muted-foreground">Portable Battery</dt>
                      <dd className="font-medium">Yes</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h3 className="font-semibold mb-4 text-lg">Smart Features</h3>
                  <dl className="space-y-3">
                    <div className="flex justify-between border-b border-border pb-2">
                      <dt className="text-muted-foreground">GPS Tracking</dt>
                      <dd className="font-medium">Yes</dd>
                    </div>
                    <div className="flex justify-between border-b border-border pb-2">
                      <dt className="text-muted-foreground">GPRS Enabled</dt>
                      <dd className="font-medium">Yes</dd>
                    </div>
                    <div className="flex justify-between border-b border-border pb-2">
                      <dt className="text-muted-foreground">Trip Tracking</dt>
                      <dd className="font-medium">Yes</dd>
                    </div>
                    <div className="flex justify-between border-b border-border pb-2">
                      <dt className="text-muted-foreground">Smart Alerts</dt>
                      <dd className="font-medium">Yes</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h3 className="font-semibold mb-4 text-lg">Physical Specifications</h3>
                  <dl className="space-y-3">
                    <div className="flex justify-between border-b border-border pb-2">
                      <dt className="text-muted-foreground">Weight</dt>
                      <dd className="font-medium">85 kg</dd>
                    </div>
                    <div className="flex justify-between border-b border-border pb-2">
                      <dt className="text-muted-foreground">Load Capacity</dt>
                      <dd className="font-medium">150 kg</dd>
                    </div>
                    <div className="flex justify-between border-b border-border pb-2">
                      <dt className="text-muted-foreground">Brakes</dt>
                      <dd className="font-medium">Disc Brakes (Front & Rear)</dd>
                    </div>
                    <div className="flex justify-between border-b border-border pb-2">
                      <dt className="text-muted-foreground">Warranty</dt>
                      <dd className="font-medium">2 Years</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}