
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Package, MessageSquare, Star, TrendingUp, Activity, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "@/services/authContext";
import { inquiriesAPI } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

interface Inquiry {
  _id: string;
  product: {
    title: string;
  };
  manufacturer: {
    companyName: string;
  };
  status: string;
  createdAt: string;
}

export default function DashboardHome() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [stats, setStats] = useState({
    totalSearches: 0,
    savedSuppliers: 0,
    activeRequests: 0,
    messages: 0
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch buyer inquiries
      const inquiriesResponse = await inquiriesAPI.getBuyerInquiries();
      const inquiries = inquiriesResponse.data.inquiries || [];
      
      // Calculate stats from inquiries
      const activeRequests = inquiries.filter((inv: Inquiry) => 
        ['pending', 'responded', 'in_discussion'].includes(inv.status)
      ).length;

      setStats({
        totalSearches: 24, // Mock data
        savedSuppliers: 8, // Mock data
        activeRequests,
        messages: 12 // Mock data
      });

      // Create recent activity from inquiries
      const activity = inquiries.slice(0, 4).map((inquiry: Inquiry) => ({
        action: "Sent inquiry to",
        supplier: inquiry.manufacturer.companyName,
        product: inquiry.product.title,
        time: new Date(inquiry.createdAt).toLocaleDateString('en-IN', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })
      }));

      // If no inquiries, add some mock activity
      if (activity.length === 0) {
        setRecentActivity([
          {
            action: "Welcome to",
            supplier: "Prokhoz B2B Marketplace",
            product: "Start searching for products",
            time: "Just now"
          }
        ]);
      } else {
        setRecentActivity(activity);
      }

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

  const statsData = [
    {
      title: "Total Searches",
      value: stats.totalSearches.toString(),
      change: "+12%",
      icon: Search,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Saved Suppliers",
      value: stats.savedSuppliers.toString(),
      change: "+3",
      icon: Star,
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      title: "Active Requests",
      value: stats.activeRequests.toString(),
      change: `${stats.activeRequests} pending`,
      icon: Package,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Messages",
      value: stats.messages.toString(),
      change: "3 unread",
      icon: MessageSquare,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome Back!</h1>
          <p className="text-muted-foreground mt-1">Loading your sourcing activities...</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader className="w-8 h-8 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Welcome Back, {user?.companyName}!</h1>
        <p className="text-muted-foreground mt-1">Here's what's happening with your sourcing activities</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat) => (
          <Card key={stat.title} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-4 h-4 ${stat.iconColor}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              <CardTitle>Recent Activity</CardTitle>
            </div>
            <CardDescription>Your latest actions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">
                      {activity.action}{" "}
                      <span className="font-medium text-primary">{activity.supplier}</span>
                    </p>
                    {activity.product && (
                      <p className="text-xs text-muted-foreground">Product: {activity.product}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <CardTitle>Quick Actions</CardTitle>
            </div>
            <CardDescription>Start your next sourcing task</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => navigate("/buyer-dashboard/search")}
            >
              <Search className="w-4 h-4 mr-2" />
              Search for Materials
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => navigate("/buyer-dashboard/requests")}
            >
              <Package className="w-4 h-4 mr-2" />
              Create New Request
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => navigate("/buyer-dashboard/messages")}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              View Messages
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => navigate("/buyer-dashboard/saved")}
            >
              <Star className="w-4 h-4 mr-2" />
              Saved Suppliers
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
