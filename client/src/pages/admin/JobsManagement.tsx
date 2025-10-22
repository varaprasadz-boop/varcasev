import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";

interface JobOpening {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  qualifications?: string | null;
  responsibilities?: string | null;
  status: string;
  postedDate: string;
  applicationDeadline?: string | null;
}

const jobOpeningFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  department: z.string().min(1, "Department is required"),
  location: z.string().min(1, "Location is required"),
  type: z.string().min(1, "Type is required"),
  experience: z.string().min(1, "Experience is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  qualifications: z.string().optional(),
  responsibilities: z.string().optional(),
  status: z.enum(["active", "closed", "draft"]).optional(),
  applicationDeadline: z.string().optional(),
});

type JobOpeningFormData = z.infer<typeof jobOpeningFormSchema>;

const jobTypes = ["Full-time", "Part-time", "Contract", "Remote"];
const departments = ["Engineering", "Sales", "Marketing", "Operations", "Manufacturing", "Customer Service", "HR"];

export default function JobOpeningsManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobOpening | null>(null);
  const { toast } = useToast();

  const { data: jobs, isLoading } = useQuery<JobOpening[]>({
    queryKey: ["/api/admin/job-openings"],
  });

  const form = useForm<JobOpeningFormData>({
    resolver: zodResolver(jobOpeningFormSchema),
    defaultValues: {
      title: "",
      department: "",
      location: "",
      type: "Full-time",
      experience: "",
      description: "",
      qualifications: "",
      responsibilities: "",
      status: "active",
      applicationDeadline: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: JobOpeningFormData) => apiRequest("POST", "/api/admin/job-openings", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/job-openings"] });
      toast({
        title: "Success",
        description: "Job opening created successfully",
      });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create job opening",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: JobOpeningFormData }) =>
      apiRequest("PUT", `/api/admin/job-openings/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/job-openings"] });
      toast({
        title: "Success",
        description: "Job opening updated successfully",
      });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update job opening",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/admin/job-openings/${id}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/job-openings"] });
      toast({
        title: "Success",
        description: "Job opening deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete job opening",
        variant: "destructive",
      });
    },
  });

  const handleAddJob = () => {
    setEditingJob(null);
    form.reset({
      title: "",
      department: "",
      location: "",
      type: "Full-time",
      experience: "",
      description: "",
      qualifications: "",
      responsibilities: "",
      status: "active",
      applicationDeadline: "",
    });
    setIsDialogOpen(true);
  };

  const handleEditJob = (job: JobOpening) => {
    setEditingJob(job);
    form.reset({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      experience: job.experience,
      description: job.description,
      qualifications: job.qualifications || "",
      responsibilities: job.responsibilities || "",
      status: job.status as "active" | "closed" | "draft",
      applicationDeadline: job.applicationDeadline 
        ? new Date(job.applicationDeadline).toISOString().split('T')[0] 
        : "",
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (formData: JobOpeningFormData) => {
    if (editingJob) {
      updateMutation.mutate({ id: editingJob.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const getStatusBadgeVariant = (status: string): "default" | "secondary" | "outline" => {
    const variants: Record<string, "default" | "secondary" | "outline"> = {
      active: "default",
      closed: "secondary",
      draft: "outline",
    };
    return variants[status] || "secondary";
  };

  const filteredJobs = (jobs ?? []).filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === "all" || job.department === departmentFilter;
    const matchesType = typeFilter === "all" || job.type === typeFilter;
    return matchesSearch && matchesDepartment && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Job Openings</h2>
          <p className="text-muted-foreground">
            Manage career opportunities
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddJob} data-testid="button-add-job">
              <Plus className="mr-2 h-4 w-4" />
              Add Job Opening
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingJob ? "Edit Job Opening" : "Add New Job Opening"}</DialogTitle>
              <DialogDescription>
                {editingJob ? "Update job opening details" : "Create a new job opening"}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Senior Software Engineer" {...field} data-testid="input-title" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-department">
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {departments.map((dept) => (
                              <SelectItem key={dept} value={dept}>
                                {dept}
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
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Type</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-type">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {jobTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Mumbai, India" {...field} data-testid="input-location" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Experience Required</FormLabel>
                        <FormControl>
                          <Input placeholder="3-5 years" {...field} data-testid="input-experience" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Job description..." 
                          className="min-h-[100px]"
                          {...field} 
                          data-testid="input-description" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="responsibilities"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Responsibilities (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Key responsibilities..." 
                          className="min-h-[80px]"
                          {...field} 
                          data-testid="input-responsibilities" 
                        />
                      </FormControl>
                      <FormDescription>
                        One responsibility per line
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="qualifications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Qualifications (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Required qualifications..." 
                          className="min-h-[80px]"
                          {...field} 
                          data-testid="input-qualifications" 
                        />
                      </FormControl>
                      <FormDescription>
                        One qualification per line
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-status">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="applicationDeadline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Application Deadline (Optional)</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} data-testid="input-deadline" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <DialogFooter>
                  <Button 
                    type="submit" 
                    disabled={createMutation.isPending || updateMutation.isPending}
                    data-testid="button-submit"
                  >
                    {(createMutation.isPending || updateMutation.isPending) ? "Saving..." : (editingJob ? "Update" : "Create")}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Job Openings</CardTitle>
          <CardDescription>
            View and manage career opportunities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-wrap gap-4">
            <div className="flex-1 min-w-64 relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title or location..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                data-testid="input-search"
              />
            </div>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-48" data-testid="select-filter-department">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40" data-testid="select-filter-type">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {jobTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {isLoading ? (
            <div className="text-center py-8">Loading job openings...</div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {(jobs ?? []).length === 0 ? "No job openings yet. Create your first job opening!" : "No job openings match your search."}
            </div>
          ) : (
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">#</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredJobs.map((job, index) => (
                    <TableRow key={job.id} data-testid={`row-job-${job.id}`}>
                      <TableCell className="font-medium text-muted-foreground">
                        {index + 1}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium" data-testid={`text-title-${job.id}`}>
                          {job.title}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {job.experience}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {job.department}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-muted-foreground">
                          {job.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {job.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(job.status)}>
                          {job.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditJob(job)}
                            data-testid={`button-edit-${job.id}`}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                data-testid={`button-delete-${job.id}`}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Job Opening</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{job.title}"? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(job.id)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
