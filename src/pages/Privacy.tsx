import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 px-6 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-xl text-gray-300">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </section>
      
      {/* Privacy Content */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl prose prose-lg">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-primary">1. Information We Collect</h2>
              <p className="text-muted-foreground">
                We collect information you provide directly to us, such as when you create an account, update your profile, or communicate with us. This may include your name, email address, company information, and other contact details.
              </p>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-4 text-primary">2. How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send you technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Monitor and analyze trends and usage</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-4 text-primary">3. Information Sharing</h2>
              <p className="text-muted-foreground">
                We do not sell, trade, or otherwise transfer your personal information to outside parties without your consent, except as described in this policy or when we believe release is appropriate to comply with the law.
              </p>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-4 text-primary">4. Data Security</h2>
              <p className="text-muted-foreground">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-4 text-primary">5. Your Rights</h2>
              <p className="text-muted-foreground">
                You have the right to access, correct, or delete your personal information. You can also object to or restrict certain processing of your data. Contact us to exercise these rights.
              </p>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-4 text-primary">6. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact us at privacy@prokhoz.com
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Privacy;