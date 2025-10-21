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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Plus, Edit, Trash2, Upload, MoveUp, MoveDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { ObjectUploader } from "@/components/ObjectUploader";
import type { UploadResult } from "@uppy/core";

interface HeroSlide {
  id: number;
  type: string;
  title: string;
  subtitle: string;
  image: string | null;
  videoUrl: string | null;
  ctaText: string | null;
  ctaLink: string | null;
  displayOrder: number;
  isActive: boolean;
  autoRotateTiming: number;
}

const heroSlideFormSchema = z.object({
  type: z.enum(["image", "video"]),
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().min(1, "Subtitle is required"),
  image: z.string().optional(),
  videoUrl: z.string().optional(),
  ctaText: z.string().optional(),
  ctaLink: z.string().optional(),
  displayOrder: z.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
  autoRotateTiming: z.number().int().min(1000).optional(),
});

type HeroSlideFormData = z.infer<typeof heroSlideFormSchema>;

export default function HeroSlidesManagement() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const { toast } = useToast();

  const { data: slides, isLoading } = useQuery<HeroSlide[]>({
    queryKey: ["/api/admin/hero-slides"],
  });

  const form = useForm<HeroSlideFormData>({
    resolver: zodResolver(heroSlideFormSchema),
    defaultValues: {
      type: "image",
      title: "",
      subtitle: "",
      image: "",
      videoUrl: "",
      ctaText: "",
      ctaLink: "",
      displayOrder: 0,
      isActive: true,
      autoRotateTiming: 5000,
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: HeroSlideFormData) => apiRequest("POST", "/api/admin/hero-slides", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/hero-slides"] });
      toast({
        title: "Success",
        description: "Hero slide created successfully",
      });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create hero slide",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: HeroSlideFormData }) =>
      apiRequest("PUT", `/api/admin/hero-slides/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/hero-slides"] });
      toast({
        title: "Success",
        description: "Hero slide updated successfully",
      });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update hero slide",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/admin/hero-slides/${id}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/hero-slides"] });
      toast({
        title: "Success",
        description: "Hero slide deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete hero slide",
        variant: "destructive",
      });
    },
  });

  const handleAddSlide = () => {
    setEditingSlide(null);
    form.reset({
      type: "image",
      title: "",
      subtitle: "",
      image: "",
      videoUrl: "",
      ctaText: "",
      ctaLink: "",
      displayOrder: 0,
      isActive: true,
      autoRotateTiming: 5000,
    });
    setIsDialogOpen(true);
  };

  const handleEditSlide = (slide: HeroSlide) => {
    setEditingSlide(slide);
    form.reset({
      type: slide.type as "image" | "video",
      title: slide.title,
      subtitle: slide.subtitle,
      image: slide.image || "",
      videoUrl: slide.videoUrl || "",
      ctaText: slide.ctaText || "",
      ctaLink: slide.ctaLink || "",
      displayOrder: slide.displayOrder || 0,
      isActive: slide.isActive,
      autoRotateTiming: slide.autoRotateTiming || 5000,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (formData: HeroSlideFormData) => {
    const cleanData: HeroSlideFormData = {
      type: formData.type,
      title: formData.title,
      subtitle: formData.subtitle,
      image: formData.image || undefined,
      videoUrl: formData.videoUrl || undefined,
      ctaText: formData.ctaText || undefined,
      ctaLink: formData.ctaLink || undefined,
      displayOrder: formData.displayOrder,
      isActive: formData.isActive,
      autoRotateTiming: formData.autoRotateTiming,
    };

    if (editingSlide) {
      updateMutation.mutate({ id: editingSlide.id, data: cleanData });
    } else {
      createMutation.mutate(cleanData);
    }
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const sortedSlides = slides?.sort((a, b) => a.displayOrder - b.displayOrder) || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Hero Slides</h2>
          <p className="text-muted-foreground">
            Manage homepage hero carousel
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddSlide} data-testid="button-add-slide">
              <Plus className="mr-2 h-4 w-4" />
              Add Slide
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingSlide ? "Edit Hero Slide" : "Add New Hero Slide"}</DialogTitle>
              <DialogDescription>
                {editingSlide ? "Update hero slide information" : "Create a new hero slide for the homepage carousel"}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-type">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="image">Image</SelectItem>
                          <SelectItem value="video">Video</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Smart & Connected E-Bikes" {...field} data-testid="input-title" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subtitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subtitle</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Experience the future of urban commuting" 
                          className="min-h-20" 
                          {...field} 
                          data-testid="textarea-subtitle"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.watch("type") === "image" && (
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hero Image</FormLabel>
                        <div className="space-y-3">
                          <div className="flex gap-2">
                            <FormControl>
                              <Input placeholder="Image URL or upload..." {...field} data-testid="input-image" />
                            </FormControl>
                            <ObjectUploader
                              maxNumberOfFiles={1}
                              maxFileSize={10485760}
                              allowedFileTypes={['image/*']}
                              buttonVariant="outline"
                              onGetUploadParameters={async () => {
                                const response = await apiRequest("POST", "/api/objects/upload", {});
                                return {
                                  method: 'PUT' as const,
                                  url: response.uploadURL,
                                };
                              }}
                              onComplete={(result: UploadResult<Record<string, unknown>, Record<string, unknown>>) => {
                                if (result.successful && result.successful.length > 0) {
                                  const uploadedFile = result.successful[0];
                                  const uploadURL = uploadedFile.uploadURL;
                                  if (uploadURL) {
                                    const normalizedPath = uploadURL.split('?')[0].replace('https://storage.googleapis.com', '');
                                    const objectPath = normalizedPath.replace(/-private\/uploads/, '/objects/uploads');
                                    field.onChange(objectPath);
                                    toast({
                                      title: "Success",
                                      description: "Hero image uploaded successfully",
                                    });
                                  }
                                }
                              }}
                            >
                              <Upload className="h-4 w-4" />
                            </ObjectUploader>
                          </div>
                          <FormDescription>
                            Recommended size: 1920x1080px (16:9 ratio) | Max size: 10MB | Upload image or enter URL
                          </FormDescription>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {form.watch("type") === "video" && (
                  <FormField
                    control={form.control}
                    name="videoUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Video URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://youtube.com/..." {...field} data-testid="input-video-url" />
                        </FormControl>
                        <FormDescription>
                          YouTube or Vimeo embed URL
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="ctaText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CTA Button Text</FormLabel>
                      <FormControl>
                        <Input placeholder="Explore Our Vehicles" {...field} data-testid="input-cta-text" />
                      </FormControl>
                      <FormDescription>
                        Call-to-action button text (optional)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ctaLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CTA Button Link</FormLabel>
                      <FormControl>
                        <Input placeholder="/vehicles" {...field} data-testid="input-cta-link" />
                      </FormControl>
                      <FormDescription>
                        Link for the CTA button
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
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
                    name="autoRotateTiming"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Auto-Rotate (ms)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="5000" 
                            {...field} 
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 5000)}
                            data-testid="input-auto-rotate"
                          />
                        </FormControl>
                        <FormDescription>
                          Milliseconds between slides
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Active</FormLabel>
                        <FormDescription>
                          Show this slide on the homepage
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          data-testid="switch-is-active"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button 
                    type="submit" 
                    disabled={createMutation.isPending || updateMutation.isPending}
                    data-testid="button-submit"
                  >
                    {(createMutation.isPending || updateMutation.isPending) ? "Saving..." : (editingSlide ? "Update" : "Create")}
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
            <p className="text-center text-muted-foreground">Loading slides...</p>
          </CardContent>
        </Card>
      ) : sortedSlides.length === 0 ? (
        <Card>
          <CardContent className="py-8">
            <p className="text-center text-muted-foreground">No hero slides yet. Create your first slide!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {sortedSlides.map((slide) => (
            <Card key={slide.id} data-testid={`slide-${slide.id}`}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-xl">{slide.title}</CardTitle>
                      {!slide.isActive && (
                        <Badge variant="secondary">Inactive</Badge>
                      )}
                      <Badge variant="outline">{slide.type}</Badge>
                      <span className="text-xs text-muted-foreground">Order: {slide.displayOrder}</span>
                    </div>
                    <CardDescription>{slide.subtitle}</CardDescription>
                    {slide.ctaText && (
                      <div className="mt-2 text-sm">
                        <span className="font-medium">CTA:</span> {slide.ctaText} 
                        {slide.ctaLink && <span className="text-muted-foreground ml-2">→ {slide.ctaLink}</span>}
                      </div>
                    )}
                    {slide.image && (
                      <div className="mt-2 text-sm text-muted-foreground truncate">
                        Image: {slide.image}
                      </div>
                    )}
                    {slide.videoUrl && (
                      <div className="mt-2 text-sm text-muted-foreground truncate">
                        Video: {slide.videoUrl}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleEditSlide(slide)}
                      data-testid={`button-edit-${slide.id}`}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="icon"
                          data-testid={`button-delete-${slide.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Hero Slide</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{slide.title}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(slide.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
