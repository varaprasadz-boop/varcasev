import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import EnquiryDialog from "@/components/EnquiryDialog";
import varcasLogo from "@assets/varcasev_1759475493203.png";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [location] = useLocation();
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProductsDropdownOpen(false);
        if (closeTimeoutRef.current) {
          clearTimeout(closeTimeoutRef.current);
          closeTimeoutRef.current = null;
        }
      }
    };

    if (productsDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, [productsDropdownOpen]);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setProductsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setProductsDropdownOpen(false);
    }, 3000);
  };

  const navigationLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Joint Ventures", path: "/joint-ventures" },
    { name: "Find a Dealer", path: "/find-dealer" },
    { name: "Buy Spares", path: "/buy-spares" },
    { name: "Press & Media", path: "/press-media" },
  ];

  const electricScooters = [
    { name: "FALCON", path: "/vehicle/falcon" },
    { name: "EAGAN", path: "/vehicle/eagan" },
    { name: "CRONY", path: "/vehicle/crony" },
    { name: "AMAN", path: "/vehicle/aman" },
    { name: "RUBY", path: "/vehicle/ruby" },
    { name: "TEJAS-SPORT", path: "/vehicle/tejas-sport" },
    { name: "RANI-EX", path: "/vehicle/rani-ex" },
    { name: "RANI-LX", path: "/vehicle/rani-lx" },
  ];

  const electricMotorcycles = [
    { name: "THUNDER 350", path: "/vehicle/thunder-350" },
    { name: "VOLT SPORT", path: "/vehicle/volt-sport" },
    { name: "CRUISER PRO", path: "/vehicle/cruiser-pro" },
  ];

  const threeWheelers = [
    { name: "CARGO LITE", path: "/vehicle/cargo-lite" },
    { name: "CARGO MAX", path: "/vehicle/cargo-max" },
  ];

  const fourWheelers = [
    { name: "TRANSPORTER CITY", path: "/vehicle/transporter-city" },
    { name: "TRANSPORTER CARGO", path: "/vehicle/transporter-cargo" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" data-testid="link-home" className="flex items-center gap-3">
            <img src={varcasLogo} alt="VARCAS" className="h-12 w-12" />
            <span className="text-2xl font-bold text-foreground">varcas-ev</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" data-testid="link-home-nav">
              <span
                className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${
                  location === "/" ? "text-primary" : "text-foreground"
                }`}
              >
                Home
              </span>
            </Link>

            <Link href="/about" data-testid="link-about-us">
              <span
                className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${
                  location === "/about" ? "text-primary" : "text-foreground"
                }`}
              >
                About Us
              </span>
            </Link>
            
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center gap-1"
                data-testid="button-products-dropdown"
              >
                Products
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {productsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-popover border border-popover-border rounded-md shadow-lg py-2">
                  <Link href="/products">
                    <span className="block px-4 py-2 text-sm font-semibold text-primary hover:bg-accent cursor-pointer">
                      View All Products
                    </span>
                  </Link>
                  
                  <div className="border-t border-popover-border my-2"></div>
                  
                  <div className="px-4 py-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Electric Scooters</p>
                    <div className="space-y-1">
                      {electricScooters.map((model) => (
                        <Link key={model.path} href={model.path}>
                          <span className="block px-2 py-1 text-sm text-popover-foreground hover:bg-accent rounded-sm cursor-pointer">
                            {model.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-popover-border my-2"></div>

                  <div className="px-4 py-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Electric Motorcycles</p>
                    <div className="space-y-1">
                      {electricMotorcycles.map((model) => (
                        <Link key={model.path} href={model.path}>
                          <span className="block px-2 py-1 text-sm text-popover-foreground hover:bg-accent rounded-sm cursor-pointer">
                            {model.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-popover-border my-2"></div>

                  <div className="px-4 py-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Cargo & Commercial EVs</p>
                    
                    <div className="mb-3">
                      <p className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1">
                        <ChevronRight className="w-3 h-3" />
                        Three-Wheelers
                      </p>
                      <div className="space-y-1 ml-4">
                        {threeWheelers.map((model) => (
                          <Link key={model.path} href={model.path}>
                            <span className="block px-2 py-1 text-sm text-popover-foreground hover:bg-accent rounded-sm cursor-pointer">
                              {model.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1">
                        <ChevronRight className="w-3 h-3" />
                        Four-Wheelers
                      </p>
                      <div className="space-y-1 ml-4">
                        {fourWheelers.map((model) => (
                          <Link key={model.path} href={model.path}>
                            <span className="block px-2 py-1 text-sm text-popover-foreground hover:bg-accent rounded-sm cursor-pointer">
                              {model.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link href="/joint-ventures" data-testid="link-joint-ventures">
              <span
                className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${
                  location === "/joint-ventures" ? "text-primary" : "text-foreground"
                }`}
              >
                Joint Ventures
              </span>
            </Link>

            <Link href="/find-dealer" data-testid="link-find-a-dealer">
              <span
                className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${
                  location === "/find-dealer" ? "text-primary" : "text-foreground"
                }`}
              >
                Find a Dealer
              </span>
            </Link>

            <Link href="/buy-spares" data-testid="link-buy-spares">
              <span
                className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${
                  location === "/buy-spares" ? "text-primary" : "text-foreground"
                }`}
              >
                Buy Spares
              </span>
            </Link>

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
              <Link href="/products">
                <span
                  className="block py-2 text-sm font-semibold text-primary cursor-pointer"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  View All Products
                </span>
              </Link>

              <p className="text-sm font-medium text-muted-foreground mt-3 mb-2">Electric Scooters</p>
              {electricScooters.map((model) => (
                <Link key={model.path} href={model.path}>
                  <span
                    className="block py-2 pl-4 text-sm text-foreground cursor-pointer"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {model.name}
                  </span>
                </Link>
              ))}

              <p className="text-sm font-medium text-muted-foreground mt-3 mb-2">Electric Motorcycles</p>
              {electricMotorcycles.map((model) => (
                <Link key={model.path} href={model.path}>
                  <span
                    className="block py-2 pl-4 text-sm text-foreground cursor-pointer"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {model.name}
                  </span>
                </Link>
              ))}

              <p className="text-sm font-medium text-muted-foreground mt-3 mb-2">Cargo & Commercial EVs</p>
              <p className="text-xs font-medium text-muted-foreground pl-2 mb-1">Three-Wheelers</p>
              {threeWheelers.map((model) => (
                <Link key={model.path} href={model.path}>
                  <span
                    className="block py-2 pl-6 text-sm text-foreground cursor-pointer"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {model.name}
                  </span>
                </Link>
              ))}

              <p className="text-xs font-medium text-muted-foreground pl-2 mt-2 mb-1">Four-Wheelers</p>
              {fourWheelers.map((model) => (
                <Link key={model.path} href={model.path}>
                  <span
                    className="block py-2 pl-6 text-sm text-foreground cursor-pointer"
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
