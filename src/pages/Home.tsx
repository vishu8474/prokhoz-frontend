import { ArrowRight, Building2, Search, MessageSquare, Shield, Users, HelpCircle, Phone, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 text-white py-20 px-6">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Connect Manufacturers with Industrial Buyers
            </h1>
            <p className="text-xl mb-8 text-blue-100 leading-relaxed">
              PROKHOZ - India's premier B2B manufacturing marketplace. Streamline your supply chain with verified partners and digital procurement solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg font-semibold">
                  Get Started Free <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-6 text-lg font-semibold">
                  See How It Works
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 w-full max-w-md border border-white/20">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/20 rounded-lg p-4 text-center">
                  <Building2 className="w-12 h-12 text-orange-400 mx-auto mb-2" />
                  <p className="text-sm font-semibold">Manufacturers</p>
                </div>
                <div className="bg-white/20 rounded-lg p-4 text-center">
                  <Search className="w-12 h-12 text-green-400 mx-auto mb-2" />
                  <p className="text-sm font-semibold">Buyers</p>
                </div>
                <div className="bg-white/20 rounded-lg p-4 text-center">
                  <MessageSquare className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                  <p className="text-sm font-semibold">Direct Chat</p>
                </div>
                <div className="bg-white/20 rounded-lg p-4 text-center">
                  <Shield className="w-12 h-12 text-purple-400 mx-auto mb-2" />
                  <p className="text-sm font-semibold">Verified</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose PROKHOZ?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Streamline your manufacturing supply chain with our comprehensive platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-center text-gray-900">For Manufacturers</h3>
              <ul className="text-gray-600 space-y-3">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  Showcase your products to thousands of buyers
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  Manage inquiries efficiently
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  Grow your business with analytics
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Search className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-center text-gray-900">For Buyers</h3>
              <ul className="text-gray-600 space-y-3">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                  Find verified manufacturers easily
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                  Compare prices and quality
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                  Streamlined procurement process
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-center text-gray-900">Trust & Security</h3>
              <ul className="text-gray-600 space-y-3">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                  Verified company profiles
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                  Secure communication
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                  Quality assurance
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How PROKHOZ Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple steps to transform your manufacturing supply chain
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Register</h3>
              <p className="text-gray-600">Create your company profile as manufacturer or buyer</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Connect</h3>
              <p className="text-gray-600">Manufacturers list products, buyers discover suppliers</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Communicate</h3>
              <p className="text-gray-600">Send inquiries and negotiate directly</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Transact</h3>
              <p className="text-gray-600">Close deals and grow your business</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/how-it-works">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3">
                Learn More About Our Process
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <Link to="/about" className="group">
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all group-hover:border-blue-500 border-2 border-transparent">
                <Users className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-gray-900">About Us</h3>
                <p className="text-gray-600 mb-4">Learn about our mission to transform manufacturing supply chains</p>
                <span className="text-blue-600 font-semibold group-hover:underline">Learn more →</span>
              </div>
            </Link>
            
            <Link to="/faq" className="group">
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all group-hover:border-green-500 border-2 border-transparent">
                <HelpCircle className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-gray-900">FAQ</h3>
                <p className="text-gray-600 mb-4">Find answers to common questions about our platform</p>
                <span className="text-green-600 font-semibold group-hover:underline">View FAQs →</span>
              </div>
            </Link>
            
            <Link to="/contact" className="group">
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all group-hover:border-orange-500 border-2 border-transparent">
                <Phone className="w-12 h-12 text-orange-600 mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Contact</h3>
                <p className="text-gray-600 mb-4">Get in touch with our support team for assistance</p>
                <span className="text-orange-600 font-semibold group-hover:underline">Contact us →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Legal Section */}
      <section className="py-12 px-6 bg-white border-t">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-8">
            <Link to="/terms" className="group flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
              <FileText className="w-4 h-4" />
              <span className="group-hover:underline">Terms of Service</span>
            </Link>
            <Link to="/privacy" className="group flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
              <Shield className="w-4 h-4" />
              <span className="group-hover:underline">Privacy Policy</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Supply Chain?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Join thousands of manufacturers and buyers already using PROKHOZ to streamline their operations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register?role=manufacturer">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold">
                Join as Manufacturer
              </Button>
            </Link>
            <Link to="/register?role=buyer">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg font-semibold">
                Join as Buyer
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-blue-200">
            Already have an account? <Link to="/login" className="text-white font-semibold hover:underline">Sign in here</Link>
          </p>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Home;