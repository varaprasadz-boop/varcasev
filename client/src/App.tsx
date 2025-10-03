import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import About from "@/pages/About";
import VehicleDetail from "@/pages/VehicleDetail";
import JointVentures from "@/pages/JointVentures";
import FindDealer from "@/pages/FindDealer";
import BuySpares from "@/pages/BuySpares";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/vehicle/:slug" component={VehicleDetail} />
      <Route path="/joint-ventures" component={JointVentures} />
      <Route path="/find-dealer" component={FindDealer} />
      <Route path="/buy-spares" component={BuySpares} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;