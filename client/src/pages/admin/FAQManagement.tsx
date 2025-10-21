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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Plus, Edit, Trash2, HelpCircle, FolderOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";

interface FaqCategory {
  id: number;
  name: string;
  displayOrder: number;
}

interface FaqQuestion {
  id: number;
  categoryId: number;
  question: string;
  answer: string;
  displayOrder: number;
  status: string;
  tags?: string[] | null;
}

const categoryFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  displayOrder: z.number().int().min(0).optional(),
});

const questionFormSchema = z.object({
  categoryId: z.number({
    required_error: "Category is required",
  }),
  question: z.string().min(5, "Question must be at least 5 characters"),
  answer: z.string().min(10, "Answer must be at least 10 characters"),
  displayOrder: z.number().int().min(0).optional(),
  status: z.enum(["published", "draft"]).optional(),
  tags: z.string().optional(),
});

type CategoryFormData = z.infer<typeof categoryFormSchema>;
type QuestionFormData = z.infer<typeof questionFormSchema>;

export default function FAQManagement() {
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [isQuestionDialogOpen, setIsQuestionDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<FaqCategory | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<FaqQuestion | null>(null);
  const { toast } = useToast();

  const { data: categories, isLoading: categoriesLoading } = useQuery<FaqCategory[]>({
    queryKey: ["/api/admin/faq-categories"],
  });

  const { data: questions, isLoading: questionsLoading } = useQuery<FaqQuestion[]>({
    queryKey: ["/api/admin/faq-questions"],
  });

  const categoryForm = useForm<CategoryFormData>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
      displayOrder: 0,
    },
  });

  const questionForm = useForm<QuestionFormData>({
    resolver: zodResolver(questionFormSchema),
    defaultValues: {
      categoryId: 0,
      question: "",
      answer: "",
      displayOrder: 0,
      status: "published",
      tags: "",
    },
  });

  // Category mutations
  const createCategoryMutation = useMutation({
    mutationFn: (data: CategoryFormData) => apiRequest("POST", "/api/admin/faq-categories", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/faq-categories"] });
      toast({ title: "Success", description: "Category created successfully" });
      setIsCategoryDialogOpen(false);
      categoryForm.reset();
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message || "Failed to create category", variant: "destructive" });
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: CategoryFormData }) =>
      apiRequest("PUT", `/api/admin/faq-categories/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/faq-categories"] });
      toast({ title: "Success", description: "Category updated successfully" });
      setIsCategoryDialogOpen(false);
      categoryForm.reset();
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message || "Failed to update category", variant: "destructive" });
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/admin/faq-categories/${id}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/faq-categories"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/faq-questions"] });
      toast({ title: "Success", description: "Category deleted successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message || "Failed to delete category", variant: "destructive" });
    },
  });

  // Question mutations
  const createQuestionMutation = useMutation({
    mutationFn: (data: QuestionFormData) => {
      const { tags, ...rest } = data;
      const tagsArray = tags ? tags.split(",").map(t => t.trim()).filter(Boolean) : [];
      return apiRequest("POST", "/api/admin/faq-questions", { ...rest, tags: tagsArray });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/faq-questions"] });
      toast({ title: "Success", description: "Question created successfully" });
      setIsQuestionDialogOpen(false);
      questionForm.reset();
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message || "Failed to create question", variant: "destructive" });
    },
  });

  const updateQuestionMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: QuestionFormData }) => {
      const { tags, ...rest } = data;
      const tagsArray = tags ? tags.split(",").map(t => t.trim()).filter(Boolean) : [];
      return apiRequest("PUT", `/api/admin/faq-questions/${id}`, { ...rest, tags: tagsArray });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/faq-questions"] });
      toast({ title: "Success", description: "Question updated successfully" });
      setIsQuestionDialogOpen(false);
      questionForm.reset();
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message || "Failed to update question", variant: "destructive" });
    },
  });

  const deleteQuestionMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/admin/faq-questions/${id}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/faq-questions"] });
      toast({ title: "Success", description: "Question deleted successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message || "Failed to delete question", variant: "destructive" });
    },
  });

  const handleAddCategory = () => {
    setEditingCategory(null);
    categoryForm.reset({ name: "", displayOrder: 0 });
    setIsCategoryDialogOpen(true);
  };

  const handleEditCategory = (category: FaqCategory) => {
    setEditingCategory(category);
    categoryForm.reset({ name: category.name, displayOrder: category.displayOrder || 0 });
    setIsCategoryDialogOpen(true);
  };

  const handleSubmitCategory = (formData: CategoryFormData) => {
    if (editingCategory) {
      updateCategoryMutation.mutate({ id: editingCategory.id, data: formData });
    } else {
      createCategoryMutation.mutate(formData);
    }
  };

  const handleAddQuestion = () => {
    setEditingQuestion(null);
    questionForm.reset({
      categoryId: categories?.[0]?.id || 0,
      question: "",
      answer: "",
      displayOrder: 0,
      status: "published",
      tags: "",
    });
    setIsQuestionDialogOpen(true);
  };

  const handleEditQuestion = (question: FaqQuestion) => {
    setEditingQuestion(question);
    questionForm.reset({
      categoryId: question.categoryId,
      question: question.question,
      answer: question.answer,
      displayOrder: question.displayOrder || 0,
      status: question.status as "published" | "draft",
      tags: question.tags?.join(", ") || "",
    });
    setIsQuestionDialogOpen(true);
  };

  const handleSubmitQuestion = (formData: QuestionFormData) => {
    if (editingQuestion) {
      updateQuestionMutation.mutate({ id: editingQuestion.id, data: formData });
    } else {
      createQuestionMutation.mutate(formData);
    }
  };

  const sortedCategories = categories?.sort((a, b) => a.displayOrder - b.displayOrder) || [];
  const sortedQuestions = questions?.sort((a, b) => a.displayOrder - b.displayOrder) || [];

  const getQuestionsByCategory = (categoryId: number) =>
    sortedQuestions.filter(q => q.categoryId === categoryId);

  const getCategoryName = (categoryId: number) =>
    categories?.find(c => c.id === categoryId)?.name || "Unknown";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">FAQ</h2>
          <p className="text-muted-foreground">Manage frequently asked questions</p>
        </div>
      </div>

      <Tabs defaultValue="questions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="questions" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={isQuestionDialogOpen} onOpenChange={setIsQuestionDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleAddQuestion} data-testid="button-add-question">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Question
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingQuestion ? "Edit Question" : "Add New Question"}</DialogTitle>
                  <DialogDescription>
                    {editingQuestion ? "Update FAQ question" : "Create a new FAQ question"}
                  </DialogDescription>
                </DialogHeader>
                <Form {...questionForm}>
                  <form onSubmit={questionForm.handleSubmit(handleSubmitQuestion)} className="space-y-4">
                    <FormField
                      control={questionForm.control}
                      name="categoryId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select onValueChange={(value) => field.onChange(parseInt(value))} value={field.value?.toString()}>
                            <FormControl>
                              <SelectTrigger data-testid="select-category">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {sortedCategories.map((cat) => (
                                <SelectItem key={cat.id} value={cat.id.toString()}>
                                  {cat.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={questionForm.control}
                      name="question"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Question</FormLabel>
                          <FormControl>
                            <Input placeholder="What is the battery range?" {...field} data-testid="input-question" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={questionForm.control}
                      name="answer"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Answer</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Our e-bikes offer a range of up to 100 km on a single charge..." 
                              className="min-h-[100px]"
                              {...field} 
                              data-testid="input-answer" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={questionForm.control}
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
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={questionForm.control}
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
                      control={questionForm.control}
                      name="tags"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tags (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="battery, range, charging (comma-separated)" {...field} data-testid="input-tags" />
                          </FormControl>
                          <FormDescription>Comma-separated tags for categorization</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <DialogFooter>
                      <Button 
                        type="submit" 
                        disabled={createQuestionMutation.isPending || updateQuestionMutation.isPending}
                        data-testid="button-submit-question"
                      >
                        {(createQuestionMutation.isPending || updateQuestionMutation.isPending) ? "Saving..." : (editingQuestion ? "Update" : "Create")}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>

          {questionsLoading ? (
            <Card>
              <CardContent className="py-8">
                <p className="text-center text-muted-foreground">Loading questions...</p>
              </CardContent>
            </Card>
          ) : sortedCategories.length === 0 ? (
            <Card>
              <CardContent className="py-8">
                <p className="text-center text-muted-foreground">
                  No categories yet. Please create a category first in the Categories tab.
                </p>
              </CardContent>
            </Card>
          ) : (
            <Accordion type="single" collapsible className="space-y-4">
              {sortedCategories.map((category) => {
                const categoryQuestions = getQuestionsByCategory(category.id);
                return (
                  <Card key={category.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FolderOpen className="h-5 w-5" />
                        {category.name}
                        <Badge variant="secondary">{categoryQuestions.length} questions</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {categoryQuestions.length === 0 ? (
                        <p className="text-muted-foreground text-sm">No questions in this category yet</p>
                      ) : (
                        <Accordion type="single" collapsible>
                          {categoryQuestions.map((question) => (
                            <AccordionItem key={question.id} value={question.id.toString()} data-testid={`question-${question.id}`}>
                              <AccordionTrigger className="hover:no-underline">
                                <div className="flex items-start justify-between gap-4 flex-1 text-left">
                                  <div className="flex items-start gap-2">
                                    <HelpCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                                    <span>{question.question}</span>
                                  </div>
                                  {question.status === "draft" && (
                                    <Badge variant="outline">Draft</Badge>
                                  )}
                                </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="space-y-4">
                                  <p className="text-muted-foreground">{question.answer}</p>
                                  {question.tags && question.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                      {question.tags.map((tag, i) => (
                                        <Badge key={i} variant="secondary">{tag}</Badge>
                                      ))}
                                    </div>
                                  )}
                                  <div className="flex gap-2 pt-2">
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => handleEditQuestion(question)}
                                      data-testid={`button-edit-${question.id}`}
                                    >
                                      <Edit className="h-4 w-4 mr-2" />
                                      Edit
                                    </Button>
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <Button 
                                          variant="outline" 
                                          size="sm"
                                          data-testid={`button-delete-${question.id}`}
                                        >
                                          <Trash2 className="h-4 w-4 mr-2" />
                                          Delete
                                        </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>Delete Question</AlertDialogTitle>
                                          <AlertDialogDescription>
                                            Are you sure you want to delete this question? This action cannot be undone.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                                          <AlertDialogAction onClick={() => deleteQuestionMutation.mutate(question.id)}>
                                            Delete
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                  </div>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </Accordion>
          )}
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleAddCategory} data-testid="button-add-category">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingCategory ? "Edit Category" : "Add New Category"}</DialogTitle>
                  <DialogDescription>
                    {editingCategory ? "Update category details" : "Create a new FAQ category"}
                  </DialogDescription>
                </DialogHeader>
                <Form {...categoryForm}>
                  <form onSubmit={categoryForm.handleSubmit(handleSubmitCategory)} className="space-y-4">
                    <FormField
                      control={categoryForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category Name</FormLabel>
                          <FormControl>
                            <Input placeholder="General Questions" {...field} data-testid="input-category-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={categoryForm.control}
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
                              data-testid="input-category-display-order"
                            />
                          </FormControl>
                          <FormDescription>Lower numbers appear first</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <DialogFooter>
                      <Button 
                        type="submit" 
                        disabled={createCategoryMutation.isPending || updateCategoryMutation.isPending}
                        data-testid="button-submit-category"
                      >
                        {(createCategoryMutation.isPending || updateCategoryMutation.isPending) ? "Saving..." : (editingCategory ? "Update" : "Create")}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>

          {categoriesLoading ? (
            <Card>
              <CardContent className="py-8">
                <p className="text-center text-muted-foreground">Loading categories...</p>
              </CardContent>
            </Card>
          ) : sortedCategories.length === 0 ? (
            <Card>
              <CardContent className="py-8">
                <p className="text-center text-muted-foreground">No categories yet. Create your first category!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {sortedCategories.map((category) => (
                <Card key={category.id} data-testid={`category-${category.id}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{category.name}</CardTitle>
                        <CardDescription>
                          {getQuestionsByCategory(category.id).length} questions | Display Order: {category.displayOrder}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => handleEditCategory(category)}
                          data-testid={`button-edit-category-${category.id}`}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="icon"
                              data-testid={`button-delete-category-${category.id}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Category</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{category.name}"? This will also delete all questions in this category. This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => deleteCategoryMutation.mutate(category.id)}>
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
