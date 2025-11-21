import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { productsAPI } from "@/services/api";

export default function AddProduct() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    unit: "",
    minOrder: "",
    leadTime: ""
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages = Array.from(files);
    const totalImages = images.length + newImages.length;
    
    if (totalImages > 5) {
      toast({
        title: "Too many images",
        description: "You can upload maximum 5 images",
        variant: "destructive"
      });
      return;
    }

    setImages(prev => [...prev, ...newImages]);
    
    // Create preview URLs
    newImages.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviews(prev => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productData = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        quantity: parseInt(formData.quantity),
        unit: formData.unit,
        specifications: {
          minOrder: formData.minOrder,
          leadTime: formData.leadTime
        },
        images: images // This will need backend handling for file upload
      };

      await productsAPI.createProduct(productData);
      
      toast({
        title: "Product Created!",
        description: "Your product has been listed successfully.",
      });

      navigate("/manufacturer/products");
      
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create product",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Add New Product</h2>
        <p className="text-muted-foreground">Create a new product listing</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Information</CardTitle>
          <CardDescription>Enter the details of your product</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Product Name *</Label>
                <Input 
                  id="title" 
                  placeholder="e.g., Steel Rods, Copper Wire" 
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => handleChange("category", value)}
                  disabled={loading}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="construction">Construction Materials</SelectItem>
                    <SelectItem value="metal">Metal Products</SelectItem>
                    <SelectItem value="electrical">Electrical Components</SelectItem>
                    <SelectItem value="plumbing">Plumbing Materials</SelectItem>
                    <SelectItem value="raw-material">Raw Materials</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Product Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe your product features, specifications, quality standards..."
                rows={4}
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity Available *</Label>
                <Input 
                  id="quantity" 
                  type="number" 
                  placeholder="e.g., 500" 
                  value={formData.quantity}
                  onChange={(e) => handleChange("quantity", e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="unit">Unit *</Label>
                <Select 
                  value={formData.unit} 
                  onValueChange={(value) => handleChange("unit", value)}
                  disabled={loading}
                >
                  <SelectTrigger id="unit">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tons">Tons</SelectItem>
                    <SelectItem value="kg">Kilograms</SelectItem>
                    <SelectItem value="units">Units</SelectItem>
                    <SelectItem value="meters">Meters</SelectItem>
                    <SelectItem value="sheets">Sheets</SelectItem>
                    <SelectItem value="rolls">Rolls</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price per Unit *</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    ₹
                  </span>
                  <Input 
                    id="price" 
                    type="number" 
                    placeholder="1200" 
                    value={formData.price}
                    onChange={(e) => handleChange("price", e.target.value)}
                    required
                    disabled={loading}
                    className="pl-8"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Price in Indian Rupees</p>
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="space-y-4">
              <Label htmlFor="images">Product Images</Label>
              
              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={preview} 
                        alt={`Product preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Upload Area */}
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  multiple
                  accept="image/*"
                  className="hidden"
                />
                <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-sm font-medium text-gray-900 mb-2">
                  Upload Product Images
                </p>
                <p className="text-xs text-gray-500">
                  Drag & drop or click to upload
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG up to 5MB each (max 5 images)
                </p>
                <p className="text-xs text-blue-600 mt-2">
                  {images.length}/5 images selected
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="minOrder">Minimum Order Quantity</Label>
                <Input 
                  id="minOrder" 
                  type="number" 
                  placeholder="e.g., 10" 
                  value={formData.minOrder}
                  onChange={(e) => handleChange("minOrder", e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="leadTime">Lead Time (days)</Label>
                <Input 
                  id="leadTime" 
                  type="number" 
                  placeholder="e.g., 7" 
                  value={formData.leadTime}
                  onChange={(e) => handleChange("leadTime", e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? "Publishing..." : "Publish Product"}
              </Button>
              <Button type="button" variant="outline" disabled={loading}>
                Save as Draft
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}