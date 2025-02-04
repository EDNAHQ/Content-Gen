import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tables } from "@/integrations/supabase/types";
import { useToast } from "@/hooks/use-toast";

type Account = Tables<"accounts">;

interface CreateAccountFormProps {
  onSubmit: (accountData: Omit<Account, "id" | "created_at" | "updated_at">) => Promise<void>;
}

export function CreateAccountForm({ onSubmit }: CreateAccountFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newAccount, setNewAccount] = useState<Partial<Account>>({
    name: "",
    platform: "instagram",
    handle: "",
    description: "",
    target_audience: "",
    brand_voice: "",
    key_topics: [],
    hashtag_groups: [],
    content_guidelines: "",
    notes: "",
    is_active: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(newAccount as Omit<Account, "id" | "created_at" | "updated_at">);
      toast({
        title: "Success",
        description: "Account created successfully",
      });
      setNewAccount({
        name: "",
        platform: "instagram",
        handle: "",
        description: "",
        target_audience: "",
        brand_voice: "",
        key_topics: [],
        hashtag_groups: [],
        content_guidelines: "",
        notes: "",
        is_active: true,
      });
    } catch (error) {
      console.error("Error creating account:", error);
      toast({
        title: "Error",
        description: "Failed to create account",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleArrayInput = (field: 'key_topics' | 'hashtag_groups', value: string) => {
    setNewAccount({
      ...newAccount,
      [field]: value.split(',').map(item => item.trim()),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Create New Account</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Input
            placeholder="Name"
            value={newAccount.name || ""}
            onChange={(e) =>
              setNewAccount({ ...newAccount, name: e.target.value })
            }
            required
          />
          <Select
            value={newAccount.platform}
            onValueChange={(value: "instagram" | "facebook" | "twitter" | "linkedin" | "tiktok") =>
              setNewAccount({ ...newAccount, platform: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
              <SelectItem value="twitter">Twitter</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
              <SelectItem value="tiktok">TikTok</SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder="Handle"
            value={newAccount.handle || ""}
            onChange={(e) =>
              setNewAccount({ ...newAccount, handle: e.target.value })
            }
            required
          />
        </div>
        <div className="space-y-2">
          <Textarea
            placeholder="Description"
            value={newAccount.description || ""}
            onChange={(e) =>
              setNewAccount({ ...newAccount, description: e.target.value })
            }
          />
          <Textarea
            placeholder="Target Audience"
            value={newAccount.target_audience || ""}
            onChange={(e) =>
              setNewAccount({ ...newAccount, target_audience: e.target.value })
            }
          />
          <Textarea
            placeholder="Brand Voice"
            value={newAccount.brand_voice || ""}
            onChange={(e) =>
              setNewAccount({ ...newAccount, brand_voice: e.target.value })
            }
          />
        </div>
      </div>
      <div className="space-y-2">
        <Input
          placeholder="Key Topics (comma-separated)"
          value={newAccount.key_topics?.join(', ') || ""}
          onChange={(e) => handleArrayInput('key_topics', e.target.value)}
        />
        <Input
          placeholder="Hashtag Groups (comma-separated)"
          value={newAccount.hashtag_groups?.join(', ') || ""}
          onChange={(e) => handleArrayInput('hashtag_groups', e.target.value)}
        />
        <Textarea
          placeholder="Content Guidelines"
          value={newAccount.content_guidelines || ""}
          onChange={(e) =>
            setNewAccount({ ...newAccount, content_guidelines: e.target.value })
          }
        />
        <Textarea
          placeholder="Notes"
          value={newAccount.notes || ""}
          onChange={(e) =>
            setNewAccount({ ...newAccount, notes: e.target.value })
          }
        />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create Account"}
      </Button>
    </form>
  );
}