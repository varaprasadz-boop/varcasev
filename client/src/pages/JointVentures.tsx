import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Handshake, Globe, Target, TrendingUp } from "lucide-react";

const partners = [
  { name: "Laxmi Motors", description: "Strategic distribution partner" },
  { name: "Volta Technologies", description: "Battery technology collaboration" },
  { name: "EVPE Solutions", description: "Charging infrastructure partner" },
  { name: "Green Pioneer", description: "Sustainability initiatives" },
  { name: "Bharath Seva", description: "Service network expansion" },
  { name: "Hetros Innovation", description: "Technology development" },
];

const benefits = [
  {
    icon: Globe,
    title: "Global Reach",
    description: "Expanding our footprint across international markets with strategic partnerships",
  },
  {
    icon: Target,
    title: "Shared Vision",
    description: "Collaborating with partners who share our commitment to sustainable mobility",
  },
  {
    icon: TrendingUp,
    title: "Growth Together",
    description: "Creating value for all stakeholders through innovative business models",
  },
  {
    icon: Handshake,
    title: "Trust & Reliability",
    description: "Building long-term relationships based on mutual trust and excellence",
  },
];

export default function JointVentures() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Joint Ventures & Partners</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Collaborating with industry leaders to deliver world-class e-mobility solutions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Partnership Approach</h2>
              <p className="text-lg text-muted-foreground mb-4">
                At VARCAS, we believe in the power of collaboration. Our joint ventures and strategic partnerships enable us to leverage complementary strengths, access new markets, and accelerate innovation in the electric vehicle sector.
              </p>
              <p className="text-lg text-muted-foreground">
                We work with partners who share our vision for sustainable transportation and are committed to delivering excellence in every aspect of the e-mobility ecosystem - from technology development to customer service.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <Card key={benefit.title} className="p-6" data-testid={`card-benefit-${benefit.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    <Icon className="w-10 h-10 text-primary mb-3" />
                    <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-8 text-center">Our Partners</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partners.map((partner) => (
                <Card key={partner.name} className="p-8 text-center hover-elevate transition-all" data-testid={`card-partner-${partner.name.toLowerCase().replace(/\s+/g, '-')}`}>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Handshake className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{partner.name}</h3>
                  <p className="text-sm text-muted-foreground">{partner.description}</p>
                </Card>
              ))}
            </div>
          </div>

          <Card className="mt-16 p-8 md:p-12 text-center bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Interested in Partnering?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're always looking for strategic partners who can help us expand our reach and enhance our offerings. Get in touch to explore collaboration opportunities.
            </p>
            <a
              href="mailto:partnerships@varcasautomobiles.com"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-8"
              data-testid="link-contact-partnership"
            >
              Contact Us for Partnerships
            </a>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}