import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, MessageSquare, Package, ShoppingCart, CheckCheck } from "lucide-react";

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      type: "inquiry",
      icon: ShoppingCart,
      title: "New inquiry received",
      message: "ABC Corporation sent an inquiry for Steel Rods",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      type: "message",
      icon: MessageSquare,
      title: "New message",
      message: "XYZ Industries: Thanks for the quote",
      time: "4 hours ago",
      unread: true,
    },
    {
      id: 3,
      type: "product",
      icon: Package,
      title: "Product view milestone",
      message: "Your product 'Aluminum Sheets' reached 100 views",
      time: "6 hours ago",
      unread: false,
    },
    {
      id: 4,
      type: "inquiry",
      icon: ShoppingCart,
      title: "Inquiry accepted",
      message: "DEF Manufacturing accepted your quote",
      time: "1 day ago",
      unread: false,
    },
    {
      id: 5,
      type: "system",
      icon: Bell,
      title: "System update",
      message: "New features added to the dashboard",
      time: "2 days ago",
      unread: false,
    },
    {
      id: 6,
      type: "product",
      icon: Package,
      title: "Low stock alert",
      message: "Copper Wire is running low on stock",
      time: "3 days ago",
      unread: false,
    },
  ];

  const getIconColor = (type: string) => {
    switch (type) {
      case "inquiry":
        return "text-accent";
      case "message":
        return "text-secondary";
      case "product":
        return "text-primary";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Notifications</h2>
          <p className="text-muted-foreground">Stay updated with your business activities</p>
        </div>
        <Button variant="outline" className="gap-2">
          <CheckCheck className="h-4 w-4" />
          Mark all as read
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notifications.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Unread</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              {notifications.filter((n) => n.unread).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {notifications.filter((n) => n.type === "inquiry").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">
              {notifications.filter((n) => n.type === "message").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-muted ${
                notification.unread ? "bg-accent/5 border-accent" : ""
              }`}
            >
              <div className={`rounded-full bg-muted p-2 ${getIconColor(notification.type)}`}>
                <notification.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-semibold">{notification.title}</h4>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                  </div>
                  {notification.unread && (
                    <Badge className="bg-accent text-accent-foreground">New</Badge>
                  )}
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{notification.time}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
