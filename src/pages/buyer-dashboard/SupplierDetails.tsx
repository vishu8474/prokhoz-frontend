import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Star, Phone, Mail, Globe, MessageSquare, Package } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const mockSupplierData = {
  1: {
    name: "Global Steel Industries",
    product: "High-Grade Steel Sheets",
    category: "Steel",
    location: "Mumbai, India",
    price: "$450/ton",
    rating: 4.5,
    verified: true,
    description: "Leading manufacturer of high-quality steel products with over 20 years of experience in the industry. We specialize in providing premium steel sheets for construction and industrial applications.",
    specifications: [
      { label: "Material Grade", value: "SS 304, SS 316" },
      { label: "Thickness Range", value: "0.5mm - 25mm" },
      { label: "Width", value: "1000mm - 2000mm" },
      { label: "Finish", value: "2B, BA, Mirror" },
    ],
    contact: {
      phone: "+91 98765 43210",
      email: "sales@globalsteel.com",
      website: "www.globalsteel.com",
    },
    certifications: ["ISO 9001:2015", "ISO 14001", "OHSAS 18001"],
    minOrder: "10 tons",
    deliveryTime: "15-20 days",
  },
};

export default function SupplierDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const supplierId = id && id in mockSupplierData ? Number(id) as keyof typeof mockSupplierData : 1;
  const supplier = mockSupplierData[supplierId];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">{supplier.name}</h1>
          <p className="text-muted-foreground mt-1">{supplier.product}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overview Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Company Overview</CardTitle>
                {supplier.verified && (
                  <Badge className="bg-secondary text-secondary-foreground">Verified Supplier</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground">{supplier.description}</p>
              <div className="flex flex-wrap gap-4 text-sm pt-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{supplier.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="font-medium">{supplier.rating} Rating</span>
                </div>
                <Badge variant="outline">{supplier.category}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Product Specifications */}
          <Card>
            <CardHeader>
              <CardTitle>Product Specifications</CardTitle>
              <CardDescription>Detailed specifications and features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {supplier.specifications.map((spec, index) => (
                  <div key={index} className="flex justify-between py-2 border-b last:border-0">
                    <span className="text-muted-foreground">{spec.label}</span>
                    <span className="font-medium text-foreground">{spec.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card>
            <CardHeader>
              <CardTitle>Certifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {supplier.certifications.map((cert, index) => (
                  <Badge key={index} variant="secondary">
                    {cert}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pricing Card */}
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle>Pricing Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Price per ton</p>
                <p className="text-3xl font-bold text-primary">{supplier.price}</p>
              </div>
              <Separator />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Minimum Order:</span>
                  <span className="font-medium">{supplier.minOrder}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Time:</span>
                  <span className="font-medium">{supplier.deliveryTime}</span>
                </div>
              </div>
              <div className="space-y-2 pt-2">
                <Button 
                  className="w-full" 
                  variant="dashboard"
                  onClick={() => navigate("/buyer-dashboard/requests")}
                >
                  <Package className="w-4 h-4 mr-2" />
                  Request Quote
                </Button>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => navigate("/buyer-dashboard/messages")}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Contact Card */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium text-foreground break-all">{supplier.contact.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-foreground break-all">{supplier.contact.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground">Website</p>
                  <p className="font-medium text-primary break-all">{supplier.contact.website}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
