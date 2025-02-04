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

interface AccountEditFormProps {
  account: Account;
  onSave: (id: string, updatedData: Partial<Account>) => Promise<void>;
  onCancel: () => void;
}

export function AccountEditForm({ account, onSave, onCancel }: AccountEditFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editedAccount, setEditedAccount] = useState<Partial<Account>>({
    name: account.name,
    platform: account.platform,
    handle: account.handle,
    description: account.description,
    target_audience: account.target_audience,
    brand_voice: account.brand_voice,
    key_topics: account.key_topics,
    hashtag_groups: account.hashtag_groups,
    content_guidelines: account.content_guidelines,
    notes: account.notes,
    is_active: account.is_active,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSave(account.id, editedAccount);
      toast({
        title: "Success",
        description: "Account updated successfully",
      });
    } catch (error) {
      console.error("Error saving account:", error);
      toast({
        title: "Error",
        description: "Failed to update account",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleArrayInput = (field: 'key_topics' | 'hashtag_groups', value: string) => {
    setEditedAccount({
      ...editedAccount,
      [field]: value.split(',').map(item => item.trim()),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-muted/50 rounded-lg">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Input
            placeholder="Name"
            value={editedAccount.name || ""}
            onChange={(e) =>
              setEditedAccount({ ...editedAccount, name: e.target.value })
            }
            required
          />
          <Select
            value={editedAccount.platform}
            onValueChange={(value: "instagram" | "facebook" | "twitter" | "linkedin" | "tiktok") =>
              setEditedAccount({ ...editedAccount, platform: value })
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
            value={editedAccount.handle || ""}
            onChange={(e) =>
              setEditedAccount({ ...editedAccount, handle: e.target.value })
            }
            required
          />
        </div>
        <div className="space-y-2">
          <Textarea
            placeholder="Description"
            value={editedAccount.description || ""}
            onChange={(e) =>
              setEditedAccount({ ...editedAccount, description: e.target.value })
            }
          />
          <Textarea
            placeholder="Target Audience"
            value={editedAccount.target_audience || ""}
            onChange={(e) =>
              setEditedAccount({ ...editedAccount, target_audience: e.target.value })
            }
          />
          <Textarea
            placeholder="Brand Voice"
            value={editedAccount.brand_voice || ""}
            onChange={(e) =>
              setEditedAccount({ ...editedAccount, brand_voice: e.target.value })
            }
          />
        </div>
      </div>
      <div className="space-y-2">
        <Input
          placeholder="Key Topics (comma-separated)"
          value={editedAccount.key_topics?.join(', ') || ""}
          onChange={(e) => handleArrayInput('key_topics', e.target.value)}
        />
        <Input
          placeholder="Hashtag Groups (comma-separated)"
          value={editedAccount.hashtag_groups?.join(', ') || ""}
          onChange={(e) => handleArrayInput('hashtag_groups', e.target.value)}
        />
        <Textarea
          placeholder="Content Guidelines"
          value={editedAccount.content_guidelines || ""}
          onChange={(e) =>
            setEditedAccount({ ...editedAccount, content_guidelines: e.target.value })
          }
        />
        <Textarea
          placeholder="Notes"
          value={editedAccount.notes || ""}
          onChange={(e) =>
            setEditedAccount({ ...editedAccount, notes: e.target.value })
          }
        />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <label className="text-sm">Status:</label>
          <Select
            value={editedAccount.is_active ? "active" : "inactive"}
            onValueChange={(value) =>
              setEditedAccount({ ...editedAccount, is_active: value === "active" })
            }
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex space-x-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
}