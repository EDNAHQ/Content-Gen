import { Textarea } from "@/components/ui/textarea";

interface TextInputSectionProps {
  id: string;
  textContent?: string;
  onTextContentChange: (text: string) => void;
}

export function TextInputSection({ id, textContent, onTextContentChange }: TextInputSectionProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor={`text-content-${id}`} className="text-sm font-medium text-gray-700">
          Enter your text content
        </label>
        <Textarea
          id={`text-content-${id}`}
          placeholder="Enter the text content for your social media post..."
          value={textContent || ""}
          onChange={(e) => onTextContentChange(e.target.value)}
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
}