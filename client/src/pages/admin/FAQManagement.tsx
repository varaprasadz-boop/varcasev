import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function FAQManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">FAQ</h2>
          <p className="text-muted-foreground">
            Manage frequently asked questions
          </p>
        </div>
        <Button data-testid="button-add-faq">
          <Plus className="mr-2 h-4 w-4" />
          Add Question
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>
            FAQ management will be available soon
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
