import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ArticleFormProps {
  onGenerate: (promptId: string, notes: string) => void;
  prompts: { id: string; name: string }[];
  isGenerating?: boolean;
}

export function ArticleForm({ onGenerate, prompts, isGenerating = false }: ArticleFormProps) {
  const [notes, setNotes] = useState("");
  const [selectedPromptId, setSelectedPromptId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notes || !selectedPromptId) {
      toast.error("Please fill in your notes and select a writing style.");
      return;
    }
    onGenerate(selectedPromptId, notes);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enter your article notes
        </label>
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Enter all your notes, ideas, and content for the article here..."
          className="min-h-[300px]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Writing Style
        </label>
        <Select
          value={selectedPromptId || ""}
          onValueChange={(value) => setSelectedPromptId(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a writing style" />
          </SelectTrigger>
          <SelectContent>
            {prompts.map((prompt) => (
              <SelectItem key={prompt.id} value={prompt.id}>
                {prompt.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full" disabled={isGenerating}>
        {isGenerating ? <Loader2 className="animate-spin h-5 w-5" /> : "Generate Article"}
      </Button>
    </form>
  );
}