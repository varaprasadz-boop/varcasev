import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Eye, CheckCircle, Clock, Trash2 } from "lucide-react";
import { useLocation } from "wouter";
import { format } from "date-fns";

interface FormSubmission {
  id: number;
  formType: string;
  formData: any;
  status: string;
  submittedAt: string;
  respondedAt?: string;
  respondedBy?: string;
  response?: string;
}

export default function FormSubmissions() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedSubmission, setSelectedSubmission] = useState<FormSubmission | null>(null);
  const [response, setResponse] = useState("");

  const { data: submissions, isLoading } = useQuery<FormSubmission[]>({
    queryKey: ["/api/admin/form-submissions", filterType, filterStatus],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filterType !== "all") params.append("formType", filterType);
      if (filterStatus !== "all") params.append("status", filterStatus);
      
      const url = `/api/admin/form-submissions${params.toString() ? `?${params.toString()}` : ""}`;
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch submissions");
      return res.json();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const res = await apiRequest("PUT", `/api/admin/form-submissions/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/form-submissions"] });
      toast({
        title: "Success",
        description: "Submission updated successfully",
      });
      setSelectedSubmission(null);
      setResponse("");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update submission",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/admin/form-submissions/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/form-submissions"] });
      toast({
        title: "Success",
        description: "Submission deleted successfully",
      });
    },
  });

  const handleMarkAsRead = (submission: FormSubmission) => {
    updateMutation.mutate({
      id: submission.id,
      data: { status: "read" },
    });
  };

  const handleRespond = (submission: FormSubmission) => {
    setSelectedSubmission(submission);
    setResponse(submission.response || "");
  };

  const submitResponse = () => {
    if (!selectedSubmission) return;
    
    updateMutation.mutate({
      id: selectedSubmission.id,
      data: {
        status: "responded",
        response: response,
      },
    });
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; icon: any }> = {
      new: { variant: "default", icon: Clock },
      read: { variant: "secondary", icon: Eye },
      responded: { variant: "outline", icon: CheckCircle },
    };

    const config = variants[status] || variants.new;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLocation("/admin/dashboard")}
              data-testid="button-back"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Form Submissions</h1>
              <p className="text-sm text-muted-foreground">Manage customer inquiries and applications</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <CardTitle>All Submissions</CardTitle>
                <CardDescription>
                  {submissions?.length || 0} total submissions
                </CardDescription>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-[180px]" data-testid="select-form-type">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="enquiry">Enquiry</SelectItem>
                    <SelectItem value="partnership">Partnership</SelectItem>
                    <SelectItem value="job_application">Job Application</SelectItem>
                    <SelectItem value="spare_parts">Spare Parts</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[180px]" data-testid="select-status">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="read">Read</SelectItem>
                    <SelectItem value="responded">Responded</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Loading submissions...</p>
              </div>
            ) : submissions && submissions.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.map((submission) => (
                      <TableRow key={submission.id} data-testid={`row-submission-${submission.id}`}>
                        <TableCell className="font-medium">
                          {submission.formType.replace('_', ' ').toUpperCase()}
                        </TableCell>
                        <TableCell>
                          {submission.formData?.name || submission.formData?.fullName || "N/A"}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{submission.formData?.email || "N/A"}</div>
                            <div className="text-muted-foreground">
                              {submission.formData?.phone || submission.formData?.mobile || ""}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {format(new Date(submission.submittedAt), "MMM dd, yyyy")}
                        </TableCell>
                        <TableCell>{getStatusBadge(submission.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {submission.status === "new" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleMarkAsRead(submission)}
                                data-testid={`button-mark-read-${submission.id}`}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                Mark Read
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRespond(submission)}
                              data-testid={`button-respond-${submission.id}`}
                            >
                              {submission.status === "responded" ? "View" : "Respond"}
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteMutation.mutate(submission.id)}
                              data-testid={`button-delete-${submission.id}`}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No submissions found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <Dialog open={!!selectedSubmission} onOpenChange={() => setSelectedSubmission(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Submission Details</DialogTitle>
            <DialogDescription>
              {selectedSubmission?.formType.replace('_', ' ').toUpperCase()} - 
              Submitted on {selectedSubmission && format(new Date(selectedSubmission.submittedAt), "MMMM dd, yyyy")}
            </DialogDescription>
          </DialogHeader>

          {selectedSubmission && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(selectedSubmission.formData).map(([key, value]) => (
                  <div key={key} className="space-y-1">
                    <Label className="text-sm font-medium capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Label htmlFor="response">Response</Label>
                <Textarea
                  id="response"
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  placeholder="Enter your response..."
                  rows={5}
                  disabled={selectedSubmission.status === "responded"}
                  data-testid="textarea-response"
                />
              </div>

              {selectedSubmission.respondedAt && (
                <div className="text-sm text-muted-foreground">
                  Responded on {format(new Date(selectedSubmission.respondedAt), "MMMM dd, yyyy 'at' h:mm a")}
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setSelectedSubmission(null)}
              data-testid="button-cancel"
            >
              Close
            </Button>
            {selectedSubmission?.status !== "responded" && (
              <Button
                onClick={submitResponse}
                disabled={updateMutation.isPending || !response.trim()}
                data-testid="button-submit-response"
              >
                {updateMutation.isPending ? "Submitting..." : "Submit Response"}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
