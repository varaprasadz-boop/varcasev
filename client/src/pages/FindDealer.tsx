import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Mail, Clock, Search } from "lucide-react";

const dealers = [
  {
    name: "VARCAS Delhi Showroom",
    address: "Connaught Place, New Delhi, Delhi - 110001",
    phone: "+91 11 XXXX XXXX",
    email: "delhi@varcasautomobiles.com",
    hours: "Mon-Sat: 10:00 AM - 7:00 PM",
    state: "Delhi",
  },
  {
    name: "VARCAS Mumbai Center",
    address: "Andheri West, Mumbai, Maharashtra - 400053",
    phone: "+91 22 XXXX XXXX",
    email: "mumbai@varcasautomobiles.com",
    hours: "Mon-Sat: 10:00 AM - 7:00 PM",
    state: "Maharashtra",
  },
  {
    name: "VARCAS Bangalore Hub",
    address: "Koramangala, Bangalore, Karnataka - 560034",
    phone: "+91 80 XXXX XXXX",
    email: "bangalore@varcasautomobiles.com",
    hours: "Mon-Sat: 10:00 AM - 7:00 PM",
    state: "Karnataka",
  },
  {
    name: "VARCAS Hyderabad Outlet",
    address: "Banjara Hills, Hyderabad, Telangana - 500034",
    phone: "+91 40 XXXX XXXX",
    email: "hyderabad@varcasautomobiles.com",
    hours: "Mon-Sat: 10:00 AM - 7:00 PM",
    state: "Telangana",
  },
  {
    name: "VARCAS Chennai Store",
    address: "T. Nagar, Chennai, Tamil Nadu - 600017",
    phone: "+91 44 XXXX XXXX",
    email: "chennai@varcasautomobiles.com",
    hours: "Mon-Sat: 10:00 AM - 7:00 PM",
    state: "Tamil Nadu",
  },
  {
    name: "VARCAS Pune Location",
    address: "Koregaon Park, Pune, Maharashtra - 411001",
    phone: "+91 20 XXXX XXXX",
    email: "pune@varcasautomobiles.com",
    hours: "Mon-Sat: 10:00 AM - 7:00 PM",
    state: "Maharashtra",
  },
];

export default function FindDealer() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDealers = dealers.filter((dealer) =>
    dealer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dealer.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dealer.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Find a Dealer</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Locate your nearest VARCAS dealer for test rides, purchases, and service support
            </p>
          </div>

          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by city, state or location..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search-dealer"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl font-bold mb-6">Dealer Locations</h2>
              <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2">
                {filteredDealers.map((dealer) => (
                  <Card key={dealer.name} className="p-6 hover-elevate transition-all" data-testid={`card-dealer-${dealer.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    <h3 className="text-xl font-bold mb-4">{dealer.name}</h3>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <p className="text-muted-foreground">{dealer.address}</p>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                        <a href={`tel:${dealer.phone}`} className="text-muted-foreground hover:text-primary">
                          {dealer.phone}
                        </a>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                        <a href={`mailto:${dealer.email}`} className="text-muted-foreground hover:text-primary">
                          {dealer.email}
                        </a>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                        <p className="text-muted-foreground">{dealer.hours}</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        variant="default"
                        className="flex-1"
                        data-testid="button-get-directions"
                        onClick={() => console.log(`Get directions to ${dealer.name}`)}
                      >
                        Get Directions
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1"
                        data-testid="button-contact-dealer"
                        onClick={() => console.log(`Contact ${dealer.name}`)}
                      >
                        Contact
                      </Button>
                    </div>
                  </Card>
                ))}

                {filteredDealers.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-xl text-muted-foreground">
                      No dealers found matching your search. Try a different location.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-2xl font-bold mb-6">Coverage Map</h2>
              <Card className="p-6 sticky top-24">
                <div className="aspect-square bg-card rounded-md flex items-center justify-center relative overflow-hidden">
                  <svg viewBox="0 0 400 500" className="w-full h-full text-primary/20" fill="currentColor">
                    <path d="M 150 50 L 180 80 L 200 70 L 230 90 L 250 85 L 280 100 L 290 120 L 300 150 L 310 180 L 315 220 L 310 260 L 300 300 L 285 340 L 270 370 L 250 390 L 230 410 L 210 430 L 190 445 L 170 455 L 150 460 L 130 455 L 110 445 L 90 430 L 75 410 L 65 390 L 55 370 L 50 350 L 45 330 L 42 310 L 40 290 L 40 270 L 42 250 L 45 230 L 50 210 L 58 190 L 68 170 L 80 150 L 95 130 L 110 110 L 125 90 L 135 70 Z" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                      <p className="text-xl font-bold mb-2">Pan-India Network</p>
                      <p className="text-muted-foreground">250+ Service Centers</p>
                      <p className="text-muted-foreground">400+ Sale Points</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 space-y-2">
                  <p className="text-sm text-muted-foreground text-center">
                    VARCAS dealers are strategically located across major cities in India
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center mt-4">
                    {Array.from(new Set(dealers.map(d => d.state))).map((state) => (
                      <span key={state} className="px-3 py-1 bg-primary/10 text-primary rounded-md text-sm">
                        {state}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}