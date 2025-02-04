import { Card } from "@/components/ui/card";
import { PostDisplay } from "@/components/PostDisplay";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageUploadSection } from "@/components/ImageUploadSection";
import { TextInputSection } from "@/components/TextInputSection";
import { PromptSection } from "@/components/PromptSection";

interface Prompt {
  id: string;
  name: string;
  prompt_text: string;
}

interface ImageRowProps {
  row: {
    id: string;
    isLoading: boolean;
    files?: File[];
    textContent?: string;
    contentType: 'image' | 'text';
    generatedPost?: string;
    imageUrls?: string[];
    selectedPromptId?: string;
    additionalContext?: string;
    versions?: {
      content: string;
      timestamp: string;
    }[];
    currentVersionIndex?: number;
  };
  prompts: Prompt[];
  onImageSelect: (files: File[], rowId: string) => void;
  onPromptSelect: (promptId: string, rowId: string) => void;
  onContextChange: (context: string, rowId: string) => void;
  onTextContentChange: (text: string, rowId: string) => void;
  onContentTypeChange: (type: 'image' | 'text', rowId: string) => void;
  onRegenerate?: (rowId: string) => void;
  onVersionChange?: (index: number, rowId: string) => void;
}

export function ImageRow({ 
  row, 
  prompts, 
  onImageSelect, 
  onPromptSelect, 
  onContextChange,
  onTextContentChange,
  onContentTypeChange,
  onRegenerate,
  onVersionChange
}: ImageRowProps) {
  if (row.generatedPost && row.imageUrls) {
    return (
      <PostDisplay 
        post={row.versions?.[row.currentVersionIndex || 0]?.content || row.generatedPost}
        images={row.imageUrls}
        originalText={row.textContent}
        additionalContext={row.additionalContext}
        onRegenerate={onRegenerate ? () => onRegenerate(row.id) : undefined}
        isRegenerating={row.isLoading}
        versions={row.versions}
        currentVersionIndex={row.currentVersionIndex || 0}
        onVersionChange={onVersionChange ? (index) => onVersionChange(index, row.id) : undefined}
        onImagesAdd={(files) => onImageSelect(files, row.id)}
      />
    );
  }

  if (row.generatedPost) {
    return (
      <PostDisplay 
        post={row.versions?.[row.currentVersionIndex || 0]?.content || row.generatedPost}
        images={row.imageUrls || []}
        originalText={row.textContent}
        additionalContext={row.additionalContext}
        onRegenerate={onRegenerate ? () => onRegenerate(row.id) : undefined}
        isRegenerating={row.isLoading}
        versions={row.versions}
        currentVersionIndex={row.currentVersionIndex || 0}
        onVersionChange={onVersionChange ? (index) => onVersionChange(index, row.id) : undefined}
        onImagesAdd={(files) => onImageSelect(files, row.id)}
      />
    );
  }

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <Tabs
          defaultValue={row.contentType}
          onValueChange={(value) => onContentTypeChange(value as 'image' | 'text', row.id)}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="image">Image-based Post</TabsTrigger>
            <TabsTrigger value="text">Text-based Post</TabsTrigger>
          </TabsList>

          <TabsContent value="image" className="space-y-4">
            <ImageUploadSection
              files={row.files}
              isLoading={row.isLoading}
              onImageSelect={(files) => onImageSelect(files, row.id)}
            />
          </TabsContent>

          <TabsContent value="text" className="space-y-4">
            <TextInputSection
              id={row.id}
              textContent={row.textContent}
              onTextContentChange={(text) => onTextContentChange(text, row.id)}
            />
            <ImageUploadSection
              files={row.files}
              isLoading={row.isLoading}
              onImageSelect={(files) => onImageSelect(files, row.id)}
              label="Add supporting images (optional)"
            />
          </TabsContent>
        </Tabs>

        {((row.contentType === 'image' && row.files && row.files.length > 0) || 
          (row.contentType === 'text' && row.textContent)) && (
          <PromptSection
            prompts={prompts}
            selectedPromptId={row.selectedPromptId}
            additionalContext={row.additionalContext}
            onPromptSelect={(promptId) => onPromptSelect(promptId, row.id)}
            onContextChange={(context) => onContextChange(context, row.id)}
          />
        )}
        
        {((row.contentType === 'image' && row.files && !row.selectedPromptId) || 
          (row.contentType === 'text' && row.textContent && !row.selectedPromptId)) && (
          <p className="text-sm text-amber-600">
            Please select a prompt style
          </p>
        )}
      </div>
    </Card>
  );
}