import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import teamImage from "@assets/stock_images/professional_busines_82f1c896.jpg";

export default function AboutPreview() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-4" data-testid="badge-experience">20+ Years Experience</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">About Us</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Varcas is a pioneering electric vehicle manufacturer dedicated to accelerating the global transition to sustainable transportation. Committed to innovation, affordability, and reliability, we strive to provide complete e-mobility solutions while upholding values of integrity, excellence, and sustainability.
            </p>
            <p className="text-muted-foreground mb-6">
              Team Varcas comprises professionals from USA & INDIA who have extensive professional experience of 20+ years in IT and Automobile. We have a proven track record of delivering high-quality services through our experienced professionals with an understanding of global business and regulatory requirements.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-card rounded-md flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">ISO</span>
                </div>
                <div className="text-sm">
                  <p className="font-semibold">ISO Certified</p>
                  <p className="text-muted-foreground">Quality Assured</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-card rounded-md flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">IATF</span>
                </div>
                <div className="text-sm">
                  <p className="font-semibold">IATF Certified</p>
                  <p className="text-muted-foreground">International Standards</p>
                </div>
              </div>
            </div>
            <Button
              variant="default"
              size="lg"
              data-testid="button-read-more"
              onClick={() => console.log('Navigate to about page')}
            >
              Read More
            </Button>
          </div>

          <div className="relative">
            <img
              src={teamImage}
              alt="VARCAS Team"
              className="rounded-md w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}