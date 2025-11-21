import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, MessageSquare, TrendingUp, Eye, Plus, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { inquiriesAPI, productsAPI } from "@/services/api";
import { useAuth } from "@/services/authContext";

interface DashboardStats {
  totalProducts: number;
  totalInquiries: number;
  pendingInquiries: number;
  respondedInquiries: number;
  inDiscussionInquiries: number;
  acceptedInquiries: number;
}

interface RecentInquiry {
  _id: string;
  product: {
    title: string;
  };
  buyer: {
    companyName: string;
  };
  createdAt: string;
}

export default function ManufacturerDashboard() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalInquiries: 0,
    pendingInquiries: 0,
    respondedInquiries: 0,
    inDiscussionInquiries: 0,
    acceptedInquiries: 0
  });
  const [recentInquiries, setRecentInquiries] = useState<RecentInquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch dashboard stats
      const statsResponse = await inquiriesAPI.getDashboardStats();
      const statsData = statsResponse.data.stats;
      
      // Fetch recent inquiries
      const inquiriesResponse = await inquiriesAPI.getMyInquiries();
      const recentInquiriesData = inquiriesResponse.data.inquiries.slice(0, 3);
      
      setStats(statsData);
      setRecentInquiries(recentInquiriesData);
      
    } catch (error: any) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const dashboardStats = [
    {
      title: "Total Products",
      value: stats.totalProducts.toString(),
      change: "+0",
      icon: Package,
      color: "text-blue-600",
      description: "Active listings"
    },
    {
      title: "Active Inquiries",
      value: stats.totalInquiries.toString(),
      change: "+0",
      icon: ShoppingCart,
      color: "text-green-600",
      description: "Require attention"
    },
    {
      title: "Pending Inquiries",
      value: stats.pendingInquiries.toString(),
      change: "+0",
      icon: MessageSquare,
      color: "text-yellow-600",
      description: "Need response"
    },
    {
      title: "Accepted Orders",
      value: stats.acceptedInquiries.toString(),
      change: "+0",
      icon: TrendingUp,
      color: "text-purple-600",
      description: "Confirmed deals"
    },
  ];

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Manufacturer Dashboard</h2>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Company Info */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-4 mb-2">
            {user?.avatar && user.avatar !== 'default-avatar.jpg' ? (
              <img 
                src={user.avatar} 
                alt="Company logo" 
                className="h-12 w-12 rounded-lg object-cover border"
              />
            ) : (
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center border">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
            )}
            <div>
              <h2 className="text-3xl font-bold text-foreground">
                Welcome, {user?.companyName}
              </h2>
              <p className="text-muted-foreground">Overview of your business performance</p>
            </div>
          </div>
        </div>
        <Link to="/manufacturer/add-product">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add New Product
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stat.change}</span> {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Inquiries</CardTitle>
            <CardDescription>Latest buyer inquiries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentInquiries.length > 0 ? (
                recentInquiries.map((inquiry) => (
                  <div key={inquiry._id} className="flex items-start gap-3 p-3 rounded-lg border">
                    <div className="w-2 h-2 rounded-full mt-2 bg-green-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        New inquiry for {inquiry.product?.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        From {inquiry.buyer?.companyName} • {formatTimeAgo(inquiry.createdAt)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No recent inquiries
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your business</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/manufacturer/products">
              <Button variant="outline" className="w-full justify-start">
                <Package className="h-4 w-4 mr-2" />
                View All Products
              </Button>
            </Link>
            <Link to="/manufacturer/inquiries">
              <Button variant="outline" className="w-full justify-start">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Manage Inquiries
              </Button>
            </Link>
            <Link to="/manufacturer/add-product">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="h-4 w-4 mr-2" />
                Add New Product
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}