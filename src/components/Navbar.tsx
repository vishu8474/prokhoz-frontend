import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="bg-primary text-primary-foreground py-4 px-6 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          Prokhoz
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link 
            to="/" 
            className={`${isActive('/') ? 'text-accent' : 'hover:text-accent'} transition-colors`}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className={`${isActive('/about') ? 'text-accent' : 'hover:text-accent'} transition-colors`}
          >
            About
          </Link>
          <Link 
            to="/how-it-works" 
            className={`${isActive('/how-it-works') ? 'text-accent' : 'hover:text-accent'} transition-colors`}
          >
            How It Works
          </Link>
          <Link 
            to="/faq" 
            className={`${isActive('/faq') ? 'text-accent' : 'hover:text-accent'} transition-colors`}
          >
            FAQ
          </Link>
          <Link 
            to="/contact" 
            className={`${isActive('/contact') ? 'text-accent' : 'hover:text-accent'} transition-colors`}
          >
            Contact
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="ghost" className="text-primary-foreground hover:text-accent">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="secondary" className="bg-white text-primary hover:bg-secondary">
              Register
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
