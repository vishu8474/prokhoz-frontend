import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 px-6 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Terms of Service</h1>
          <p className="text-xl text-gray-300">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </section>
      
      {/* Terms Content */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl prose prose-lg">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-primary">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using Prokhoz, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our services.
              </p>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-4 text-primary">2. Use License</h2>
              <p className="text-muted-foreground mb-4">
                Permission is granted to temporarily use Prokhoz for personal or commercial purposes. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose without authorization</li>
                <li>Attempt to decompile or reverse engineer any software contained on Prokhoz</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-4 text-primary">3. User Accounts</h2>
              <p className="text-muted-foreground">
                When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
              </p>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-4 text-primary">4. Prohibited Activities</h2>
              <p className="text-muted-foreground mb-4">
                You may not access or use the site for any purpose other than that for which we make the site available. Prohibited activities include:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Posting false, inaccurate, or misleading information</li>
                <li>Impersonating another person or entity</li>
                <li>Uploading viruses or malicious code</li>
                <li>Harassing, threatening, or intimidating other users</li>
                <li>Engaging in any fraudulent activities</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-4 text-primary">5. Intellectual Property</h2>
              <p className="text-muted-foreground">
                The service and its original content, features, and functionality are and will remain the exclusive property of Prokhoz and its licensors. The service is protected by copyright, trademark, and other laws.
              </p>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-4 text-primary">6. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                In no event shall Prokhoz, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.
              </p>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-4 text-primary">7. Governing Law</h2>
              <p className="text-muted-foreground">
                These terms shall be governed and construed in accordance with applicable laws, without regard to its conflict of law provisions.
              </p>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-4 text-primary">8. Changes to Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify or replace these terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect.
              </p>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-4 text-primary">9. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about these Terms, please contact us at legal@prokhoz.com
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Terms;