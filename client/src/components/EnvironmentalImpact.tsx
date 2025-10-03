import { Leaf, Zap, Car, Volume2, Trees, Battery } from "lucide-react";
import { Card } from "@/components/ui/card";

const impacts = [
  {
    icon: Leaf,
    title: "Zero Emissions",
    description: "Powered by lithium-ion batteries, emitting zero pollutants and saving up to 500 pounds of carbon emissions annually",
  },
  {
    icon: Zap,
    title: "Energy Efficiency",
    description: "Exceptionally energy-efficient with minimal electricity consumption thanks to advanced battery technology",
  },
  {
    icon: Car,
    title: "Reduced Traffic Congestion",
    description: "Efficient and convenient mode of transportation, helping streamline city commutes",
  },
  {
    icon: Volume2,
    title: "Reduced Noise Pollution",
    description: "Quieter operation compared to gas-powered vehicles for a peaceful riding experience",
  },
  {
    icon: Trees,
    title: "Sustainable Transportation",
    description: "Promoting active transportation and healthier lifestyle choices for a greener future",
  },
  {
    icon: Battery,
    title: "Long-Lasting Batteries",
    description: "Durable battery technology with recyclable components at end of lifespan",
  },
];

export default function EnvironmentalImpact() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Environmental Impact
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Varcas e-Bikes are zero-emission vehicles powered by lithium-ion batteries. Make the eco-friendly choice and contribute to a sustainable future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {impacts.map((impact) => {
            const Icon = impact.icon;
            return (
              <Card
                key={impact.title}
                className="p-6 hover-elevate transition-all"
                data-testid={`card-impact-${impact.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <Icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">{impact.title}</h3>
                <p className="text-sm text-muted-foreground">{impact.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}