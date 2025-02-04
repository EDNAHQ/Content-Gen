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
import { TablesInsert } from "@/integrations/supabase/types";
import { useToast } from "@/hooks/use-toast";

type PromptInsert = TablesInsert<"prompts">;

interface CreatePromptFormProps {
  onSubmit: (promptData: PromptInsert) => Promise<void>;
}

export function CreatePromptForm({ onSubmit }: CreatePromptFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newPrompt, setNewPrompt] = useState<PromptInsert>({
    name: "",
    description: "",
    prompt_text: "",
    type: "social_media",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(newPrompt);
      toast({
        title: "Success",
        description: "Prompt created successfully",
      });
      setNewPrompt({
        name: "",
        description: "",
        prompt_text: "",
        type: "social_media",
      });
    } catch (error) {
      console.error("Error creating prompt:", error);
      toast({
        title: "Error",
        description: "Failed to create prompt",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Create New Prompt</h2>
      <div className="space-y-4">
        <Input
          placeholder="Name"
          value={newPrompt.name}
          onChange={(e) =>
            setNewPrompt({ ...newPrompt, name: e.target.value })
          }
          required
        />
        <Input
          placeholder="Description"
          value={newPrompt.description || ""}
          onChange={(e) =>
            setNewPrompt({ ...newPrompt, description: e.target.value })
          }
        />
        <Textarea
          placeholder="Prompt Text"
          value={newPrompt.prompt_text}
          onChange={(e) =>
            setNewPrompt({ ...newPrompt, prompt_text: e.target.value })
          }
          required
        />
        <Select
          value={newPrompt.type}
          onValueChange={(value: "social_media" | "blog" | "email" | "general" | "newsletter") =>
            setNewPrompt({ ...newPrompt, type: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="social_media">Social Media</SelectItem>
            <SelectItem value="blog">Blog</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="newsletter">Newsletter</SelectItem>
            <SelectItem value="general">General</SelectItem>
          </SelectContent>
        </Select>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Prompt"}
        </Button>
      </div>
    </form>
  );
}