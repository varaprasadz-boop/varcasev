import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

export default function FAQCTA() {
  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-8 md:p-12 bg-primary/5 border-primary/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <HelpCircle className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2" data-testid="text-faq-cta-title">
                  Have Questions?
                </h3>
                <p className="text-muted-foreground">
                  Find answers to common questions about our electric vehicles
                </p>
              </div>
            </div>
            <Button size="lg" asChild data-testid="button-read-faqs">
              <Link href="/faq">
                Read FAQs
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
