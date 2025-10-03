import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PartnershipDialog from "@/components/PartnershipDialog";
import { Card } from "@/components/ui/card";
import { Handshake, Globe, Target, TrendingUp } from "lucide-react";
import prevalanceLogo from "@assets/JV Logo Final_1759481419156.pdf";

const partners = [
  {
    name: "Laxmi Motors",
    logo: "https://varcasautomobiles.com/images/laxmimoters.jpg",
    description: "Strategic distribution partner for nationwide reach",
  },
  {
    name: "Volta",
    logo: "https://varcasautomobiles.com/images/partners/volta.png",
    description: "Battery technology and charging solutions collaboration",
  },
  {
    name: "EVPE",
    logo: "https://varcasautomobiles.com/images/partners/evpe.svg",
    description: "Electric vehicle component manufacturing partnership",
  },
  {
    name: "Green Pioneer",
    logo: "https://varcasautomobiles.com/images/partners/greenpoineer.png",
    description: "Sustainability initiatives and eco-friendly solutions",
  },
  {
    name: "Bharath Seva",
    logo: "https://varcasautomobiles.com/images/partners/Bharathaseva.png",
    description: "Service network expansion and after-sales support",
  },
  {
    name: "Hetros",
    logo: "https://varcasautomobiles.com/images/partners/hetros.png",
    description: "Technology development and innovation partner",
  },
];

const jointVentures = [
  {
    name: "Prevalance",
    logo: prevalanceLogo,
    description: "Joint venture for advanced electric mobility solutions and market expansion across emerging territories",
  },
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

          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Joint Ventures</h2>
            <div className="grid grid-cols-1 gap-6">
              {jointVentures.map((jv) => (
                <Card key={jv.name} className="p-8 hover-elevate transition-all" data-testid={`card-jv-${jv.name.toLowerCase().replace(/\s+/g, '-')}`}>
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-full md:w-48 h-48 bg-card flex items-center justify-center rounded-md p-6">
                      <img
                        src={jv.logo}
                        alt={jv.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-2xl font-bold mb-3">{jv.name}</h3>
                      <p className="text-muted-foreground text-lg">{jv.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Our Strategic Partners</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partners.map((partner) => (
                <Card key={partner.name} className="p-6 hover-elevate transition-all" data-testid={`card-partner-${partner.name.toLowerCase().replace(/\s+/g, '-')}`}>
                  <div className="h-32 flex items-center justify-center mb-4 bg-white rounded-md p-4">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center">{partner.name}</h3>
                  <p className="text-sm text-muted-foreground text-center">{partner.description}</p>
                </Card>
              ))}
            </div>
          </div>

          <Card className="p-8 md:p-12 text-center bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Interested in Partnering?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're always looking for strategic partners who can help us expand our reach and enhance our offerings. Get in touch to explore collaboration opportunities.
            </p>
            <PartnershipDialog />
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}