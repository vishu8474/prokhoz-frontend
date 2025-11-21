import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";

const ForgotPassword = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual password reset
    toast({
      title: "Reset Link Sent!",
      description: "Check your email for password reset instructions.",
    });
    setSubmitted(true);
  };
  
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <Link to="/" className="text-4xl font-bold text-white">
            Prokhoz
          </Link>
          <p className="text-gray-300 mt-2">Reset your password</p>
        </div>
        
        {/* Reset Form */}
        <div className="bg-white rounded-xl shadow-2xl p-8">
          {!submitted ? (
            <>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-accent" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Forgot Password?</h2>
                <p className="text-sm text-muted-foreground">
                  Enter your email and we'll send you instructions to reset your password.
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
                  Send Reset Link
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">Check Your Email</h2>
              <p className="text-sm text-muted-foreground mb-6">
                We've sent password reset instructions to <strong>{email}</strong>
              </p>
              <Link to="/login">
                <Button className="bg-accent hover:bg-accent/90">
                  Back to Login
                </Button>
              </Link>
            </div>
          )}
          
          <div className="mt-6 text-center">
            <Link to="/login" className="text-sm text-accent hover:underline">
              ← Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;