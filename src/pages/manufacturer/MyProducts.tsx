import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye, Plus, Package } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { productsAPI } from "@/services/api";

interface Product {
  _id: string;
  title: string;
  category: string;
  quantity: number;
  unit: string;
  price: number;
  status: string;
  description: string;
  createdAt: string;
}

export default function MyProducts() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getMyProducts();
      setProducts(response.data.products || []);
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

  const handleDelete = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    
    try {
      // You'll need to add a delete endpoint in your backend
      // await productsAPI.deleteProduct(productId);
      toast({
        title: "Product Deleted",
        description: "Product has been removed successfully",
      });
      fetchProducts(); // Refresh the list
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: { [key: string]: { variant: "default" | "secondary", className: string } } = {
      'available': { variant: "default", className: "bg-green-500 text-white" },
      'out-of-stock': { variant: "secondary", className: "bg-red-500 text-white" },
      'discontinued': { variant: "secondary", className: "bg-gray-500 text-white" }
    };

    const config = statusConfig[status] || { variant: "default", className: "bg-primary text-primary-foreground" };
    
    return (
      <Badge variant={config.variant} className={config.className}>
        {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">My Products</h2>
            <p className="text-muted-foreground">Manage your product listings</p>
          </div>
          <Button 
            className="bg-accent text-accent-foreground hover:bg-accent/90"
            onClick={() => navigate("/manufacturer/add-product")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Product
          </Button>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">Loading products...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">My Products</h2>
          <p className="text-muted-foreground">
            {products.length} product{products.length !== 1 ? 's' : ''} listed
          </p>
        </div>
        <Button 
          className="bg-accent text-accent-foreground hover:bg-accent/90"
          onClick={() => navigate("/manufacturer/add-product")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Product
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Listings</CardTitle>
        </CardHeader>
        <CardContent>
          {products.length === 0 ? (
            <div className="text-center py-8">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No products yet</h3>
              <p className="text-muted-foreground mb-4">
                Start by adding your first product to get discovered by buyers.
              </p>
              <Button 
                onClick={() => navigate("/manufacturer/add-product")}
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Product
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Added On</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell className="font-medium">{product.title}</TableCell>
                    <TableCell className="capitalize">{product.category}</TableCell>
                    <TableCell>{product.quantity} {product.unit}</TableCell>
                    <TableCell>${product.price}/{product.unit}</TableCell>
                    <TableCell>
                      {getStatusBadge(product.status)}
                    </TableCell>
                    <TableCell>
                      {new Date(product.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-destructive"
                          onClick={() => handleDelete(product._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}