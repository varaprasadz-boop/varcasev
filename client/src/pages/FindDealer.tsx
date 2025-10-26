import { useState, useMemo } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQCTA from "@/components/FAQCTA";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const dealers = [
  {
    id: 1,
    name: "VARCAS Connaught Place",
    address: "Block A, Connaught Place, New Delhi, Delhi - 110001",
    phone: "+91 11 4567 8900",
    email: "delhi@varcasautomobiles.com",
    hours: "Mon-Sat: 10:00 AM - 7:00 PM, Sun: 10:00 AM - 5:00 PM",
    state: "Delhi",
    district: "Central Delhi",
    city: "New Delhi",
  },
  {
    id: 2,
    name: "VARCAS Dwarka",
    address: "Sector 12, Dwarka, New Delhi, Delhi - 110075",
    phone: "+91 11 4567 8901",
    email: "dwarka@varcasautomobiles.com",
    hours: "Mon-Sat: 10:00 AM - 7:00 PM, Sun: 10:00 AM - 5:00 PM",
    state: "Delhi",
    district: "South West Delhi",
    city: "Dwarka",
  },
  {
    id: 3,
    name: "VARCAS Andheri",
    address: "SV Road, Andheri West, Mumbai, Maharashtra - 400053",
    phone: "+91 22 4567 8900",
    email: "andheri@varcasautomobiles.com",
    hours: "Mon-Sat: 10:00 AM - 7:00 PM, Sun: Closed",
    state: "Maharashtra",
    district: "Mumbai Suburban",
    city: "Mumbai",
  },
  {
    id: 4,
    name: "VARCAS Pune",
    address: "FC Road, Shivaji Nagar, Pune, Maharashtra - 411005",
    phone: "+91 20 4567 8900",
    email: "pune@varcasautomobiles.com",
    hours: "Mon-Sat: 10:00 AM - 7:00 PM, Sun: 10:00 AM - 5:00 PM",
    state: "Maharashtra",
    district: "Pune",
    city: "Pune",
  },
  {
    id: 5,
    name: "VARCAS Thane",
    address: "Ghodbunder Road, Thane West, Thane, Maharashtra - 400607",
    phone: "+91 22 4567 8902",
    email: "thane@varcasautomobiles.com",
    hours: "Mon-Sat: 10:00 AM - 7:00 PM, Sun: Closed",
    state: "Maharashtra",
    district: "Thane",
    city: "Thane",
  },
  {
    id: 6,
    name: "VARCAS Koramangala",
    address: "80 Feet Road, Koramangala, Bangalore, Karnataka - 560034",
    phone: "+91 80 4567 8900",
    email: "koramangala@varcasautomobiles.com",
    hours: "Mon-Sat: 10:00 AM - 7:00 PM, Sun: 10:00 AM - 5:00 PM",
    state: "Karnataka",
    district: "Bangalore Urban",
    city: "Bangalore",
  },
  {
    id: 7,
    name: "VARCAS Whitefield",
    address: "ITPL Main Road, Whitefield, Bangalore, Karnataka - 560066",
    phone: "+91 80 4567 8901",
    email: "whitefield@varcasautomobiles.com",
    hours: "Mon-Sat: 10:00 AM - 7:00 PM, Sun: 10:00 AM - 5:00 PM",
    state: "Karnataka",
    district: "Bangalore Urban",
    city: "Bangalore",
  },
  {
    id: 8,
    name: "VARCAS Mysore",
    address: "Hunsur Road, Mysore, Karnataka - 570017",
    phone: "+91 821 4567 8900",
    email: "mysore@varcasautomobiles.com",
    hours: "Mon-Sat: 10:00 AM - 7:00 PM, Sun: Closed",
    state: "Karnataka",
    district: "Mysore",
    city: "Mysore",
  },
  {
    id: 9,
    name: "VARCAS Banjara Hills",
    address: "Road No. 12, Banjara Hills, Hyderabad, Telangana - 500034",
    phone: "+91 40 4567 8900",
    email: "banjarahills@varcasautomobiles.com",
    hours: "Mon-Sat: 10:00 AM - 7:00 PM, Sun: 10:00 AM - 5:00 PM",
    state: "Telangana",
    district: "Hyderabad",
    city: "Hyderabad",
  },
  {
    id: 10,
    name: "VARCAS Madhapur",
    address: "HITEC City, Madhapur, Hyderabad, Telangana - 500081",
    phone: "+91 40 4567 8901",
    email: "madhapur@varcasautomobiles.com",
    hours: "Mon-Sat: 10:00 AM - 7:00 PM, Sun: Closed",
    state: "Telangana",
    district: "Hyderabad",
    city: "Hyderabad",
  },
  {
    id: 11,
    name: "VARCAS Warangal",
    address: "Hanamkonda, Warangal, Telangana - 506001",
    phone: "+91 870 4567 8900",
    email: "warangal@varcasautomobiles.com",
    hours: "Mon-Sat: 10:00 AM - 7:00 PM, Sun: Closed",
    state: "Telangana",
    district: "Warangal",
    city: "Warangal",
  },
  {
    id: 12,
    name: "VARCAS T. Nagar",
    address: "Usman Road, T. Nagar, Chennai, Tamil Nadu - 600017",
    phone: "+91 44 4567 8900",
    email: "tnagar@varcasautomobiles.com",
    hours: "Mon-Sat: 10:00 AM - 7:00 PM, Sun: 10:00 AM - 5:00 PM",
    state: "Tamil Nadu",
    district: "Chennai",
    city: "Chennai",
  },
  {
    id: 13,
    name: "VARCAS Anna Nagar",
    address: "2nd Avenue, Anna Nagar, Chennai, Tamil Nadu - 600040",
    phone: "+91 44 4567 8901",
    email: "annanagar@varcasautomobiles.com",
    hours: "Mon-Sat: 10:00 AM - 7:00 PM, Sun: Closed",
    state: "Tamil Nadu",
    district: "Chennai",
    city: "Chennai",
  },
  {
    id: 14,
    name: "VARCAS Coimbatore",
    address: "Avinashi Road, Coimbatore, Tamil Nadu - 641018",
    phone: "+91 422 4567 8900",
    email: "coimbatore@varcasautomobiles.com",
    hours: "Mon-Sat: 10:00 AM - 7:00 PM, Sun: Closed",
    state: "Tamil Nadu",
    district: "Coimbatore",
    city: "Coimbatore",
  },
  {
    id: 15,
    name: "VARCAS Kochi",
    address: "MG Road, Ernakulam, Kochi, Kerala - 682016",
    phone: "+91 484 4567 8900",
    email: "kochi@varcasautomobiles.com",
    hours: "Mon-Sat: 10:00 AM - 7:00 PM, Sun: 10:00 AM - 5:00 PM",
    state: "Kerala",
    district: "Ernakulam",
    city: "Kochi",
  },
  {
    id: 16,
    name: "VARCAS Trivandrum",
    address: "Statue Junction, Trivandrum, Kerala - 695001",
    phone: "+91 471 4567 8900",
    email: "trivandrum@varcasautomobiles.com",
    hours: "Mon-Sat: 10:00 AM - 7:00 PM, Sun: Closed",
    state: "Kerala",
    district: "Thiruvananthapuram",
    city: "Trivandrum",
  },
  {
    id: 17,
    name: "VARCAS Ahmedabad",
    address: "CG Road, Navrangpura, Ahmedabad, Gujarat - 380009",
    phone: "+91 79 4567 8900",
    email: "ahmedabad@varcasautomobiles.com",
    hours: "Mon-Sat: 10:00 AM - 7:00 PM, Sun: 10:00 AM - 5:00 PM",
    state: "Gujarat",
    district: "Ahmedabad",
    city: "Ahmedabad",
  },
  {
    id: 18,
    name: "VARCAS Surat",
    address: "Ring Road, Surat, Gujarat - 395002",
    phone: "+91 261 4567 8900",
    email: "surat@varcasautomobiles.com",
    hours: "Mon-Sat: 10:00 AM - 7:00 PM, Sun: Closed",
    state: "Gujarat",
    district: "Surat",
    city: "Surat",
  },
  {
    id: 19,
    name: "VARCAS Jaipur",
    address: "MI Road, Jaipur, Rajasthan - 302001",
    phone: "+91 141 4567 8900",
    email: "jaipur@varcasautomobiles.com",
    hours: "Mon-Sat: 10:00 AM - 7:00 PM, Sun: 10:00 AM - 5:00 PM",
    state: "Rajasthan",
    district: "Jaipur",
    city: "Jaipur",
  },
  {
    id: 20,
    name: "VARCAS Lucknow",
    address: "Hazratganj, Lucknow, Uttar Pradesh - 226001",
    phone: "+91 522 4567 8900",
    email: "lucknow@varcasautomobiles.com",
    hours: "Mon-Sat: 10:00 AM - 7:00 PM, Sun: Closed",
    state: "Uttar Pradesh",
    district: "Lucknow",
    city: "Lucknow",
  },
];

