import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  name: string;
  location?: string;
  image: string;
}

export default function TestimonialCard({
  quote,
  name,
  location,
  image,
}: TestimonialCardProps) {
  return (
    <Card className="p-6 md:p-8" data-testid={`card-testimonial-${name.toLowerCase().replace(/\s+/g, '-')}`}>
      <Quote className="w-10 h-10 text-primary mb-4" />
      <p className="text-muted-foreground mb-6 italic">{quote}</p>
      <div className="flex items-center gap-4">
        <img
          src={image}
          alt={name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold">{name}</p>
          {location && <p className="text-sm text-muted-foreground">{location}</p>}
        </div>
      </div>
    </Card>
  );
}