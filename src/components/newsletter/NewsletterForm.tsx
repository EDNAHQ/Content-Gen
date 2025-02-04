import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { usePrompts } from "@/hooks/usePrompts";

interface NewsletterFormProps {
  onGenerate: (content: string) => void;
  isGenerating?: boolean;
}

export function NewsletterForm({ onGenerate, isGenerating = false }: NewsletterFormProps) {
  const [notes, setNotes] = useState("");
  const [selectedPromptId, setSelectedPromptId] = useState<string | null>(null);
  const { prompts, isLoading: isLoadingPrompts, isError } = usePrompts();

  // Filter prompts to only show newsletter type
  const newsletterPrompts = prompts?.filter(prompt => prompt.type === 'newsletter') ?? [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notes || !selectedPromptId) {
      toast.error("Please fill in your notes and select a writing style.");
      return;
    }
    onGenerate(notes);
  };

  if (isError) {
    return (
      <div className="text-red-500">
        Error loading prompts. Please try again later.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enter your newsletter notes
        </label>
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Enter all your notes, ideas, and content for the newsletter here..."
          className="min-h-[300px]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Newsletter Style
        </label>
        <Select
          value={selectedPromptId || ""}
          onValueChange={(value) => setSelectedPromptId(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a newsletter style" />
          </SelectTrigger>
          <SelectContent>
            {isLoadingPrompts ? (
              <SelectItem value="loading" disabled>
                Loading prompts...
              </SelectItem>
            ) : newsletterPrompts.length > 0 ? (
              newsletterPrompts.map((prompt) => (
                <SelectItem key={prompt.id} value={prompt.id}>
                  {prompt.name}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="no-prompts" disabled>
                No newsletter prompts available
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full" disabled={isGenerating || isLoadingPrompts}>
        {isGenerating ? <Loader2 className="animate-spin h-5 w-5" /> : "Generate Newsletter"}
      </Button>
    </form>
  );
}