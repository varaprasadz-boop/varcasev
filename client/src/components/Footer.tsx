import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
import varcasLogo from "@assets/varcasev_1759475493203.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const { data: dynamicPages = [] } = useQuery<any[]>({
    queryKey: ["/api/dynamic-pages"],
  });

  const footerPages = dynamicPages.filter(
    (page) => page.placement === "footer" || page.placement === "both"
  );

  return (
    <footer className="bg-card border-t border-card-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <img src={varcasLogo} alt="VARCAS" className="h-16 w-16 mb-4" />
            <p className="text-sm text-muted-foreground mb-4">
              Reliable, Sustainable & Affordable eMobility Solutions
            </p>
            <div className="flex gap-3">
              <a href="#" className="hover-elevate p-2 rounded-md" data-testid="link-facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover-elevate p-2 rounded-md" data-testid="link-instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover-elevate p-2 rounded-md" data-testid="link-twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover-elevate p-2 rounded-md" data-testid="link-youtube">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary cursor-pointer">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/joint-ventures" className="text-muted-foreground hover:text-primary cursor-pointer">
                  Joint Ventures
                </Link>
              </li>
              <li>
                <Link href="/find-dealer" className="text-muted-foreground hover:text-primary cursor-pointer">
                  Find a Dealer
                </Link>
              </li>
              <li>
                <Link href="/buy-spares" className="text-muted-foreground hover:text-primary cursor-pointer">
                  Buy Spares
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-primary cursor-pointer">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary cursor-pointer" data-testid="link-footer-faq">
                  FAQ
                </Link>
              </li>
              {footerPages.map((page) => (
                <li key={page.id}>
                  <Link href={`/page/${page.slug}`} className="text-muted-foreground hover:text-primary cursor-pointer">
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Our Models</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/vehicle/falcon" className="text-muted-foreground hover:text-primary cursor-pointer">
                  FALCON
                </Link>
              </li>
              <li>
                <Link href="/vehicle/eagan" className="text-muted-foreground hover:text-primary cursor-pointer">
                  EAGAN
                </Link>
              </li>
              <li>
                <Link href="/vehicle/crony" className="text-muted-foreground hover:text-primary cursor-pointer">
                  CRONY
                </Link>
              </li>
              <li>
                <Link href="/vehicle/aman" className="text-muted-foreground hover:text-primary cursor-pointer">
                  AMAN
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">info@varcasautomobiles.com</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">+91 1800 XXX XXXX</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">India & USA</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} VARCAS. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-primary">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}