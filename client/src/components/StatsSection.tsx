import { Users, MapPin, ShoppingBag, Award } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "30,000+",
    label: "Happy Customers",
  },
  {
    icon: MapPin,
    value: "250+",
    label: "Service Centers",
  },
  {
    icon: ShoppingBag,
    value: "400+",
    label: "Sale Points",
  },
  {
    icon: Award,
    value: "3,500+",
    label: "Joy Rides",
  },
];

export default function StatsSection() {
  return (
    <div className="bg-card border-y border-card-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center"
                data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <Icon className="w-10 h-10 mx-auto mb-3 text-primary" />
                <div className="text-3xl md:text-4xl font-bold text-foreground font-[Space_Grotesk] mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}