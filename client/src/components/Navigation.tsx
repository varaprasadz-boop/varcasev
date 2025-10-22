import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import EnquiryDialog from "@/components/EnquiryDialog";
import varcasLogo from "@assets/varcasev_1759475493203.png";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [activeSubSubmenu, setActiveSubSubmenu] = useState<string | null>(null);
  const [location] = useLocation();
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const submenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Mobile accordion states
  const [mobileScootersOpen, setMobileScootersOpen] = useState(false);
  const [mobileMotorcyclesOpen, setMobileMotorcyclesOpen] = useState(false);
  const [mobileCargoOpen, setMobileCargoOpen] = useState(false);
  const [mobileThreeWheelersOpen, setMobileThreeWheelersOpen] = useState(false);
  const [mobileFourWheelersOpen, setMobileFourWheelersOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProductsDropdownOpen(false);
        setActiveSubmenu(null);
        setActiveSubSubmenu(null);
        if (closeTimeoutRef.current) {
          clearTimeout(closeTimeoutRef.current);
          closeTimeoutRef.current = null;
        }
        if (submenuTimeoutRef.current) {
          clearTimeout(submenuTimeoutRef.current);
          submenuTimeoutRef.current = null;
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
      if (submenuTimeoutRef.current) {
        clearTimeout(submenuTimeoutRef.current);
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
      setActiveSubmenu(null);
      setActiveSubSubmenu(null);
    }, 300);
  };

  const handleProductsClick = () => {
    setProductsDropdownOpen(!productsDropdownOpen);
    if (!productsDropdownOpen) {
      setActiveSubmenu(null);
      setActiveSubSubmenu(null);
    }
  };

  const handleSubmenuEnter = (submenu: string) => {
    if (submenuTimeoutRef.current) {
      clearTimeout(submenuTimeoutRef.current);
      submenuTimeoutRef.current = null;
    }
    setActiveSubmenu(submenu);
    setActiveSubSubmenu(null);
  };

  const handleSubmenuLeave = () => {
    submenuTimeoutRef.current = setTimeout(() => {
      setActiveSubmenu(null);
      setActiveSubSubmenu(null);
    }, 200);
  };

  const handleSubSubmenuEnter = (subSubmenu: string) => {
    if (submenuTimeoutRef.current) {
      clearTimeout(submenuTimeoutRef.current);
      submenuTimeoutRef.current = null;
    }
    setActiveSubSubmenu(subSubmenu);
  };

  const handleSubmenuClick = (submenu: string) => {
    if (activeSubmenu === submenu) {
      setActiveSubmenu(null);
      setActiveSubSubmenu(null);
    } else {
      setActiveSubmenu(submenu);
      setActiveSubSubmenu(null);
    }
  };

  const handleSubSubmenuClick = (subSubmenu: string) => {
    if (activeSubSubmenu === subSubmenu) {
      setActiveSubSubmenu(null);
    } else {
      setActiveSubSubmenu(subSubmenu);
    }
  };

  const { data: dynamicPages = [] } = useQuery<any[]>({
    queryKey: ["/api/dynamic-pages"],
  });

  const headerPages = dynamicPages.filter(
    (page) => page.placement === "header" || page.placement === "both"
  );

  const navigationLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Joint Ventures", path: "/joint-ventures" },
    { name: "Find a Dealer", path: "/find-dealer" },
    { name: "Buy Spares", path: "/buy-spares" },
    { name: "Press & Media", path: "/press-media" },
    ...headerPages.map((page) => ({
      name: page.title,
      path: `/page/${page.slug}`,
    })),
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
                onClick={handleProductsClick}
                onFocus={handleMouseEnter}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center gap-1"
                data-testid="button-products-dropdown"
                aria-haspopup="true"
                aria-expanded={productsDropdownOpen}
              >
                Products
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {productsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-popover border border-border rounded-md shadow-lg py-2">
                  <Link href="/products" className="block px-4 py-2 text-sm font-semibold text-primary hover:bg-accent cursor-pointer" data-testid="link-view-all-products">
                    View All Products
                  </Link>
                  
                  <div className="border-t border-border my-2"></div>
                  
                  {/* Electric Scooters */}
                  <div
                    className="relative"
                    onMouseEnter={() => handleSubmenuEnter('scooters')}
                    onMouseLeave={handleSubmenuLeave}
                  >
                    <button
                      onClick={() => handleSubmenuClick('scooters')}
                      onFocus={() => handleSubmenuEnter('scooters')}
                      className="w-full px-4 py-2 text-sm text-popover-foreground hover:bg-accent flex items-center justify-between text-left"
                      data-testid="menu-electric-scooters"
                      aria-haspopup="true"
                      aria-expanded={activeSubmenu === 'scooters'}
                    >
                      <span>Electric Scooters</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    
                    {activeSubmenu === 'scooters' && (
                      <div 
                        className="absolute left-full top-0 ml-1 w-56 bg-popover border border-border rounded-md shadow-lg py-2"
                        onMouseEnter={() => handleSubmenuEnter('scooters')}
                        onMouseLeave={handleSubmenuLeave}
                      >
                        {electricScooters.map((model) => (
                          <Link 
                            key={model.path} 
                            href={model.path}
                            className="block px-4 py-2 text-sm text-popover-foreground hover:bg-accent cursor-pointer" 
                            data-testid={`link-${model.path.split('/').pop()}`}
                          >
                            {model.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Electric Motorcycles */}
                  <div
                    className="relative"
                    onMouseEnter={() => handleSubmenuEnter('motorcycles')}
                    onMouseLeave={handleSubmenuLeave}
                  >
                    <button
                      onClick={() => handleSubmenuClick('motorcycles')}
                      onFocus={() => handleSubmenuEnter('motorcycles')}
                      className="w-full px-4 py-2 text-sm text-popover-foreground hover:bg-accent flex items-center justify-between text-left"
                      data-testid="menu-electric-motorcycles"
                      aria-haspopup="true"
                      aria-expanded={activeSubmenu === 'motorcycles'}
                    >
                      <span>Electric Motorcycles</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    
                    {activeSubmenu === 'motorcycles' && (
                      <div 
                        className="absolute left-full top-0 ml-1 w-56 bg-popover border border-border rounded-md shadow-lg py-2"
                        onMouseEnter={() => handleSubmenuEnter('motorcycles')}
                        onMouseLeave={handleSubmenuLeave}
                      >
                        {electricMotorcycles.map((model) => (
                          <Link 
                            key={model.path} 
                            href={model.path}
                            className="block px-4 py-2 text-sm text-popover-foreground hover:bg-accent cursor-pointer" 
                            data-testid={`link-${model.path.split('/').pop()}`}
                          >
                            {model.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Cargo & Commercial EVs */}
                  <div
                    className="relative"
                    onMouseEnter={() => handleSubmenuEnter('cargo')}
                    onMouseLeave={handleSubmenuLeave}
                  >
                    <button
                      onClick={() => handleSubmenuClick('cargo')}
                      onFocus={() => handleSubmenuEnter('cargo')}
                      className="w-full px-4 py-2 text-sm text-popover-foreground hover:bg-accent flex items-center justify-between text-left"
                      data-testid="menu-cargo-commercial"
                      aria-haspopup="true"
                      aria-expanded={activeSubmenu === 'cargo'}
                    >
                      <span>Cargo & Commercial EVs</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    
                    {activeSubmenu === 'cargo' && (
                      <div 
                        className="absolute left-full top-0 ml-1 w-56 bg-popover border border-border rounded-md shadow-lg py-2"
                        onMouseEnter={() => handleSubmenuEnter('cargo')}
                        onMouseLeave={handleSubmenuLeave}
                      >
                        {/* Three-Wheelers */}
                        <div
                          className="relative"
                          onMouseEnter={() => handleSubSubmenuEnter('three-wheelers')}
                        >
                          <button
                            onClick={() => handleSubSubmenuClick('three-wheelers')}
                            onFocus={() => handleSubSubmenuEnter('three-wheelers')}
                            className="w-full px-4 py-2 text-sm text-popover-foreground hover:bg-accent flex items-center justify-between text-left"
                            data-testid="menu-three-wheelers"
                            aria-haspopup="true"
                            aria-expanded={activeSubSubmenu === 'three-wheelers'}
                          >
                            <span>Three-Wheelers</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                          
                          {activeSubSubmenu === 'three-wheelers' && (
                            <div 
                              className="absolute left-full top-0 ml-1 w-56 bg-popover border border-border rounded-md shadow-lg py-2"
                              onMouseEnter={() => handleSubSubmenuEnter('three-wheelers')}
                            >
                              {threeWheelers.map((model) => (
                                <Link 
                                  key={model.path} 
                                  href={model.path}
                                  className="block px-4 py-2 text-sm text-popover-foreground hover:bg-accent cursor-pointer" 
                                  data-testid={`link-${model.path.split('/').pop()}`}
                                >
                                  {model.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Four-Wheelers */}
                        <div
                          className="relative"
                          onMouseEnter={() => handleSubSubmenuEnter('four-wheelers')}
                        >
                          <button
                            onClick={() => handleSubSubmenuClick('four-wheelers')}
                            onFocus={() => handleSubSubmenuEnter('four-wheelers')}
                            className="w-full px-4 py-2 text-sm text-popover-foreground hover:bg-accent flex items-center justify-between text-left"
                            data-testid="menu-four-wheelers"
                            aria-haspopup="true"
                            aria-expanded={activeSubSubmenu === 'four-wheelers'}
                          >
                            <span>Four-Wheelers</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                          
                          {activeSubSubmenu === 'four-wheelers' && (
                            <div 
                              className="absolute left-full top-0 ml-1 w-56 bg-popover border border-border rounded-md shadow-lg py-2"
                              onMouseEnter={() => handleSubSubmenuEnter('four-wheelers')}
                            >
                              {fourWheelers.map((model) => (
                                <Link 
                                  key={model.path} 
                                  href={model.path}
                                  className="block px-4 py-2 text-sm text-popover-foreground hover:bg-accent cursor-pointer" 
                                  data-testid={`link-${model.path.split('/').pop()}`}
                                >
                                  {model.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
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
              <Link 
                key={link.path} 
                href={link.path}
                className={`block py-2 text-sm font-medium cursor-pointer ${
                  location === link.path ? "text-primary" : "text-foreground"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="pt-2 border-t border-border">
              <Link 
                href="/products"
                className="block py-2 text-sm font-semibold text-primary cursor-pointer"
                onClick={() => setMobileMenuOpen(false)}
                data-testid="link-mobile-view-all-products"
              >
                View All Products
              </Link>

              {/* Electric Scooters Accordion */}
              <div className="mt-2">
                <button
                  onClick={() => setMobileScootersOpen(!mobileScootersOpen)}
                  className="flex items-center justify-between w-full py-2 text-sm font-medium text-foreground"
                  data-testid="button-mobile-scooters"
                  aria-expanded={mobileScootersOpen}
                >
                  <span>Electric Scooters</span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${mobileScootersOpen ? 'rotate-90' : ''}`} />
                </button>
                {mobileScootersOpen && (
                  <div className="pl-4 space-y-1">
                    {electricScooters.map((model) => (
                      <Link 
                        key={model.path} 
                        href={model.path}
                        className="block py-2 text-sm text-muted-foreground cursor-pointer"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {model.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Electric Motorcycles Accordion */}
              <div className="mt-2">
                <button
                  onClick={() => setMobileMotorcyclesOpen(!mobileMotorcyclesOpen)}
                  className="flex items-center justify-between w-full py-2 text-sm font-medium text-foreground"
                  data-testid="button-mobile-motorcycles"
                  aria-expanded={mobileMotorcyclesOpen}
                >
                  <span>Electric Motorcycles</span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${mobileMotorcyclesOpen ? 'rotate-90' : ''}`} />
                </button>
                {mobileMotorcyclesOpen && (
                  <div className="pl-4 space-y-1">
                    {electricMotorcycles.map((model) => (
                      <Link 
                        key={model.path} 
                        href={model.path}
                        className="block py-2 text-sm text-muted-foreground cursor-pointer"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {model.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Cargo & Commercial EVs Accordion */}
              <div className="mt-2">
                <button
                  onClick={() => setMobileCargoOpen(!mobileCargoOpen)}
                  className="flex items-center justify-between w-full py-2 text-sm font-medium text-foreground"
                  data-testid="button-mobile-cargo"
                  aria-expanded={mobileCargoOpen}
                >
                  <span>Cargo & Commercial EVs</span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${mobileCargoOpen ? 'rotate-90' : ''}`} />
                </button>
                {mobileCargoOpen && (
                  <div className="pl-4 space-y-2">
                    {/* Three-Wheelers Sub-Accordion */}
                    <div>
                      <button
                        onClick={() => setMobileThreeWheelersOpen(!mobileThreeWheelersOpen)}
                        className="flex items-center justify-between w-full py-2 text-sm font-medium text-muted-foreground"
                        data-testid="button-mobile-three-wheelers"
                        aria-expanded={mobileThreeWheelersOpen}
                      >
                        <span>Three-Wheelers</span>
                        <ChevronRight className={`w-3 h-3 transition-transform ${mobileThreeWheelersOpen ? 'rotate-90' : ''}`} />
                      </button>
                      {mobileThreeWheelersOpen && (
                        <div className="pl-4 space-y-1">
                          {threeWheelers.map((model) => (
                            <Link 
                              key={model.path} 
                              href={model.path}
                              className="block py-2 text-sm text-muted-foreground cursor-pointer"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {model.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Four-Wheelers Sub-Accordion */}
                    <div>
                      <button
                        onClick={() => setMobileFourWheelersOpen(!mobileFourWheelersOpen)}
                        className="flex items-center justify-between w-full py-2 text-sm font-medium text-muted-foreground"
                        data-testid="button-mobile-four-wheelers"
                        aria-expanded={mobileFourWheelersOpen}
                      >
                        <span>Four-Wheelers</span>
                        <ChevronRight className={`w-3 h-3 transition-transform ${mobileFourWheelersOpen ? 'rotate-90' : ''}`} />
                      </button>
                      {mobileFourWheelersOpen && (
                        <div className="pl-4 space-y-1">
                          {fourWheelers.map((model) => (
                            <Link 
                              key={model.path} 
                              href={model.path}
                              className="block py-2 text-sm text-muted-foreground cursor-pointer"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {model.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
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
