import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

const faqData = [
  {
    category: "Charging & Battery",
    questions: [
      {
        question: "How long does it take to charge the scooter?",
        answer: "Around 2–3 hours for Lithium Ion batteries and 6–7 hours in case of Graphene / Lead-acid batteries."
      },
      {
        question: "Can I charge it at home?",
        answer: "Yes, the scooter comes with a portable charger compatible with regular household outlets – using a standard 5A socket."
      },
      {
        question: "What is the battery warranty?",
        answer: "3 years or 20,000 km (whichever comes first) for Lithium Ion; typically 9 months for Graphene batteries."
      },
      {
        question: "Is fast charging available?",
        answer: "Not currently, but future models may support it."
      }
    ]
  },
  {
    category: "Range & Performance",
    questions: [
      {
        question: "What is the real-world range?",
        answer: "Depends on battery capacity. For example, a 60V 31Ah Lithium Ion battery typically gives 60–70 km per charge (depending on terrain, rider weight, and driving conditions)."
      },
      {
        question: "What is the top speed?",
        answer: "We have both low-speed and high-speed models ideal for urban and semi-rural commuting."
      },
      {
        question: "Can I ride in the rain?",
        answer: "Yes, the scooter is IP-rated for water resistance."
      }
    ]
  },
  {
    category: "Cost & Savings",
    questions: [
      {
        question: "How much does it cost to charge?",
        answer: "About 1.5 units of electricity – roughly less than ₹10 per full charge (based on ₹6/kWh rate)."
      },
      {
        question: "What are the maintenance costs?",
        answer: "Very low—no oil changes, fewer moving parts, and only minimal servicing every 3 months (required to maintain warranty)."
      },
      {
        question: "Are there government subsidies?",
        answer: "No, we don't take government subsidies. At Varcas, we believe in ethical, transparent business practices. Even without subsidies, our scooters are priced competitively."
      }
    ]
  },
  {
    category: "Legal & Registration",
    questions: [
      {
        question: "Do I need a license or registration?",
        answer: "Not required for low-speed vehicles. Required for high-speed models."
      },
      {
        question: "Is insurance mandatory?",
        answer: "Optional for license-free models; mandatory for registered ones."
      }
    ]
  },
  {
    category: "Service & Support",
    questions: [
      {
        question: "Where can I get it serviced?",
        answer: "At any authorized Varcas service center or via doorstep service in select areas."
      },
      {
        question: "What does the warranty cover?",
        answer: "Battery, motor, and controller. Physical damage and water ingress are excluded."
      },
      {
        question: "Are spare parts available?",
        answer: "Yes, through Varcas dealers, company stores, website, and service partners."
      }
    ]
  }
];

export default function FAQ() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <Breadcrumbs items={[{ label: "FAQ" }]} />
      </div>
      
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-faq-title">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl" data-testid="text-faq-subtitle">
            Find answers to common questions about VARCAS electric vehicles, charging, maintenance, and more.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {faqData.map((category, categoryIndex) => (
            <div key={categoryIndex} data-testid={`section-${category.category.toLowerCase().replace(/\s+/g, '-')}`}>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6" data-testid={`text-category-${categoryIndex}`}>
                {category.category}
              </h2>
              
              <Card className="p-6">
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, questionIndex) => (
                    <AccordionItem 
                      key={questionIndex} 
                      value={`item-${categoryIndex}-${questionIndex}`}
                      data-testid={`accordion-item-${categoryIndex}-${questionIndex}`}
                    >
                      <AccordionTrigger 
                        className="text-left hover:no-underline"
                        data-testid={`accordion-trigger-${categoryIndex}-${questionIndex}`}
                      >
                        <span className="font-semibold text-foreground">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent 
                        className="text-muted-foreground"
                        data-testid={`accordion-content-${categoryIndex}-${questionIndex}`}
                      >
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Card>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-12 text-center">
          <Card className="p-8 bg-primary/5">
            <h3 className="text-xl font-bold text-foreground mb-3" data-testid="text-more-questions">
              Still Have Questions?
            </h3>
            <p className="text-muted-foreground mb-6">
              Can't find the answer you're looking for? Contact our customer support team.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a 
                href="mailto:support@varcas.com" 
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover-elevate active-elevate-2"
                data-testid="link-contact-email"
              >
                Email Support
              </a>
              <a 
                href="tel:+911234567890" 
                className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-md font-medium hover-elevate active-elevate-2"
                data-testid="link-contact-phone"
              >
                Call Us
              </a>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
