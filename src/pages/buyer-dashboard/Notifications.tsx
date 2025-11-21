import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, MessageSquare, Package, Star, CheckCheck } from "lucide-react";
import { toast } from "sonner";

const notifications = [
  {
    id: 1,
    type: "message",
    title: "New message from Global Steel Industries",
    message: "They have responded to your inquiry about steel sheets",
    time: "2 hours ago",
    read: false,
    icon: MessageSquare,
  },
  {
    id: 2,
    type: "quote",
    title: "Quote received from Premium Plastics Ltd.",
    message: "Your requested quote for polymer materials is ready",
    time: "5 hours ago",
    read: false,
    icon: Package,
  },
  {
    id: 3,
    type: "saved",
    title: "Price update on saved item",
    message: "ABC Manufacturing Co. has updated their pricing",
    time: "1 day ago",
    read: true,
    icon: Star,
  },
  {
    id: 4,
    type: "message",
    title: "New message from Textile Materials Hub",
    message: "Sample materials are ready for dispatch",
    time: "2 days ago",
    read: true,
    icon: MessageSquare,
  },
  {
    id: 5,
    type: "quote",
    title: "Quote request confirmed",
    message: "Your request has been sent to 5 suppliers",
    time: "3 days ago",
    read: true,
    icon: Package,
  },
];

const getNotificationColor = (type: string) => {
  switch (type) {
    case "message":
      return "bg-secondary/10 text-secondary";
    case "quote":
      return "bg-accent/10 text-accent";
    case "saved":
      return "bg-primary/10 text-primary";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export default function Notifications() {
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    toast.success("All notifications marked as read");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground mt-1">
            {unreadCount > 0 ? `${unreadCount} unread notifications` : "You're all caught up!"}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={handleMarkAllRead}>
            <CheckCheck className="w-4 h-4 mr-2" />
            Mark all as read
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {notifications.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Bell className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium text-foreground mb-2">No notifications yet</p>
              <p className="text-muted-foreground">We'll notify you when something important happens</p>
            </CardContent>
          </Card>
        ) : (
          notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`transition-all hover:shadow-md ${
                !notification.read ? "border-l-4 border-l-primary bg-muted/30" : ""
              }`}
            >
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg shrink-0 ${getNotificationColor(notification.type)}`}>
                    <notification.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <CardTitle className="text-lg leading-tight">{notification.title}</CardTitle>
                      {!notification.read && (
                        <Badge variant="destructive" className="shrink-0">
                          New
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground">{notification.message}</p>
                    <p className="text-sm text-muted-foreground mt-2">{notification.time}</p>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
