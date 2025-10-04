import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Newspaper } from "lucide-react";
import { pressArticles } from "@/data/pressMediaData";
import { Link } from "wouter";

export default function PressMediaSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % pressArticles.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % pressArticles.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + pressArticles.length) % pressArticles.length);
  };

  const currentArticle = pressArticles[currentSlide];

  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Newspaper className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold">Press & Media</h2>
          </div>
          <p className="text-lg text-muted-foreground">
            Latest news and updates from VARCAS
          </p>
        </div>

        <div className="relative">
          <Card className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="aspect-video bg-muted rounded-md overflow-hidden">
                <img
                  src={currentArticle.image}
                  alt={currentArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <Badge className="mb-4" data-testid={`badge-category-${currentSlide}`}>
                  {currentArticle.category}
                </Badge>
                <h3 className="text-2xl md:text-3xl font-bold mb-3">
                  {currentArticle.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {currentArticle.publication} • {currentArticle.date}
                </p>
                <p className="text-muted-foreground mb-6">
                  {currentArticle.excerpt}
                </p>
                <Link href="/press-media">
                  <Button variant="outline" data-testid="button-view-all-press">
                    View All Press Releases
                  </Button>
                </Link>
              </div>
            </div>
          </Card>

          <Button
            onClick={prevSlide}
            size="icon"
            variant="outline"
            className="absolute left-4 top-1/2 -translate-y-1/2 shadow-lg"
            data-testid="button-press-prev"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <Button
            onClick={nextSlide}
            size="icon"
            variant="outline"
            className="absolute right-4 top-1/2 -translate-y-1/2 shadow-lg"
            data-testid="button-press-next"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          <div className="flex justify-center gap-2 mt-6">
            {pressArticles.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? "w-8 bg-primary"
                    : "w-2 bg-muted hover:bg-muted-foreground/50"
                }`}
                data-testid={`button-press-dot-${index}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
