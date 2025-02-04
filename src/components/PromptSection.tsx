import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface Prompt {
  id: string;
  name: string;
  prompt_text: string;
}

interface PromptSectionProps {
  prompts: Prompt[];
  selectedPromptId?: string;
  additionalContext?: string;
  onPromptSelect: (promptId: string) => void;
  onContextChange: (context: string) => void;
}

export function PromptSection({ 
  prompts, 
  selectedPromptId, 
  additionalContext,
  onPromptSelect,
  onContextChange
}: PromptSectionProps) {
  return (
    <div className="space-y-4">
      <Select
        value={selectedPromptId}
        onValueChange={onPromptSelect}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a prompt style" />
        </SelectTrigger>
        <SelectContent>
          {prompts.map((prompt) => (
            <SelectItem key={prompt.id} value={prompt.id}>
              {prompt.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Additional Context (Optional)
        </label>
        <Textarea
          placeholder="Add specific instructions or context..."
          value={additionalContext || ""}
          onChange={(e) => onContextChange(e.target.value)}
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
}