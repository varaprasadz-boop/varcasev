import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2, FileText, Eye, Layout } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface DynamicPage {
  id: number;
  slug: string;
  title: string;
  content: string;
  layout: string;
  placement: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  status: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const dynamicPageFormSchema = z.object({
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  title: z.string().min(1, "Title is required"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  layout: z.string().min(1, "Layout is required"),
  placement: z.string().min(1, "Placement is required"),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  keywords: z.string().optional(),
  status: z.enum(["published", "draft"]).optional(),
  displayOrder: z.coerce.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
});

type DynamicPageFormData = z.infer<typeof dynamicPageFormSchema>;

const layoutOptions = [
  { value: "one_column", label: "One Column", description: "Simple single column layout" },
  { value: "two_column", label: "Two Column", description: "Content split into two columns" },
  { value: "hero_with_content", label: "Hero with Content", description: "Hero section with content below" },
  { value: "full_width", label: "Full Width", description: "Full width content" },
];

const placementOptions = [
  { value: "none", label: "None", description: "Not shown in navigation" },
  { value: "header", label: "Header", description: "Show in header navigation" },
  { value: "footer", label: "Footer", description: "Show in footer navigation" },
  { value: "both", label: "Both", description: "Show in header and footer" },
];

export default function DynamicPagesManagement() {
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<DynamicPage | null>(null);
  const [deletingPage, setDeletingPage] = useState<DynamicPage | null>(null);

  const form = useForm<DynamicPageFormData>({
    resolver: zodResolver(dynamicPageFormSchema),
    defaultValues: {
      slug: "",
      title: "",
      content: "",
      layout: "one_column",
      placement: "none",
      metaTitle: "",
      metaDescription: "",
      keywords: "",
      status: "draft",
      displayOrder: 0,
      isActive: true,
    },
  });

  const { data: pages = [], isLoading } = useQuery<DynamicPage[]>({
    queryKey: ["/api/admin/dynamic-pages"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: DynamicPageFormData) => {
      return apiRequest("/api/admin/dynamic-pages", "POST", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/dynamic-pages"] });
      toast({
        title: "Success",
        description: "Dynamic page created successfully",
      });
      setIsCreateDialogOpen(false);
      form.reset();
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to create dynamic page",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: DynamicPageFormData }) => {
      return apiRequest(`/api/admin/dynamic-pages/${id}`, "PUT", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/dynamic-pages"] });
      toast({
        title: "Success",
        description: "Dynamic page updated successfully",
      });
      setEditingPage(null);
      form.reset();
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update dynamic page",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest(`/api/admin/dynamic-pages/${id}`, "DELETE");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/dynamic-pages"] });
      toast({
        title: "Success",
        description: "Dynamic page deleted successfully",
      });
      setDeletingPage(null);
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to delete dynamic page",
      });
    },
  });

  const handleCreate = () => {
    form.reset({
      slug: "",
      title: "",
      content: "",
      layout: "one_column",
      placement: "none",
      metaTitle: "",
      metaDescription: "",
      keywords: "",
      status: "draft",
      displayOrder: 0,
      isActive: true,
    });
    setIsCreateDialogOpen(true);
  };

  const handleEdit = (page: DynamicPage) => {
    form.reset({
      slug: page.slug,
      title: page.title,
      content: page.content,
      layout: page.layout,
      placement: page.placement,
      metaTitle: page.metaTitle || "",
      metaDescription: page.metaDescription || "",
      keywords: page.keywords || "",
      status: page.status as "published" | "draft",
      displayOrder: page.displayOrder,
      isActive: page.isActive,
    });
    setEditingPage(page);
  };

  const handleDelete = (page: DynamicPage) => {
    setDeletingPage(page);
  };

  const onSubmit = (data: DynamicPageFormData) => {
    if (editingPage) {
      updateMutation.mutate({ id: editingPage.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const getLayoutLabel = (layout: string) => {
    return layoutOptions.find(l => l.value === layout)?.label || layout;
  };

  const getPlacementLabel = (placement: string) => {
    return placementOptions.find(p => p.value === placement)?.label || placement;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Dynamic Pages</h2>
          <p className="text-muted-foreground">
            Create custom pages with different layouts and navigation placement
          </p>
        </div>
        <Button onClick={handleCreate} data-testid="button-create-page">
          <Plus className="w-4 h-4 mr-2" />
          Create Page
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : pages.length === 0 ? (
        <Card className="p-8 text-center">
          <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">No dynamic pages yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first custom page with layout options
          </p>
          <Button onClick={handleCreate} data-testid="button-create-first-page">
            <Plus className="w-4 h-4 mr-2" />
            Create First Page
          </Button>
        </Card>
      ) : (
        <div className="grid gap-4">
          {pages.map((page) => (
            <Card key={page.id} className="p-6" data-testid={`card-page-${page.id}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-semibold" data-testid={`text-title-${page.id}`}>
                      {page.title}
                    </h3>
                    <span className={`px-2 py-1 text-xs rounded ${
                      page.status === "published" 
                        ? "bg-green-500/20 text-green-700 dark:text-green-400"
                        : "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400"
                    }`} data-testid={`badge-status-${page.id}`}>
                      {page.status}
                    </span>
                    {!page.isActive && (
                      <span className="px-2 py-1 text-xs rounded bg-red-500/20 text-red-700 dark:text-red-400">
                        Inactive
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      /{page.slug}
                    </span>
                    <span className="flex items-center gap-1">
                      <Layout className="w-4 h-4" />
                      {getLayoutLabel(page.layout)}
                    </span>
                    <span>
                      Navigation: <strong>{getPlacementLabel(page.placement)}</strong>
                    </span>
                    <span>
                      Order: <strong>{page.displayOrder}</strong>
                    </span>
                  </div>
                  <p className="text-muted-foreground line-clamp-2">
                    {page.content.substring(0, 200)}...
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(page)}
                    data-testid={`button-edit-${page.id}`}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(page)}
                    data-testid={`button-delete-${page.id}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isCreateDialogOpen || !!editingPage} onOpenChange={(open) => {
        if (!open) {
          setIsCreateDialogOpen(false);
          setEditingPage(null);
          form.reset();
        }
      }}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingPage ? "Edit Dynamic Page" : "Create Dynamic Page"}
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="About Us" {...field} data-testid="input-title" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug (URL)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="about-us" 
                          {...field} 
                          data-testid="input-slug"
                          onChange={(e) => field.onChange(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                        />
                      </FormControl>
                      <FormDescription>
                        Only lowercase letters, numbers, and hyphens
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Page content..." 
                        className="min-h-[200px]"
                        {...field} 
                        data-testid="textarea-content"
                      />
                    </FormControl>
                    <FormDescription>
                      You can use this field to add your page content
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="layout"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Layout</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-layout">
                            <SelectValue placeholder="Select layout" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {layoutOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              <div>
                                <div className="font-medium">{option.label}</div>
                                <div className="text-xs text-muted-foreground">{option.description}</div>
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
                  name="placement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Navigation Placement</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-placement">
                            <SelectValue placeholder="Select placement" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {placementOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              <div>
                                <div className="font-medium">{option.label}</div>
                                <div className="text-xs text-muted-foreground">{option.description}</div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Where this page link should appear
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-4">SEO Settings</h4>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="metaTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meta Title</FormLabel>
                        <FormControl>
                          <Input placeholder="SEO title" {...field} data-testid="input-meta-title" />
                        </FormControl>
                        <FormDescription>
                          Leave empty to use page title
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="metaDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meta Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="SEO description" {...field} data-testid="textarea-meta-description" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="keywords"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Keywords</FormLabel>
                        <FormControl>
                          <Input placeholder="keyword1, keyword2, keyword3" {...field} data-testid="input-keywords" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
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
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
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

                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-col justify-end">
                      <div className="flex items-center gap-2 h-10">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="switch-is-active"
                          />
                        </FormControl>
                        <FormLabel className="!mt-0">Active</FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsCreateDialogOpen(false);
                    setEditingPage(null);
                    form.reset();
                  }}
                  data-testid="button-cancel"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  data-testid="button-submit"
                >
                  {createMutation.isPending || updateMutation.isPending
                    ? "Saving..."
                    : editingPage
                    ? "Update Page"
                    : "Create Page"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deletingPage} onOpenChange={(open) => !open && setDeletingPage(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Dynamic Page</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deletingPage?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-delete">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingPage && deleteMutation.mutate(deletingPage.id)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-testid="button-confirm-delete"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
