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
import { Plus, Edit, Trash2, Upload, Newspaper, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { ObjectUploader } from "@/components/ObjectUploader";

interface PressArticle {
  id: number;
  title: string;
  publication: string;
  publicationDate: string;
  excerpt: string;
  image?: string | null;
  category: string;
  fullContent?: string | null;
  externalLink?: string | null;
  status: string;
  displayOrder: number;
}

const pressArticleFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  publication: z.string().min(1, "Publication is required"),
  publicationDate: z.string().min(1, "Publication date is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  image: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  category: z.string().min(1, "Category is required"),
  fullContent: z.string().optional(),
  externalLink: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  status: z.enum(["published", "draft"]).optional(),
  displayOrder: z.number().int().min(0).optional(),
});

type PressArticleFormData = z.infer<typeof pressArticleFormSchema>;

const categories = [
  "Product Launch",
  "Business",
  "Awards",
  "Sustainability",
  "Partnership",
  "Service",
];

export default function PressMediaManagement() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<PressArticle | null>(null);
  const { toast } = useToast();

  const { data: articles, isLoading } = useQuery<PressArticle[]>({
    queryKey: ["/api/admin/press-articles"],
  });

  const form = useForm<PressArticleFormData>({
    resolver: zodResolver(pressArticleFormSchema),
    defaultValues: {
      title: "",
      publication: "",
      publicationDate: "",
      excerpt: "",
      image: "",
      category: "Product Launch",
      fullContent: "",
      externalLink: "",
      status: "published",
      displayOrder: 0,
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: PressArticleFormData) => apiRequest("POST", "/api/admin/press-articles", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/press-articles"] });
      toast({
        title: "Success",
        description: "Press article created successfully",
      });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create press article",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: PressArticleFormData }) =>
      apiRequest("PUT", `/api/admin/press-articles/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/press-articles"] });
      toast({
        title: "Success",
        description: "Press article updated successfully",
      });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update press article",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/admin/press-articles/${id}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/press-articles"] });
      toast({
        title: "Success",
        description: "Press article deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete press article",
        variant: "destructive",
      });
    },
  });

  const handleAddArticle = () => {
    setEditingArticle(null);
    form.reset({
      title: "",
      publication: "",
      publicationDate: "",
      excerpt: "",
      image: "",
      category: "Product Launch",
      fullContent: "",
      externalLink: "",
      status: "published",
      displayOrder: 0,
    });
    setIsDialogOpen(true);
  };

  const handleEditArticle = (article: PressArticle) => {
    setEditingArticle(article);
    form.reset({
      title: article.title,
      publication: article.publication,
      publicationDate: article.publicationDate,
      excerpt: article.excerpt,
      image: article.image || "",
      category: article.category,
      fullContent: article.fullContent || "",
      externalLink: article.externalLink || "",
      status: article.status as "published" | "draft",
      displayOrder: article.displayOrder || 0,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (formData: PressArticleFormData) => {
    if (editingArticle) {
      updateMutation.mutate({ id: editingArticle.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const sortedArticles = articles?.sort((a, b) => b.displayOrder - a.displayOrder) || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Press & Media</h2>
          <p className="text-muted-foreground">
            Manage press articles and media coverage
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddArticle} data-testid="button-add-article">
              <Plus className="mr-2 h-4 w-4" />
              Add Article
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingArticle ? "Edit Press Article" : "Add New Press Article"}</DialogTitle>
              <DialogDescription>
                {editingArticle ? "Update press article information" : "Create a new press article"}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="VARCAS Unveils New E-Bike Model" {...field} data-testid="input-title" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="publication"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Publication</FormLabel>
                        <FormControl>
                          <Input placeholder="Economic Times" {...field} data-testid="input-publication" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="publicationDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Publication Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} data-testid="input-publication-date" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="excerpt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Excerpt</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Brief summary of the article..." 
                          className="min-h-[80px]"
                          {...field} 
                          data-testid="input-excerpt" 
                        />
                      </FormControl>
                      <FormDescription>
                        Short preview text for the article card
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Article Image</FormLabel>
                      <div className="flex items-center gap-3">
                        <FormControl>
                          <Input 
                            placeholder="https://example.com/article-image.jpg or upload below" 
                            {...field} 
                            data-testid="input-image" 
                          />
                        </FormControl>
                        <ObjectUploader
                          onUploadComplete={(url: string) => form.setValue("image", url)}
                          fileType="image"
                          maxFileSizeMB={5}
                        >
                          <Button type="button" variant="outline" size="icon" data-testid="button-upload-image">
                            <Upload className="h-4 w-4" />
                          </Button>
                        </ObjectUploader>
                      </div>
                      <FormDescription>
                        Article image URL or upload an image (recommended: 800x600px, max 5MB)
                      </FormDescription>
                      {field.value && (
                        <div className="mt-2">
                          <img src={field.value} alt="Preview" className="w-full max-w-md h-48 object-cover rounded-md" />
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-category">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
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
                            <SelectItem value="published">Published</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="fullContent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Content (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Full article content..." 
                          className="min-h-[150px]"
                          {...field} 
                          data-testid="input-full-content" 
                        />
                      </FormControl>
                      <FormDescription>
                        Complete article text (if hosting internally)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="externalLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>External Link (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://example.com/article" 
                          {...field} 
                          data-testid="input-external-link" 
                        />
                      </FormControl>
                      <FormDescription>
                        Link to the original article on external publication
                      </FormDescription>
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
                        Higher numbers appear first
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
                    {(createMutation.isPending || updateMutation.isPending) ? "Saving..." : (editingArticle ? "Update" : "Create")}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <Card>
          <CardContent className="py-8">
            <p className="text-center text-muted-foreground">Loading press articles...</p>
          </CardContent>
        </Card>
      ) : sortedArticles.length === 0 ? (
        <Card>
          <CardContent className="py-8">
            <p className="text-center text-muted-foreground">No press articles yet. Create your first article!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sortedArticles.map((article) => (
            <Card key={article.id} data-testid={`article-${article.id}`} className="flex flex-col">
              {article.image && (
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Badge variant="secondary">{article.category}</Badge>
                  {article.status === "draft" && (
                    <Badge variant="outline">Draft</Badge>
                  )}
                </div>
                <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
                <CardDescription className="text-xs">
                  {article.publication} • {new Date(article.publicationDate).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{article.excerpt}</p>
                <div className="flex items-center justify-between gap-2 mt-auto">
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleEditArticle(article)}
                      data-testid={`button-edit-${article.id}`}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="icon"
                          data-testid={`button-delete-${article.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Press Article</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{article.title}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(article.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                  {article.externalLink && (
                    <Button variant="ghost" size="icon" asChild>
                      <a href={article.externalLink} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
