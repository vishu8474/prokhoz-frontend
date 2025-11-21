// frontend/src/pages/buyer-dashboard/SavedItems.tsx
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Eye, Trash2, Package, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { productsAPI } from "@/services/api";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
  unit: string;
  manufacturer: {
    _id: string;
    companyName: string;
    address?: string;
    phone: string;
    email: string;
  };
  images: Array<{ url: string }>;
  status: string;
  createdAt: string;
  isSaved?: boolean; // For frontend saved state
}

export default function SavedItems() {
  const navigate = useNavigate();
  const [savedProducts, setSavedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSavedProducts();
  }, []);

  const fetchSavedProducts = async () => {
    try {
      setLoading(true);
      // For now, we'll get all products and mark some as saved
      // In a real app, you'd have a separate saved items API
      const response = await productsAPI.getProducts();
      const products = response.data.products || [];
      
      // Mark first few products as saved for demo
      const saved = products.slice(0, 3).map(product => ({
        ...product,
        isSaved: true,
        savedDate: getRandomSavedDate()
      }));
      
      setSavedProducts(saved);
      
    } catch (error: any) {
      console.error('Error fetching saved products:', error);
      toast.error("Failed to load saved items");
    } finally {
      setLoading(false);
    }
  };

  const getRandomSavedDate = () => {
    const days = [1, 2, 3, 7, 14];
    const randomDay = days[Math.floor(Math.random() * days.length)];
    return `${randomDay} ${randomDay === 1 ? 'day' : 'days'} ago`;
  };

  const handleRemove = async (productId: string, productName: string) => {
    try {
      // In a real app, you'd call an API to remove from saved items
      setSavedProducts(prev => prev.filter(product => product._id !== productId));
      toast.success(`${productName} removed from saved items`);
    } catch (error: any) {
      toast.error("Failed to remove item");
    }
  };

  const handleSaveProduct = async (productId: string) => {
    try {
      // In a real app, you'd call an API to save the product
      toast.success("Product saved successfully!");
    } catch (error: any) {
      toast.error("Failed to save product");
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const getLocationFromAddress = (address: string | undefined) => {
    if (!address) return "Location not specified";
    try {
      const parts = address.split(',');
      return parts.length > 1 ? `${parts[parts.length - 2]?.trim()}, ${parts[parts.length - 1]?.trim()}` : address;
    } catch (error) {
      return address;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Saved Items</h1>
          <p className="text-muted-foreground mt-1">Loading your saved items...</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader className="w-8 h-8 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Saved Items</h1>
        <p className="text-muted-foreground mt-1">
          Your bookmarked suppliers and products ({savedProducts.length} items)
        </p>
      </div>

      {savedProducts.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Star className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium text-foreground mb-2">No saved items yet</p>
            <p className="text-muted-foreground mb-4">Start exploring and save suppliers you like</p>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => navigate("/buyer-dashboard/search")}
            >
              Browse Products
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {savedProducts.map((product) => (
            <Card key={product._id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-xl">{product.manufacturer.companyName}</CardTitle>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        Saved
                      </Badge>
                    </div>
                    <CardDescription className="text-base">{product.title}</CardDescription>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{getLocationFromAddress(product.manufacturer.address)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">4.5</span>
                    </div>
                    <Badge variant="outline">{product.category}</Badge>
                    <span className="text-muted-foreground text-xs">
                      Saved {(product as any).savedDate || "recently"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div>
                      <p className="text-sm text-muted-foreground">Price per {product.unit}</p>
                      <p className="text-xl font-bold text-primary">{formatPrice(product.price)}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemove(product._id, product.title)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove
                      </Button>
                      <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        size="sm"
                        onClick={() => navigate(`/buyer-dashboard/requests?productId=${product._id}`)}
                      >
                        Request Quote
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}