export default function FindDealer() {
  const [selectedState, setSelectedState] = useState<string>("ALL");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("ALL");
  const [selectedCity, setSelectedCity] = useState<string>("ALL");

  const states = useMemo(() => {
    const uniqueStates = Array.from(new Set(dealers.map(d => d.state))).sort();
    return uniqueStates;
  }, []);

  const districts = useMemo(() => {
    if (!selectedState || selectedState === "ALL") {
      // Show all districts from all states
      const uniqueDistricts = Array.from(new Set(dealers.map(d => d.district))).sort();
      return uniqueDistricts;
    }
    const uniqueDistricts = Array.from(
      new Set(dealers.filter(d => d.state === selectedState).map(d => d.district))
    ).sort();
    return uniqueDistricts;
  }, [selectedState]);

  const cities = useMemo(() => {
    if (!selectedDistrict || selectedDistrict === "ALL") {
      // Show all cities based on state filter
      if (!selectedState || selectedState === "ALL") {
        const uniqueCities = Array.from(new Set(dealers.map(d => d.city))).sort();
        return uniqueCities;
      }
      const uniqueCities = Array.from(
        new Set(dealers.filter(d => d.state === selectedState).map(d => d.city))
      ).sort();
      return uniqueCities;
    }
    const uniqueCities = Array.from(
      new Set(
        dealers
          .filter(d => {
            if (selectedState && selectedState !== "ALL" && d.state !== selectedState) return false;
            if (d.district !== selectedDistrict) return false;
            return true;
          })
          .map(d => d.city)
      )
    ).sort();
    return uniqueCities;
  }, [selectedState, selectedDistrict]);

  const filteredDealers = useMemo(() => {
    return dealers.filter(dealer => {
      if (selectedState && selectedState !== "ALL" && dealer.state !== selectedState) return false;
      if (selectedDistrict && selectedDistrict !== "ALL" && dealer.district !== selectedDistrict) return false;
      if (selectedCity && selectedCity !== "ALL" && dealer.city !== selectedCity) return false;
      return true;
    });
  }, [selectedState, selectedDistrict, selectedCity]);

  const handleStateChange = (value: string) => {
    setSelectedState(value);
    setSelectedDistrict("ALL");
    setSelectedCity("ALL");
  };

  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value);
    setSelectedCity("ALL");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <Breadcrumbs items={[{ label: "Find Dealer" }]} />
      </div>
      
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Locate Showroom</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              VARCAS, a symbol of timeless elegance and rugged performance, thrives within the bustling streets
            </p>
          </div>

          <Card className="p-6 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Select
                  value={selectedState}
                  onValueChange={handleStateChange}
                >
                  <SelectTrigger data-testid="select-state">
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All States</SelectItem>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Select
                  value={selectedDistrict}
                  onValueChange={handleDistrictChange}
                >
                  <SelectTrigger data-testid="select-district">
                    <SelectValue placeholder="Select District" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Districts</SelectItem>
                    {districts.map((district) => (
                      <SelectItem key={district} value={district}>
                        {district}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Select
                  value={selectedCity}
                  onValueChange={setSelectedCity}
                >
                  <SelectTrigger data-testid="select-city">
                    <SelectValue placeholder="Select City" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Cities</SelectItem>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDealers.map((dealer) => (
              <Card 
                key={dealer.id} 
                className="p-6 hover-elevate transition-all" 
                data-testid={`card-dealer-${dealer.id}`}
              >
                <h3 className="text-xl font-bold mb-4">{dealer.name}</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">{dealer.address}</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                    <a 
                      href={`tel:${dealer.phone}`} 
                      className="text-sm text-muted-foreground hover:text-primary"
                      data-testid={`link-phone-${dealer.id}`}
                    >
                      {dealer.phone}
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                    <a 
                      href={`mailto:${dealer.email}`} 
                      className="text-sm text-muted-foreground hover:text-primary"
                      data-testid={`link-email-${dealer.id}`}
                    >
                      {dealer.email}
                    </a>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">{dealer.hours}</p>
                  </div>
                </div>

                <Button
                  variant="default"
                  className="w-full"
                  data-testid={`button-view-more-${dealer.id}`}
                  onClick={() => console.log(`View more details for ${dealer.name}`)}
                >
                  View More
                </Button>
              </Card>
            ))}
          </div>

          {filteredDealers.length === 0 && (
            <div className="text-center py-12">
              <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-xl font-semibold mb-2">No Dealers Found</p>
              <p className="text-muted-foreground">
                No dealers found for the selected location. Please try different filters.
              </p>
            </div>
          )}
        </div>
      </section>

      <FAQCTA />
      <Footer />
    </div>
  );
}
