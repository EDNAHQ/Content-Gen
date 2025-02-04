import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export default function AppAccount() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setEmail(user.email || "");
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };

    getProfile();
  }, []);

  const handleUpdateEmail = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({ email });
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Email update request sent. Please check your inbox.",
      });
    } catch (error) {
      console.error("Error updating email:", error);
      toast({
        title: "Error",
        description: "Failed to update email",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-24">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-8">Account Settings</h1>
        
        <div className="space-y-6 bg-white p-6 rounded-lg shadow">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="flex gap-4">
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
              />
              <Button 
                onClick={handleUpdateEmail}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Update Email"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}