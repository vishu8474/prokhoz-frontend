// frontend/src/pages/Login.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/services/authContext";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      console.log('🟡 LOGIN - Starting login process...');
      
      const userData = await login(formData.email, formData.password);
      console.log('🟢 LOGIN - Received user data:', userData);
      
      toast({
        title: "Login Successful!",
        description: "Welcome back to Prokhoz",
      });

      // ✅ FIXED: Proper role-based redirect
      if (userData && userData.role === 'manufacturer') {
        console.log('🟢 LOGIN - User is manufacturer, redirecting to manufacturer dashboard');
        navigate('/manufacturer/dashboard', { replace: true });
      } else if (userData && userData.role === 'buyer') {
        console.log('🟢 LOGIN - User is buyer, redirecting to buyer dashboard');
        navigate('/buyer-dashboard', { replace: true });
      } else {
        console.log('🟡 LOGIN - No role found, redirecting to home');
        navigate('/', { replace: true });
      }
      
    } catch (error: any) {
      console.error('🔴 LOGIN - Error:', error);
      toast({
        title: "Login Failed",
        description: error.response?.data?.message || 'Invalid credentials',
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="text-4xl font-bold text-white">
            Prokhoz
          </Link>
          <p className="text-gray-300 mt-2">Sign in to your account</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={loading}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                disabled={loading}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-accent hover:bg-accent/90"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="text-accent hover:underline font-medium">
                Register here
              </Link>
            </p>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-gray-300 hover:text-white">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;