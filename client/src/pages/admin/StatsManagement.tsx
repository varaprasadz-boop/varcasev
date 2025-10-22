import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Plus, Edit, Trash2, Users, TrendingUp, Award, Target, Zap, Star, ThumbsUp, Heart, CheckCircle, ShoppingCart, Search } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";

interface Stat {
  id: number;
  value: string;
  label: string;
  icon: string;
  displayOrder: number;
}

const statsFormSchema = z.object({
  value: z.string().min(1, "Value is required"),
  label: z.string().min(1, "Label is required"),
  icon: z.string().min(1, "Icon is required"),
  displayOrder: z.coerce.number().int().min(0).optional(),
});

type StatsFormData = z.infer<typeof statsFormSchema>;

const iconOptions = [
  { value: "Users", label: "Users", Icon: Users },
  { value: "TrendingUp", label: "Trending Up", Icon: TrendingUp },
  { value: "Award", label: "Award", Icon: Award },
  { value: "Target", label: "Target", Icon: Target },
  { value: "Zap", label: "Zap", Icon: Zap },
  { value: "Star", label: "Star", Icon: Star },
  { value: "ThumbsUp", label: "Thumbs Up", Icon: ThumbsUp },
  { value: "Heart", label: "Heart", Icon: Heart },
  { value: "CheckCircle", label: "Check Circle", Icon: CheckCircle },
  { value: "ShoppingCart", label: "Shopping Cart", Icon: ShoppingCart },
];

export default function StatsManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStat, setEditingStat] = useState<Stat | null>(null);
  const { toast } = useToast();

  const { data: stats, isLoading } = useQuery<Stat[]>({
    queryKey: ["/api/admin/stats"],
  });

  const form = useForm<StatsFormData>({
    resolver: zodResolver(statsFormSchema),
    defaultValues: {
      value: "",
      label: "",
      icon: "Users",
      displayOrder: 0,
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: StatsFormData) => apiRequest("POST", "/api/admin/stats", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      toast({
        title: "Success",
        description: "Statistic created successfully",
      });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create statistic",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: StatsFormData }) =>
      apiRequest("PUT", `/api/admin/stats/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      toast({
        title: "Success",
        description: "Statistic updated successfully",
      });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update statistic",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/admin/stats/${id}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      toast({
        title: "Success",
        description: "Statistic deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete statistic",
        variant: "destructive",
      });
    },
  });

  const handleAddStat = () => {
    setEditingStat(null);
    form.reset({
      value: "",
      label: "",
      icon: "Users",
      displayOrder: 0,
    });
    setIsDialogOpen(true);
  };

  const handleEditStat = (stat: Stat) => {
    setEditingStat(stat);
    form.reset({
      value: stat.value,
      label: stat.label,
      icon: stat.icon,
      displayOrder: stat.displayOrder || 0,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (formData: StatsFormData) => {
    if (editingStat) {
      updateMutation.mutate({ id: editingStat.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const sortedStats = stats?.sort((a, b) => a.displayOrder - b.displayOrder) || [];
  
  const filteredStats = sortedStats.filter(stat => {
    const matchesSearch = stat.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          stat.value.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const getIconComponent = (iconName: string) => {
    const iconOption = iconOptions.find(opt => opt.value === iconName);
    return iconOption?.Icon || Users;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Statistics</h2>
          <p className="text-muted-foreground">
            Manage homepage statistics
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddStat} data-testid="button-add-stat">
              <Plus className="mr-2 h-4 w-4" />
              Add Statistic
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingStat ? "Edit Statistic" : "Add New Statistic"}</DialogTitle>
              <DialogDescription>
                {editingStat ? "Update statistic information" : "Create a new statistic for the homepage"}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Value</FormLabel>
                      <FormControl>
                        <Input placeholder="30,000+" {...field} data-testid="input-value" />
                      </FormControl>
                      <FormDescription>
                        The statistic value (e.g., "30,000+", "5 Years", "99%")
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="label"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Label</FormLabel>
                      <FormControl>
                        <Input placeholder="Happy Customers" {...field} data-testid="input-label" />
                      </FormControl>
                      <FormDescription>
                        Description of the statistic
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="icon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Icon</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-icon">
                            <SelectValue placeholder="Select icon" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {iconOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              <div className="flex items-center gap-2">
                                <option.Icon className="h-4 w-4" />
                                <span>{option.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="displayOrder"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Order</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="0" 
                          {...field} 
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          data-testid="input-display-order"
                        />
                      </FormControl>
                      <FormDescription>
                        Lower numbers appear first
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button 
                    type="submit" 
                    disabled={createMutation.isPending || updateMutation.isPending}
                    data-testid="button-submit"
                  >
                    {(createMutation.isPending || updateMutation.isPending) ? "Saving..." : (editingStat ? "Update" : "Create")}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Statistics</CardTitle>
          <CardDescription>
            Manage statistics displayed on your homepage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by label or value..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                data-testid="input-search"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-8">Loading statistics...</div>
          ) : filteredStats.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {sortedStats.length === 0 ? "No statistics yet. Create your first statistic!" : "No statistics match your search."}
            </div>
          ) : (
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">#</TableHead>
                    <TableHead>Icon</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Label</TableHead>
                    <TableHead>Display Order</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStats.map((stat, index) => {
                    const IconComponent = getIconComponent(stat.icon);
                    return (
                      <TableRow key={stat.id} data-testid={`row-stat-${stat.id}`}>
                        <TableCell className="font-medium text-muted-foreground">
                          {index + 1}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <IconComponent className="h-4 w-4 text-primary" />
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {stat.icon}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-semibold text-lg">{stat.value}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{stat.label}</div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {stat.displayOrder}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleEditStat(stat)}
                              data-testid={`button-edit-${stat.id}`}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  data-testid={`button-delete-${stat.id}`}
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Statistic</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete "{stat.label}"? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDelete(stat.id)}>
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
