// src/components/ManufacturerLayout.tsx
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ManufacturerSidebar } from "./ManufacturerSidebar";
import { Outlet, useLocation } from "react-router-dom";

export function ManufacturerLayout() {
  const location = useLocation();
  
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('dashboard')) return 'Dashboard';
    if (path.includes('products')) return 'My Products';
    if (path.includes('add-product')) return 'Add Product';
    if (path.includes('inquiries')) return 'Inquiries';
    if (path.includes('settings')) return 'Settings';
    return 'Dashboard';
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <ManufacturerSidebar />
        <main className="flex-1 bg-background">
          <header className="sticky top-0 z-10 border-b bg-card px-6 py-4">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-2xl font-bold text-foreground">{getPageTitle()}</h1>
            </div>
          </header>
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}