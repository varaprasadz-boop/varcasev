import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import { 
  Users, 
  Car, 
  FileText, 
  Briefcase, 
  MapPin, 
  Settings,
  BarChart3,
  MessageSquare,
  LogOut
} from "lucide-react";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogout = async () => {
    await logout();
    setLocation("/admin/login");
  };

  const menuItems = [
    { icon: Car, title: "Vehicles", description: "Manage vehicle catalog", count: "15", href: "/admin/vehicles" },
    { icon: FileText, title: "Press & Media", description: "Manage press articles", count: "24", href: "/admin/press" },
    { icon: Briefcase, title: "Job Openings", description: "Manage career postings", count: "8", href: "/admin/jobs" },
    { icon: MapPin, title: "Dealers", description: "Manage dealer network", count: "45", href: "/admin/dealers" },
    { icon: Users, title: "Team Members", description: "Manage team profiles", count: "12", href: "/admin/team" },
    { icon: MessageSquare, title: "Form Submissions", description: "View customer inquiries", count: "32", href: "/admin/forms" },
    { icon: BarChart3, title: "Analytics", description: "View site statistics", count: "-", href: "/admin/analytics" },
    { icon: Settings, title: "Site Settings", description: "Configure website", count: "-", href: "/admin/settings" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold" data-testid="text-dashboard-title">VARCAS Admin Panel</h1>
            <p className="text-sm text-muted-foreground">Welcome back, {user?.fullName}</p>
          </div>
          <Button variant="outline" onClick={handleLogout} data-testid="button-logout">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Content Management</h2>
          <p className="text-muted-foreground">
            Select a section below to manage your website content
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {menuItems.map((item) => (
            <Card
              key={item.title}
              className="hover-elevate active-elevate-2 cursor-pointer transition-all"
              onClick={() => setLocation(item.href)}
              data-testid={`card-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {item.title}
                </CardTitle>
                <item.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-1" data-testid={`text-count-${item.title.toLowerCase().replace(/\s+/g, '-')}`}>
                  {item.count}
                </div>
                <p className="text-xs text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
              <CardDescription>Overview of your website performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Vehicles</span>
                <span className="text-lg font-semibold">15</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Active Dealers</span>
                <span className="text-lg font-semibold">45</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Pending Inquiries</span>
                <span className="text-lg font-semibold">32</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Active Jobs</span>
                <span className="text-lg font-semibold">8</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Information</CardTitle>
              <CardDescription>Current user and system details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Logged in as</p>
                <p className="font-medium">{user?.username}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{user?.email}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Role</p>
                <p className="font-medium capitalize">{user?.role?.replace('_', ' ')}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Last login</p>
                <p className="font-medium">{new Date().toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
