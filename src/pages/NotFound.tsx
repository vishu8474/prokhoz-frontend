// src/pages/Register.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/services/authContext";
import { Building2, ShoppingCart } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { register } = useAuth();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<"manufacturer" | "buyer" | "">("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: ""
  });
  
  const handleRoleSelect = (selectedRole: "manufacturer" | "buyer") => {
    setRole(selectedRole);
    setStep(2);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    try {
      await register({
        companyName: formData.companyName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        address: formData.address,
        role: role
      });
      
      toast({
        title: "Registration Successful!",
        description: "Your account has been created successfully.",
      });

      // ✅ FIXED REDIRECT - Only redirect to manufacturer or home
      if (role === 'manufacturer') {
        navigate('/manufacturer/dashboard');
      } else {
        navigate('/'); // Redirect to home for buyers (no buyer dashboard yet)
      }
      
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.response?.data?.message || 'Something went wrong',
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-2xl">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <Link to="/" className="text-4xl font-bold text-white">
            Prokhoz
          </Link>
          <p className="text-gray-300 mt-2">Create your account</p>
        </div>
        
        {/* Registration Form */}
        <div className="bg-white rounded-xl shadow-2xl p-8">
          {step === 1 ? (
            // Step 1: Role Selection
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-center mb-8">Choose Your Role</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <button
                  onClick={() => handleRoleSelect("manufacturer")}
                  className="p-8 border-2 border-gray-200 rounded-xl hover:border-accent hover:shadow-lg transition-all"
                >
                  <Building2 className="w-16 h-16 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Manufacturer</h3>
                  <p className="text-sm text-muted-foreground">
                    List your products and connect with buyers
                  </p>
                </button>
                
                <button
                  onClick={() => handleRoleSelect("buyer")}
                  className="p-8 border-2 border-gray-200 rounded-xl hover:border-accent hover:shadow-lg transition-all"
                >
                  <ShoppingCart className="w-16 h-16 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Buyer</h3>
                  <p className="text-sm text-muted-foreground">
                    Search and purchase from manufacturers
                  </p>
                </button>
              </div>
            </div>
          ) : (
            // Step 2: Registration Form
            <div>
              <div className="flex items-center gap-4 mb-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setStep(1)}
                  disabled={loading}
                >
                  ← Back
                </Button>
                <h2 className="text-2xl font-bold">
                  Register as {role === "manufacturer" ? "Manufacturer" : "Buyer"}
                </h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Company Name</label>
                  <Input
                    type="text"
                    placeholder="Your Company Ltd."
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    required
                    disabled={loading}
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      type="email"
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      disabled={loading}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <Input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      disabled={loading}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Address</label>
                  <Input
                    type="text"
                    placeholder="Company address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                    disabled={loading}
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
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
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Confirm Password</label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      required
                      disabled={loading}
                    />
                  </div>
                </div>
                
                <div className="flex items-start">
                  <input type="checkbox" className="mt-1 mr-2" required disabled={loading} />
                  <label className="text-sm text-muted-foreground">
                    I agree to the{" "}
                    <Link to="/terms" className="text-accent hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-accent hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-accent hover:bg-accent/90"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            </div>
          )}
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-accent hover:underline font-medium">
                Sign in here
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

export default Register;