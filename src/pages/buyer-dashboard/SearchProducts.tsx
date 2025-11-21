// frontend/src/pages/buyer-dashboard/SearchProducts.tsx
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, MapPin, Star, Loader } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
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
  specifications: Map<string, string>;
  status: string;
  createdAt: string;
  isSaved?: boolean;
}

export default function SearchProducts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingProduct, setSavingProduct] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchQuery, category, products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getProducts();
      const productsData = response.data.products || [];
      
      // Initialize saved state
      const productsWithSaveState = productsData.map(product => ({
        ...product,
        isSaved: false // Start with unsaved, in real app check from user's saved items
      }));
      
      setProducts(productsWithSaveState);
    } catch (error: any) {
      console.error('Error fetching products:', error);
      toast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.manufacturer.companyName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (category !== "all") {
      filtered = filtered.filter(product =>
        product.category.toLowerCase() === category.toLowerCase()
      );
    }

    setFilteredProducts(filtered);
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

  const handleSaveProduct = async (productId: string) => {
    try {
      setSavingProduct(productId);
      
      // Find the current product state
      const currentProduct = products.find(p => p._id === productId);
      if (!currentProduct) return;
      
      const newSavedState = !currentProduct.isSaved;
      const action = newSavedState ? 'added to' : 'removed from';
      
      // Update the state
      setProducts(prevProducts => 
        prevProducts.map(product => 
          product._id === productId 
            ? { ...product, isSaved: newSavedState }
            : product
        )
      );

    toast.success(`Product ${action} saved items!`);
      
    } catch (error: any) {
      toast.error("Failed to save product");
    } finally {
      setSavingProduct(null);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Search Products</h1>
          <p className="text-muted-foreground mt-1">Find the perfect suppliers for your material needs</p>
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
        <h1 className="text-3xl font-bold text-foreground">Search Products</h1>
        <p className="text-muted-foreground mt-1">Find the perfect suppliers for your material needs</p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by product name, description, or supplier..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full md:w-[200px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="construction">Construction</SelectItem>
                <SelectItem value="metal">Metal</SelectItem>
                <SelectItem value="electrical">Electrical</SelectItem>
                <SelectItem value="plumbing">Plumbing</SelectItem>
                <SelectItem value="raw-material">Raw Material</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        <div className="grid gap-4">
          {filteredProducts.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Search className="w-12 h-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium text-foreground mb-2">No products found</p>
                <p className="text-muted-foreground">
                  {products.length === 0 ? "No products available yet" : "Try adjusting your search criteria"}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredProducts.map((product) => (
              <Card key={product._id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-xl">{product.manufacturer.companyName}</CardTitle>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Verified
                        </Badge>
                      </div>
                      <CardDescription className="text-base">{product.title}</CardDescription>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="shrink-0"
                      onClick={() => handleSaveProduct(product._id)}
                      disabled={savingProduct === product._id}
                    >
                      {savingProduct === product._id ? (
                        <Loader className="w-5 h-5 animate-spin" />
                      ) : (
                        <Star className={`w-5 h-5 ${product.isSaved ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{getLocationFromAddress(product.manufacturer.address)}</span>
                      </div>
                      <Badge variant="outline" className="capitalize">{product.category}</Badge>
                      <div className="flex items-center gap-1">
                        <span className="font-medium text-muted-foreground">Stock:</span>
                        <span>{product.quantity} {product.unit}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div>
                        <p className="text-sm text-muted-foreground">Price per {product.unit}</p>
                        <p className="text-xl font-bold text-primary">{formatPrice(product.price)}</p>
                      </div>
                      <Button 
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => navigate(`/buyer-dashboard/requests?productId=${product._id}`)}
                      >
                        Request Quote
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}