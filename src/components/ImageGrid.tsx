import { ImageRow } from "@/components/ImageRow";

interface Prompt {
  id: string;
  name: string;
  prompt_text: string;
}

interface ImageGridProps {
  postRows: Array<{
    id: string;
    isLoading: boolean;
    files?: File[];
    textContent?: string;
    contentType: 'image' | 'text';
    generatedPost?: string;
    imageUrls?: string[];
    selectedPromptId?: string;
    additionalContext?: string;
  }>;
  prompts: Prompt[];
  onImageSelect: (files: File[], rowId: string) => void;
  onPromptSelect: (promptId: string, rowId: string) => void;
  onContextChange: (context: string, rowId: string) => void;
  onTextContentChange: (text: string, rowId: string) => void;
  onContentTypeChange: (type: 'image' | 'text', rowId: string) => void;
}

export function ImageGrid({ 
  postRows, 
  prompts, 
  onImageSelect, 
  onPromptSelect, 
  onContextChange,
  onTextContentChange,
  onContentTypeChange 
}: ImageGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {postRows.map((row) => (
        <ImageRow
          key={row.id}
          row={row}
          prompts={prompts}
          onImageSelect={onImageSelect}
          onPromptSelect={onPromptSelect}
          onContextChange={onContextChange}
          onTextContentChange={onTextContentChange}
          onContentTypeChange={onContentTypeChange}
        />
      ))}
    </div>
  );
}