import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroImage1 from "@assets/Gemini_Generated_Image_4jzcos4jzcos4jzc_1759490673763.png";
import heroImage2 from "@assets/Gemini_Generated_Image_qk9odzqk9odzqk9o_1759490673764.png";
import heroImage3 from "@assets/Gemini_Generated_Image_w9nnm2w9nnm2w9nn_1759490673764.png";

const fallbackSlides = [
  {
    image: heroImage1,
    title: "Smart & Connected",
    subtitle: "Experience the future of urban commuting with Varcas' Smart & Connected E-Bike",
    type: "image" as const,
  },
  {
    image: heroImage2,
    title: "Reliable, Sustainable & Affordable",
    subtitle: "Complete e-mobility solutions for a greener tomorrow",
    type: "image" as const,
  },
  {
    image: heroImage3,
    title: "150 KM Range",
    subtitle: "Economical ride at just 13 Paise/KM with lithium-ion battery technology",
    type: "image" as const,
  },
  {
    title: "Watch Our Engineering",
    subtitle: "See how we assemble the future of electric mobility",
    type: "video" as const,
  },
];

interface HeroSlide {
  id: number;
  title: string;
  subtitle?: string;
  imageUrl?: string;
  videoUrl?: string;
  ctaText?: string;
  ctaLink?: string;
}

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const { data: apiSlides } = useQuery<HeroSlide[]>({
    queryKey: ["/api/hero-slides"],
  });

  const heroSlides = apiSlides && apiSlides.length > 0 
    ? apiSlides.map(slide => ({
        image: slide.imageUrl,
        title: slide.title,
        subtitle: slide.subtitle,
        type: (slide.videoUrl ? "video" : "image") as "video" | "image",
        ctaText: slide.ctaText,
        ctaLink: slide.ctaLink,
        videoUrl: slide.videoUrl,
      }))
    : fallbackSlides;

  // Reset currentSlide when heroSlides changes to prevent out-of-bounds
  useEffect(() => {
    setCurrentSlide((prev) => prev >= heroSlides.length ? 0 : prev);
  }, [heroSlides.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="relative min-h-[600px] lg:min-h-[800px] overflow-hidden">
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {slide.type === "image" ? (
            <>
              <div className="absolute inset-0">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
              </div>

              <div className="relative h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="max-w-2xl">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                      {slide.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 mb-8">
                      {slide.subtitle}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Button
                        variant="default"
                        size="lg"
                        className="text-base"
                        data-testid="button-explore-models"
                      >
                        Explore Models
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="text-base bg-white/10 backdrop-blur border-white/20 text-white hover:bg-white/20"
                        data-testid="button-learn-more"
                      >
                        Learn More
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="absolute inset-0 bg-black">
                <div className="w-full h-full flex items-center justify-center" data-testid="video-assembly-hero">
                  <div className="text-center text-white space-y-4">
                    <div className="text-6xl mb-4">▶️</div>
                    <p className="text-2xl font-bold">Assembly Video Placeholder</p>
                    <p className="text-lg text-white/80 max-w-xl mx-auto px-4">
                      Video file will be integrated here - Electric scooter assembly animation
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl text-white/90">
                  {slide.subtitle}
                </p>
              </div>
            </>
          )}
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur transition-colors"
        data-testid="button-prev-slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur transition-colors"
        data-testid="button-next-slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide
                ? "w-8 bg-primary"
                : "w-2 bg-white/50 hover:bg-white/75"
            }`}
            data-testid={`button-slide-${index}`}
          />
        ))}
      </div>
    </div>
  );
}