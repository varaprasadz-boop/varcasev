import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function DealerCTA() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-8 md:p-12 text-center bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join Us as a Dealer Today!
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Are you interested in becoming a dealer for Varcas electric vehicles? Contact us now to inquire about dealership opportunities and join our network of eco-friendly mobility providers.
          </p>
          <Button
            variant="default"
            size="lg"
            data-testid="button-become-dealer"
            onClick={() => console.log('Navigate to dealer page')}
          >
            Become a Dealer
          </Button>
        </Card>
      </div>
    </section>
  );
}