import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

interface Vehicle {
  id: number;
  name: string;
  category: string;
  price: number;
  isActive: boolean;
}

export default function VehiclesManagement() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: vehicles, isLoading } = useQuery<Vehicle[]>({
    queryKey: ["/api/admin/vehicles"],
  });

  const filteredVehicles = vehicles?.filter(v =>
    v.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Vehicles</h2>
          <p className="text-muted-foreground">
            Manage your vehicle catalog
          </p>
        </div>
        <Button data-testid="button-add-vehicle">
          <Plus className="mr-2 h-4 w-4" />
          Add Vehicle
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Vehicles</CardTitle>
          <CardDescription>
            View and manage all vehicles in your catalog
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search vehicles..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                data-testid="input-search"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-8">Loading...</div>
          ) : filteredVehicles.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No vehicles found. Click "Add Vehicle" to create one.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredVehicles.map((vehicle) => (
                <Card key={vehicle.id} className="hover-elevate">
                  <CardHeader>
                    <CardTitle className="text-lg">{vehicle.name}</CardTitle>
                    <CardDescription>{vehicle.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">₹{vehicle.price?.toLocaleString() || '0'}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
