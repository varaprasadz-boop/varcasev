import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Home from "@/pages/Home";
import About from "@/pages/About";
import VehicleDetail from "@/pages/VehicleDetail";
import ViewAllProducts from "@/pages/ViewAllProducts";
import JointVentures from "@/pages/JointVentures";
import FindDealer from "@/pages/FindDealer";
import BuySpares from "@/pages/BuySpares";
import Careers from "@/pages/Careers";
import PressMedia from "@/pages/PressMedia";
import FAQ from "@/pages/FAQ";
import AdminLogin from "@/pages/admin/Login";
import AdminDashboard from "@/pages/admin/Dashboard";
import FormSubmissions from "@/pages/admin/FormSubmissions";
import VehiclesManagement from "@/pages/admin/VehiclesManagement";
import HeroSlidesManagement from "@/pages/admin/HeroSlidesManagement";
import StatsManagement from "@/pages/admin/StatsManagement";
import TestimonialsManagement from "@/pages/admin/TestimonialsManagement";
import PressManagement from "@/pages/admin/PressManagement";
import JobsManagement from "@/pages/admin/JobsManagement";
import DealersManagement from "@/pages/admin/DealersManagement";
import FAQManagement from "@/pages/admin/FAQManagement";
import NotFound from "@/pages/not-found";
import AdminLayout from "@/layouts/AdminLayout";

function Router() {
  return (
    <Switch>
      {/* Public routes */}
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/products" component={ViewAllProducts} />
      <Route path="/vehicle/:slug" component={VehicleDetail} />
      <Route path="/joint-ventures" component={JointVentures} />
      <Route path="/find-dealer" component={FindDealer} />
      <Route path="/buy-spares" component={BuySpares} />
      <Route path="/careers" component={Careers} />
      <Route path="/press-media" component={PressMedia} />
      <Route path="/faq" component={FAQ} />
      
      {/* Admin routes */}
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin">
        <ProtectedRoute>
          <AdminLayout>
            <AdminDashboard />
          </AdminLayout>
        </ProtectedRoute>
      </Route>
      <Route path="/admin/vehicles">
        <ProtectedRoute>
          <AdminLayout>
            <VehiclesManagement />
          </AdminLayout>
        </ProtectedRoute>
      </Route>
      <Route path="/admin/hero-slides">
        <ProtectedRoute>
          <AdminLayout>
            <HeroSlidesManagement />
          </AdminLayout>
        </ProtectedRoute>
      </Route>
      <Route path="/admin/stats">
        <ProtectedRoute>
          <AdminLayout>
            <StatsManagement />
          </AdminLayout>
        </ProtectedRoute>
      </Route>
      <Route path="/admin/testimonials">
        <ProtectedRoute>
          <AdminLayout>
            <TestimonialsManagement />
          </AdminLayout>
        </ProtectedRoute>
      </Route>
      <Route path="/admin/press">
        <ProtectedRoute>
          <AdminLayout>
            <PressManagement />
          </AdminLayout>
        </ProtectedRoute>
      </Route>
      <Route path="/admin/jobs">
        <ProtectedRoute>
          <AdminLayout>
            <JobsManagement />
          </AdminLayout>
        </ProtectedRoute>
      </Route>
      <Route path="/admin/dealers">
        <ProtectedRoute>
          <AdminLayout>
            <DealersManagement />
          </AdminLayout>
        </ProtectedRoute>
      </Route>
      <Route path="/admin/faq">
        <ProtectedRoute>
          <AdminLayout>
            <FAQManagement />
          </AdminLayout>
        </ProtectedRoute>
      </Route>
      <Route path="/admin/forms">
        <ProtectedRoute>
          <AdminLayout>
            <FormSubmissions />
          </AdminLayout>
        </ProtectedRoute>
      </Route>
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;