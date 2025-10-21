import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function StatsManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Statistics</h2>
          <p className="text-muted-foreground">
            Manage homepage statistics
          </p>
        </div>
        <Button data-testid="button-add-stat">
          <Plus className="mr-2 h-4 w-4" />
          Add Statistic
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>
            Statistics management will be available soon
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
