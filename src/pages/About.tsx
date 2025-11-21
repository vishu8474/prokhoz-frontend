import { Target, Users, Award, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 px-6 bg-secondary">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 text-primary">About Us</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Prokhoz is a leading platform for sourcing raw materials, connecting manufacturers with buyers in the manufacturing industry.
          </p>
        </div>
      </section>
      
      {/* Core Values Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-primary">Our Core Values</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-card rounded-xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Transparency</h3>
              <p className="text-muted-foreground">
                Clear communication and honest dealings in every transaction.
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Partnership</h3>
              <p className="text-muted-foreground">
                Building lasting relationships between manufacturers and buyers.
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Quality</h3>
              <p className="text-muted-foreground">
                Ensuring the highest standards in products and services.
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Innovation</h3>
              <p className="text-muted-foreground">
                Continuously improving our platform and services.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="py-20 px-6 bg-secondary">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold mb-8 text-primary text-center">Our Mission</h2>
          <p className="text-lg text-muted-foreground mb-6">
            At Prokhoz, we believe in simplifying the supply chain process by creating a seamless platform where manufacturers can showcase their products and buyers can find exactly what they need.
          </p>
          <p className="text-lg text-muted-foreground">
            Our goal is to eliminate inefficiencies in the sourcing process, reduce transaction costs, and build a trusted community of verified manufacturers and buyers who can grow their businesses together.
          </p>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;