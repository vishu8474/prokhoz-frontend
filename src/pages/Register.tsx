// frontend/src/pages/Register.tsx
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
      console.log('🟡 REGISTER - Starting registration process...');
      
      const userData = {
        companyName: formData.companyName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        address: formData.address,
        role: role
      };
      
      // ✅ CALL REGISTER AND GET USER DATA
      const newUser = await register(userData);
      console.log('🟢 REGISTER - Received user data:', newUser);
      
      toast({
        title: "Registration Successful!",
        description: "Your account has been created successfully.",
      });

      // ✅ FIXED: Proper role-based redirect after registration
      if (role === 'manufacturer') {
        console.log('🟢 REGISTER - User registered as manufacturer, redirecting to manufacturer dashboard');
        navigate('/manufacturer/dashboard', { replace: true });
      } else if (role === 'buyer') {
        console.log('🟢 REGISTER - User registered as buyer, redirecting to buyer dashboard');
        navigate('/buyer-dashboard', { replace: true });
      } else {
        console.log('🟡 REGISTER - No role selected, redirecting to home');
        navigate('/', { replace: true });
      }
      
    } catch (error: any) {
      console.error('🔴 REGISTER - Error:', error);
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
        <div className="text-center mb-8">
          <Link to="/" className="text-4xl font-bold text-white">
            Prokhoz
          </Link>
          <p className="text-gray-300 mt-2">Create your account</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-2xl p-8">
          {step === 1 ? (
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
                    I agree to the Terms of Service and Privacy Policy
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
      </div>
    </div>
  );
};

export default Register;