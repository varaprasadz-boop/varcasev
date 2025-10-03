import { useState } from "react";
import { useRoute } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import EnquiryDialog from "@/components/EnquiryDialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { vehicleDatabase } from "@/data/vehicleData";
import NotFound from "@/pages/not-found";

export default function VehicleDetail() {
  const [, params] = useRoute("/vehicle/:slug");
  const slug = params?.slug || "";
  
  const vehicle = vehicleDatabase[slug];
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  if (!vehicle) {
    return <NotFound />;
  }

  const allImages = [vehicle.mainImage, vehicle.frontImage, ...vehicle.colors.map(c => c.image)];

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Badge className="mb-4" data-testid="badge-available">Available Now</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{vehicle.name}</h1>
            <p className="text-2xl text-primary font-semibold mb-2">{vehicle.tagline}</p>
            <p className="text-lg text-muted-foreground max-w-3xl">
              {vehicle.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <div className="relative mb-6 rounded-md overflow-hidden bg-white group">
                <img
                  src={allImages[selectedImageIndex]}
                  alt={vehicle.name}
                  className="w-full h-[500px] object-contain"
                />
                
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      data-testid="button-prev-image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      data-testid="button-next-image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              <div className="grid grid-cols-4 gap-3">
                {allImages.slice(0, 4).map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`rounded-md overflow-hidden border-2 transition-all hover-elevate ${
                      selectedImageIndex === index ? "border-primary ring-2 ring-primary/20" : "border-border"
                    }`}
                    data-testid={`button-thumbnail-${index}`}
                  >
                    <img src={img} alt={`View ${index + 1}`} className="w-full h-20 object-contain bg-white" />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Available Colors</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {vehicle.colors.map((color, index) => (
                    <Card
                      key={index}
                      className={`p-4 cursor-pointer hover-elevate transition-all ${
                        selectedColorIndex === index ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => {
                        setSelectedColorIndex(index);
                        setSelectedImageIndex(2 + index);
                      }}
                      data-testid={`card-color-${index}`}
                    >
                      <div className="aspect-square mb-3 rounded-md overflow-hidden bg-white">
                        <img
                          src={color.image}
                          alt={color.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <p className="text-sm font-medium text-center">{color.name}</p>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <EnquiryDialog trigger={
                  <Button
                    variant="default"
                    size="lg"
                    className="w-full transition-all"
                    data-testid="button-enquire-vehicle"
                  >
                    Enquire Now
                  </Button>
                } />
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full transition-all"
                  data-testid="button-book-test-ride"
                >
                  Book Test Ride
                </Button>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Technical Specifications</h2>
            <Card className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                {vehicle.specifications.map((spec, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-start py-3 border-b border-border"
                    data-testid={`spec-${spec.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <dt className="text-muted-foreground font-medium">{spec.label}</dt>
                    <dd className="font-semibold text-right">{spec.value}</dd>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {vehicle.smartFeatures.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold mb-8">Smart Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {vehicle.smartFeatures.map((feature, index) => (
                  <Card key={index} className="p-6 hover-elevate transition-all" data-testid={`feature-${feature.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    <div className="flex items-start gap-6">
                      <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-white">
                        <img
                          src={feature.icon}
                          alt={feature.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground text-sm">{feature.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}