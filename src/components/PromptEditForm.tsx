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
import { Tables, TablesUpdate } from "@/integrations/supabase/types";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

type Prompt = Tables<"prompts">;
type PromptUpdate = TablesUpdate<"prompts">;

interface PromptEditFormProps {
  prompt: Prompt;
  onSave: (id: string, updatedData: PromptUpdate) => Promise<void>;
  onCancel: () => void;
}

export function PromptEditForm({ prompt, onSave, onCancel }: PromptEditFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editedPrompt, setEditedPrompt] = useState<PromptUpdate>({
    name: prompt.name,
    description: prompt.description,
    prompt_text: prompt.prompt_text,
    type: prompt.type,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSave(prompt.id, editedPrompt);
      toast({
        title: "Success",
        description: "Prompt updated successfully",
      });
    } catch (error) {
      console.error("Error saving prompt:", error);
      toast({
        title: "Error",
        description: "Failed to update prompt",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Input
          placeholder="Name"
          value={editedPrompt.name || ""}
          onChange={(e) =>
            setEditedPrompt({ ...editedPrompt, name: e.target.value })
          }
          className="bg-white/50"
          required
        />
        <Input
          placeholder="Description"
          value={editedPrompt.description || ""}
          onChange={(e) =>
            setEditedPrompt({ ...editedPrompt, description: e.target.value })
          }
          className="bg-white/50"
        />
        <Textarea
          placeholder="Prompt Text"
          value={editedPrompt.prompt_text || ""}
          onChange={(e) => {
            setEditedPrompt({ ...editedPrompt, prompt_text: e.target.value });
          }}
          className="min-h-[100px] bg-white/50"
          required
        />
        <Select
          value={editedPrompt.type}
          onValueChange={(value: "social_media" | "blog" | "email" | "general" | "article" | "newsletter") =>
            setEditedPrompt({ ...editedPrompt, type: value })
          }
        >
          <SelectTrigger className="bg-white/50">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="social_media">Social Media</SelectItem>
            <SelectItem value="blog">Blog</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="article">Article</SelectItem>
            <SelectItem value="newsletter">Newsletter</SelectItem>
            <SelectItem value="general">General</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-2">
        <Button
          type="submit"
          className="flex-1 bg-primary hover:bg-primary/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? <Loader2 className="animate-spin h-5 w-5" /> : "Save Changes"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}