
import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Search, 
  MessageSquare, 
  Star, 
  Bell, 
  User,
  LogOut,
  Menu,
  X,
  Package,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/services/authContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const BuyerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navigation = [
    { name: "Dashboard", href: "/buyer-dashboard", icon: LayoutDashboard },
    { name: "Search Products", href: "/buyer-dashboard/search", icon: Search },
    { name: "Request Material", href: "/buyer-dashboard/requests", icon: Package },
    { name: "Messages", href: "/buyer-dashboard/messages", icon: MessageSquare },
    { name: "Saved Items", href: "/buyer-dashboard/saved", icon: Star },
    { name: "Notifications", href: "/buyer-dashboard/notifications", icon: Bell },
    { name: "Profile", href: "/buyer-dashboard/profile", icon: User },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar for mobile */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-900/80" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 w-64 bg-white px-4 pb-4 flex flex-col">
          {/* Logo and close button */}
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-primary">
              Prokhoz
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
              <X className="h-6 w-6" />
            </Button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 space-y-2 px-2 py-4">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          
          {/* User section */}
          <div className="border-t pt-4">
            <div className="flex items-center gap-3 px-3 py-2">
              <Avatar>
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {user?.companyName?.charAt(0) || 'B'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.companyName}</p>
                <p className="text-xs text-gray-500 truncate">Buyer Account</p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 mt-2 text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-4 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <Link to="/" className="text-2xl font-bold text-primary">
              Prokhoz
            </Link>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul className="flex flex-1 flex-col gap-y-4">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="border-t pt-4">
              <div className="flex items-center gap-3 px-3 py-2">
                <Avatar>
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user?.companyName?.charAt(0) || 'B'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user?.companyName}</p>
                  <p className="text-xs text-gray-500 truncate">Buyer Account</p>
                </div>
              </div>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 mt-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                Logout
              </Button>
            </div>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 justify-end">
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <Link to="/buyer-dashboard/notifications">
                <Button variant="ghost" size="icon">
                  <Bell className="h-6 w-6" />
                </Button>
              </Link>
              <div className="hidden sm:block w-px h-6 bg-gray-200" />
              <div className="flex items-center gap-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                    {user?.companyName?.charAt(0) || 'B'}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden lg:block text-sm font-medium">
                  {user?.companyName}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-6">
          <div className="px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default BuyerLayout;
