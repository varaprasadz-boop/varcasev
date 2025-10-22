import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

interface DynamicPageData {
  id: number;
  slug: string;
  title: string;
  content: string;
  layout: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
}

export default function DynamicPage() {
  const [, params] = useRoute("/page/:slug");
  const slug = params?.slug;

  const { data: page, isLoading, error } = useQuery<DynamicPageData>({
    queryKey: ["/api/dynamic-pages", "slug", slug],
    queryFn: async () => {
      const res = await fetch(`/api/dynamic-pages/slug/${slug}`);
      if (!res.ok) throw new Error("Page not found");
      return res.json();
    },
    enabled: !!slug,
  });

  useEffect(() => {
    if (page) {
      document.title = `${page.metaTitle || page.title} | VARCAS`;
      
      if (page.metaDescription) {
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
          metaDesc = document.createElement('meta');
          metaDesc.setAttribute('name', 'description');
          document.head.appendChild(metaDesc);
        }
        metaDesc.setAttribute('content', page.metaDescription);
      }
    }
  }, [page]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
            <p className="text-muted-foreground">
              The page you are looking for does not exist or has been removed.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const renderContent = () => {
    switch (page.layout) {
      case "one_column":
        return <OneColumnLayout page={page} />;
      case "two_column":
        return <TwoColumnLayout page={page} />;
      case "hero_with_content":
        return <HeroWithContentLayout page={page} />;
      case "full_width":
        return <FullWidthLayout page={page} />;
      default:
        return <OneColumnLayout page={page} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {renderContent()}
      <Footer />
    </div>
  );
}

function OneColumnLayout({ page }: { page: DynamicPageData }) {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">
          {page.title}
        </h1>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div
            className="whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </div>
      </div>
    </section>
  );
}

function TwoColumnLayout({ page }: { page: DynamicPageData }) {
  const halfContent = Math.floor(page.content.length / 2);
  const leftContent = page.content.substring(0, halfContent);
  const rightContent = page.content.substring(halfContent);

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-12 text-center">
          {page.title}
        </h1>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-8">
            <div className="prose dark:prose-invert">
              <div
                className="whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: leftContent }}
              />
            </div>
          </Card>
          <Card className="p-8">
            <div className="prose dark:prose-invert">
              <div
                className="whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: rightContent }}
              />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

function HeroWithContentLayout({ page }: { page: DynamicPageData }) {
  return (
    <>
      <section className="relative h-[50vh] flex items-center justify-center bg-gradient-to-b from-primary/10 to-background">
        <div className="text-center z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">{page.title}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {page.content.substring(0, 150)}...
          </p>
        </div>
      </section>
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div
              className="whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </div>
        </div>
      </section>
    </>
  );
}

function FullWidthLayout({ page }: { page: DynamicPageData }) {
  return (
    <section className="py-16 md:py-24">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-12 text-center">
          {page.title}
        </h1>
        <div className="prose prose-lg dark:prose-invert max-w-full">
          <div
            className="whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </div>
      </div>
    </section>
  );
}
