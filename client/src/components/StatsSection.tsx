import { useQuery } from "@tanstack/react-query";
import { Users, MapPin, ShoppingBag, Award, type LucideIcon } from "lucide-react";

const fallbackStats = [
  {
    icon: "Users" as const,
    value: "30,000+",
    label: "Happy Customers",
  },
  {
    icon: "MapPin" as const,
    value: "250+",
    label: "Service Centers",
  },
  {
    icon: "ShoppingBag" as const,
    value: "400+",
    label: "Sale Points",
  },
  {
    icon: "Award" as const,
    value: "3,500+",
    label: "Joy Rides",
  },
];

const iconMap: Record<string, LucideIcon> = {
  Users,
  MapPin,
  ShoppingBag,
  Award,
};

interface Stat {
  id: number;
  label: string;
  value: string;
  icon: string;
  displayOrder: number;
}

export default function StatsSection() {
  const { data: apiStats } = useQuery<Stat[]>({
    queryKey: ["/api/stats"],
  });

  const stats = apiStats && apiStats.length > 0
    ? apiStats.map(stat => ({
        icon: stat.icon || "Users",
        value: stat.value || "0",
        label: stat.label || "Stat",
      }))
    : fallbackStats;

  return (
    <div className="bg-card border-y border-card-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = iconMap[stat.icon] || Users;
            return (
              <div
                key={index}
                className="text-center"
                data-testid={`stat-${(stat.label || 'stat').toLowerCase().replace(/\s+/g, '-')}`}
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