import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Battery, Zap, Navigation } from "lucide-react";

interface VehicleCardProps {
  name: string;
  image: string;
  range: string;
  battery: string;
  price?: string;
  link: string;
}

export default function VehicleCard({
  name,
  image,
  range,
  battery,
  price,
  link,
}: VehicleCardProps) {
  return (
    <Card className="overflow-hidden hover-elevate transition-all duration-300 group" data-testid={`card-vehicle-${name.toLowerCase()}`}>
      <div className="aspect-[4/3] overflow-hidden bg-card">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-4">{name}</h3>
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Zap className="w-4 h-4 text-primary" />
            <span>Range: {range}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Battery className="w-4 h-4 text-primary" />
            <span>{battery}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Navigation className="w-4 h-4 text-primary" />
            <span>GPS & GPRS Tracking</span>
          </div>
        </div>
        {price && (
          <p className="text-lg font-semibold text-primary mb-4">{price}</p>
        )}
        <Button
          variant="default"
          className="w-full"
          data-testid={`button-know-more-${name.toLowerCase()}`}
          onClick={() => console.log(`Navigate to ${link}`)}
        >
          Know More
        </Button>
      </div>
    </Card>
  );
}