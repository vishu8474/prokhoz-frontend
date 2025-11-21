import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Building2, Upload, AlertTriangle, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { usersAPI } from "@/services/api";
import { useAuth } from "@/services/authContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Settings() {
  const { toast } = useToast();
  const { user, updateUser, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  
  const [profileData, setProfileData] = useState({
    companyName: "",
    email: "",
    phone: "",
    address: "",
    industry: "",
    description: "",
    website: ""
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [deletePassword, setDeletePassword] = useState("");

  useEffect(() => {
    if (user) {
      console.log('🟡 Settings loaded user:', user);
      setProfileData({
        companyName: user.companyName || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        industry: user.industry || "",
        description: user.description || "",
        website: user.website || ""
      });
      
      // Set logo preview if user has avatar
      if (user.avatar && user.avatar !== 'default-avatar.jpg') {
        setLogoPreview(user.avatar);
      }
    }
  }, [user]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB",
        variant: "destructive"
      });
      return;
    }

    setLogoFile(file);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setLogoPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    setLogoPreview(null);
    setLogoFile(null);
    if (logoInputRef.current) {
      logoInputRef.current.value = '';
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('🟡 Sending update with:', profileData);
      
      const response = await usersAPI.updateProfile(profileData);
      const updatedUser = response.data.user;
      
      console.log('🟢 Backend response:', updatedUser);
      
      // ✅ UPDATE AUTH CONTEXT AND LOCALSTORAGE
      updateUser(updatedUser);
      
      console.log('🟢 Auth context updated, checking localStorage...');
      const storedUser = localStorage.getItem('user');
      console.log('🟢 Current localStorage:', storedUser);
      
      toast({
        title: "Profile Updated!",
        description: "Your company profile has been updated successfully.",
      });

    } catch (error: any) {
      console.error('🔴 Profile update error:', error);
      toast({
        title: "Update Failed",
        description: error.response?.data?.message || "Failed to update profile",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive"
      });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      await usersAPI.updatePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      
      toast({
        title: "Password Updated!",
        description: "Your password has been changed successfully.",
      });

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
      
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.response?.data?.message || "Failed to update password",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      toast({
        title: "Error",
        description: "Please enter your password to confirm account deletion",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      await usersAPI.deleteAccount({ password: deletePassword });
      
      toast({
        title: "Account Deleted",
        description: "Your account has been permanently deleted.",
      });

      // Logout and redirect
      setTimeout(() => {
        logout();
      }, 2000);
      
    } catch (error: any) {
      toast({
        title: "Deletion Failed",
        description: error.response?.data?.message || "Failed to delete account",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
      setDeletePassword("");
    }
  };

  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Settings</h2>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Company Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>Update your company details and logo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Logo Upload Section */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  {logoPreview ? (
                    <div className="h-24 w-24 rounded-lg overflow-hidden border">
                      <img 
                        src={logoPreview} 
                        alt="Company logo" 
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-24 w-24 rounded-lg bg-muted flex items-center justify-center">
                      <Building2 className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                  <input
                    type="file"
                    ref={logoInputRef}
                    onChange={handleLogoUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
                <div>
                  <Button 
                    variant="outline" 
                    className="gap-2" 
                    onClick={() => logoInputRef.current?.click()}
                    disabled={loading}
                  >
                    <Upload className="h-4 w-4" />
                    {logoPreview ? "Change Logo" : "Upload Logo"}
                  </Button>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Recommended: 200x200px, PNG/JPG
                  </p>
                  {logoPreview && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="mt-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={removeLogo}
                      disabled={loading}
                    >
                      Remove Logo
                    </Button>
                  )}
                </div>
              </div>

              <form onSubmit={handleProfileUpdate}>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input 
                      id="companyName" 
                      value={profileData.companyName}
                      onChange={(e) => handleProfileChange("companyName", e.target.value)}
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Input 
                      id="industry" 
                      value={profileData.industry}
                      onChange={(e) => handleProfileChange("industry", e.target.value)}
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <Label htmlFor="description">Company Description</Label>
                  <Textarea
                    id="description"
                    rows={4}
                    value={profileData.description}
                    onChange={(e) => handleProfileChange("description", e.target.value)}
                    disabled={loading}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Contact Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={profileData.email}
                      onChange={(e) => handleProfileChange("email", e.target.value)}
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      value={profileData.phone}
                      onChange={(e) => handleProfileChange("phone", e.target.value)}
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <Label htmlFor="address">Address</Label>
                  <Input 
                    id="address" 
                    value={profileData.address}
                    onChange={(e) => handleProfileChange("address", e.target.value)}
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2 mt-4">
                  <Label htmlFor="website">Website</Label>
                  <Input 
                    id="website" 
                    type="url" 
                    value={profileData.website}
                    onChange={(e) => handleProfileChange("website", e.target.value)}
                    disabled={loading}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="mt-6 bg-blue-600 hover:bg-blue-700"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your account password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handlePasswordUpdate}>
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input 
                    id="currentPassword" 
                    type="password" 
                    value={passwordData.currentPassword}
                    onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input 
                    id="newPassword" 
                    type="password" 
                    value={passwordData.newPassword}
                    onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                    disabled={loading}
                    required
                    minLength={6}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password" 
                    value={passwordData.confirmPassword}
                    onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>

                <Button 
                  type="submit"
                  className="mt-4 bg-blue-600 hover:bg-blue-700"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Password"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-destructive flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Danger Zone
              </CardTitle>
              <CardDescription>Permanent actions that cannot be undone</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Once you delete your account, all your data including products, inquiries, and messages will be permanently removed.
                  </p>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" disabled={loading}>
                        Delete Account
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your account
                          and remove all your data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <div className="space-y-2">
                        <Label htmlFor="deletePassword">Enter your password to confirm</Label>
                        <Input 
                          id="deletePassword"
                          type="password" 
                          value={deletePassword}
                          onChange={(e) => setDeletePassword(e.target.value)}
                          placeholder="Enter your password"
                          disabled={loading}
                        />
                      </div>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setDeletePassword("")}>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={handleDeleteAccount}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          disabled={!deletePassword || loading}
                        >
                          {loading ? "Deleting..." : "Delete Account"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose what notifications you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emailInquiries">Email Inquiries</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email notifications for new inquiries
                  </p>
                </div>
                <Switch id="emailInquiries" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emailMessages">Email Messages</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email notifications for new messages
                  </p>
                </div>
                <Switch id="emailMessages" defaultChecked />
              </div>

              <Button className="bg-blue-600 hover:bg-blue-700">
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}