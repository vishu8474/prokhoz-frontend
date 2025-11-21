
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package, Send, Loader } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router-dom";
import { inquiriesAPI, productsAPI } from "@/services/api";

interface Product {
  _id: string;
  title: string;
  manufacturer: {
    _id: string;
    companyName: string;
  };
}

export default function RequestMaterial() {
  const [formData, setFormData] = useState({
    productId: "",
    message: "",
    quantity: "",
    budget: "",
    deadline: ""
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [productsLoading, setProductsLoading] = useState(true);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    // If productId is provided in URL, set it in form
    const productId = searchParams.get('productId');
    if (productId) {
      setFormData(prev => ({ ...prev, productId }));
    }
  }, [searchParams]);

  const fetchProducts = async () => {
    try {
      setProductsLoading(true);
      const response = await productsAPI.getProducts();
      setProducts(response.data.products || []);
    } catch (error: any) {
      console.error('Error fetching products:', error);
      toast.error("Failed to load products");
    } finally {
      setProductsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const inquiryData = {
        productId: formData.productId,
        message: formData.message,
        quantity: parseInt(formData.quantity),
        budget: formData.budget ? parseFloat(formData.budget) : undefined,
        deadline: formData.deadline || undefined
      };

      await inquiriesAPI.createInquiry(inquiryData);
      
      toast.success("Request submitted successfully! Suppliers will contact you soon.");
      
      // Reset form
      setFormData({
        productId: "",
        message: "",
        quantity: "",
        budget: "",
        deadline: ""
      });

      // Navigate to messages or dashboard
      setTimeout(() => {
        navigate("/buyer-dashboard/messages");
      }, 2000);

    } catch (error: any) {
      console.error('Error creating inquiry:', error);
      toast.error(error.response?.data?.message || "Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  const selectedProduct = products.find(p => p._id === formData.productId);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Request Material</h1>
        <p className="text-muted-foreground mt-1">Send your requirements to suppliers</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                <CardTitle>Material Request Form</CardTitle>
              </div>
              <CardDescription>Fill in the details of the material you need</CardDescription>
            </CardHeader>
            <CardContent>
              {productsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader className="w-6 h-6 animate-spin" />
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="productId">Select Product *</Label>
                    <Select
                      value={formData.productId}
                      onValueChange={(value) => setFormData({ ...formData, productId: value })}
                    >
                      <SelectTrigger id="productId">
                        <SelectValue placeholder="Choose a product" />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map((product) => (
                          <SelectItem key={product._id} value={product._id}>
                            {product.title} - {product.manufacturer.companyName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {selectedProduct && (
                      <p className="text-sm text-muted-foreground">
                        Manufacturer: {selectedProduct.manufacturer.companyName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity *</Label>
                    <Input
                      id="quantity"
                      type="number"
                      placeholder="e.g., 100"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      required
                      min="1"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell the supplier about your requirements, specifications, quality standards, delivery expectations, etc."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={5}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="budget">Target Budget (₹)</Label>
                      <Input
                        id="budget"
                        type="number"
                        placeholder="e.g., 50000"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="deadline">Required By Date</Label>
                      <Input
                        id="deadline"
                        type="date"
                        value={formData.deadline}
                        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button 
                      type="submit" 
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                      disabled={loading || !formData.productId || !formData.message || !formData.quantity}
                    >
                      {loading ? (
                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4 mr-2" />
                      )}
                      {loading ? "Submitting..." : "Submit Request"}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      disabled={loading}
                      onClick={() => navigate('/buyer-dashboard/search')}
                    >
                      Browse Products
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-lg">Request Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <h4 className="font-medium text-foreground mb-1">Be Specific</h4>
                <p className="text-muted-foreground">
                  Include exact specifications, grades, and quality requirements
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-1">Mention Quantity</h4>
                <p className="text-muted-foreground">
                  Clear quantities help suppliers provide accurate quotes
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-1">Delivery Details</h4>
                <p className="text-muted-foreground">
                  Include preferred delivery timeline and location
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What Happens Next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>1. Your request is sent to the product manufacturer</p>
              <p>2. Manufacturer reviews and sends quotes</p>
              <p>3. You receive notifications for responses</p>
              <p>4. Compare quotes and contact suppliers</p>
              <p>5. Negotiate and finalize the order</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
