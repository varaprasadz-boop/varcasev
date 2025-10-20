import { Link } from "wouter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const topFAQs = [
  {
    category: "Charging & Battery",
    question: "How long does it take to charge the scooter?",
    answer: "Around 2–3 hours for Lithium Ion batteries and 6–7 hours in case of Graphene / Lead-acid batteries."
  },
  {
    category: "Range & Performance",
    question: "What is the real-world range?",
    answer: "Depends on battery capacity. For example, a 60V 31Ah Lithium Ion battery typically gives 60–70 km per charge (depending on terrain, rider weight, and driving conditions)."
  },
  {
    category: "Cost & Savings",
    question: "How much does it cost to charge?",
    answer: "About 1.5 units of electricity – roughly less than ₹10 per full charge (based on ₹6/kWh rate)."
  },
  {
    category: "Legal & Registration",
    question: "Do I need a license or registration?",
    answer: "Not required for low-speed vehicles. Required for high-speed models."
  },
  {
    category: "Service & Support",
    question: "Where can I get it serviced?",
    answer: "At any authorized Varcas service center or via doorstep service in select areas."
  }
];

export default function FAQSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-faq-section-title">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-faq-section-subtitle">
            Quick answers to common questions about VARCAS electric vehicles
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-8">
          <Card className="p-6">
            <Accordion type="single" collapsible className="w-full">
              {topFAQs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  data-testid={`accordion-item-home-${index}`}
                >
                  <AccordionTrigger 
                    className="text-left hover:no-underline"
                    data-testid={`accordion-trigger-home-${index}`}
                  >
                    <div className="text-left">
                      <span className="text-xs text-primary font-medium mb-1 block">{faq.category}</span>
                      <span className="font-semibold text-foreground">{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent 
                    className="text-muted-foreground"
                    data-testid={`accordion-content-home-${index}`}
                  >
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            variant="outline"
            className="gap-2"
            asChild
            data-testid="button-view-all-faqs"
          >
            <Link href="/faq">
              View All FAQs
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
