import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  Car,
  Images,
  BarChart3,
  MessageSquare,
  Newspaper,
  Briefcase,
  MapPin,
  HelpCircle,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const menuItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Vehicles",
    url: "/admin/vehicles",
    icon: Car,
  },
  {
    title: "Hero Slides",
    url: "/admin/hero-slides",
    icon: Images,
  },
  {
    title: "Statistics",
    url: "/admin/stats",
    icon: BarChart3,
  },
  {
    title: "Testimonials",
    url: "/admin/testimonials",
    icon: MessageSquare,
  },
  {
    title: "Press & Media",
    url: "/admin/press",
    icon: Newspaper,
  },
  {
    title: "Job Openings",
    url: "/admin/jobs",
    icon: Briefcase,
  },
  {
    title: "Dealers",
    url: "/admin/dealers",
    icon: MapPin,
  },
  {
    title: "FAQ",
    url: "/admin/faq",
    icon: HelpCircle,
  },
  {
    title: "Form Submissions",
    url: "/admin/forms",
    icon: FileText,
  },
];

export function AppSidebar() {
  const [location] = useLocation();
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">V</span>
          </div>
          <div>
            <h2 className="font-semibold text-sm">VARCAS Admin</h2>
            <p className="text-xs text-muted-foreground">{user?.role}</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Content Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location === item.url || 
                  (item.url !== "/admin" && location.startsWith(item.url));
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.url} data-testid={`nav-${item.title.toLowerCase().replace(/\s+/g, '-')}`}>
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-4">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={handleLogout}
          data-testid="button-logout"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
