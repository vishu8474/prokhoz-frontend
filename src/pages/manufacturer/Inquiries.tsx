import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, MessageSquare, Clock, CheckCircle, XCircle, Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { inquiriesAPI } from "@/services/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Inquiry {
  _id: string;
  product: {
    title: string;
  };
  buyer: {
    companyName: string;
  };
  quantity: number;
  budget?: number;
  createdAt: string;
  status: string;
  priority: string;
  message: string;
}

export default function Inquiries() {
  const { toast } = useToast();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inDiscussion: 0,
    accepted: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const response = await inquiriesAPI.getMyInquiries();
      const inquiriesData = response.data.inquiries;
      
      setInquiries(inquiriesData);
      
      // Calculate stats
      const statsData = {
        total: inquiriesData.length,
        pending: inquiriesData.filter((i: Inquiry) => i.status === 'pending').length,
        inDiscussion: inquiriesData.filter((i: Inquiry) => i.status === 'in_discussion').length,
        accepted: inquiriesData.filter((i: Inquiry) => i.status === 'accepted').length
      };
      
      setStats(statsData);
      
    } catch (error: any) {
      console.error('Error fetching inquiries:', error);
      toast({
        title: "Error",
        description: "Failed to load inquiries",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (inquiryId: string, newStatus: string) => {
    try {
      await inquiriesAPI.updateInquiryStatus(inquiryId, { status: newStatus });
      toast({
        title: "Status Updated",
        description: "Inquiry status updated successfully",
      });
      fetchInquiries(); // Refresh the list
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500 text-white";
      case "responded":
        return "bg-blue-500 text-white";
      case "in_discussion":
        return "bg-purple-500 text-white";
      case "accepted":
        return "bg-green-500 text-white";
      case "rejected":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "responded":
        return <MessageSquare className="h-4 w-4" />;
      case "in_discussion":
        return <MessageSquare className="h-4 w-4" />;
      case "accepted":
        return <CheckCircle className="h-4 w-4" />;
      case "rejected":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500 text-white";
      case "medium":
        return "bg-yellow-500 text-white";
      case "low":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "responded":
        return "Responded";
      case "in_discussion":
        return "In Discussion";
      case "accepted":
        return "Accepted";
      case "rejected":
        return "Rejected";
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Inquiries & Orders</h2>
            <p className="text-muted-foreground">Loading inquiries...</p>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Inquiries & Orders</h2>
          <p className="text-muted-foreground">Manage buyer inquiries and requests</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchInquiries}>
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">Require response</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">In Discussion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.inDiscussion}</div>
            <p className="text-xs text-muted-foreground">Active negotiations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Accepted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.accepted}</div>
            <p className="text-xs text-muted-foreground">Confirmed orders</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Inquiries ({inquiries.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {inquiries.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No inquiries yet</h3>
              <p className="text-muted-foreground">Inquiries from buyers will appear here.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inquiries.map((inquiry) => (
                  <TableRow key={inquiry._id}>
                    <TableCell className="font-medium">{inquiry.buyer?.companyName}</TableCell>
                    <TableCell>{inquiry.product?.title}</TableCell>
                    <TableCell>{inquiry.quantity}</TableCell>
                    <TableCell className="font-semibold">
                      {inquiry.budget ? formatCurrency(inquiry.budget) : 'Not specified'}
                    </TableCell>
                    <TableCell>{formatDate(inquiry.createdAt)}</TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(inquiry.priority)}>
                        {inquiry.priority.charAt(0).toUpperCase() + inquiry.priority.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`flex items-center gap-1 w-24 justify-center ${getStatusColor(inquiry.status)}`}>
                        {getStatusIcon(inquiry.status)}
                        {getStatusText(inquiry.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleStatusUpdate(inquiry._id, 'accepted')}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-blue-600 hover:bg-blue-700"
                          onClick={() => handleStatusUpdate(inquiry._id, 'in_discussion')}
                        >
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}