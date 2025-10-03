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

const ceo = {
  name: "Ram Vemireddy",
  role: "Founder & CEO",
  image: teamImage,
  bio: "Two decades of experience in Information Security and Compliance management for leading companies in the USA. Transitioning into the automotive industry in 2018, he spearheads Varcas with a commitment to sustainability.",
};

const executives = [
  {
    name: "Chenna Reddy",
    role: "Finance Head",
    image: teamImage,
    bio: "Oversees all financial operations, ensuring effective planning, control, and reporting. Plays a key role in driving financial strategy, maintaining compliance, and supporting the company's overall growth.",
  },
  {
    name: "LN Rao",
    role: "COO",
    image: teamImage,
    bio: "As Chief Operating Officer, ensures smooth execution of business operations, streamlining processes and driving efficiency across departments to align with the company's strategic goals.",
  },
  {
    name: "Y. Suresh Reddy",
    role: "Executive Director",
    image: teamImage,
    bio: "As Production Head, plays a key leadership role in overseeing core operations and driving organizational development to ensure operational efficiency and quality standards.",
  },
  {
    name: "Venu Gopal Reddy",
    role: "Executive Director (Kadapa)",
    image: teamImage,
    bio: "Oversees the company's Kadapa operations, driving growth, fostering customer relationships, and championing sustainability initiatives in the electric vehicle sector.",
  },
];

const advisors = [
  {
    name: "Mr. A C Keshava Reddy",
    role: "Advisory Board Member",
    image: teamImage,
    bio: "Mechanical engineer with vast experience across Asia in telecom, power, automobile, and government sectors. Active in the EV space since 2008, collaborated with the Ministry of Environment on pollution-reduction policies.",
  },
  {
    name: "Mr. Sridhar Ramani",
    role: "Director/Chief Mentor",
    image: teamImage,
    bio: "Board Member and Advisor with extensive experience in technology and business strategy, providing valuable guidance to the leadership team in driving growth and innovation.",
  },
];

const managers = [
  {
    name: "K. Chandu",
    role: "Production Manager",
    image: teamImage,
    bio: "Leads production at Varcas Automobiles, managing assembly processes, upholding quality standards, and advancing the company's mission for reliable electric vehicles.",
  },
  {
    name: "S. Madhu",
    role: "R&D & Sourcing Manager",
    image: teamImage,
    bio: "Drives research and development initiatives while managing sourcing operations to ensure quality components and innovative solutions for VARCAS vehicles.",
  },
  {
    name: "Hari Prakash",
    role: "Stores, Spare Parts & Customer Support Manager",
    image: teamImage,
    bio: "Manages stores, spare parts sales, warranty services, and customer support operations, ensuring excellent after-sales service and customer satisfaction.",
  },
];

const teamMembers = [
  {
    name: "Syda Rao",
    role: "Accounts Department",
    image: teamImage,
    bio: "Manages accounting operations and financial records, supporting the finance team in maintaining accurate financial documentation.",
  },
  {
    name: "J. Gangadhar",
    role: "Production Department",
    image: teamImage,
    bio: "Key member of the production team, contributing to manufacturing excellence and quality control processes.",
  },
  {
    name: "Mahesh",
    role: "Production Department",
    image: teamImage,
    bio: "Supports production operations, ensuring smooth manufacturing processes and adherence to quality standards.",
  },
  {
    name: "B. Naveen",
    role: "Warranty & Customer Support",
    image: teamImage,
    bio: "Provides warranty services and customer support, ensuring customer satisfaction and addressing service needs efficiently.",
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
            <h2 className="text-3xl font-bold mb-12 text-center">Leadership Team</h2>
            
            {/* CEO - Center, Large */}
            <div className="max-w-4xl mx-auto mb-16">
              <Card className="overflow-hidden hover-elevate transition-all border-2 border-primary/20" data-testid="card-ceo">
                <div className="p-8">
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="w-48 h-48 flex-shrink-0">
                      <img
                        src={ceo.image}
                        alt={ceo.name}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-3xl font-bold mb-2">{ceo.name}</h3>
                      <p className="text-primary font-semibold text-xl mb-4">{ceo.role}</p>
                      <p className="text-muted-foreground">{ceo.bio}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Executives - Second Level */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-center text-muted-foreground">Executive Leadership</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {executives.map((executive) => (
                  <Card key={executive.name} className="overflow-hidden hover-elevate transition-all" data-testid={`card-executive-${executive.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6">
                      <div className="sm:col-span-1">
                        <img
                          src={executive.image}
                          alt={executive.name}
                          className="w-full aspect-square object-cover rounded-md"
                        />
                      </div>
                      <div className="sm:col-span-2 flex flex-col justify-center">
                        <h4 className="text-xl font-bold mb-1">{executive.name}</h4>
                        <p className="text-primary font-semibold mb-3">{executive.role}</p>
                        <p className="text-muted-foreground text-sm">{executive.bio}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Advisors */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-center text-muted-foreground">Advisory Board</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {advisors.map((advisor) => (
                  <Card key={advisor.name} className="overflow-hidden hover-elevate transition-all" data-testid={`card-advisor-${advisor.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6">
                      <div className="sm:col-span-1">
                        <img
                          src={advisor.image}
                          alt={advisor.name}
                          className="w-full aspect-square object-cover rounded-md"
                        />
                      </div>
                      <div className="sm:col-span-2 flex flex-col justify-center">
                        <h4 className="text-xl font-bold mb-1">{advisor.name}</h4>
                        <p className="text-primary font-semibold mb-3">{advisor.role}</p>
                        <p className="text-muted-foreground text-sm">{advisor.bio}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Managers */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-center text-muted-foreground">Management Team</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {managers.map((manager) => (
                  <Card key={manager.name} className="overflow-hidden hover-elevate transition-all" data-testid={`card-manager-${manager.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    <div className="p-6">
                      <div className="mb-4">
                        <img
                          src={manager.image}
                          alt={manager.name}
                          className="w-full aspect-square object-cover rounded-md"
                        />
                      </div>
                      <h4 className="text-lg font-bold mb-1">{manager.name}</h4>
                      <p className="text-primary font-semibold text-sm mb-3">{manager.role}</p>
                      <p className="text-muted-foreground text-sm">{manager.bio}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Team Members */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-center text-muted-foreground">Team Members</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {teamMembers.map((member) => (
                  <Card key={member.name} className="overflow-hidden hover-elevate transition-all" data-testid={`card-member-${member.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    <div className="p-6">
                      <div className="mb-4">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full aspect-square object-cover rounded-md"
                        />
                      </div>
                      <h4 className="text-lg font-bold mb-1">{member.name}</h4>
                      <p className="text-primary font-semibold text-sm mb-3">{member.role}</p>
                      <p className="text-muted-foreground text-xs">{member.bio}</p>
                    </div>
                  </Card>
                ))}
              </div>
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