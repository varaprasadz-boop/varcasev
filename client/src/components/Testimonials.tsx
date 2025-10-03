import { useState } from "react";
import TestimonialCard from "./TestimonialCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import customer1 from "@assets/stock_images/happy_customer_portr_4a379b91.jpg";
import customer2 from "@assets/stock_images/happy_customer_portr_9a0c17fa.jpg";
import customer3 from "@assets/stock_images/happy_customer_portr_d1a74b8f.jpg";

const testimonials = [
  {
    quote: "Varcas e-bikes have revolutionized my daily commute! The sleek design, long-lasting battery, and smooth ride make every journey effortless. I'm proud to be a Varcas e-bike owner!",
    name: "Karthik Reddy",
    location: "Bangalore",
    image: customer1,
  },
  {
    quote: "I was skeptical about e-bikes until I tried Varcas. Their e-bikes offer the perfect combination of pedal power and electric assistance. Best decision for my daily travel.",
    name: "Priya Sharma",
    location: "Mumbai",
    image: customer2,
  },
  {
    quote: "The GPS tracking and smart features give me complete peace of mind. Plus, the cost savings compared to my old petrol scooter are incredible. Highly recommended!",
    name: "Amit Patel",
    location: "Ahmedabad",
    image: customer3,
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Our Testimonials
          </h2>
          <p className="text-lg text-muted-foreground">
            Hear what our customers have to say
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <TestimonialCard {...testimonials[currentIndex]} />
            
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prev}
                data-testid="button-prev-testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? "w-8 bg-primary"
                        : "w-2 bg-muted hover:bg-muted-foreground/50"
                    }`}
                    data-testid={`button-testimonial-${index}`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={next}
                data-testid="button-next-testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}