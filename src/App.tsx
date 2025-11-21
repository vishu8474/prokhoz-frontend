// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./services/authContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

// Import the missing pages
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import HowItWorks from "./pages/HowItWorks";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import ForgotPassword from "./pages/ForgotPassword";

// Manufacturer dashboard components
import { ManufacturerLayout } from "./components/ManufacturerLayout";
import ManufacturerDashboard from "./pages/manufacturer/Dashboard";
import MyProducts from "./pages/manufacturer/MyProducts";
import AddProduct from "./pages/manufacturer/AddProduct";
import Inquiries from "./pages/manufacturer/Inquiries";
import Settings from "./pages/manufacturer/Settings";

// Buyer dashboard components
import BuyerLayout from "./components/BuyerLayout";
import DashboardHome from "./pages/buyer-dashboard/DashboardHome";
import SearchProducts from "./pages/buyer-dashboard/SearchProducts";
import RequestMaterial from "./pages/buyer-dashboard/RequestMaterial";
import Messages from "./pages/buyer-dashboard/Messages";
import Notifications from "./pages/buyer-dashboard/Notifications";
import SavedItems from "./pages/buyer-dashboard/SavedItems";
import Profile from "./pages/buyer-dashboard/Profile";
import SupplierDetails from "./pages/buyer-dashboard/SupplierDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Add these missing public routes */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />

            {/* Manufacturer Dashboard Routes */}
            <Route path="/manufacturer/*" element={<ManufacturerLayout />}>
              <Route path="dashboard" element={<ManufacturerDashboard />} />
              <Route path="products" element={<MyProducts />} />
              <Route path="add-product" element={<AddProduct />} />
              <Route path="inquiries" element={<Inquiries />} />
              <Route path="settings" element={<Settings />} />
              {/* Default route for /manufacturer */}
              <Route index element={<ManufacturerDashboard />} />
            </Route>

            {/* ✅ BUYER DASHBOARD ROUTES */}
            <Route path="/buyer-dashboard/*" element={<BuyerLayout />}>
              <Route path="" element={<DashboardHome />} />
              <Route path="search" element={<SearchProducts />} />
              <Route path="requests" element={<RequestMaterial />} />
              <Route path="messages" element={<Messages />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="saved" element={<SavedItems />} />
              <Route path="profile" element={<Profile />} />
              <Route path="supplier/:id" element={<SupplierDetails />} />
              {/* Default route for /buyer-dashboard */}
              <Route index element={<DashboardHome />} />
            </Route>

            {/* 404 - This should be last */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;