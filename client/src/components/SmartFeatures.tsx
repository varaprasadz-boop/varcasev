import FeatureCard from "./FeatureCard";
import { Battery, Navigation, Zap, Shield, MapPin, Bell } from "lucide-react";

const features = [
  {
    icon: Battery,
    title: "Lithium-ION Battery",
    description: "3 Year Warranty, maintenance free & portable battery technology",
  },
  {
    icon: Navigation,
    title: "GPS, GPRS Tracking",
    description: "Real-time remote GPS tracking for peace of mind to the user & family",
  },
  {
    icon: Zap,
    title: "150 KM Range",
    description: "Economical ride at just 13 Paise/KM with efficient battery management",
  },
  {
    icon: Shield,
    title: "Varcas Care Program",
    description: "Assured door step sales & after sales support at minimal annual cost",
  },
  {
    icon: MapPin,
    title: "Trip Tracking",
    description: "Alert the owner when scooter moves out of defined geography or speed",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description: "Battery voltage, theft, crash, speed alerts and remote immobilization",
  },
];

export default function SmartFeatures() {
  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Smart Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the future of urban commuting with advanced technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}