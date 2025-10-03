import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import EnquiryDialog from "@/components/EnquiryDialog";
import varcasLogo from "@assets/varcasev_1759475493203.png";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modelsDropdownOpen, setModelsDropdownOpen] = useState(false);
  const [location] = useLocation();

  const navigationLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Joint Ventures", path: "/joint-ventures" },
    { name: "Find a Dealer", path: "/find-dealer" },
    { name: "Buy Spares", path: "/buy-spares" },
  ];

  const vehicleModels = [
    { name: "FALCON", path: "/vehicle/falcon" },
    { name: "EAGAN", path: "/vehicle/eagan" },
    { name: "CRONY", path: "/vehicle/crony" },
    { name: "AMAN", path: "/vehicle/aman" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" data-testid="link-home">
            <img src={varcasLogo} alt="VARCAS" className="h-12 w-12" />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                data-testid={`link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <span
                  className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${
                    location === link.path ? "text-primary" : "text-foreground"
                  }`}
                >
                  {link.name}
                </span>
              </Link>
            ))}
            
            <div
              className="relative"
              onMouseEnter={() => setModelsDropdownOpen(true)}
              onMouseLeave={() => setModelsDropdownOpen(false)}
            >
              <button
                className="text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center gap-1"
                data-testid="button-models-dropdown"
              >
                Models
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {modelsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-popover border border-popover-border rounded-md shadow-lg py-2">
                  {vehicleModels.map((model) => (
                    <Link key={model.path} href={model.path}>
                      <span className="block px-4 py-2 text-sm text-popover-foreground hover:bg-accent cursor-pointer">
                        {model.name}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <EnquiryDialog />
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-4 py-4 space-y-3">
            {navigationLinks.map((link) => (
              <Link key={link.path} href={link.path}>
                <span
                  className={`block py-2 text-sm font-medium cursor-pointer ${
                    location === link.path ? "text-primary" : "text-foreground"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </span>
              </Link>
            ))}
            
            <div className="pt-2 border-t border-border">
              <p className="text-sm font-medium text-muted-foreground mb-2">Models</p>
              {vehicleModels.map((model) => (
                <Link key={model.path} href={model.path}>
                  <span
                    className="block py-2 pl-4 text-sm text-foreground cursor-pointer"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {model.name}
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-4">
              <EnquiryDialog trigger={
                <Button variant="default" className="w-full" data-testid="button-mobile-enquire">
                  Enquire Now
                </Button>
              } />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}