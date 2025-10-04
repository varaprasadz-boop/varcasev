import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import JobApplicationDialog from "@/components/JobApplicationDialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, Clock } from "lucide-react";

const jobOpenings = [
  {
    title: "Senior Electrical Engineer",
    department: "Engineering",
    location: "Bangalore, India",
    type: "Full-time",
    experience: "5-8 years",
    description: "Lead the design and development of electric vehicle powertrains and battery management systems. Work with cutting-edge EV technology.",
  },
  {
    title: "Product Manager - EV",
    department: "Product",
    location: "Mumbai, India",
    type: "Full-time",
    experience: "3-5 years",
    description: "Drive product strategy and roadmap for our electric scooter lineup. Work closely with engineering and design teams.",
  },
  {
    title: "Sales Manager",
    department: "Sales",
    location: "Delhi NCR, India",
    type: "Full-time",
    experience: "4-6 years",
    description: "Lead sales strategy and team to expand VARCAS presence across North India. Build dealer network and partnerships.",
  },
  {
    title: "UI/UX Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    experience: "2-4 years",
    description: "Design intuitive digital experiences for our mobile app and web platforms. Create design systems for connected EV features.",
  },
  {
    title: "Manufacturing Engineer",
    department: "Manufacturing",
    location: "Chennai, India",
    type: "Full-time",
    experience: "3-5 years",
    description: "Optimize production processes and implement quality control systems. Work on assembly line efficiency for electric vehicles.",
  },
  {
    title: "Marketing Specialist",
    department: "Marketing",
    location: "Pune, India",
    type: "Full-time",
    experience: "2-4 years",
    description: "Develop and execute marketing campaigns for EV products. Manage digital marketing, social media, and brand communications.",
  },
];

export default function Careers() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Join Our Team</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Be part of the electric mobility revolution. Build your career with VARCAS and help shape the future of sustainable transportation.
            </p>
          </div>

          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-6 text-center">
                <h3 className="text-3xl font-bold text-primary mb-2">50+</h3>
                <p className="text-muted-foreground">Team Members</p>
              </Card>
              <Card className="p-6 text-center">
                <h3 className="text-3xl font-bold text-primary mb-2">5+</h3>
                <p className="text-muted-foreground">Office Locations</p>
              </Card>
              <Card className="p-6 text-center">
                <h3 className="text-3xl font-bold text-primary mb-2">10+</h3>
                <p className="text-muted-foreground">Growth Opportunities</p>
              </Card>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-8">Current Openings</h2>
            <div className="grid grid-cols-1 gap-6">
              {jobOpenings.map((job, index) => (
                <Card key={index} className="p-6 hover-elevate transition-all" data-testid={`card-job-${job.title.toLowerCase().replace(/\s+/g, '-')}`}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="outline" data-testid={`badge-department-${index}`}>{job.department}</Badge>
                        <Badge variant="outline" data-testid={`badge-type-${index}`}>{job.type}</Badge>
                      </div>
                    </div>
                    <JobApplicationDialog jobTitle={job.title} />
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{job.description}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-primary" />
                      <span>{job.experience}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{job.type}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <Card className="mt-16 p-8 md:p-12 text-center bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Don't See Your Role?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals to join our team. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <a href="mailto:careers@varcasautomobiles.com">
              <Button variant="default" size="lg" data-testid="button-contact-careers">
                Contact HR Team
              </Button>
            </a>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
