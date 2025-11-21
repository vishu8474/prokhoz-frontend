import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12 px-6 mt-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Prokhoz</h3>
            <p className="text-sm text-muted-foreground">
              Connecting manufacturers with buyers for seamless supply chain management.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-accent transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link to="/how-it-works" className="hover:text-accent transition-colors">How It Works</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/faq" className="hover:text-accent transition-colors">FAQ</Link></li>
              <li><Link to="/terms" className="hover:text-accent transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Get Started</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/register" className="hover:text-accent transition-colors">Register</Link></li>
              <li><Link to="/login" className="hover:text-accent transition-colors">Login</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-secondary pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Prokhoz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
