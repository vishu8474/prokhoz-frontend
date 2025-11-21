import { UserPlus, Search, MessageSquare, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 px-6 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">How It Works</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Getting started with Prokhoz is simple. Follow these easy steps to connect with the right partners.
          </p>
        </div>
      </section>
      
      {/* For Manufacturers */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-primary">For Manufacturers</h2>
          
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mb-6 mx-auto">
                <UserPlus className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">1. Register</h3>
              <p className="text-muted-foreground">
                Create your manufacturer account with company details
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">2. List Products</h3>
              <p className="text-muted-foreground">
                Upload your product catalog with details and pricing
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mb-6 mx-auto">
                <MessageSquare className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">3. Receive Inquiries</h3>
              <p className="text-muted-foreground">
                Get requests from interested buyers
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mb-6 mx-auto">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">4. Close Deals</h3>
              <p className="text-muted-foreground">
                Communicate directly and finalize orders
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/register?role=manufacturer">
              <Button className="bg-accent hover:bg-accent/90 text-white px-8 py-4 text-lg">
                Join as Manufacturer
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* For Buyers */}
      <section className="py-20 px-6 bg-secondary">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-primary">For Buyers</h2>
          
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mb-6 mx-auto">
                <UserPlus className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">1. Register</h3>
              <p className="text-muted-foreground">
                Create your buyer account with business information
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mb-6 mx-auto">
                <Search className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">2. Search Products</h3>
              <p className="text-muted-foreground">
                Browse through verified manufacturer listings
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mb-6 mx-auto">
                <MessageSquare className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">3. Send Inquiries</h3>
              <p className="text-muted-foreground">
                Contact manufacturers with your requirements
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mb-6 mx-auto">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">4. Purchase</h3>
              <p className="text-muted-foreground">
                Negotiate and complete your order
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/register?role=buyer">
              <Button className="bg-accent hover:bg-accent/90 text-white px-8 py-4 text-lg">
                Join as Buyer
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default HowItWorks;