import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQCTA from "@/components/FAQCTA";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Newspaper } from "lucide-react";
import { pressArticles } from "@/data/pressMediaData";

export default function PressMedia() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <Breadcrumbs items={[{ label: "Press & Media" }]} />
      </div>
      
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Newspaper className="w-10 h-10 text-primary" />
              <h1 className="text-4xl md:text-6xl font-bold">Press & Media</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay updated with the latest news, announcements, and media coverage about VARCAS
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pressArticles.map((article) => (
              <Card key={article.id} className="overflow-hidden hover-elevate transition-all" data-testid={`card-article-${article.id}`}>
                <div className="aspect-video bg-muted overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <Badge className="mb-3" data-testid={`badge-category-${article.id}`}>
                    {article.category}
                  </Badge>
                  <h3 className="text-xl font-bold mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.publication}</span>
                  </div>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <Button variant="outline" className="w-full" data-testid={`button-read-more-${article.id}`}>
                    Read More
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <Card className="mt-16 p-8 md:p-12 text-center bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Media Inquiries</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              For press releases, media kits, or interview requests, please contact our PR team.
            </p>
            <a href="mailto:press@varcasautomobiles.com">
              <Button variant="default" size="lg" data-testid="button-contact-press">
                Contact Press Team
              </Button>
            </a>
          </Card>
        </div>
      </section>

      <FAQCTA />
      <Footer />
    </div>
  );
}
