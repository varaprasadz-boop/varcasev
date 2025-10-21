import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function HeroSlidesManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Hero Slides</h2>
          <p className="text-muted-foreground">
            Manage homepage hero carousel
          </p>
        </div>
        <Button data-testid="button-add-slide">
          <Plus className="mr-2 h-4 w-4" />
          Add Slide
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>
            Hero slides management will be available soon
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
