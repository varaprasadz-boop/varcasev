import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Award, Users, Globe, Target } from "lucide-react";
import teamImage from "@assets/stock_images/professional_busines_82f1c896.jpg";

const values = [
  {
    icon: Award,
    title: "Reliability",
    description: "20+ years of proven excellence in delivering high-quality e-mobility solutions",
  },
  {
    icon: Globe,
    title: "Sustainability",
    description: "Committed to accelerating the global transition to eco-friendly transportation",
  },
  {
    icon: Target,
    title: "Affordability",
    description: "Making electric vehicles accessible to everyone with economical pricing",
  },
  {
    icon: Users,
    title: "Excellence",
    description: "Professional team from USA & India with deep automotive expertise",
  },
];

const leadershipTeam = [
  {
    name: "Rajesh Kumar",
    role: "CEO & Founder",
    image: teamImage,
    bio: "20+ years in automotive innovation, driving VARCAS's vision for sustainable mobility",
  },
  {
    name: "Priya Sharma",
    role: "CTO",
    image: teamImage,
    bio: "Technology expert with extensive experience in electric vehicle systems and IoT",
  },
  {
    name: "Michael Chen",
    role: "VP Operations",
    image: teamImage,
    bio: "Global operations specialist ensuring quality and efficiency across markets",
  },
  {
    name: "Anita Desai",
    role: "Head of Design",
    image: teamImage,
    bio: "Award-winning designer bringing innovation and aesthetics to every VARCAS model",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4" data-testid="badge-experience">20+ Years Experience</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About VARCAS</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Pioneering electric vehicle manufacturer dedicated to accelerating the global transition to sustainable transportation
            </p>
          </div>

          <div className="mb-16">
            <img
              src={teamImage}
              alt="VARCAS Team"
              className="w-full h-96 object-cover rounded-md"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Varcas is committed to innovation, affordability, and reliability. We strive to provide complete e-mobility solutions while upholding values of integrity, excellence, and sustainability.
              </p>
              <p className="text-lg text-muted-foreground">
                Team Varcas comprises professionals from USA & INDIA who have extensive professional experience of 20+ years in IT and Automobile. We have a proven track record of delivering high-quality services through our experienced professionals with an understanding of global business and regulatory requirements.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6">Certifications</h2>
              <div className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-primary/10 rounded-md flex items-center justify-center">
                      <span className="text-3xl font-bold text-primary">ISO</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">ISO Certified Company</h3>
                      <p className="text-muted-foreground">International quality management standards</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-primary/10 rounded-md flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">IATF</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">IATF Certified Company</h3>
                      <p className="text-muted-foreground">Automotive quality management system</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Leadership Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {leadershipTeam.map((leader) => (
                <Card key={leader.name} className="overflow-hidden hover-elevate transition-all" data-testid={`card-leader-${leader.name.toLowerCase().replace(/\s+/g, '-')}`}>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6">
                    <div className="sm:col-span-1">
                      <img
                        src={leader.image}
                        alt={leader.name}
                        className="w-full aspect-square object-cover rounded-md"
                      />
                    </div>
                    <div className="sm:col-span-2 flex flex-col justify-center">
                      <h3 className="text-xl font-bold mb-1">{leader.name}</h3>
                      <p className="text-primary font-semibold mb-3">{leader.role}</p>
                      <p className="text-muted-foreground text-sm">{leader.bio}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <Card key={value.title} className="p-6 hover-elevate transition-all" data-testid={`card-value-${value.title.toLowerCase()}`}>
                    <Icon className="w-12 h-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}